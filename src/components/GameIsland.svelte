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
  import { generateAlgorithmSteps, cloneCards } from '../lib/engine/inversions';
  import { calculateBestMove, calculateSpellDecision } from '../lib/engine/bot';
  import { networkManager } from '../lib/network/peer';
  import { soundscape } from '../lib/audio/soundscape';

  import AnthroArt from './AnthroArt.svelte';
  import Lobby from './Lobby.svelte';
  import SeedingPhase from './SeedingPhase.svelte';
  import AlgorithmicBoard from './AlgorithmicBoard.svelte';
  import TimelineControls from './TimelineControls.svelte';
  import InterventionModal from './InterventionModal.svelte';
  import TutorialModal from './TutorialModal.svelte';

  // --- ESTADO REATIVO COM RUNES (SVELTE 5) ---
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
      name: mode === 'solo' ? 'Comandante Anthro' : 'Jogador 1',
      hp: 30,
      deckArchetype: p1Arch,
      hand: p1Deck.creatures,
      spells: p1Deck.spells,
      hasPlayedAlphaSpell: false,
      hasPlayedBetaSpell: false
    };

    player2 = {
      id: 'player2',
      name: mode === 'solo' ? 'Guardião Anthro Rival' : 'Jogador 2',
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
    if (slots[slotIndex] !== null || !selectedCardId) return;

    const currentHand = currentTurn === 'player1' ? player1.hand : player2.hand;
    const cardIdx = currentHand.findIndex(c => c.id === selectedCardId);
    if (cardIdx === -1) return;

    const card = { ...currentHand[cardIdx], owner: currentTurn };

    slots[slotIndex] = card;
    soundscape.playCardPlace();

    if (currentTurn === 'player1') {
      player1.hand = player1.hand.filter(c => c.id !== selectedCardId);
    } else {
      player2.hand = player2.hand.filter(c => c.id !== selectedCardId);
    }

    selectedCardId = null;

    if (gameMode === 'p2p') {
      networkManager.send({
        type: 'PLACE_CARD',
        cardId: card.id,
        slotIndex,
        player: currentTurn
      });
    }

    const filledCount = slots.filter(s => s !== null).length;
    if (filledCount === 8) {
      startAlgorithmExecution();
    } else {
      currentTurn = currentTurn === 'player1' ? 'player2' : 'player1';
      if (gameMode === 'solo' && currentTurn === 'player2') {
        setTimeout(triggerBotSeedingMove, 700);
      }
    }
  }

  function triggerBotSeedingMove() {
    if (currentTurn !== 'player2' || phase !== 'seeding') return;

    const move = calculateBestMove(player2.hand, slots, player2.deckArchetype);
    selectedCardId = move.cardId;
    handlePlaceCard(move.slotIndex);
  }

  // --- EXECUÇÃO DO MOTOR ALGORÍTMICO ---
  function startAlgorithmExecution() {
    phase = 'executing';
    const sim = generateAlgorithmSteps(slots);
    steps = sim.steps;
    currentStepIndex = 0;
    isPlaying = true;
    startPlaybackTimer();
  }

  function startPlaybackTimer() {
    stopPlaybackTimer();
    const delay = Math.max(350, Math.floor(1900 / playbackSpeed));
    playbackInterval = setInterval(() => {
      if (isPlaying) {
        stepForward();
      }
    }, delay);
  }

  function stopPlaybackTimer() {
    if (playbackInterval) {
      clearInterval(playbackInterval);
      playbackInterval = null;
    }
  }

  function togglePlayPause() {
    isPlaying = !isPlaying;
    if (isPlaying) {
      startPlaybackTimer();
    } else {
      stopPlaybackTimer();
    }
  }

  function changeSpeed(newSpeed: number) {
    playbackSpeed = newSpeed;
    if (isPlaying) {
      startPlaybackTimer();
    }
  }

  function stepForward() {
    if (currentStepIndex < steps.length - 1) {
      const nextIdx = currentStepIndex + 1;
      const nextStep = steps[nextIdx];

      if (nextStep.type === 'alpha_pause' && !player1.hasPlayedAlphaSpell) {
        currentStepIndex = nextIdx;
        pauseForIntervention('alpha');
        return;
      }

      if (nextStep.type === 'beta_pause' && !player1.hasPlayedBetaSpell) {
        currentStepIndex = nextIdx;
        pauseForIntervention('beta');
        return;
      }

      currentStepIndex = nextIdx;

      if (nextStep.type === 'round_resolution') {
        isPlaying = false;
        stopPlaybackTimer();
        handleRoundResolution();
      }
    } else {
      isPlaying = false;
      stopPlaybackTimer();
    }
  }

  function stepBackward() {
    if (currentStepIndex > 0) {
      currentStepIndex--;
    }
  }

  function resetToStart() {
    currentStepIndex = 0;
    isPlaying = false;
    stopPlaybackTimer();
  }

  // --- JANELAS DE INTERVENÇÃO (ALPHA & BETA) ---
  function pauseForIntervention(windowType: 'alpha' | 'beta') {
    isPlaying = false;
    stopPlaybackTimer();
    currentInterventionWindow = windowType;

    if (gameMode === 'solo' && player2.spells.length > 0) {
      const botDecision = calculateSpellDecision(
        player2.spells,
        currentStep?.boardState || slots,
        player2.deckArchetype,
        windowType
      );
      if (botDecision.shouldCast && botDecision.spellId && botDecision.targetSlot !== undefined) {
        executeSpell(botDecision.spellId, botDecision.targetSlot, 'player2');
      }
    }
  }

  function handleCastSpell(spellId: string, targetSlot: number) {
    executeSpell(spellId, targetSlot, userPlayerId);
    if (currentInterventionWindow === 'alpha') {
      player1.hasPlayedAlphaSpell = true;
    } else {
      player1.hasPlayedBetaSpell = true;
    }
    currentInterventionWindow = null;
    resumeAlgorithmAfterSpell();
  }

  function handlePassIntervention() {
    currentInterventionWindow = null;
    isPlaying = true;
    startPlaybackTimer();
  }

  function executeSpell(spellId: string, targetSlot: number, player: 'player1' | 'player2') {
    const pState = player === 'player1' ? player1 : player2;
    const spell = pState.spells.find(s => s.id === spellId);
    if (!spell) return;

    pState.spells = pState.spells.filter(s => s.id !== spellId);

    const currentBoard = cloneCards(currentStep?.boardState || slots);
    const target = currentBoard[targetSlot];
    if (!target) return;

    if (spell.spellTarget === 'weight_buff') {
      target.weight += spell.passiveValue;
    } else if (spell.spellTarget === 'weight_nerf') {
      target.weight = Math.max(1, target.weight + spell.passiveValue);
    } else if (spell.spellTarget === 'adjacent_swap') {
      const neighbor = targetSlot < 7 ? targetSlot + 1 : targetSlot - 1;
      const temp = currentBoard[targetSlot];
      currentBoard[targetSlot] = currentBoard[neighbor];
      currentBoard[neighbor] = temp;
    }

    soundscape.playSwapInversion();

    const reSim = generateAlgorithmSteps(currentBoard);
    steps = reSim.steps;
    currentStepIndex = Math.min(currentStepIndex, steps.length - 1);
  }

  function resumeAlgorithmAfterSpell() {
    isPlaying = true;
    startPlaybackTimer();
  }

  // --- RESOLUÇÃO DA RODADA E DANO ---
  function handleRoundResolution() {
    phase = 'round_end';

    const sim = generateAlgorithmSteps(slots);
    const damageP1 = sim.totalDamageP1;
    const damageP2 = sim.totalDamageP2;
    const healP1 = sim.totalHealP1;
    const healP2 = sim.totalHealP2;

    player1.hp = Math.max(0, player1.hp - damageP1 + healP1);
    player2.hp = Math.max(0, player2.hp - damageP2 + healP2);

    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#e8c575', '#d8d4f2', '#6ca0dc', '#4ade80']
      });
    } catch (_) {}

    if (player1.hp <= 0 && player2.hp <= 0) {
      winner = 'draw';
      phase = 'match_end';
    } else if (player1.hp <= 0) {
      winner = 'player2';
      phase = 'match_end';
    } else if (player2.hp <= 0) {
      winner = 'player1';
      phase = 'match_end';
    }
  }

  function nextRound() {
    roundNumber++;
    slots = new Array(8).fill(null);

    if (player1.hand.length < 4) {
      player1.hand = buildDeckHand(player1Archetype, 'player1').creatures;
    }
    if (player2.hand.length < 4) {
      player2.hand = buildDeckHand(player2Archetype, 'player2').creatures;
    }

    player1.hasPlayedAlphaSpell = false;
    player1.hasPlayedBetaSpell = false;
    player2.hasPlayedAlphaSpell = false;
    player2.hasPlayedBetaSpell = false;

    currentTurn = roundNumber % 2 === 1 ? 'player1' : 'player2';
    phase = 'seeding';

    if (gameMode === 'solo' && currentTurn === 'player2') {
      setTimeout(triggerBotSeedingMove, 700);
    }
  }

  function restartGame() {
    phase = 'lobby';
    hostRoomCode = '';
    connectionError = null;
    networkManager.disconnect();
  }

  // --- REDE P2P PEERJS ---
  async function handleHostRoom() {
    isConnectingP2P = true;
    connectionError = null;

    networkManager.setCallbacks(
      (msg: NetworkMessage) => handleIncomingNetworkMessage(msg),
      (status, detail) => {
        if (status === 'connected') {
          isConnectingP2P = false;
          startMatch('p2p', player1Archetype, player2Archetype);
        } else if (status === 'error') {
          isConnectingP2P = false;
          connectionError = detail || 'Erro de conexão P2P.';
        }
      }
    );

    try {
      const code = await networkManager.hostRoom();
      hostRoomCode = code;
    } catch (err: any) {
      connectionError = err?.message || 'Falha ao criar sala P2P.';
      isConnectingP2P = false;
    }
  }

  async function handleJoinRoom(code: string) {
    isConnectingP2P = true;
    connectionError = null;
    userPlayerId = 'player2';

    networkManager.setCallbacks(
      (msg: NetworkMessage) => handleIncomingNetworkMessage(msg),
      (status, detail) => {
        if (status === 'connected') {
          isConnectingP2P = false;
          startMatch('p2p', player1Archetype, player2Archetype);
        } else if (status === 'error') {
          isConnectingP2P = false;
          connectionError = detail || 'Não foi possível conectar à sala.';
        }
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
    if (msg.type === 'PLACE_CARD') {
      if (slots[msg.slotIndex] === null) {
        const currentHand = msg.player === 'player1' ? player1.hand : player2.hand;
        const card = currentHand.find(c => c.id === msg.cardId) || {
          id: msg.cardId,
          name: 'Fenrir Lupino',
          speciesName: 'Wolf Anthro Warrior',
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

        slots[msg.slotIndex] = card;
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
<div class="relative w-full min-h-screen flex flex-col justify-between overflow-x-hidden bg-[#140d08] text-[#ede0c8] font-sans">
  <!-- Pano de Fundo Cenográfico -->
  <div class="fixed inset-0 pointer-events-none z-0 overflow-hidden">
    <div class="absolute inset-0 bg-gradient-to-b from-[#1c1d32] via-[#43313d] to-[#140d08] opacity-95"></div>
  </div>

  <!-- BARRA DE STATUS DE COMBATE HUD COM RETRATO ANTHRO FURRY VETORIAL -->
  {#if phase !== 'lobby'}
    <header class="relative z-30 w-full max-w-5xl mx-auto px-4 py-2 flex items-center justify-between border-b-2 border-[#5a3c26] bg-[#22160d]/90 backdrop-blur-md shadow-xl">
      <!-- Jogador 1 (Guardião Anthro P1) -->
      <div class="flex items-center gap-2.5">
        <div class="relative">
          <div class="w-12 h-12 rounded-full cloud-portrait-medallion overflow-hidden shadow-lg border-2 border-sky-400 p-0.5 bg-[#170f09]">
            <AnthroArt character={ARCHETYPES[player1.deckArchetype].artKey} class="w-full h-full" />
          </div>
          <span class="absolute -bottom-1 -right-1 px-1.5 py-0.2 rounded bg-sky-900 border border-sky-400 text-sky-200 text-[8.5px] font-black font-mono shadow">
            P1
          </span>
        </div>

        <div class="flex flex-col gap-0.5">
          <div class="flex items-center gap-1.5">
            <span class="text-xs font-black text-[#ffeaae] font-serif tracking-wide">{player1.name}</span>
            <span class="text-[9px] px-1.5 rounded bg-emerald-950/80 border border-emerald-600/60 text-emerald-300 font-mono font-bold">
              {ARCHETYPES[player1.deckArchetype].species.split(' ')[0]}
            </span>
          </div>

          <div class="w-32 sm:w-44 h-3.5 cloud-gauge-track flex items-center p-0.5">
            <div
              class="h-full cloud-bar-hp rounded-full transition-all duration-300 relative"
              style="width: {(player1.hp / 30) * 100}%"
            ></div>
          </div>
          <div class="flex justify-between items-center text-[9.5px] font-mono font-bold px-0.5">
            <span class="text-emerald-400">HP {player1.hp} / 30</span>
          </div>
        </div>
      </div>

      <!-- Centro: Indicador de Rodada & Cronômetro -->
      <div class="flex flex-col items-center">
        <div class="px-3 py-0.5 rounded-full bg-gradient-to-r from-[#6b4712] via-[#cfa049] to-[#6b4712] border border-[#ffeaae] shadow flex items-center gap-2">
          <span class="text-stone-950 font-black text-xs uppercase tracking-wider font-serif">
            Rodada {roundNumber}
          </span>
        </div>
        <button
          onclick={() => isTutorialOpen = true}
          class="text-[9.5px] text-stone-400 hover:text-[#ffeaae] underline font-mono mt-0.5"
        >
          📖 Manual O(n log n)
        </button>
      </div>

      <!-- Jogador 2 (Guardião Anthro P2) -->
      <div class="flex items-center gap-2.5 text-right flex-row-reverse">
        <div class="relative">
          <div class="w-12 h-12 rounded-full cloud-portrait-medallion overflow-hidden shadow-lg border-2 border-amber-400 p-0.5 bg-[#170f09]">
            <AnthroArt character={ARCHETYPES[player2.deckArchetype].artKey} class="w-full h-full" />
          </div>
          <span class="absolute -bottom-1 -left-1 px-1.5 py-0.2 rounded bg-amber-900 border border-amber-400 text-amber-200 text-[8.5px] font-black font-mono shadow">
            P2
          </span>
        </div>

        <div class="flex flex-col gap-0.5 items-end">
          <div class="flex items-center gap-1.5">
            <span class="text-[9px] px-1.5 rounded bg-amber-950/80 border border-amber-600/60 text-amber-300 font-mono font-bold">
              {ARCHETYPES[player2.deckArchetype].species.split(' ')[0]}
            </span>
            <span class="text-xs font-black text-[#ffeaae] font-serif tracking-wide">{player2.name}</span>
          </div>

          <div class="w-32 sm:w-44 h-3.5 cloud-gauge-track flex items-center p-0.5 justify-end">
            <div
              class="h-full cloud-bar-hp rounded-full transition-all duration-300 relative"
              style="width: {(player2.hp / 30) * 100}%"
            ></div>
          </div>
          <div class="flex justify-between items-center text-[9.5px] font-mono font-bold px-0.5 w-full">
            <span class="text-emerald-400">HP {player2.hp} / 30</span>
          </div>
        </div>
      </div>
    </header>
  {/if}

  <!-- CORPO PRINCIPAL DEPENDENDO DA FASE -->
  <main class="relative z-10 flex-1 flex flex-col items-center justify-center p-2 sm:p-3">
    {#if phase === 'lobby'}
      <Lobby
        selectedArchetype={player1Archetype}
        onSelectArchetype={(arch) => player1Archetype = arch}
        onStartSolo={(botArch) => startMatch('solo', player1Archetype, botArch)}
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
          onNextStep={stepForward}
          onPrevStep={stepBackward}
          onTogglePlay={togglePlayPause}
          onChangeSpeed={changeSpeed}
          onReset={resetToStart}
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

    <!-- MODAL DE FIM DE RODADA ESTILO PERGAMINHO CLOUD MEADOW -->
    {#if phase === 'round_end'}
      <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
        <div class="max-w-md w-full cloud-wood-panel rounded-3xl p-6 shadow-2xl text-center flex flex-col items-center gap-4 border-2 border-[#d4a34b]">
          <div class="w-14 h-14 rounded-full cloud-portrait-medallion flex items-center justify-center text-2xl">
            🌾
          </div>
          <h2 class="text-xl font-black text-[#ffeaae] font-serif">
            Conclusão da Rodada {roundNumber}
          </h2>

          <div class="p-3.5 rounded-2xl cloud-parchment text-xs font-mono w-full flex justify-around shadow-inner">
            <div>
              <span class="text-sky-800 font-bold block">P1 HP</span>
              <span class="text-base font-black text-sky-950">{player1.hp}</span>
            </div>
            <div class="border-x border-[#cbb28b] px-4">
              <span class="text-amber-800 font-bold block">r_total</span>
              <span class="text-base font-black text-amber-950">{rTotal}</span>
            </div>
            <div>
              <span class="text-emerald-800 font-bold block">P2 HP</span>
              <span class="text-base font-black text-emerald-950">{player2.hp}</span>
            </div>
          </div>

          <p class="text-xs text-[#c9b596] leading-relaxed">
            As sementes de combate dissolveram-se em pólen dourado sobre as ilhas.
          </p>

          <button
            onclick={nextRound}
            class="w-full py-3 rounded-2xl cloud-btn-brass text-xs uppercase font-black tracking-wider shadow-lg active:scale-95"
          >
            Iniciar Próxima Semeadura ▶
          </button>
        </div>
      </div>
    {/if}

    <!-- MODAL DE FIM DE PARTIDA (VITÓRIA / DERROTA) -->
    {#if phase === 'match_end'}
      <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fadeIn">
        <div class="max-w-md w-full cloud-wood-panel rounded-3xl p-6 shadow-2xl text-center flex flex-col items-center gap-4 border-2 border-[#d4a34b]">
          <span class="text-4xl animate-bounce">
            {winner === userPlayerId ? '🏆' : winner === 'draw' ? '⚖️' : '💔'}
          </span>
          <h2 class="text-xl font-black text-[#ffeaae] font-serif">
            {winner === userPlayerId
              ? 'Vitória Celeste!'
              : winner === 'draw'
              ? 'Empate no Vórtice!'
              : 'Derrota nos Estratos!'}
          </h2>
          <p class="text-xs text-[#ede0c8] leading-relaxed">
            {winner === userPlayerId
              ? 'Seus guardiões anthro dominaram as correntes e conquistaram os ventos da pradaria através da harmonia algorítmica!'
              : 'O adversário manipulou as inversões com maestria e sobrepujou suas defesas.'}
          </p>
          <button
            onclick={restartGame}
            class="w-full py-3 rounded-2xl cloud-btn-brass text-xs uppercase font-black tracking-wider shadow-lg active:scale-95"
          >
            Voltar ao Menu Principal ⚔️
          </button>
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
