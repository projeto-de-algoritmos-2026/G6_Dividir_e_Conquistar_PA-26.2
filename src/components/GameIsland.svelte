<script lang="ts">
  import { onMount } from 'svelte';
  import confetti from 'canvas-confetti';
  import type {
    Phase,
    Archetype,
    Card,
    AlgorithmStep,
    PlayerState,
    NetworkMessage,
    StepTotals
  } from '../lib/types';
  import { buildDeckHand, ARCHETYPES } from '../lib/engine/cards';
  import { generateAlgorithmSteps, cloneCards } from '../lib/engine/inversions';
  import { calculateBestMove, calculateSpellDecision } from '../lib/engine/bot';
  import { applySpell } from '../lib/engine/spells';
  import { networkManager } from '../lib/network/peer';
  import { soundscape } from '../lib/audio/soundscape';

  import CharacterArt from './CharacterArt.svelte';
  import Lobby from './Lobby.svelte';
  import SeedingPhase from './SeedingPhase.svelte';
  import AlgorithmicBoard from './AlgorithmicBoard.svelte';
  import TimelineControls from './TimelineControls.svelte';
  import InterventionModal from './InterventionModal.svelte';
  import TutorialModal from './TutorialModal.svelte';

  import SkyBackdrop from './ui/SkyBackdrop.svelte';
  import SkyClock from './ui/SkyClock.svelte';
  import PixelIcon from './ui/PixelIcon.svelte';
  import RoyalBanner from './ui/RoyalBanner.svelte';
  import Pennant from './ui/Pennant.svelte';

  const MAX_HP = 30;

  // --- ESTADO REATIVO COM RUNES (SVELTE 5) ---
  let phase = $state<Phase>('lobby');
  let gameMode = $state<'solo' | 'p2p'>('solo');
  let userPlayerId = $state<'player1' | 'player2'>('player1');
  let currentTurn = $state<'player1' | 'player2'>('player1');
  let roundNumber = $state<number>(1);
  let winner = $state<'player1' | 'player2' | 'draw' | null>(null);

  // Arquétipo escolhido no lobby (independe do papel P1/P2 na partida)
  let myArchetype = $state<Archetype>('rajadas');

  // Jogadores
  let player1 = $state<PlayerState>({
    id: 'player1',
    name: 'Jogador 1',
    hp: MAX_HP,
    deckArchetype: 'rajadas',
    hand: [],
    spells: [],
    hasPlayedAlphaSpell: false,
    hasPlayedBetaSpell: false
  });

  let player2 = $state<PlayerState>({
    id: 'player2',
    name: 'Autômato Heurístico',
    hp: MAX_HP,
    deckArchetype: 'raiz',
    hand: [],
    spells: [],
    hasPlayedAlphaSpell: false,
    hasPlayedBetaSpell: false
  });

  // Tabuleiro de 8 ilhas
  let slots = $state<(Card | null)[]>(new Array(8).fill(null));
  let selectedCardId = $state<string | null>(null);

  // Execução do Algoritmo
  let steps = $state<AlgorithmStep[]>([]);
  let currentStepIndex = $state<number>(0);
  let isPlaying = $state<boolean>(false);
  let playbackSpeed = $state<number>(1);
  let playbackInterval = $state<any>(null);

  // Janelas de Intervenção
  let currentInterventionWindow = $state<'alpha' | 'beta' | null>(null);

  // P2P State
  let hostRoomCode = $state<string>('');
  let isConnectingP2P = $state<boolean>(false);
  let connectionError = $state<string | null>(null);

  // P2P: decisões de cada jogador nas janelas Alpha/Beta (ponto de sincronia)
  type WindowDecision = { kind: 'pass' } | { kind: 'cast'; spellId: string; targetSlot: number };
  type WindowType = 'alpha' | 'beta';
  let windowDecisions = $state<Record<WindowType, Partial<Record<'player1' | 'player2', WindowDecision>>>>({ alpha: {}, beta: {} });
  let resolvedWindows = $state<Record<WindowType, boolean>>({ alpha: false, beta: false });
  let awaitingOpponent = $state<WindowType | null>(null);
  // Jogadas do adversário que chegaram antes desta máquina entrar na semeadura
  let pendingPlacements: NetworkMessage[] = [];

  // Tutorial Modal
  let isTutorialOpen = $state<boolean>(false);

  // Balanço de dano e cura da última rodada (exibido no relatório)
  let roundReport = $state<StepTotals | null>(null);

  // Logs da Partida
  let logs = $state<string[]>([]);

  // Derived properties
  const currentStep = $derived(steps[currentStepIndex]);
  const activeBoardCards = $derived(
    phase === 'executing' || phase === 'alpha_window' || phase === 'beta_window' || phase === 'round_end'
      ? currentStep?.boardState || slots
      : slots
  );

  const rA = $derived(currentStep?.rA ?? 0);
  const rB = $derived(currentStep?.rB ?? 0);
  const rCross = $derived(currentStep?.rCross ?? 0);
  const rTotal = $derived(currentStep?.rTotal ?? 0);

  // --- EFEITOS SONOROS BASEADOS NO PASSO DO ALGORITMO ---
  $effect(() => {
    if (phase === 'executing' && currentStep) {
      if (currentStep.type === 'divide_start') {
        soundscape.playDivideSplit();
      } else if (currentStep.type === 'nicho_swap' || currentStep.type === 'merge_ala_inversion') {
        soundscape.playSwapInversion();
      } else if (currentStep.type === 'vortex_burst_inversion') {
        soundscape.playVortexBurst(currentStep.eventPayload?.kInversions || 3);
      } else if (currentStep.type === 'vortex_serene_pass' || currentStep.type === 'merge_ala_pass' || currentStep.type === 'nicho_ordered') {
        soundscape.playSereneFlow();
      } else if (currentStep.type === 'round_resolution') {
        soundscape.playResolutionFanfare();
      }
    }
  });

  // --- INICIALIZAÇÃO DA PARTIDA ---
  function playerName(id: 'player1' | 'player2', mode: 'solo' | 'p2p'): string {
    if (mode === 'solo') return id === 'player1' ? 'Comandante' : 'Autômato Rival';
    return id === userPlayerId ? 'Você' : 'Adversário';
  }

  function resetWindows() {
    windowDecisions = { alpha: {}, beta: {} };
    resolvedWindows = { alpha: false, beta: false };
    awaitingOpponent = null;
  }

  /** No modo P2P, userPlayerId deve ser definido antes de chamar startMatch. */
  function startMatch(mode: 'solo' | 'p2p', p1Arch: Archetype, p2Arch: Archetype) {
    gameMode = mode;
    if (mode === 'solo') userPlayerId = 'player1';

    const p1Deck = buildDeckHand(p1Arch, 'player1');
    const p2Deck = buildDeckHand(p2Arch, 'player2');

    player1 = {
      id: 'player1',
      name: playerName('player1', mode),
      hp: MAX_HP,
      deckArchetype: p1Arch,
      hand: p1Deck.creatures,
      spells: p1Deck.spells,
      hasPlayedAlphaSpell: false,
      hasPlayedBetaSpell: false
    };

    player2 = {
      id: 'player2',
      name: playerName('player2', mode),
      hp: MAX_HP,
      deckArchetype: p2Arch,
      hand: p2Deck.creatures,
      spells: p2Deck.spells,
      hasPlayedAlphaSpell: false,
      hasPlayedBetaSpell: false
    };

    slots = new Array(8).fill(null);
    currentTurn = 'player1';
    roundNumber = 1;
    winner = null;
    roundReport = null;
    isConnectingP2P = false;
    resetWindows();
    phase = 'seeding';
    logs = [`Início da Rodada ${roundNumber}. O arquipélago aguarda a semeadura.`];
    flushPendingPlacements();
  }

  // --- FASE DE SEMEADURA ---
  function handleSelectCard(cardId: string) {
    selectedCardId = cardId;
  }

  /** Coloca uma carta da mão de `owner` no tabuleiro (jogador local, bot ou adversário P2P). */
  function placeCard(owner: 'player1' | 'player2', cardId: string, slotIndex: number): boolean {
    if (slots[slotIndex] !== null) return false;
    const owningPlayer = owner === 'player1' ? player1 : player2;
    const card = owningPlayer.hand.find(c => c.id === cardId);
    if (!card) return false;

    slots[slotIndex] = card;
    slots = [...slots];
    soundscape.playCardPlace();
    owningPlayer.hand = owningPlayer.hand.filter(c => c.id !== cardId);

    if (slots.every(s => s !== null)) {
      startAlgorithmExecution();
    } else {
      currentTurn = owner === 'player1' ? 'player2' : 'player1';
    }
    return true;
  }

  function handlePlaceCard(slotIndex: number) {
    if (!selectedCardId || currentTurn !== userPlayerId) return;
    const cardId = selectedCardId;
    if (!placeCard(userPlayerId, cardId, slotIndex)) return;
    selectedCardId = null;

    if (gameMode === 'p2p') {
      networkManager.send({ type: 'place_card', player: userPlayerId, cardId, slotIndex, round: roundNumber });
    } else if (phase === 'seeding' && currentTurn === 'player2') {
      setTimeout(handleBotSeedingTurn, 500);
    }
  }

  function handleBotSeedingTurn() {
    if (gameMode !== 'solo' || phase !== 'seeding' || currentTurn !== 'player2') return;

    const botDecision = calculateBestMove(player2.hand, slots, player2.deckArchetype);
    if (!botDecision) return;
    placeCard('player2', botDecision.cardId, botDecision.slotIndex);
  }

  // --- EXECUÇÃO DO ALGORITMO ---
  function startAlgorithmExecution() {
    phase = 'executing';
    selectedCardId = null;
    currentStepIndex = 0;

    const initialBoard = cloneCards(slots);
    const sim = generateAlgorithmSteps(initialBoard);
    steps = sim.steps;
    logs = [...logs, `Tabuleiro completo. O arquipélago divide-se em nichos.`];

    startAutoPlay();
  }

  function startAutoPlay() {
    if (playbackInterval) clearInterval(playbackInterval);
    isPlaying = true;

    playbackInterval = setInterval(() => {
      advanceStep();
    }, 1200 / playbackSpeed);
  }

  function pauseAutoPlay() {
    isPlaying = false;
    if (playbackInterval) {
      clearInterval(playbackInterval);
      playbackInterval = null;
    }
  }

  function togglePlayPause() {
    if (isPlaying) {
      pauseAutoPlay();
    } else {
      startAutoPlay();
    }
  }

  function changeSpeed(newSpeed: number) {
    playbackSpeed = newSpeed;
    if (isPlaying) {
      startAutoPlay();
    }
  }

  function stepForward() {
    pauseAutoPlay();
    advanceStep();
  }

  function stepBackward() {
    pauseAutoPlay();
    if (currentStepIndex > 0) {
      currentStepIndex--;
    }
  }

  function resetToStart() {
    pauseAutoPlay();
    currentStepIndex = 0;
  }

  function advanceStep() {
    // P2P: não avança além de uma janela que ainda espera decisões
    const here = currentStep?.type;
    if (gameMode === 'p2p' && ((here === 'alpha_pause' && !resolvedWindows.alpha) || (here === 'beta_pause' && !resolvedWindows.beta))) {
      pauseAutoPlay();
      return;
    }

    if (currentStepIndex >= steps.length - 1) {
      pauseAutoPlay();
      handleResolution();
      return;
    }

    const nextStep = steps[currentStepIndex + 1];

    if (nextStep.type === 'alpha_pause' || nextStep.type === 'beta_pause') {
      const windowType = nextStep.type === 'alpha_pause' ? 'alpha' : 'beta';
      currentStepIndex++;

      if (gameMode === 'p2p') {
        enterP2PWindow(windowType);
        return;
      }

      if (canUserCast(windowType)) {
        pauseAutoPlay();
        currentInterventionWindow = windowType;
        phase = windowType === 'alpha' ? 'alpha_window' : 'beta_window';
      } else {
        botIntervene(windowType);
      }
      return;
    }

    currentStepIndex++;
  }

  function canUserCast(windowType: 'alpha' | 'beta'): boolean {
    const user = userPlayerId === 'player1' ? player1 : player2;
    const alreadyPlayed = windowType === 'alpha' ? user.hasPlayedAlphaSpell : user.hasPlayedBetaSpell;
    return user.spells.length > 0 && !alreadyPlayed;
  }

  function handleOpenInterventionManually() {
    if (currentStep?.type !== 'alpha_pause' && currentStep?.type !== 'beta_pause') return;
    const windowType = currentStep.type === 'alpha_pause' ? 'alpha' : 'beta';
    if (!canUserCast(windowType)) return;

    pauseAutoPlay();
    currentInterventionWindow = windowType;
    phase = windowType === 'alpha' ? 'alpha_window' : 'beta_window';
  }

  // --- JANELAS DE INTERVENÇÃO DE MAGIAS ---
  /**
   * Retoma o algoritmo a partir da janela atual com o tabuleiro alterado por fórmulas.
   * Dano, cura e inversões acumulados vêm do passo atual (e não do total da simulação
   * anterior, que já incluía passos futuros descartados).
   */
  function resumeAfterIntervention(
    winType: 'alpha' | 'beta',
    board: (Card | null)[],
    title: string,
    logEntries: string[]
  ) {
    const base = currentStep;
    const totals = base?.totals ?? { damageP1: 0, damageP2: 0, healP1: 0, healP2: 0 };

    const remainingSim = generateAlgorithmSteps(board, {
      startFrom: winType,
      initialRA: base?.rA ?? 0,
      initialRB: base?.rB ?? 0,
      initialRCross: base?.rCross ?? 0,
      initialDamageP1: totals.damageP1,
      initialDamageP2: totals.damageP2,
      initialHealP1: totals.healP1,
      initialHealP2: totals.healP2,
      initialStepCounter: (base?.id ?? currentStepIndex) + 1
    });


    const interventionStep: AlgorithmStep = {
      id: base?.id ?? currentStepIndex,
      type: winType === 'alpha' ? 'alpha_pause' : 'beta_pause',
      title,
      description: 'Pesos recalculados para as próximas fusões.',
      complexityNotation: winType === 'alpha' ? 'Intervenção T(2)' : 'Intervenção T(4)',
      rA: base?.rA ?? 0,
      rB: base?.rB ?? 0,
      rCross: base?.rCross ?? 0,
      rTotal: base?.rTotal ?? 0,
      totals: { ...totals },
      boardState: cloneCards(board),
      eventPayload: {
        logText: logEntries.join(' ')
      }
    };

    steps = [...steps.slice(0, currentStepIndex), interventionStep, ...remainingSim.steps];
    logs = [...logs, ...logEntries];
  }

  function handleCastSpell(spellId: string, targetSlot: number) {
    const isP1 = userPlayerId === 'player1';
    const activePlayer = isP1 ? player1 : player2;
    const spell = activePlayer.spells.find(s => s.id === spellId);
    if (!spell) return;

    if (gameMode === 'p2p') {
      const windowType = currentInterventionWindow || 'alpha';
      markUserWindowPlayed(windowType);
      currentInterventionWindow = null;
      phase = 'executing';
      recordDecision(userPlayerId, windowType, { kind: 'cast', spellId, targetSlot }, true);
      return;
    }

    soundscape.playSpellCast();
    activePlayer.spells = activePlayer.spells.filter(s => s.id !== spellId);
    if (currentInterventionWindow === 'alpha') {
      activePlayer.hasPlayedAlphaSpell = true;
    } else {
      activePlayer.hasPlayedBetaSpell = true;
    }

    let currentBoard = applySpell(currentStep?.boardState || slots, spell, targetSlot);
    const logEntries = [`[Fórmula Alquímica] Você conjurou ${spell.name} na Ilha #${targetSlot}!`];

    const windowType = currentInterventionWindow || 'alpha';
    const botCast = decideBotSpell(currentBoard, windowType);
    if (botCast) {
      currentBoard = botCast.board;
      logEntries.push(botCast.log);
    }

    resumeAfterIntervention(windowType, currentBoard, `[Alquimia] ${spell.name} Conjurada!`, logEntries);

    currentInterventionWindow = null;
    phase = 'executing';
    pauseAutoPlay();
  }

  /**
   * No modo solo, o Autômato avalia se vale conjurar uma fórmula na janela.
   * Retorna o tabuleiro resultante e a linha de log, ou null se ele passar.
   */
  function decideBotSpell(board: (Card | null)[], windowType: 'alpha' | 'beta') {
    if (gameMode !== 'solo' || player2.spells.length === 0) return null;
    if (windowType === 'alpha' ? player2.hasPlayedAlphaSpell : player2.hasPlayedBetaSpell) return null;

    const decision = calculateSpellDecision(player2.spells, board, player2.deckArchetype, windowType);
    if (!decision.shouldCast || !decision.spellId || decision.targetSlot === undefined || decision.targetSlot === -1) {
      return null;
    }

    const spell = player2.spells.find(s => s.id === decision.spellId);
    if (!spell) return null;

    player2.spells = player2.spells.filter(s => s.id !== spell.id);
    if (windowType === 'alpha') {
      player2.hasPlayedAlphaSpell = true;
    } else {
      player2.hasPlayedBetaSpell = true;
    }

    return {
      board: applySpell(board, spell, decision.targetSlot),
      log: `[Fórmula Rival] Autômato conjurou ${spell.name} na Ilha #${decision.targetSlot}!`
    };
  }

  /** Janela em que só o Autômato pode agir (jogador passou ou está sem fórmulas). */
  function botIntervene(windowType: 'alpha' | 'beta') {
    const botCast = decideBotSpell(currentStep?.boardState || slots, windowType);
    if (!botCast) return;

    soundscape.playSpellCast();
    resumeAfterIntervention(windowType, botCast.board, '[Alquimia Rival] Fórmula do Autômato!', [botCast.log]);
  }

  function markUserWindowPlayed(windowType: WindowType) {
    const user = userPlayerId === 'player1' ? player1 : player2;
    if (windowType === 'alpha') {
      user.hasPlayedAlphaSpell = true;
    } else {
      user.hasPlayedBetaSpell = true;
    }
  }

  function handlePassIntervention() {
    const windowType = currentInterventionWindow || 'alpha';
    markUserWindowPlayed(windowType);
    currentInterventionWindow = null;
    phase = 'executing';

    if (gameMode === 'p2p') {
      recordDecision(userPlayerId, windowType, { kind: 'pass' }, true);
      return;
    }

    botIntervene(windowType);
    startAutoPlay();
  }

  // --- JANELAS SINCRONIZADAS (P2P) ---
  function enterP2PWindow(windowType: WindowType) {
    if (resolvedWindows[windowType]) return;
    pauseAutoPlay();

    if (!windowDecisions[windowType][userPlayerId]) {
      if (canUserCast(windowType)) {
        currentInterventionWindow = windowType;
        phase = windowType === 'alpha' ? 'alpha_window' : 'beta_window';
        return;
      }
      markUserWindowPlayed(windowType);
      recordDecision(userPlayerId, windowType, { kind: 'pass' }, true);
      return;
    }

    tryResolveP2PWindow(windowType);
  }

  function recordDecision(player: 'player1' | 'player2', windowType: WindowType, decision: WindowDecision, broadcast: boolean) {
    windowDecisions[windowType][player] = decision;

    if (broadcast) {
      networkManager.send(
        decision.kind === 'cast'
          ? { type: 'cast_spell', player, windowType, cardId: decision.spellId, targetSlot: decision.targetSlot, round: roundNumber }
          : { type: 'pass_window', player, windowType, round: roundNumber }
      );
    }

    tryResolveP2PWindow(windowType);
  }

  /**
   * Resolve a janela quando os dois jogadores decidiram e esta máquina está parada na pausa.
   * As fórmulas são aplicadas sempre na ordem P1 → P2, garantindo o mesmo tabuleiro nos dois lados.
   */
  function tryResolveP2PWindow(windowType: WindowType) {
    if (resolvedWindows[windowType]) return;
    const decisions = windowDecisions[windowType];
    const pauseType = windowType === 'alpha' ? 'alpha_pause' : 'beta_pause';

    if (!decisions[userPlayerId] || currentStep?.type !== pauseType) return;
    if (!decisions.player1 || !decisions.player2) {
      awaitingOpponent = windowType;
      return;
    }

    awaitingOpponent = null;
    resolvedWindows[windowType] = true;

    let board = currentStep.boardState;
    const logEntries: string[] = [];
    for (const pid of ['player1', 'player2'] as const) {
      const decision = decisions[pid];
      if (decision?.kind !== 'cast') continue;
      const owner = pid === 'player1' ? player1 : player2;
      const spell = owner.spells.find(s => s.id === decision.spellId);
      if (!spell) continue;
      owner.spells = owner.spells.filter(s => s.id !== spell.id);
      board = applySpell(board, spell, decision.targetSlot);
      logEntries.push(`[Fórmula] ${owner.name} conjurou ${spell.name} na Ilha #${decision.targetSlot}!`);
    }

    if (logEntries.length > 0) {
      soundscape.playSpellCast();
      resumeAfterIntervention(windowType, board, '[Alquimia] Fórmulas Conjuradas!', logEntries);
    }
    startAutoPlay();
  }

  // --- RESOLUÇÃO DA RODADA ---
  function handleResolution() {
    const finalStep = steps[steps.length - 1];
    const totals = finalStep?.totals ?? { damageP1: 0, damageP2: 0, healP1: 0, healP2: 0 };
    roundReport = totals;

    // Dano e cura da rodada são aplicados juntos; o HP fica entre 0 e MAX_HP
    player1.hp = Math.min(MAX_HP, Math.max(0, player1.hp - totals.damageP1 + totals.healP1));
    player2.hp = Math.min(MAX_HP, Math.max(0, player2.hp - totals.damageP2 + totals.healP2));

    if (player1.hp <= 0 || player2.hp <= 0) {
      phase = 'match_end';
      if (player1.hp <= 0 && player2.hp <= 0) {
        winner = 'draw';
      } else if (player1.hp <= 0) {
        winner = 'player2';
      } else {
        winner = 'player1';
      }
      if (winner === userPlayerId) {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      }
    } else {
      phase = 'round_end';
    }
  }

  function nextRound() {
    roundNumber++;
    slots = new Array(8).fill(null);
    currentTurn = roundNumber % 2 === 1 ? 'player1' : 'player2';

    const p1New = buildDeckHand(player1.deckArchetype, 'player1');
    const p2New = buildDeckHand(player2.deckArchetype, 'player2');

    player1.hand = p1New.creatures;
    player2.hand = p2New.creatures;

    if (player1.spells.length === 0) {
      player1.spells = p1New.spells;
    }
    if (player2.spells.length === 0) {
      player2.spells = p2New.spells;
    }

    player1.hasPlayedAlphaSpell = false;
    player1.hasPlayedBetaSpell = false;
    player2.hasPlayedAlphaSpell = false;
    player2.hasPlayedBetaSpell = false;

    resetWindows();
    phase = 'seeding';
    if (gameMode === 'solo' && currentTurn === 'player2') {
      setTimeout(handleBotSeedingTurn, 500);
    }
    flushPendingPlacements();
  }

  function restartGame() {
    pauseAutoPlay();
    phase = 'lobby';
    hostRoomCode = '';
    connectionError = null;
    isConnectingP2P = false;
    pendingPlacements = [];
    if (gameMode === 'p2p') {
      networkManager.disconnect();
    }
    gameMode = 'solo';
    userPlayerId = 'player1';
  }

  // --- P2P HOST & JOIN ---
  // Handshake: o convidado envia 'join' com seu arquétipo; o anfitrião responde 'deck_select'
  // com o dele. Como os IDs das cartas são determinísticos, os dois montam os mesmos decks.
  async function handleHostRoom() {
    isConnectingP2P = true;
    connectionError = null;
    networkManager.setCallbacks(handleIncomingNetworkMessage, handleNetworkStatus);

    try {
      hostRoomCode = await networkManager.hostRoom();
    } catch (err: any) {
      connectionError = connectionError ?? err?.message ?? 'Falha ao iniciar P2P.';
      hostRoomCode = '';
    } finally {
      isConnectingP2P = false;
    }
  }

  async function handleJoinRoom(code: string) {
    isConnectingP2P = true;
    connectionError = null;
    networkManager.setCallbacks(handleIncomingNetworkMessage, handleNetworkStatus);

    try {
      await networkManager.joinRoom(code);
      networkManager.send({ type: 'join', player: 'player2', archetype: myArchetype });
    } catch (err: any) {
      connectionError = connectionError ?? err?.message ?? 'Erro ao conectar à sala.';
      isConnectingP2P = false;
    }
  }

  function handleNetworkStatus(status: 'disconnected' | 'connecting' | 'connected' | 'error', detail?: string) {
    if (status === 'error') {
      connectionError = detail ?? 'Erro de conexão P2P.';
      isConnectingP2P = false;
    } else if (status === 'disconnected' && gameMode === 'p2p' && phase !== 'lobby' && phase !== 'match_end') {
      restartGame();
      connectionError = 'A conexão com o adversário foi encerrada.';
    }
  }

  function flushPendingPlacements() {
    const queued = pendingPlacements;
    pendingPlacements = [];
    for (const msg of queued) handleIncomingNetworkMessage(msg);
  }

  function handleIncomingNetworkMessage(msg: NetworkMessage) {
    switch (msg.type) {
      case 'join':
        if (networkManager.isHost && phase === 'lobby' && msg.archetype) {
          userPlayerId = 'player1';
          networkManager.send({ type: 'deck_select', player: 'player1', archetype: myArchetype });
          startMatch('p2p', myArchetype, msg.archetype);
        }
        break;

      case 'deck_select':
        if (!networkManager.isHost && phase === 'lobby' && msg.archetype) {
          userPlayerId = 'player2';
          startMatch('p2p', msg.archetype, myArchetype);
        }
        break;

      case 'place_card':
        if (phase !== 'seeding' || msg.round !== roundNumber) {
          pendingPlacements = [...pendingPlacements, msg];
        } else if (msg.cardId && msg.slotIndex !== undefined) {
          placeCard(msg.player, msg.cardId, msg.slotIndex);
        }
        break;

      case 'cast_spell':
      case 'pass_window':
        if (msg.round !== roundNumber || !msg.windowType) break;
        recordDecision(
          msg.player,
          msg.windowType,
          msg.type === 'cast_spell' && msg.cardId && msg.targetSlot !== undefined
            ? { kind: 'cast', spellId: msg.cardId, targetSlot: msg.targetSlot }
            : { kind: 'pass' },
          false
        );
        break;
    }
  }
