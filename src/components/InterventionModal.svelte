<script lang="ts">
  import type { Card } from '../lib/types';
  import CardView from './CardView.svelte';

  interface Props {
    windowType: 'alpha' | 'beta';
    spells: Card[];
    boardCards: (Card | null)[];
    onCastSpell: (spellId: string, targetSlot: number) => void;
    onPassWindow: () => void;
  }

  let { windowType, spells, boardCards, onCastSpell, onPassWindow }: Props = $props();

  let selectedSpellId = $state<string | null>(spells.length > 0 ? spells[0].id : null);
  let selectedTargetSlot = $state<number>(0);

  const selectedSpell = $derived(spells.find(s => s.id === selectedSpellId));

  function handleConfirmCast() {
    if (!selectedSpellId) return;
    onCastSpell(selectedSpellId, selectedTargetSlot);
  }
</script>

<div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn select-none">
  <div class="relative w-full max-w-2xl cloud-wood-panel rounded-3xl p-6 shadow-2xl flex flex-col gap-5 text-[#ede0c8] border-2 border-[#d4a34b]">
    <!-- Rebites nos cantos do modal -->
    <div class="absolute top-2.5 left-2.5 cloud-rivet"></div>
    <div class="absolute top-2.5 right-2.5 cloud-rivet"></div>
    <div class="absolute bottom-2.5 left-2.5 cloud-rivet"></div>
    <div class="absolute bottom-2.5 right-2.5 cloud-rivet"></div>

    <!-- Header da Janela -->
    <div class="flex items-center justify-between border-b-2 border-[#5a3c26] pb-3">
      <div class="flex items-center gap-3">
        <span class="text-3xl">{windowType === 'alpha' ? '🍃' : '🌪️'}</span>
        <div>
          <h2 class="text-lg font-black text-[#ffeaae] font-serif">
            {windowType === 'alpha' ? 'Janela de Intervenção Alpha' : 'Janela de Intervenção Beta'}
          </h2>
          <p class="text-xs text-[#c9b596]">
            {windowType === 'alpha'
              ? 'Os 4 nichos foram ordenados internamente. Use 1 feitiço alquímico da sua mão para alterar pesos antes da fusão.'
              : 'As Alas Poente e Nascente estão ordenadas. Última oportunidade de sabotar antes do Grande Vórtice.'}
          </p>
        </div>
      </div>
      <span class="px-3 py-1 rounded-full cloud-btn-brass text-[10px] uppercase font-serif tracking-wider">
        Intervenção Tática
      </span>
    </div>

    <!-- Feitiços Disponíveis -->
    {#if spells.length > 0}
      <div class="flex flex-col gap-2">
        <span class="text-xs font-serif uppercase tracking-wider text-[#d4a34b] font-black">
          1. Escolha uma Fórmula Alquímica da sua Mão:
        </span>
        <div class="flex flex-wrap gap-3 justify-center p-2 rounded-2xl bg-[#120b07] border border-[#785328]">
          {#each spells as spell}
            <!-- svelte-ignore a11y_click_events_have_key_events -->
            <!-- svelte-ignore a11y_no_static_element_interactions -->
            <div
              onclick={() => selectedSpellId = spell.id}
              class="cursor-pointer transition-all p-3 rounded-2xl border-2 flex flex-col gap-1 w-52 text-left
                {selectedSpellId === spell.id
                  ? 'cloud-parchment border-[#d4a34b] ring-4 ring-[#ffd369]/60 scale-105 shadow-xl'
                  : 'bg-[#22160d] border-[#5a3c26] text-[#ede0c8] hover:border-[#8c6d44]'}"
            >
              <div class="flex items-center justify-between">
                <span class="font-serif font-black text-xs text-[#ffeaae] truncate">{spell.name}</span>
                <span class="text-[10px] px-2 py-0.5 rounded-full cloud-btn-wood text-[#ffd369] font-mono">
                  {spell.passiveValue > 0 ? `+${spell.passiveValue}` : spell.passiveValue}
                </span>
              </div>
              <p class="text-[10px] text-[#c9b596] leading-snug line-clamp-3">
                {spell.passiveDescription}
              </p>
            </div>
          {/each}
        </div>
      </div>

      <!-- Seleção de Alvo no Tabuleiro -->
      <div class="flex flex-col gap-2">
        <span class="text-xs font-serif uppercase tracking-wider text-[#d4a34b] font-black">
          2. Selecione a Ilha Alvo no Arquipélago:
        </span>
        <div class="grid grid-cols-4 md:grid-cols-8 gap-2">
          {#each boardCards as card, idx}
            <button
              onclick={() => selectedTargetSlot = idx}
              class="p-2 rounded-xl border-2 text-center transition-all flex flex-col items-center gap-1
                {selectedTargetSlot === idx
                  ? 'cloud-parchment border-[#d4a34b] ring-2 ring-[#ffd369]'
                  : 'bg-[#180f0a] border-[#5a3c26] hover:bg-[#25170f]'}"
            >
              <span class="text-[10px] font-mono text-[#c9b596]">Ilha #{idx}</span>
              <span class="text-xs font-serif font-bold text-[#ffeaae] truncate w-full">
                {card ? card.name.split(' ')[0] : 'Vazio'}
              </span>
              {#if card}
                <span class="text-[10px] font-mono px-1.5 py-0.2 rounded bg-[#322010] text-[#ffd369]">
                  P:{card.weight}
                </span>
              {/if}
            </button>
          {/each}
        </div>
      </div>
    {:else}
      <div class="p-6 text-center text-sm text-[#c9b596] italic">
        Você não possui mais fórmulas alquímicas restantes para esta intervenção.
      </div>
    {/if}

    <!-- Ações no Rodapé -->
    <div class="flex items-center justify-between pt-3 border-t-2 border-[#5a3c26]">
      <button
        onclick={onPassWindow}
        class="px-5 py-2.5 rounded-2xl cloud-btn-wood text-xs active:scale-95"
      >
        Passar Janela (Guardar Fórmulas)
      </button>

      {#if spells.length > 0}
        <button
          onclick={handleConfirmCast}
          disabled={!selectedSpellId}
          class="px-6 py-2.5 rounded-2xl cloud-btn-brass text-xs uppercase font-serif tracking-wider shadow-lg active:scale-95 disabled:opacity-50"
        >
          Conjurar Fórmula ✨
        </button>
      {/if}
    </div>
  </div>
</div>
