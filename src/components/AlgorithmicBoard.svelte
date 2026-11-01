<script lang="ts">
  import type { Card, AlgorithmStep } from '../lib/types';
  import CardView from './CardView.svelte';
  import PixelIcon from './ui/PixelIcon.svelte';

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

  const NICHOS = [
    { id: 0, label: 'Nicho 0', ala: 'Ala Poente', slots: [0, 1], tone: '#4459ad' },
    { id: 1, label: 'Nicho 1', ala: 'Ala Poente', slots: [2, 3], tone: '#4459ad' },
    { id: 2, label: 'Nicho 2', ala: 'Ala Nascente', slots: [4, 5], tone: '#c2622d' },
    { id: 3, label: 'Nicho 3', ala: 'Ala Nascente', slots: [6, 7], tone: '#c2622d' }
  ];
</script>

<div class="w-full max-w-5xl mx-auto py-1 flex flex-col items-center select-none gap-3">
  <!-- CABEÇALHO DO ARQUIPÉLAGO: ÁRVORE DE ESTRATOS EM ESTILO HUD CLOUD MEADOW -->
  <div class="w-full flex items-center justify-between px-4 py-2.5 bg-cm-frame rounded-[6px] text-white shadow-[0_4px_0_rgba(20,18,34,.35)]">
    <!-- Ala Poente [0..3] -->
    <div class="flex items-center gap-2 transition-all {isDividePhase || isAlaMergePhase ? 'text-[#8fc3ee]' : 'opacity-60'}">
      <span class="w-2.5 h-2.5 rounded-full bg-[#4459ad] border border-white cm-anim-blink"></span>
      <span class="font-bold text-xs sm:text-sm tracking-wide">Ala Poente [Slots 0..3]</span>
    </div>

    <!-- Placa Central: Fase do Algoritmo Divide and Conquer (ref 06 e ref 03) -->
    <div class="flex items-center gap-2">
      <span class="px-4 py-1.5 rounded-[3px] bg-cm-royal border-2 border-cm-frame text-cm-cream font-bold text-xs sm:text-sm tracking-wider shadow-[inset_0_2px_0_#5a6fc2]">
        {#if isDividePhase}
          <span class="inline-flex items-center gap-1.5">
            <PixelIcon name="swap" size={14} /> Dividir: 4 Nichos T(2)
          </span>
        {:else if isAlaMergePhase}
          <span class="inline-flex items-center gap-1.5">
            <PixelIcon name="swirl" size={14} /> Merge Local: r_A & r_B
          </span>
        {:else}
          <span class="inline-flex items-center gap-1.5 text-cm-gold">
            <PixelIcon name="bolt" size={14} /> O Grande Vórtice O(n)
          </span>
        {/if}
      </span>
    </div>

    <!-- Ala Nascente [4..7] -->
    <div class="flex items-center gap-2 transition-all {isDividePhase || isAlaMergePhase ? 'text-[#f9d57c]' : 'opacity-60'}">
      <span class="font-bold text-xs sm:text-sm tracking-wide">Ala Nascente [Slots 4..7]</span>
      <span class="w-2.5 h-2.5 rounded-full bg-[#c2622d] border border-white cm-anim-blink"></span>
    </div>
  </div>

  <!-- BALÃO DE IMPACTO CINÉTICO DO PASSO (ESTILO DIÁLOGO / RECEITA CLOUD MEADOW ref 02/03) -->
  {#if step?.eventPayload}
    <div class="w-full cm-bubble tail-left px-4 py-2.5 flex items-center justify-between gap-3 cm-anim-pop
      {step.type === 'vortex_burst_inversion' ? '!bg-[#fff0a6] !border-cm-gold-dark' : ''}">
      <div class="flex items-center gap-2.5 min-w-0">
        <span class="shrink-0 p-1 bg-cm-frame rounded-[2px] text-white">
          <PixelIcon
            name={step.type === 'vortex_burst_inversion' ? 'bolt' : step.type === 'nicho_swap' ? 'swap' : 'leaf'}
            size={16}
          />
        </span>
        <span class="text-xs sm:text-sm font-bold text-cm-ink leading-tight truncate">
          {step.eventPayload.logText}
        </span>
      </div>

      {#if step.eventPayload.kInversions}
        <div class="cm-btn px-3 py-1 text-xs shrink-0 cm-anim-hop">
          <PixelIcon name="bolt" size={13} /> +{step.eventPayload.kInversions} Inversões!
        </div>
      {/if}
    </div>
  {/if}

  <!-- TABULEIRO DOS 4 NICHOS (JANELAS COM PERGAMINHO E MOLDURA ESCURA ref 03 e 05) -->
  <div class="w-full grid grid-cols-2 lg:grid-cols-4 gap-3">
    {#each NICHOS as nicho}
      <div class="cm-window !p-2 flex flex-col items-center gap-1.5 transition-all
        {isDividePhase ? 'cm-gold-ring' : ''}">
        <!-- Cabeçalho do Nicho -->
        <div class="w-full flex items-center justify-between px-1.5 py-0.5 border-b-2 border-cm-tan-dark text-[11px] font-bold">
          <span class="flex items-center gap-1" style="color: {nicho.tone}">
            <PixelIcon name="shield" size={11} />
            {nicho.label}
          </span>
          <span class="text-cm-ink-soft font-mono">[{nicho.slots[0]}-{nicho.slots[1]}]</span>
        </div>

        <!-- Slots de Cartas -->
        <div class="flex justify-center items-center gap-1.5 w-full py-1">
          {#each nicho.slots as slotIdx}
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
              <div class="cm-slot w-20 sm:w-24 h-32 sm:h-36 flex flex-col items-center justify-center gap-1 text-cm-tan/70">
                <PixelIcon name="cloud" size={18} />
                <span class="text-xs font-bold font-mono">#{slotIdx}</span>
              </div>
            {/if}
          {/each}
        </div>
      </div>
    {/each}
  </div>
</div>
