<script lang="ts">
  import type { AlgorithmStep } from '../lib/types';
  import { soundscape } from '../lib/audio/soundscape';

  interface Props {
    currentStep?: AlgorithmStep;
    stepIndex: number;
    totalSteps: number;
    isPlaying: boolean;
    speed: number;
    rA: number;
    rB: number;
    rCross: number;
    rTotal: number;
    onNextStep: () => void;
    onPrevStep: () => void;
    onTogglePlay: () => void;
    onChangeSpeed: (newSpeed: number) => void;
    onReset: () => void;
  }

  let {
    currentStep,
    stepIndex,
    totalSteps,
    isPlaying,
    speed,
    rA,
    rB,
    rCross,
    rTotal,
    onNextStep,
    onPrevStep,
    onTogglePlay,
    onChangeSpeed,
    onReset
  }: Props = $props();

  let audioEnabled = $state(soundscape.enabled);

  function handleAudioToggle() {
    audioEnabled = soundscape.toggleMute();
  }
</script>

<div class="w-full max-w-5xl mx-auto flex flex-col gap-2.5 z-20 select-none">
  <!-- HUD SUPERIOR: CRONÔMETRO DE LATÃO DA FÓRMULA VIVA -->
  <div class="cloud-wood-panel rounded-2xl p-3 border-2 border-[#8c6d44] shadow-2xl flex flex-wrap items-center justify-between gap-3 text-[#ede0c8]">
    <!-- Rebites nos cantos do painel do cronômetro -->
    <div class="absolute top-2 left-2 cloud-rivet"></div>
    <div class="absolute top-2 right-2 cloud-rivet"></div>
    <div class="absolute bottom-2 left-2 cloud-rivet"></div>
    <div class="absolute bottom-2 right-2 cloud-rivet"></div>

    <!-- Placa de Latão da Equação Algorítmica Viva -->
    <div class="flex items-center gap-2 bg-[#120b07] px-3.5 py-1.5 rounded-xl border border-[#785328] shadow-inner">
      <span class="text-[10px] uppercase tracking-wider text-[#d4a34b] font-black font-serif">
        Equação Viva:
      </span>
      <div class="flex items-center gap-1.5 text-xs md:text-sm font-mono font-bold">
        <!-- r_total -->
        <span class="text-[#ffeaae] font-black text-base">r<sub class="text-[10px]">tot</sub></span>
        <span class="text-stone-500">=</span>
        <!-- r_A (Ala Poente) -->
        <span class="px-2 py-0.5 rounded bg-sky-950 border border-sky-600 text-sky-200 text-xs shadow-sm">
          r<sub class="text-[9px]">A</sub>: {rA}
        </span>
        <span class="text-stone-500">+</span>
        <!-- r_B (Ala Nascente) -->
        <span class="px-2 py-0.5 rounded bg-amber-950 border border-amber-600 text-amber-200 text-xs shadow-sm">
          r<sub class="text-[9px]">B</sub>: {rB}
        </span>
        <span class="text-stone-500">+</span>
        <!-- r (Vórtice) -->
        <span class="px-2 py-0.5 rounded bg-purple-950 border border-purple-500 text-purple-200 text-xs shadow-sm animate-pulse">
          r<sub class="text-[9px]">vórtice</sub>: {rCross}
        </span>
        <span class="text-stone-500">=</span>
        <!-- Resultado Total em Placa Dourada -->
        <span class="px-3 py-0.5 rounded-lg bg-gradient-to-b from-[#ffe7a3] to-[#cfa049] text-[#2b1803] font-black text-base shadow-md border border-[#fff2c4]">
          {rTotal}
        </span>
      </div>
    </div>

    <!-- Notação de Complexidade do Passo Atual -->
    {#if currentStep}
      <div class="flex-1 min-w-[220px] text-left">
        <div class="flex items-center gap-2">
          <span class="px-2 py-0.5 rounded-md bg-[#3e2716] border border-[#a8744b] text-[#ffd369] text-[10px] font-mono font-bold">
            {currentStep.complexityNotation}
          </span>
          <span class="text-xs font-black text-[#ffeaae] font-serif truncate">
            {currentStep.title}
          </span>
        </div>
        <p class="text-[11px] text-[#c9b596] truncate mt-0.5">
          {currentStep.description}
        </p>
      </div>
    {/if}

    <!-- Botão de Som Estilo Alavanca de Zepelim -->
    <button
      onclick={handleAudioToggle}
      class="px-3 py-1.5 rounded-xl cloud-btn-wood text-xs flex items-center gap-1.5 active:scale-95"
      title="Ativar/Desativar Efeitos Sonoros Celestiais"
    >
      <span>{audioEnabled ? '🔔 Som Ativo' : '🔕 Mudo'}</span>
    </button>
  </div>

  <!-- CONSOLE DE COMANDOS DE NAVEGAÇÃO & VELOCIDADE -->
  <div class="cloud-wood-panel rounded-2xl px-4 py-2.5 border-2 border-[#8c6d44] shadow-xl flex items-center justify-between gap-3 text-[#ede0c8]">
    <!-- Indicador Mecânico de Progresso de Passos -->
    <div class="flex items-center gap-2 text-xs font-mono font-bold text-[#c9b596]">
      <span class="text-[11px] uppercase tracking-wider text-[#d4a34b]">Passo</span>
      <span class="text-[#ffeaae] font-black text-sm">{stepIndex + 1}</span>
      <span class="text-stone-500">/</span>
      <span>{totalSteps}</span>
      <div class="w-24 md:w-44 h-3 cloud-gauge-track flex items-center p-0.5">
        <div
          class="h-full bg-gradient-to-r from-[#d4a34b] to-[#ffe7a3] rounded-full transition-all duration-200"
          style="width: {totalSteps > 0 ? ((stepIndex + 1) / totalSteps) * 100 : 0}%"
        ></div>
      </div>
    </div>

    <!-- Botoeiras de Controle em Latão Chanfrado -->
    <div class="flex items-center gap-2">
      <!-- Início -->
      <button
        onclick={onReset}
        class="px-2.5 py-1.5 rounded-xl cloud-btn-wood text-xs active:scale-95"
        title="Reiniciar resolução"
      >
        ⏮ Início
      </button>

      <!-- Voltar -->
      <button
        onclick={onPrevStep}
        disabled={stepIndex <= 0 || isPlaying}
        class="px-3 py-1.5 rounded-xl cloud-btn-wood disabled:opacity-40 disabled:cursor-not-allowed text-xs active:scale-95"
      >
        ◀ Voltar
      </button>

      <!-- Auto-Play / Pausa com Destaque Dourado -->
      <button
        onclick={onTogglePlay}
        class="px-5 py-2 rounded-xl cloud-btn-brass text-xs uppercase font-black active:scale-95 flex items-center gap-1.5"
      >
        <span>{isPlaying ? '⏸ Pausar' : '▶ Auto-Play'}</span>
      </button>

      <!-- Avançar Passo -->
      <button
        onclick={onNextStep}
        disabled={stepIndex >= totalSteps - 1 || isPlaying}
        class="px-3.5 py-1.5 rounded-xl cloud-btn-wood disabled:opacity-40 disabled:cursor-not-allowed text-xs active:scale-95"
      >
        Avançar ▶
      </button>
    </div>

    <!-- Seletor de Velocidade (1x, 2x, 4x) em Placa de Latão -->
    <div class="flex items-center gap-1 bg-[#120b07] p-1 rounded-xl border border-[#785328]">
      {#each [1, 2, 4] as s}
        <button
          onclick={() => onChangeSpeed(s)}
          class="px-2.5 py-0.5 rounded-lg text-xs font-mono font-bold transition-all
            {speed === s
              ? 'cloud-btn-brass'
              : 'text-[#c9b596] hover:text-[#ffeaae]'}"
        >
          {s}x
        </button>
      {/each}
    </div>
  </div>
</div>
