<script lang="ts">
  import type { Card, AlgorithmStep } from '../lib/types';
  import CardView from './CardView.svelte';

  interface Props {
    step?: AlgorithmStep;
    cards: (Card | null)[];
  }

  let { step, cards }: Props = $props();

  const isDividePhase = $derived(
    step?.type === 'divide_start' ||
    step?.type === 'nicho_compare' ||
    step?.type === 'nicho_swap' ||
    step?.type === 'nicho_ordered' ||
    step?.type === 'alpha_pause'
  );

  const isAlaMergePhase = $derived(
    step?.type === 'merge_ala_start' ||
    step?.type === 'merge_ala_compare' ||
    step?.type === 'merge_ala_inversion' ||
    step?.type === 'merge_ala_pass' ||
    step?.type === 'beta_pause'
  );

  const isVortexPhase = $derived(
    step?.type === 'vortex_start' ||
    step?.type === 'vortex_compare' ||
    step?.type === 'vortex_serene_pass' ||
    step?.type === 'vortex_burst_inversion' ||
    step?.type === 'round_resolution'
  );

  function isSlotSwapping(idx: number): boolean {
    if (!step?.eventPayload?.swappedIndices) return false;
    return step.eventPayload.swappedIndices.includes(idx);
  }

  function isSlotAurora(idx: number): boolean {
    return step?.activePointers?.auroraIndex === idx;
  }

  function isSlotOcaso(idx: number): boolean {
    return step?.activePointers?.ocasoIndex === idx;
  }

  function isSlotActivePair(idx: number): boolean {
    if (!step?.activePointers?.activePair) return false;
    return step.activePointers.activePair.includes(idx);
  }
</script>

