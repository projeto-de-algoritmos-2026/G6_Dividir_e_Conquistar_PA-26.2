<script lang="ts">
  import type { Card } from '../lib/types';
  import RoyalBanner from './ui/RoyalBanner.svelte';
  import PixelIcon from './ui/PixelIcon.svelte';

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

  // Garante seleção reativa se a lista de magias mudar
  $effect(() => {
    if (!spells.some((s) => s.id === selectedSpellId)) {
      selectedSpellId = spells[0]?.id ?? null;
    }
  });

  const selectedSpell = $derived(spells.find((s) => s.id === selectedSpellId));
  const targetCard = $derived(boardCards[selectedTargetSlot]);

  function handleConfirmCast() {
    if (!selectedSpellId) return;
    onCastSpell(selectedSpellId, selectedTargetSlot);
  }
</script>

<div class="cm-overlay select-none cm-anim-pop">
  <div class="cm-window max-w-2xl w-full p-2">
    <div class="cm-window-body overflow-hidden">
      <!-- Banner Azul Real com Runas (ref 06) -->
      <RoyalBanner
        runes={windowType === 'alpha' ? 'alpha' : 'beta'}
        title={windowType === 'alpha' ? 'Janela de Intervenção Alpha' : 'Janela de Intervenção Beta'}
        subtitle={windowType === 'alpha'
          ? 'Nichos ordenados internamente. Use 1 fórmula alquímica antes do merge das alas.'
          : 'Alas ordenadas. Última oportunidade de intervenção antes do Grande Vórtice.'}
      />

      <!-- Conteúdo em Pergaminho Envelhecido (ref 03 & 04) -->
      <div class="cm-parch p-4 sm:p-5 flex flex-col gap-4 text-cm-ink">
        {#if spells.length > 0}
          <!-- 1. Fórmulas Alquímicas Disponíveis (Estilo Cartões de Receitas ref 03) -->
          <div class="flex flex-col gap-1.5">
            <span class="text-xs font-bold text-cm-ink uppercase tracking-wider flex items-center gap-1.5">
              <PixelIcon name="flask" size={13} />
              1. Escolha uma Fórmula Alquímica da sua Bolsa:
            </span>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {#each spells as spell}
                <!-- svelte-ignore a11y_click_events_have_key_events -->
                <!-- svelte-ignore a11y_no_static_element_interactions -->
                <div
                  onclick={() => (selectedSpellId = spell.id)}
                  class="cursor-pointer transition-all p-2.5 rounded-[4px] border-[3px] flex flex-col gap-1 text-left
                    {selectedSpellId === spell.id
                      ? 'bg-cm-parch-hi border-cm-gold cm-gold-ring -translate-y-0.5'
                      : 'bg-cm-parch-hi border-cm-frame hover:border-cm-gold hover:-translate-y-0.5'}"
                >
                  <div class="flex items-center justify-between border-b-2 border-cm-tan pb-1">
                    <span class="font-bold text-xs sm:text-sm text-cm-ink truncate flex items-center gap-1">
                      <PixelIcon name="flask" size={12} />
                      {spell.name}
                    </span>
                    <span class="cm-coin text-xs px-2 py-0.5">
                      {spell.spellTarget === 'adjacent_swap'
                        ? 'Swap'
                        : spell.passiveValue > 0
                          ? `+${spell.passiveValue}`
                          : spell.passiveValue}
                    </span>
                  </div>
                  <p class="text-[12px] text-cm-ink-soft leading-tight line-clamp-2">
                    {spell.passiveDescription}
                  </p>
                </div>
              {/each}
            </div>
          </div>

          <!-- 2. Seleção da Ilha Alvo no Arquipélago (Slots estilo ingredientes ref 03) -->
          <div class="flex flex-col gap-1.5">
            <span class="text-xs font-bold text-cm-ink uppercase tracking-wider flex items-center gap-1.5">
              <PixelIcon name="shield" size={13} />
              2. Selecione a Ilha Alvo no Arquipélago:
            </span>

            <div class="grid grid-cols-4 sm:grid-cols-8 gap-2">
              {#each boardCards as card, idx}
                <button
                  type="button"
                  onclick={() => (selectedTargetSlot = idx)}
                  class="p-1.5 rounded-[3px] border-[3px] transition-all flex flex-col items-center gap-0.5
                    {selectedTargetSlot === idx
                      ? 'bg-cm-parch-hi border-cm-gold cm-gold-ring scale-105'
                      : 'bg-cm-parch border-cm-frame hover:border-cm-gold hover:bg-cm-parch-hi'}"
                >
                  <span class="text-[10px] font-mono font-bold {idx < 4 ? 'text-cm-royal' : 'text-[#c2622d]'}">
                    Ilha #{idx}
                  </span>
                  <span class="text-[11px] font-bold text-cm-ink truncate w-full">
                    {card ? card.name.split(' ')[0] : 'Vazio'}
                  </span>
                  {#if card}
                    <div class="flex items-center gap-1 mt-0.5">
                      <span class="cm-coin text-[10px] w-5 h-5">
                        {card.weight}
                      </span>
                      <span class="text-[9px] font-bold px-1 rounded-[2px] {card.owner === 'player1' ? 'bg-cm-royal text-white' : 'bg-[#c2622d] text-white'}">
                        {card.owner === 'player1' ? 'P1' : 'P2'}
                      </span>
                    </div>
                  {:else}
                    <span class="text-[10px] text-cm-tan-dark">-</span>
                  {/if}
                </button>
              {/each}
            </div>
          </div>

          <!-- PRÉVIA DINÂMICA DO IMPACTO DO FEITIÇO -->
          {#if selectedSpell && targetCard}
            <div class="p-2.5 rounded-[4px] bg-[#1b1b1e] text-cm-cream border-2 border-cm-gold flex flex-wrap items-center justify-between gap-2 text-xs cm-anim-pop">
              <div class="flex items-center gap-2">
                <PixelIcon name="flask" size={14} class="text-cm-gold" />
                <span>Impacto Alquímico em <strong>Ilha #{selectedTargetSlot}</strong> ({targetCard.name}):</span>
              </div>
              <div class="font-bold">
                {#if selectedSpell.spellTarget === 'weight_buff'}
                  <span class="text-cm-hp">Peso {targetCard.weight} → {targetCard.weight + selectedSpell.passiveValue} (+{selectedSpell.passiveValue})</span>
                {:else if selectedSpell.spellTarget === 'weight_nerf'}
                  <span class="text-[#f08a3c]">Peso {targetCard.weight} → {Math.max(1, targetCard.weight + selectedSpell.passiveValue)} ({selectedSpell.passiveValue})</span>
                {:else if selectedSpell.spellTarget === 'adjacent_swap'}
                  {@const neighborSlot = selectedTargetSlot < 7 ? selectedTargetSlot + 1 : selectedTargetSlot - 1}
                  {@const neighborCard = boardCards[neighborSlot]}
                  <span class="text-cm-gold">
                    Permuta com Ilha #{neighborSlot} ({neighborCard ? neighborCard.name.split(' ')[0] : 'Vazio'})
                  </span>
                {/if}
              </div>
            </div>
          {/if}
        {:else}
          <div class="cm-bubble tail-left p-4 text-center text-xs text-cm-ink font-bold">
            Você não possui fórmulas alquímicas restantes para esta intervenção tática.
          </div>
        {/if}

        <!-- Rodapé de Ações -->
        <div class="flex items-center justify-between pt-3 border-t-2 border-cm-tan-dark">
          <button
            type="button"
            onclick={onPassWindow}
            class="cm-btn-dark px-4 py-2 text-xs"
          >
            Guardar Fórmulas & Passar
          </button>

          {#if spells.length > 0}
            <button
              type="button"
              onclick={handleConfirmCast}
              disabled={!selectedSpellId}
              class="cm-btn px-5 py-2 text-xs cm-gold-ring cursor-pointer"
            >
              <PixelIcon name="flask" size={14} />
              <span>
                {selectedSpell ? `Conjurar ${selectedSpell.name}` : 'Conjurar Fórmula Alquímica'}
              </span>
            </button>
          {/if}
        </div>
      </div>
    </div>
  </div>
</div>
