<script lang="ts">
  import type { Card } from '../lib/types';
  import { ARCHETYPES } from '../lib/engine/cards';
  import AnthroArt from './AnthroArt.svelte';

  interface Props {
    card: Card;
    selected?: boolean;
    compact?: boolean;
    disabled?: boolean;
    isAurora?: boolean;
    isOcaso?: boolean;
    isSwapping?: boolean;
    onclick?: () => void;
  }

  let {
    card,
    selected = false,
    compact = false,
    disabled = false,
    isAurora = false,
    isOcaso = false,
    isSwapping = false,
    onclick
  }: Props = $props();

  const meta = $derived(ARCHETYPES[card.archetype]);

  const ownerBadge = $derived(
    card.owner === 'player1'
      ? 'bg-sky-950 border-sky-400 text-sky-200'
      : 'bg-amber-950 border-amber-400 text-amber-200'
  );

  const passiveBadge = $derived(
    card.passiveType === 'ultrapassagem'
      ? 'bg-amber-100/90 text-amber-900 border-amber-400'
      : card.passiveType === 'pedagio'
      ? 'bg-emerald-100/90 text-emerald-900 border-emerald-500'
      : card.passiveType === 'fluxo_sereno'
      ? 'bg-sky-100/90 text-sky-900 border-sky-400'
      : 'bg-purple-100/90 text-purple-900 border-purple-400'
  );

  const passiveIcon = $derived(
    card.passiveType === 'ultrapassagem'
      ? '⚡'
      : card.passiveType === 'pedagio'
      ? '🛡️'
      : card.passiveType === 'fluxo_sereno'
      ? '✨'
      : '🔮'
  );
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
  class="relative select-none transition-all duration-200 cursor-pointer flex flex-col justify-between
    {compact ? 'w-20 sm:w-24 h-32 sm:h-36 p-1' : 'w-28 sm:w-32 h-44 sm:h-48 p-1.5'}
    rounded-xl cloud-parchment border-2 border-[#a38054] shadow-md
    {selected ? 'ring-4 ring-amber-400 scale-105 -translate-y-1.5 shadow-xl z-20' : 'hover:-translate-y-1 hover:shadow-lg'}
    {disabled ? 'opacity-40 cursor-not-allowed filter grayscale-[40%]' : ''}
    {isAurora ? 'ring-4 ring-sky-400 animate-pulse z-20 shadow-sky-500/50' : ''}
    {isOcaso ? 'ring-4 ring-amber-500 animate-pulse z-20 shadow-amber-500/50' : ''}
    {isSwapping ? 'scale-110 z-30 shadow-2xl animate-bounce' : ''}"
  onclick={disabled ? undefined : onclick}
>
  <!-- Cantoneiras de Couro Discretas -->
  <div class="absolute inset-0.5 rounded-lg border border-[#8c6d44]/30 pointer-events-none"></div>

  <!-- Badge de Ponteiro Aurora / Ocaso -->
  {#if isAurora}
    <div class="absolute -top-3 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full bg-sky-600 border border-sky-300 text-white text-[9px] font-black uppercase tracking-wider shadow-md flex items-center gap-1 z-30">
      <span>☀️ Aurora</span>
    </div>
  {/if}

  {#if isOcaso}
    <div class="absolute -top-3 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full bg-amber-600 border border-amber-300 text-white text-[9px] font-black uppercase tracking-wider shadow-md flex items-center gap-1 z-30">
      <span>🌙 Ocaso</span>
    </div>
  {/if}

  <!-- Header da Carta: Medalhão de Peso a_i & Dono -->
  <div class="flex items-center justify-between z-10 relative">
    <!-- Círculo de Bronze do Peso Numérico a_i -->
    <div class="w-6 h-6 rounded-full bg-gradient-to-br from-[#ffe7a3] via-[#cfa049] to-[#6b4712] p-0.5 shadow flex items-center justify-center">
      <div class="w-full h-full rounded-full bg-[#20140b] flex items-center justify-center text-[#ffeaae] font-mono font-black text-xs">
        {card.weight}
      </div>
    </div>

    <!-- Indicador de Dono P1 / P2 -->
    <div class="px-1.5 py-0.2 rounded border text-[8.5px] font-mono font-black uppercase tracking-wider shadow-sm {ownerBadge}">
      {card.owner === 'player1' ? 'P1' : 'P2'}
    </div>
  </div>

  <!-- Centro: Arte Vetorial Limpa do Monstro Anthro Furry -->
  <div class="my-0.5 {compact ? 'h-16 sm:h-18' : 'h-24 sm:h-28'} w-full rounded-lg overflow-hidden relative border border-[#8c6d44] bg-[#1a110a] flex items-center justify-center shadow-inner">
    <AnthroArt character={card.illustration} class="w-full h-full" />
  </div>

  <!-- Rodapé: Nome e Efeito -->
  <div class="flex flex-col items-center text-center z-10">
    <div class="text-[10.5px] sm:text-xs font-black text-[#2e1d11] tracking-tight truncate w-full font-serif leading-tight">
      {card.name.split(',')[0]}
    </div>

    {#if !compact && card.passiveType}
      <div class="w-full mt-0.5 px-1 py-0.5 rounded border text-[8.5px] font-sans font-bold truncate {passiveBadge}">
        <span>{passiveIcon}</span>
        <span class="capitalize">{card.passiveType.replace('_', ' ')}</span>: {card.passiveValue > 0 ? `+${card.passiveValue}` : card.passiveValue}
      </div>
    {/if}
  </div>
</div>