<div class="w-full max-w-5xl mx-auto py-1 flex flex-col items-center select-none gap-2">
  <!-- ARQUITETURA CELESTE: ÁRVORE DE ESTRATOS EM LATÃO & PERGAMINHO -->
  <div class="w-full flex items-center justify-between px-5 py-2 rounded-2xl cloud-wood-panel border-2 border-[#8c6d44] text-xs font-mono text-[#ede0c8] shadow-lg">
    <!-- Ala Poente [0..3] -->
    <div class="flex items-center gap-2 transition-all {isDividePhase || isAlaMergePhase ? 'text-[#ffeaae] font-black' : 'opacity-60'}">
      <span class="w-2.5 h-2.5 rounded-full bg-sky-400 animate-pulse"></span>
      <span class="font-serif tracking-wide text-xs sm:text-sm text-sky-200">Ala Poente [Slots 0..3]</span>
    </div>

    <!-- Placa Central: Fase do Algoritmo Divide and Conquer -->
    <div class="flex items-center gap-2">
      <span class="px-3.5 py-0.5 rounded-full bg-gradient-to-r from-[#5a3810] via-[#9e6a17] to-[#5a3810] border border-[#ffeaae] text-[#ffeaae] font-serif font-black text-xs uppercase tracking-wider shadow">
        {#if isDividePhase}
          Dividir: 4 Nichos T(2)
        {:else if isAlaMergePhase}
          Merge Local: r_A & r_B
        {:else}
          🌪️ O Grande Vórtice O(n)
        {/if}
      </span>
    </div>

    <!-- Ala Nascente [4..7] -->
    <div class="flex items-center gap-2 transition-all {isDividePhase || isAlaMergePhase ? 'text-[#ffeaae] font-black' : 'opacity-60'}">
      <span class="font-serif tracking-wide text-xs sm:text-sm text-amber-200">Ala Nascente [Slots 4..7]</span>
      <span class="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse"></span>
    </div>
  </div>

  <!-- PLACA DE IMPACTO CINÉTICO DO PASSO (EVENT LOG) -->
  {#if step?.eventPayload}
    <div class="w-full px-4 py-2 rounded-xl cloud-wood-panel border-2 shadow-lg text-xs font-medium flex items-center justify-between gap-3 animate-fadeIn
      {step.type === 'vortex_burst_inversion'
        ? 'border-amber-400 bg-gradient-to-r from-[#44220b] to-[#201006] text-[#ffeaae] ring-2 ring-amber-400/60'
        : step.type === 'nicho_swap'
        ? 'border-purple-400 bg-gradient-to-r from-[#31173d] to-[#1a0c20] text-purple-100'
        : 'border-[#8c6d44] text-[#ede0c8]'}">
      <div class="flex items-center gap-2.5">
        <span class="text-lg">
          {step.type === 'vortex_burst_inversion' ? '⚡' : step.type === 'nicho_swap' ? '🔀' : '🍃'}
        </span>
        <span class="font-sans font-semibold tracking-wide text-xs sm:text-sm">{step.eventPayload.logText}</span>
      </div>

      {#if step.eventPayload.kInversions}
        <div class="px-2.5 py-0.5 rounded-lg cloud-btn-brass text-xs uppercase tracking-wider animate-bounce flex-shrink-0">
          +{step.eventPayload.kInversions} Inversões!
        </div>
      {/if}
    </div>
  {/if}

  <!-- TABULEIRO DOS 4 NICHOS -->
  <div class="w-full grid grid-cols-2 lg:grid-cols-4 gap-2.5">
    <!-- Nicho 0: Slots 0 e 1 -->
    <div class="p-2 rounded-2xl cloud-wood-panel border-2 transition-all duration-200 flex flex-col items-center
      {isDividePhase ? 'border-sky-500/80 shadow-sky-900/40 ring-1 ring-sky-400/50' : 'border-[#6e4e30]'}">
      <div class="w-full text-[9px] uppercase font-mono tracking-wider text-sky-300 font-bold mb-1.5 flex justify-between border-b border-[#5a3c26] pb-0.5">
        <span>Nicho 0 (Poente)</span>
        <span class="text-[#c9b596]">[0 - 1]</span>
      </div>
      <div class="flex justify-center gap-1.5 w-full">
        {#each [0, 1] as slotIdx}
          {#if cards[slotIdx]}
            <CardView
              card={cards[slotIdx]!}
              compact={true}
              isAurora={isSlotAurora(slotIdx)}
              isOcaso={isSlotOcaso(slotIdx)}
              isSwapping={isSlotSwapping(slotIdx)}
              selected={isSlotActivePair(slotIdx)}
            />
          {:else}
            <div class="w-20 sm:w-24 h-32 sm:h-36 rounded-xl border-2 border-dashed border-[#5a3c26] bg-[#1a110a]/60 flex items-center justify-center text-[#785328] text-xs font-mono">
              #{slotIdx}
            </div>
          {/if}
        {/each}
      </div>
    </div>

    <!-- Nicho 1: Slots 2 e 3 -->
    <div class="p-2 rounded-2xl cloud-wood-panel border-2 transition-all duration-200 flex flex-col items-center
      {isDividePhase ? 'border-sky-500/80 shadow-sky-900/40 ring-1 ring-sky-400/50' : 'border-[#6e4e30]'}">
      <div class="w-full text-[9px] uppercase font-mono tracking-wider text-sky-300 font-bold mb-1.5 flex justify-between border-b border-[#5a3c26] pb-0.5">
        <span>Nicho 1 (Poente)</span>
        <span class="text-[#c9b596]">[2 - 3]</span>
      </div>
      <div class="flex justify-center gap-1.5 w-full">
        {#each [2, 3] as slotIdx}
          {#if cards[slotIdx]}
            <CardView
              card={cards[slotIdx]!}
              compact={true}
              isAurora={isSlotAurora(slotIdx)}
              isOcaso={isSlotOcaso(slotIdx)}
              isSwapping={isSlotSwapping(slotIdx)}
              selected={isSlotActivePair(slotIdx)}
            />
          {:else}
            <div class="w-20 sm:w-24 h-32 sm:h-36 rounded-xl border-2 border-dashed border-[#5a3c26] bg-[#1a110a]/60 flex items-center justify-center text-[#785328] text-xs font-mono">
              #{slotIdx}
            </div>
          {/if}
        {/each}
      </div>
    </div>

    <!-- Nicho 2: Slots 4 e 5 -->
    <div class="p-2 rounded-2xl cloud-wood-panel border-2 transition-all duration-200 flex flex-col items-center
      {isDividePhase ? 'border-amber-500/80 shadow-amber-900/40 ring-1 ring-amber-400/50' : 'border-[#6e4e30]'}">
      <div class="w-full text-[9px] uppercase font-mono tracking-wider text-amber-300 font-bold mb-1.5 flex justify-between border-b border-[#5a3c26] pb-0.5">
        <span>Nicho 2 (Nascente)</span>
        <span class="text-[#c9b596]">[4 - 5]</span>
      </div>
      <div class="flex justify-center gap-1.5 w-full">
        {#each [4, 5] as slotIdx}
          {#if cards[slotIdx]}
            <CardView
              card={cards[slotIdx]!}
              compact={true}
              isAurora={isSlotAurora(slotIdx)}
              isOcaso={isSlotOcaso(slotIdx)}
              isSwapping={isSlotSwapping(slotIdx)}
              selected={isSlotActivePair(slotIdx)}
            />
          {:else}
            <div class="w-20 sm:w-24 h-32 sm:h-36 rounded-xl border-2 border-dashed border-[#5a3c26] bg-[#1a110a]/60 flex items-center justify-center text-[#785328] text-xs font-mono">
              #{slotIdx}
            </div>
          {/if}
        {/each}
      </div>
    </div>

    <!-- Nicho 3: Slots 6 e 7 -->
    <div class="p-2 rounded-2xl cloud-wood-panel border-2 transition-all duration-200 flex flex-col items-center
      {isDividePhase ? 'border-amber-500/80 shadow-amber-900/40 ring-1 ring-amber-400/50' : 'border-[#6e4e30]'}">
      <div class="w-full text-[9px] uppercase font-mono tracking-wider text-amber-300 font-bold mb-1.5 flex justify-between border-b border-[#5a3c26] pb-0.5">
        <span>Nicho 3 (Nascente)</span>
        <span class="text-[#c9b596]">[6 - 7]</span>
      </div>
      <div class="flex justify-center gap-1.5 w-full">
        {#each [6, 7] as slotIdx}
          {#if cards[slotIdx]}
            <CardView
              card={cards[slotIdx]!}
              compact={true}
              isAurora={isSlotAurora(slotIdx)}
              isOcaso={isSlotOcaso(slotIdx)}
              isSwapping={isSlotSwapping(slotIdx)}
              selected={isSlotActivePair(slotIdx)}
            />
          {:else}
            <div class="w-20 sm:w-24 h-32 sm:h-36 rounded-xl border-2 border-dashed border-[#5a3c26] bg-[#1a110a]/60 flex items-center justify-center text-[#785328] text-xs font-mono">
              #{slotIdx}
            </div>
          {/if}
        {/each}
      </div>
    </div>
  </div>
</div>
