<script lang="ts">
  import type { Card } from '../lib/types';
  import CharacterArt from './CharacterArt.svelte';
  import PixelIcon from './ui/PixelIcon.svelte';
  import { ARCH_STYLE, PASSIVE_STYLE, OWNER_STYLE } from '../lib/ui/theme';

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

  const arch = $derived(ARCH_STYLE[card.archetype]);
  const owner = $derived(OWNER_STYLE[card.owner]);
  const passive = $derived(card.passiveType ? PASSIVE_STYLE[card.passiveType] : null);
  const shortName = $derived(card.name.split(',')[0]);
  const weightChanged = $derived(card.weight !== card.originalWeight);
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
  class="cm-card select-none flex flex-col
    {compact ? 'w-20 sm:w-24 h-32 sm:h-36 p-1 gap-1' : 'w-28 sm:w-32 h-44 sm:h-48 p-1.5 gap-1'}
    {onclick && !disabled ? 'cursor-pointer hover:-translate-y-1' : ''}
    {selected ? 'cm-gold-ring -translate-y-1' : ''}
    {disabled ? 'opacity-50 grayscale-[45%] cursor-not-allowed' : ''}
    {isAurora ? 'outline-4 outline-[#4f8fe0] z-20' : ''}
    {isOcaso ? 'outline-4 outline-[#f08a3c] z-20' : ''}
    {isSwapping ? 'cm-anim-hop z-30' : ''}"
  style="--stripe: {arch.stripe}"
  title={card.name}
  onclick={disabled ? undefined : onclick}
>
  <!-- Ponteiros do Grande Vórtice -->
  {#if isAurora || isOcaso}
    <div
      class="absolute -top-4 left-1/2 -translate-x-1/2 z-30 cm-tag text-[11px] whitespace-nowrap cm-anim-bob"
      style="background: {isAurora ? '#4459ad' : '#c2622d'}"
    >
      {isAurora ? 'Aurora ▾' : 'Ocaso ▾'}
    </div>
  {/if}

  <!-- Cabeçalho estilo livro de receitas: "• Nome" + listras -->
  <div
    class="px-0.5 pb-1 border-b-[3px] leading-none"
    style="border-color: var(--stripe); box-shadow: 0 2px 0 #fbf3dc, 0 4px 0 var(--stripe);"
  >
    <span class="block truncate font-bold text-cm-ink {compact ? 'text-[11px]' : 'text-[13px]'}">
      • {shortName}
    </span>
  </div>

  <!-- Retrato no painel escuro -->
  <div class="cm-card-art flex-1 mt-1">
    <CharacterArt character={card.illustration} class="w-full h-full" />

    <!-- Moeda de peso a_i -->
    <span
      class="cm-coin absolute top-0.5 left-0.5 z-20 {compact ? 'w-6 h-6 text-[12px]' : 'w-7 h-7 text-[14px]'}
        {weightChanged ? 'outline-2 outline-cm-mp' : ''}"
      title="Peso a_i"
    >
      {card.weight}
    </span>

    <!-- Dono -->
    <span class="cm-tag absolute top-0.5 right-0.5 z-20 text-[10px]" style="background: {owner.bg}">
      {owner.label}
    </span>
  </div>

  <!-- Efeito passivo -->
  {#if !compact && passive}
    <div class="flex items-center gap-1 bg-[#1b1b1e] border-2 border-cm-frame rounded-[2px] p-0.5 pr-1">
      <span class="cm-stat-icon !w-5 !h-5 !border" style="background: {passive.bg}">
        <PixelIcon name={passive.icon} size={12} />
      </span>
      <span class="text-[11px] text-cm-cream truncate flex-1 leading-none">{passive.label}</span>
      <span class="text-[11px] font-bold text-cm-gold leading-none">
        {card.passiveValue > 0 ? `+${card.passiveValue}` : card.passiveValue}
      </span>
    </div>
  {/if}
</div>
