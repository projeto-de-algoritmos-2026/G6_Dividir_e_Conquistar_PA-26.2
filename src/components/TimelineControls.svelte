<script lang="ts">
  import type { AlgorithmStep } from '../lib/types';
  import { soundscape } from '../lib/audio/soundscape';
  import PixelIcon from './ui/PixelIcon.svelte';

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
  <!-- HUD: EQUAÇÃO ALGORÍTMICA VIVA EM ESTILO RECEITA CLOUD MEADOW (ref 03) -->
  <div class="cm-window !p-2.5 flex flex-wrap items-center justify-between gap-3 text-cm-ink">
    <!-- Placa da Equação Viva com Moeda Dourada -->
    <div class="flex items-center gap-2 bg-[#1b1b1e] text-cm-cream px-3 py-1.5 rounded-[4px] border-2 border-cm-frame shadow-inner">
      <span class="text-xs font-bold text-cm-tan uppercase tracking-wide flex items-center gap-1">
        <PixelIcon name="scroll" size={13} />
        Inversões:
      </span>
      <div class="flex items-center gap-1.5 text-xs sm:text-sm font-bold font-mono">
        <span class="text-white">r<sub>tot</sub> =</span>
        <!-- r_A (Ala Poente) -->
        <span class="px-2 py-0.5 rounded-[2px] bg-[#4459ad] text-white text-xs shadow-sm">
          r<sub>A</sub>:{rA}
        </span>
        <span class="text-cm-tan">+</span>
        <!-- r_B (Ala Nascente) -->
        <span class="px-2 py-0.5 rounded-[2px] bg-[#c2622d] text-white text-xs shadow-sm">
          r<sub>B</sub>:{rB}
        </span>
        <span class="text-cm-tan">+</span>
        <!-- r_vortice -->
        <span class="px-2 py-0.5 rounded-[2px] bg-[#9a6be0] text-white text-xs shadow-sm {rCross > 0 ? 'cm-anim-blink' : ''}">
          r<sub>vórtice</sub>:{rCross}
        </span>
        <span class="text-cm-tan">=</span>
        <!-- Total como moeda de ouro -->
        <span class="cm-coin px-2.5 py-0.5 text-xs sm:text-sm shadow">
          <PixelIcon name="coin" size={12} class="mr-1 inline" />
          {rTotal}
        </span>
      </div>
    </div>

    <!-- Título do Passo Atual & Complexidade -->
    {#if currentStep}
      <div class="flex-1 min-w-[200px] text-left">
        <div class="flex items-center gap-2">
          <span class="cm-tag text-[10px]" style="background: #4459ad">
            {currentStep.complexityNotation}
          </span>
          <span class="text-xs sm:text-sm font-bold text-cm-ink truncate">
            {currentStep.title}
          </span>
        </div>
        <p class="text-[12px] text-cm-ink-soft truncate leading-tight mt-0.5">
          {currentStep.description}
        </p>
      </div>
    {/if}

    <!-- Botão de Som Mute / Unmute -->
    <button
      onclick={handleAudioToggle}
      class="cm-btn-dark px-3 py-1.5 text-xs"
      title="Ativar/Desativar Efeitos Sonoros"
    >
      <PixelIcon name={audioEnabled ? 'sound' : 'mute'} size={14} />
      <span>{audioEnabled ? 'Som Ativo' : 'Mudo'}</span>
    </button>
  </div>

  <!-- CONSOLE MECÂNICO DE CONTROLE (BARRA DE TRAY ref 01 e BOTÕES TÁTEIS) -->
  <div class="cm-window is-dark-frame !p-2.5 flex flex-wrap items-center justify-between gap-3 text-cm-cream">
    <!-- Barra de Progresso Mecânica com Indicador de Passos -->
    <div class="flex items-center gap-2.5 text-xs font-bold">
      <span class="text-cm-tan uppercase tracking-wide">Passo</span>
      <span class="text-white text-sm font-mono">{stepIndex + 1}</span>
      <span class="text-cm-tan/60">/</span>
      <span class="text-cm-cream/80 font-mono">{totalSteps}</span>
      <div class="w-24 sm:w-44 h-3.5 bg-[#15171a] border-2 border-cm-frame rounded-[2px] overflow-hidden p-0.5 shadow-inner">
        <div
          class="h-full bg-cm-hp rounded-[1px] transition-all duration-150 shadow-[inset_0_2px_0_#8de38c]"
          style="width: {totalSteps > 0 ? ((stepIndex + 1) / totalSteps) * 100 : 0}%"
        ></div>
      </div>
    </div>

    <!-- Botoeiras Físicas em Latão e Ardósia -->
    <div class="flex items-center gap-2">
      <!-- Início -->
      <button
        onclick={onReset}
        class="cm-btn-dark px-2.5 py-1.5 text-xs"
        title="Voltar ao início"
      >
        <PixelIcon name="play" size={12} flip /> Início
      </button>

      <!-- Voltar -->
      <button
        onclick={onPrevStep}
        disabled={stepIndex <= 0 || isPlaying}
        class="cm-btn-dark px-3 py-1.5 text-xs"
      >
        <PixelIcon name="play" size={12} flip /> Voltar
      </button>

      <!-- Play / Pause Dourado Ativo -->
      <button
        onclick={onTogglePlay}
        class="cm-btn px-4 py-1.5 text-xs"
      >
        <PixelIcon name={isPlaying ? 'pause' : 'play'} size={13} />
        <span>{isPlaying ? 'Pausar' : 'Auto-Play'}</span>
      </button>

      <!-- Avançar -->
      <button
        onclick={onNextStep}
        disabled={stepIndex >= totalSteps - 1 || isPlaying}
        class="cm-btn-dark px-3 py-1.5 text-xs"
      >
        <span>Avançar</span>
        <PixelIcon name="play" size={12} />
      </button>
    </div>

    <!-- Seletor de Velocidade (1x, 2x, 4x) -->
    <div class="flex items-center gap-1 bg-[#1b1b1e] p-1 rounded-[3px] border-2 border-cm-frame">
      {#each [1, 2, 4] as s}
        <button
          onclick={() => onChangeSpeed(s)}
          class="px-2.5 py-0.5 rounded-[2px] text-xs font-bold transition-all
            {speed === s
              ? 'cm-btn !py-0.5'
              : 'text-cm-tan hover:text-white'}"
        >
          {s}x
        </button>
      {/each}
    </div>
  </div>
</div>
