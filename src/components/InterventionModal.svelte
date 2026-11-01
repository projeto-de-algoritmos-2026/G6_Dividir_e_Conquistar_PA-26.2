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

  const selectedSpell = $derived(spells.find((s) => s.id === selectedSpellId));

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
          ? 'Nichos ordenados. Use 1 fórmula alquímica da mão antes do merge das alas.'
          : 'Alas ordenadas. Última oportunidade de intervenção antes do Grande Vórtice.'}
      />

      <!-- Conteúdo em Pergaminho Envelhecido (ref 03 & 04) -->
      <div class="cm-parch p-4 sm:p-5 flex flex-col gap-4 text-cm-ink">
        {#if spells.length > 0}
          <!-- 1. Fórmulas Alquímicas Disponíveis (Estilo Cartões de Receitas ref 03) -->
          <div class="flex flex-col gap-1.5">
            <span class="text-xs font-bold text-cm-ink uppercase tracking-wider flex items-center gap-1.5">
              <PixelIcon name="flask" size={13} />
              1. Escolha uma Fórmula da sua Mão:
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
                    <span class="font-bold text-xs sm:text-sm text-cm-ink truncate">{spell.name}</span>
                    <span class="cm-coin text-xs px-2 py-0.5">
                      {spell.passiveValue > 0 ? `+${spell.passiveValue}` : spell.passiveValue}
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
                  onclick={() => (selectedTargetSlot = idx)}
                  class="p-1.5 rounded-[3px] border-[3px] transition-all flex flex-col items-center gap-0.5
                    {selectedTargetSlot === idx
                      ? 'bg-cm-parch-hi border-cm-gold cm-gold-ring scale-105'
                      : 'bg-cm-parch border-cm-frame hover:border-cm-gold hover:bg-cm-parch-hi'}"
                >
                  <span class="text-[10px] font-mono font-bold text-cm-royal">Ilha #{idx}</span>
                  <span class="text-[11px] font-bold text-cm-ink truncate w-full">
                    {card ? card.name.split(' ')[0] : 'Vazio'}
                  </span>
                  {#if card}
                    <span class="cm-coin text-[10px] w-5 h-5 mt-0.5">
                      {card.weight}
                    </span>
                  {:else}
                    <span class="text-[10px] text-cm-tan-dark">-</span>
                  {/if}
                </button>
              {/each}
            </div>
          </div>
        {:else}
          <div class="cm-bubble tail-left p-4 text-center text-xs text-cm-ink font-bold">
            Você não possui fórmulas alquímicas restantes para esta intervenção tática.
          </div>
        {/if}

        <!-- Rodapé de Ações -->
        <div class="flex items-center justify-between pt-3 border-t-2 border-cm-tan-dark">
          <button
            onclick={onPassWindow}
            class="cm-btn-dark px-4 py-2 text-xs"
          >
            Guardar Fórmulas & Passar
          </button>

          {#if spells.length > 0}
            <button
              onclick={handleConfirmCast}
              disabled={!selectedSpellId}
              class="cm-btn px-5 py-2 text-xs"
            >
              <PixelIcon name="flask" size={14} />
              <span>Conjurar Fórmula Alquímica</span>
            </button>
          {/if}
        </div>
      </div>
    </div>
  </div>
</div>