</script>

<!-- CONTAINER PRINCIPAL DO JOGO -->
<div class="relative w-full min-h-screen flex flex-col justify-between overflow-x-hidden text-cm-ink select-none">
  <!-- Pano de Fundo Cenográfico: Céu Pastoral, Nuvens Deslizantes e Ilhas Flutuantes (Cloud Meadow) -->
  <SkyBackdrop />

  <!-- BARRA DE STATUS HUD IN-GAME (AUTÊNTICA AO SCREENSHOT 01 DE CLOUD MEADOW) -->
  {#if phase !== 'lobby'}
    <header class="relative z-30 w-full max-w-5xl mx-auto px-3 sm:px-4 pt-3 pb-1 flex items-center justify-between gap-3">
      <!-- Pílula de Metal Musgo / Ardósia com Rebites e Trilho Central (ref 01) -->
      <div class="flex-1 cm-hud-plate px-3 sm:px-4 py-2 rounded-full flex items-center justify-between gap-2 sm:gap-4">
        <!-- Jogador 1 (Comandante): Medalhão HP Dourado + Barra Menta Segmentada -->
        <div class="flex items-center gap-2">
          <!-- Medalhão HP Circular Dourado -->
          <div class="cm-coin w-8 h-8 text-[12px] shadow-md flex items-center justify-center font-bold">
            HP
          </div>

          <!-- Barra de HP com Vidro e Segmentos -->
          <div class="flex flex-col gap-0.5">
            <div class="flex items-center gap-1.5 text-xs font-bold leading-none">
              <span class="text-white drop-shadow-[1px_1px_0_#1e1d21]">{player1.name}</span>
              <span class="text-[11px] px-1.5 py-0.2 rounded-[2px] bg-[#1a1b1f] text-[#86efac] font-mono">
                {player1.hp}/{MAX_HP}
              </span>
            </div>
            <div class="w-24 sm:w-36 cm-hud-bar rounded-full">
              <div
                class="cm-hud-bar-fill transition-all duration-300"
                style="width: {(player1.hp / MAX_HP) * 100}%"
              ></div>
            </div>
          </div>
        </div>

        <!-- Indicador Central da Rodada & Arquétipo Ativo -->
        <div class="hidden sm:flex flex-col items-center">
          <span class="text-[10px] text-cm-tan uppercase tracking-widest font-bold">Rodada</span>
          <span class="text-base font-bold text-cm-cream font-mono">#{roundNumber}</span>
        </div>

        <!-- Jogador 2 (Rival / Autômato): Barra com Medidor Dourado & Medalhão Circular -->
        <div class="flex items-center gap-2 flex-row-reverse text-right">
          <div class="cm-coin w-8 h-8 text-[12px] shadow-md flex items-center justify-center font-bold !bg-[#b8492f]">
            HP
          </div>

          <div class="flex flex-col gap-0.5 items-end">
            <div class="flex items-center gap-1.5 text-xs font-bold leading-none">
              <span class="text-[11px] px-1.5 py-0.2 rounded-[2px] bg-[#1a1b1f] text-[#fca5a5] font-mono">
                {player2.hp}/{MAX_HP}
              </span>
              <span class="text-white drop-shadow-[1px_1px_0_#1e1d21]">{player2.name}</span>
            </div>
            <div class="w-24 sm:w-36 cm-hud-bar rounded-full">
              <div
                class="cm-hud-bar-fill transition-all duration-300 !bg-[#d95738] !shadow-[inset_0_2px_0_#f87171]"
                style="width: {(player2.hp / MAX_HP) * 100}%"
              ></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Relógio Celestial Suspenso por Corrente de Metal (ref 01) -->
      <SkyClock tag="R{roundNumber}" />
    </header>
  {/if}

  <!-- ÁREA CENTRAL DE JOGO / NAVEGAÇÃO DE TELAS -->
  <main class="relative z-20 flex-1 flex flex-col justify-center px-2 sm:px-4 py-2">
    {#if phase === 'lobby'}
      <Lobby
        selectedArchetype={myArchetype}
        onSelectArchetype={(a) => myArchetype = a}
        onStartSolo={(botArch) => startMatch('solo', myArchetype, botArch)}
        onHostRoom={handleHostRoom}
        onJoinRoom={handleJoinRoom}
        onOpenTutorial={() => isTutorialOpen = true}
        {isConnectingP2P}
        {hostRoomCode}
        {connectionError}
      />
    {:else if phase === 'seeding'}
      <SeedingPhase
        {slots}
        playerHand={userPlayerId === 'player1' ? player1.hand : player2.hand}
        playerSpells={userPlayerId === 'player1' ? player1.spells : player2.spells}
        opponentHandCount={userPlayerId === 'player1' ? player2.hand.length : player1.hand.length}
        {currentTurn}
        {userPlayerId}
        {selectedCardId}
        onSelectCard={handleSelectCard}
        onPlaceCard={handlePlaceCard}
      />
    {:else if phase === 'executing' || phase === 'alpha_window' || phase === 'beta_window' || phase === 'round_end'}
      <div class="w-full flex flex-col items-center gap-3">
        {#if awaitingOpponent}
          <div class="cm-bubble px-4 py-2 text-[13px] font-bold flex items-center gap-2">
            <span class="w-2.5 h-2.5 bg-cm-hp border-2 border-cm-frame cm-anim-blink"></span>
            Aguardando a decisão do adversário na Janela {awaitingOpponent === 'alpha' ? 'Alpha' : 'Beta'}…
          </div>
        {/if}
        <AlgorithmicBoard
          step={currentStep}
          cards={activeBoardCards}
        />

        <TimelineControls
          {currentStep}
          stepIndex={currentStepIndex}
          totalSteps={steps.length}
          {isPlaying}
          speed={playbackSpeed}
          {rA}
          {rB}
          {rCross}
          {rTotal}
          spellsCount={userPlayerId === 'player1' ? player1.spells.length : player2.spells.length}
          isInterventionReady={(currentStep?.type === 'alpha_pause' && canUserCast('alpha')) || (currentStep?.type === 'beta_pause' && canUserCast('beta'))}
          currentInterventionWindow={currentInterventionWindow}
          onNextStep={stepForward}
          onPrevStep={stepBackward}
          onTogglePlay={togglePlayPause}
          onChangeSpeed={changeSpeed}
          onReset={resetToStart}
          onOpenIntervention={handleOpenInterventionManually}
        />
      </div>
    {/if}

    <!-- MODAL DE JANELA DE INTERVENÇÃO (ALPHA / BETA) -->
    {#if currentInterventionWindow}
      <InterventionModal
        windowType={currentInterventionWindow}
        spells={userPlayerId === 'player1' ? player1.spells : player2.spells}
        boardCards={currentStep?.boardState || slots}
        onCastSpell={handleCastSpell}
        onPassWindow={handlePassIntervention}
      />
    {/if}

    <!-- MODAL DE FIM DE RODADA ESTILO JANELA CLOUD MEADOW (SCREENSHOTS 02, 03 & 05) -->
    {#if phase === 'round_end'}
      <div class="cm-overlay select-none cm-anim-pop">
        <div class="cm-window max-w-md w-full p-2 text-center">
          <div class="cm-window-body overflow-hidden">
            <!-- Banner Azul Royal com Runas (ref 06) -->
            <RoyalBanner
              runes="relatorio"
              title="Relatório de Voo • Rodada {roundNumber}"
              subtitle="Cálculo do impacto das inversões nos estratos celestes"
            />

            <div class="cm-parch p-5 flex flex-col items-center gap-4 text-cm-ink">
              <!-- Placar Comparativo em Caixa Escura (ref 05) -->
              <div class="w-full grid grid-cols-3 gap-2 p-3 bg-[#1b1b1e] text-white rounded-[4px] border-2 border-cm-frame shadow-inner text-xs font-bold">
                <div class="flex flex-col items-center">
                  <span class="text-[#8fc3ee]">P1 HP</span>
                  <span class="text-xl text-white font-mono">{player1.hp}</span>
                </div>
                <div class="flex flex-col items-center border-x-2 border-cm-slate-line px-2">
                  <span class="text-cm-gold">Inversões</span>
                  <span class="text-xl text-cm-gold font-mono">{rTotal}</span>
                </div>
                <div class="flex flex-col items-center">
                  <span class="text-[#f9d57c]">P2 HP</span>
                  <span class="text-xl text-white font-mono">{player2.hp}</span>
                </div>
              </div>

              {#if roundReport}
                <div class="w-full grid grid-cols-2 gap-2 text-[11px] font-bold">
                  <div class="px-2 py-1.5 flex flex-col items-center bg-[#1b1b1e] text-white rounded-[4px] border-2 border-cm-frame">
                    <span>P1</span>
                    <span class="text-[#fca5a5]">−{roundReport.damageP1} dano</span>
                    <span class="text-[#86efac]">+{roundReport.healP1} cura</span>
                  </div>
                  <div class="px-2 py-1.5 flex flex-col items-center bg-[#1b1b1e] text-white rounded-[4px] border-2 border-cm-frame">
                    <span>P2</span>
                    <span class="text-[#fca5a5]">−{roundReport.damageP2} dano</span>
                    <span class="text-[#86efac]">+{roundReport.healP2} cura</span>
                  </div>
                </div>
              {/if}

              <!-- Balão de Fala do Assistente (Screenshot 03) -->
              <div class="cm-bubble tail-bottom p-3 text-xs leading-relaxed text-cm-ink">
                "As correntes eólicas foram recalculadas pelo algoritmo O(n log n). O arquipélago está pronto para a próxima semeadura!"
              </div>

              <button
                onclick={nextRound}
                class="cm-btn w-full py-3 text-sm"
              >
                <PixelIcon name="sword" size={16} />
                <span>Iniciar Próxima Semeadura ▶</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    {/if}

    <!-- MODAL DE FIM DE PARTIDA (ESTILO VERSUS & ESTANDARTE SCREENSHOT 05) -->
    {#if phase === 'match_end'}
      <div class="cm-overlay select-none cm-anim-pop">
        <div class="cm-window max-w-lg w-full p-2 text-center">
          <div class="cm-window-body overflow-hidden">
            <RoyalBanner
              runes="duelo final"
              title="Duelo Celeste Finalizado"
            />

            <div class="cm-parch p-6 flex flex-col items-center gap-4 text-cm-ink">
              <!-- Estandarte com Ícone do Duelo -->
              <div class="flex items-center justify-center gap-4 py-2">
                <Pennant
                  emblem={winner === userPlayerId ? 'star' : 'sword'}
                  tone={winner === userPlayerId ? 'blue' : 'red'}
                  class="w-28 h-auto"
                />
              </div>

              <div class="flex flex-col items-center gap-1">
                <h2 class="cm-title text-2xl sm:text-3xl text-cm-ink">
                  {winner === userPlayerId
                    ? 'Vitória Celeste!'
                    : winner === 'draw'
                    ? 'Empate no Vórtice!'
                    : 'Derrota nos Estratos!'}
                </h2>
                <p class="text-xs sm:text-sm text-cm-ink-soft max-w-sm leading-relaxed">
                  {winner === userPlayerId
                    ? 'Seus guardiões dominaram as correntes térmicas e conquistaram os céus com maestria algorítmica!'
                    : winner === 'draw'
                    ? 'Os dois lados tombaram juntos no mesmo vendaval.'
                    : 'O adversário manipulou as inversões e sobrepujou suas defesas nas alas.'}
                </p>
              </div>

              <button
                onclick={restartGame}
                class="cm-btn w-full py-3.5 text-sm"
              >
                <PixelIcon name="sword" size={16} />
                <span>Voltar ao Menu Principal</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    {/if}
  </main>

  <!-- MODAL DE TUTORIAL E REGRAS -->
  <TutorialModal
    isOpen={isTutorialOpen}
    onClose={() => isTutorialOpen = false}
  />
</div>
