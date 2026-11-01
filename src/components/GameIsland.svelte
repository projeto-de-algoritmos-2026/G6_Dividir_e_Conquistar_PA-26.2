<script lang="ts">
  import { onMount } from 'svelte';
  import confetti from 'canvas-confetti';
  import type {
    Phase,
    Archetype,
    Card,
    AlgorithmStep,
    PlayerState,
    NetworkMessage
  } from '../lib/types';
  import { buildDeckHand, ARCHETYPES } from '../lib/engine/cards';
  import { generateAlgorithmSteps, cloneCards, type StepSimulationResult } from '../lib/engine/inversions';
  import { calculateBestMove, calculateSpellDecision } from '../lib/engine/bot';
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

  // --- ESTADO REATIVO COM RUNES (SVELTE 5) ---\
  let phase = $state<Phase>('lobby');
  let gameMode = $state<'solo' | 'p2p'>('solo');
  let userPlayerId = $state<'player1' | 'player2'>('player1');
  let currentTurn = $state<'player1' | 'player2'>('player1');
  let roundNumber = $state<number>(1);
  let winner = $state<'player1' | 'player2' | 'draw' | null>(null);

  // Decks Selecionados
  let player1Archetype = $state<Archetype>('rajadas');
  let player2Archetype = $state<Archetype>('raiz');

  // Jogadores
  let player1 = $state<PlayerState>({
    id: 'player1',
    name: 'Jogador 1',
    hp: 30,
    deckArchetype: 'rajadas',
    hand: [],
    spells: [],
    hasPlayedAlphaSpell: false,
    hasPlayedBetaSpell: false
  });

  let player2 = $state<PlayerState>({
    id: 'player2',
    name: 'Autômato Heurístico',
    hp: 30,
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
  let lastSimulation = $state<StepSimulationResult | null>(null);
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

  // Tutorial Modal
  let isTutorialOpen = $state<boolean>(false);

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
  function startMatch(mode: 'solo' | 'p2p', p1Arch: Archetype, p2Arch: Archetype) {
    gameMode = mode;
    player1Archetype = p1Arch;
    player2Archetype = p2Arch;

    const p1Deck = buildDeckHand(p1Arch, 'player1');
    const p2Deck = buildDeckHand(p2Arch, 'player2');

    player1 = {
      id: 'player1',
      name: mode === 'solo' ? 'Comandante' : 'Jogador 1',
      hp: 30,
      deckArchetype: p1Arch,
      hand: p1Deck.creatures,
      spells: p1Deck.spells,
      hasPlayedAlphaSpell: false,
      hasPlayedBetaSpell: false
    };

    player2 = {
      id: 'player2',
      name: mode === 'solo' ? 'Autômato Rival' : 'Jogador 2',
      hp: 30,
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
    phase = 'seeding';
    logs = [`Início da Rodada ${roundNumber}. O arquipélago aguarda a semeadura.`];
  }

  // --- FASE DE SEMEADURA ---
  function handleSelectCard(cardId: string) {
    selectedCardId = cardId;
  }

  function handlePlaceCard(slotIndex: number) {
    if (!selectedCardId || slots[slotIndex] !== null) return;
    if (currentTurn !== userPlayerId) return;

    const currentHand = userPlayerId === 'player1' ? player1.hand : player2.hand;
    const card = currentHand.find(c => c.id === selectedCardId);
    if (!card) return;

    slots[slotIndex] = card;
    slots = [...slots];
    soundscape.playCardPlace();

    if (userPlayerId === 'player1') {
      player1.hand = player1.hand.filter(c => c.id !== selectedCardId);
    } else {
      player2.hand = player2.hand.filter(c => c.id !== selectedCardId);
    }

    selectedCardId = null;

    if (gameMode === 'p2p') {
      networkManager.sendMessage({
        type: 'PLACE_CARD' as any,
        player: userPlayerId,
        cardId: card.id,
        slotIndex
      });
    }

    const filledCount = slots.filter(s => s !== null).length;
    if (filledCount === 8) {
      startAlgorithmExecution();
    } else {
      currentTurn = userPlayerId === 'player1' ? 'player2' : 'player1';
      if (gameMode === 'solo' && currentTurn === 'player2') {
        setTimeout(handleBotSeedingTurn, 500);
      }
    }
  }

  function handleBotSeedingTurn() {
    if (phase !== 'seeding' || currentTurn !== 'player2') return;

    const botDecision = calculateBestMove(player2.hand, slots, player2.deckArchetype);
    if (!botDecision) return;

    const card = player2.hand.find(c => c.id === botDecision.cardId);
    if (!card) return;

    slots[botDecision.slotIndex] = card;
    slots = [...slots];
    soundscape.playCardPlace();
    player2.hand = player2.hand.filter(c => c.id !== card.id);

    const filledCount = slots.filter(s => s !== null).length;
    if (filledCount === 8) {
      startAlgorithmExecution();
    } else {
      currentTurn = 'player1';
    }
  }

  // --- EXECUÇÃO DO ALGORITMO ---
  function startAlgorithmExecution() {
    phase = 'executing';
    selectedCardId = null;
    currentStepIndex = 0;

    const initialBoard = cloneCards(slots);
    const sim = generateAlgorithmSteps(initialBoard);
    steps = sim.steps;
    lastSimulation = sim;
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
    if (currentStepIndex >= steps.length - 1) {
      pauseAutoPlay();
      handleResolution();
      return;
    }

    const nextStep = steps[currentStepIndex + 1];

    if (nextStep.type === 'alpha_pause' && !player1.hasPlayedAlphaSpell && player1.spells.length > 0) {
      pauseAutoPlay();
      currentStepIndex++;
      currentInterventionWindow = 'alpha';
      phase = 'alpha_window';
      return;
    }

    if (nextStep.type === 'beta_pause' && !player1.hasPlayedBetaSpell && player1.spells.length > 0) {
      pauseAutoPlay();
      currentStepIndex++;
      currentInterventionWindow = 'beta';
      phase = 'beta_window';
      return;
    }

    currentStepIndex++;
  }

  function handleOpenInterventionManually() {
    pauseAutoPlay();
    const userSpells = userPlayerId === 'player1' ? player1.spells : player2.spells;
    if (userSpells.length === 0) return;

    if (currentStep?.type === 'beta_pause' || currentStepIndex >= 18) {
      currentInterventionWindow = 'beta';
      phase = 'beta_window';
    } else {
      currentInterventionWindow = 'alpha';
      phase = 'alpha_window';
    }
  }

  // --- JANELAS DE INTERVENÇÃO DE MAGIAS ---
  function handleCastSpell(spellId: string, targetSlot: number) {
    const isP1 = userPlayerId === 'player1';
    const activePlayer = isP1 ? player1 : player2;
    const spell = activePlayer.spells.find(s => s.id === spellId);
    if (!spell) return;

    soundscape.playSpellCast();
    if (isP1) {
      player1.spells = player1.spells.filter(s => s.id !== spellId);
      if (currentInterventionWindow === 'alpha') {
        player1.hasPlayedAlphaSpell = true;
      } else {
        player1.hasPlayedBetaSpell = true;
      }
    } else {
      player2.spells = player2.spells.filter(s => s.id !== spellId);
      if (currentInterventionWindow === 'alpha') {
        player2.hasPlayedAlphaSpell = true;
      } else {
        player2.hasPlayedBetaSpell = true;
      }
    }

    const currentBoard = cloneCards(currentStep?.boardState || slots);
    if (spell.spellTarget === 'weight_buff' && currentBoard[targetSlot]) {
      currentBoard[targetSlot]!.weight += spell.passiveValue;
    } else if (spell.spellTarget === 'weight_nerf' && currentBoard[targetSlot]) {
      currentBoard[targetSlot]!.weight = Math.max(1, currentBoard[targetSlot]!.weight + spell.passiveValue);
    } else if (spell.spellTarget === 'adjacent_swap') {
      const neighbor = targetSlot < 7 ? targetSlot + 1 : targetSlot - 1;
      const tmp = currentBoard[targetSlot];
      currentBoard[targetSlot] = currentBoard[neighbor];
      currentBoard[neighbor] = tmp;
    }

    const logEntries = [`[Fórmula Alquímica] Você conjurou ${spell.name} na Ilha #${targetSlot}!`];

    if (gameMode === 'solo' && player2.spells.length > 0) {
      const botDecision = calculateSpellDecision(
        player2.spells,
        currentBoard,
        player2.deckArchetype,
        currentInterventionWindow || 'alpha'
      );
      if (botDecision && botDecision.shouldCast && botDecision.spellId && botDecision.targetSlot !== undefined && botDecision.targetSlot !== -1) {
        const spellToCast = player2.spells.find(s => s.id === botDecision.spellId);
        if (spellToCast) {
          player2.spells = player2.spells.filter(s => s.id !== spellToCast.id);
          const bTarget = botDecision.targetSlot;
          if (spellToCast.spellTarget === 'weight_buff' && currentBoard[bTarget]) {
            currentBoard[bTarget]!.weight += spellToCast.passiveValue;
          } else if (spellToCast.spellTarget === 'weight_nerf' && currentBoard[bTarget]) {
            currentBoard[bTarget]!.weight = Math.max(1, currentBoard[bTarget]!.weight + spellToCast.passiveValue);
          } else if (spellToCast.spellTarget === 'adjacent_swap') {
            const neighbor = bTarget < 7 ? bTarget + 1 : bTarget - 1;
            const tmp = currentBoard[bTarget];
            currentBoard[bTarget] = currentBoard[neighbor];
            currentBoard[neighbor] = tmp;
          }
          logEntries.push(`[Fórmula Rival] Autômato conjurou ${spellToCast.name} na Ilha #${bTarget}!`);
        }
      }
    }

    logs = [...logs, ...logEntries];

    const winType = currentInterventionWindow || 'alpha';
    const remainingSim = generateAlgorithmSteps(currentBoard, {
      startFrom: winType,
      initialRA: currentStep?.rA ?? 0,
      initialRB: currentStep?.rB ?? 0,
      initialRCross: currentStep?.rCross ?? 0,
      initialDamageP1: lastSimulation?.totalDamageP1 ?? 0,
      initialDamageP2: lastSimulation?.totalDamageP2 ?? 0,
      initialStepCounter: (currentStep?.id ?? currentStepIndex) + 1
    });

    lastSimulation = remainingSim;

    const interventionStep: AlgorithmStep = {
      id: currentStep?.id ?? currentStepIndex,
      type: winType === 'alpha' ? 'alpha_pause' : 'beta_pause',
      title: `[Alquimia] ${spell.name} Conjurada!`,
      description: `${spell.name} aplicado na Ilha #${targetSlot}. Pesos recalculados para as próximas fusões.`,
      complexityNotation: winType === 'alpha' ? 'Intervenção T(2)' : 'Intervenção T(4)',
      rA: currentStep?.rA ?? 0,
      rB: currentStep?.rB ?? 0,
      rCross: currentStep?.rCross ?? 0,
      rTotal: (currentStep?.rA ?? 0) + (currentStep?.rB ?? 0) + (currentStep?.rCross ?? 0),
      boardState: cloneCards(currentBoard),
      eventPayload: {
        logText: logEntries.join(' ')
      }
    };

    steps = [...steps.slice(0, currentStepIndex), interventionStep, ...remainingSim.steps];

    currentInterventionWindow = null;
    phase = 'executing';
    pauseAutoPlay();
  }

  function handlePassIntervention() {
    if (currentInterventionWindow === 'alpha') {
      player1.hasPlayedAlphaSpell = true;
    } else {
      player1.hasPlayedBetaSpell = true;
    }
    currentInterventionWindow = null;
    phase = 'executing';
    startAutoPlay();
  }

  // --- RESOLUÇÃO DA RODADA ---
  function handleResolution() {
    const finalStep = steps[steps.length - 1];
    const p1Damage = finalStep?.eventPayload?.finalDamageP1 ?? lastSimulation?.totalDamageP1 ?? 0;
    const p2Damage = finalStep?.eventPayload?.finalDamageP2 ?? lastSimulation?.totalDamageP2 ?? 0;

    player1.hp = Math.max(0, player1.hp - p1Damage);
    player2.hp = Math.max(0, player2.hp - p2Damage);

    if (player1.hp <= 0 || player2.hp <= 0) {
      phase = 'match_end';
      if (player1.hp <= 0 && player2.hp <= 0) {
        winner = 'draw';
      } else if (player1.hp <= 0) {
        winner = 'player2';
      } else {
        winner = 'player1';
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

    phase = 'seeding';
    if (gameMode === 'solo' && currentTurn === 'player2') {
      setTimeout(handleBotSeedingTurn, 500);
    }
  }

  function restartGame() {
    phase = 'lobby';
    hostRoomCode = '';
    connectionError = null;
  }

  // --- P2P HOST & JOIN ---
  async function handleHostRoom() {
    isConnectingP2P = true;
    connectionError = null;

    try {
      const code = await networkManager.initializeHost(
        () => {
          isConnectingP2P = false;
          startMatch('p2p', player1Archetype, 'raiz');
        },
        handleIncomingNetworkMessage,
        (err) => {
          connectionError = err;
          isConnectingP2P = false;
        }
      );
      hostRoomCode = code;
    } catch (err: any) {
      connectionError = err?.message || 'Falha ao iniciar P2P.';
      isConnectingP2P = false;
    }
  }

  async function handleJoinRoom(code: string) {
    isConnectingP2P = true;
    connectionError = null;

    networkManager.initializeGuest(
      () => {
        isConnectingP2P = false;
        userPlayerId = 'player2';
        startMatch('p2p', 'raiz', player1Archetype);
      },
      handleIncomingNetworkMessage,
      (err) => {
        connectionError = err;
        isConnectingP2P = false;
      }
    );

    try {
      await networkManager.joinRoom(code);
    } catch (err: any) {
      connectionError = err?.message || 'Erro ao conectar à sala.';
      isConnectingP2P = false;
    }
  }

  function handleIncomingNetworkMessage(msg: NetworkMessage) {
    if (msg.type === 'PLACE_CARD' as any) {
      if (slots[msg.slotIndex!] === null) {
        const currentHand = msg.player === 'player1' ? player1.hand : player2.hand;
        const card = currentHand.find(c => c.id === msg.cardId) || {
          id: msg.cardId!,
          name: 'Fenrir Lupino',
          speciesName: 'Guerreiro Lupino',
          weight: 5,
          originalWeight: 5,
          archetype: 'rajadas',
          type: 'creature',
          owner: msg.player,
          flavor: 'Convocada via P2P',
          illustration: 'wolf',
          passiveValue: 2,
          passiveDescription: ''
        };

        slots[msg.slotIndex!] = card;
        soundscape.playCardPlace();

        if (msg.player === 'player1') {
          player1.hand = player1.hand.filter(c => c.id !== msg.cardId);
        } else {
          player2.hand = player2.hand.filter(c => c.id !== msg.cardId);
        }

        const filledCount = slots.filter(s => s !== null).length;
        if (filledCount === 8) {
          startAlgorithmExecution();
        } else {
          currentTurn = msg.player === 'player1' ? 'player2' : 'player1';
        }
      }
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
                {player1.hp}/30
              </span>
            </div>
            <div class="w-24 sm:w-36 cm-hud-bar rounded-full">
              <div
                class="cm-hud-bar-fill transition-all duration-300"
                style="width: {(player1.hp / 30) * 100}%"
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
                {player2.hp}/30
              </span>
              <span class="text-white drop-shadow-[1px_1px_0_#1e1d21]">{player2.name}</span>
            </div>
            <div class="w-24 sm:w-36 cm-hud-bar rounded-full">
              <div
                class="cm-hud-bar-fill transition-all duration-300 !bg-[#d95738] !shadow-[inset_0_2px_0_#f87171]"
                style="width: {(player2.hp / 30) * 100}%"
              ></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Relógio Celestial Suspenso por Corrente de Metal (ref 01) -->
      <SkyClock roundNumber={roundNumber} totalRounds={3} />
    </header>
  {/if}

  <!-- ÁREA CENTRAL DE JOGO / NAVEGAÇÃO DE TELAS -->
  <main class="relative z-20 flex-1 flex flex-col justify-center px-2 sm:px-4 py-2">
    {#if phase === 'lobby'}
      <Lobby
        p1Arch={player1Archetype}
        p2Arch={player2Archetype}
        onSelectP1Arch={(a) => player1Archetype = a}
        onSelectP2Arch={(a) => player2Archetype = a}
        onStartSolo={() => startMatch('solo', player1Archetype, player2Archetype)}
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
          isInterventionReady={currentStep?.type === 'alpha_pause' || currentStep?.type === 'beta_pause'}
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
                  emblem={winner === 'player1' ? 'star' : 'sword'}
                  tone={winner === 'player1' ? 'blue' : 'red'}
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
                    : 'O adversário manipulou as inversões e sobrepujou suas defesas nas alas.'}\
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
