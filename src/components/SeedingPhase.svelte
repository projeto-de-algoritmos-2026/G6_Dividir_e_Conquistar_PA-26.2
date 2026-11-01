<script lang="ts">
  import type { Card } from '../lib/types';
  import CardView from './CardView.svelte';
  import PixelIcon from './ui/PixelIcon.svelte';
  import RoyalBanner from './ui/RoyalBanner.svelte';

  interface Props {
    slots: (Card | null)[];
    playerHand: Card[];
    opponentHandCount: number;
    currentTurn: 'player1' | 'player2';
    userPlayerId: 'player1' | 'player2';
    selectedCardId: string | null;
    onSelectCard: (id: string) => void;
    onPlaceCard: (slotIndex: number) => void;
  }

  let {
    slots,
    playerHand,
    opponentHandCount,
    currentTurn,
    userPlayerId,
    selectedCardId,
    onSelectCard,
    onPlaceCard
  }: Props = $props();

  const isMyTurn = $derived(currentTurn === userPlayerId);
  const canPlace = $derived(isMyTurn && !!selectedCardId);
  const filled = $derived(slots.filter((s) => !!s).length);

  const ALAS = [
    { name: 'Ala Poente', hint: 'Âncora & Pedágio', idx: [0, 1, 2, 3], band: '#5869b0', stamp: 'shield' },
    { name: 'Ala Nascente', hint: 'Impulso & Vórtice', idx: [4, 5, 6, 7], band: '#c2622d', stamp: 'bolt' }
  ];
</script>

<div class="w-full max-w-5xl mx-auto flex flex-col items-stretch gap-4 py-2 select-none">
  <!-- Balão de turno (ref 03) -->
  <div class="flex items-center gap-4 px-1">
    <div class="cm-slot-light w-14 h-14 shrink-0 flex items-center justify-center !border-cm-frame !bg-cm-parch-hi">
      <PixelIcon name={isMyTurn ? 'paw' : 'hourglass'} size={30} class={isMyTurn ? 'cm-anim-bob' : ''} />
    </div>
    <div class="cm-bubble tail-left flex-1 px-4 py-2.5 flex flex-wrap items-center justify-between gap-2">
      <div>
        <div class="font-bold text-[16px] leading-tight">
          {isMyTurn ? 'Sua vez de semear as ilhas!' : 'O oponente está calculando a jogada ótima…'}
        </div>
        <div class="text-[13px] leading-snug">
          {isMyTurn
            ? selectedCardId
              ? 'Agora clique numa ilha vazia do calendário acima para posicionar a criatura.'
              : 'Selecione uma criatura no seu grimório abaixo.'
            : 'Aguarde enquanto o rival posiciona uma carta.'}
        </div>
      </div>
      <div class="flex items-center gap-2 text-[13px] font-bold">
        <span class="cm-tag" style="background:#b8492f">Rival: {opponentHandCount} cartas</span>
        <span class="cm-tag" style="background:#4459ad">{filled}/8 ilhas</span>
      </div>
    </div>
  </div>

  <!-- Calendário do arquipélago (ref 06) -->
  <section class="bg-cm-frame p-1 rounded-[6px] shadow-[0_6px_0_rgba(20,18,34,.35)] cm-anim-pop">
    <div class="rounded-[3px] overflow-hidden">
      <RoyalBanner runes="semeadura" title="Semeadura do Arquipélago" />
      <div class="cm-parch px-3 sm:px-5 pt-4 pb-3 flex flex-col gap-3">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {#each ALAS as ala}
            <div class="flex flex-col">
              <!-- cabeçalho do calendário -->
              <div
                class="flex items-center justify-between px-2 h-7 text-white text-[13px] font-bold rounded-t-[2px]"
                style="background: {ala.band}"
              >
                <span class="flex items-center gap-1.5">
                  <PixelIcon name={ala.stamp} size={14} />
                  {ala.name}
                </span>
                <span class="opacity-85 font-normal">{ala.hint}</span>
              </div>
              <div class="cm-calendar grid-cols-4 rounded-t-none" style="background: {ala.band}">
                {#each ala.idx as idx}
                  {@const empty = !slots[idx]}
                  <button
                    onclick={() => onPlaceCard(idx)}
                    disabled={!isMyTurn || !empty || !selectedCardId}
                    class="cm-cal-cell group min-h-40 sm:min-h-44 pt-5 pb-1.5 px-1 flex items-center justify-center
                      {empty && canPlace ? 'cursor-pointer hover:bg-[#fff6d8]' : 'cursor-default'}"
                    aria-label="Ilha {idx}"
                  >
                    <span class="cm-cal-num">{idx}</span>
                    {#if slots[idx]}
                      <div class="cm-anim-pop">
                        <CardView card={slots[idx]!} compact={true} />
                      </div>
                    {:else if canPlace}
                      <span class="cm-stamp w-16 h-16 opacity-40 group-hover:opacity-95 group-hover:scale-110 transition-all">
                        <svg viewBox="0 0 10 10" width="26" height="26" style="shape-rendering: crispEdges">
                          <rect x="4" y="1" width="2" height="8" fill="currentColor" />
                          <rect x="1" y="4" width="8" height="2" fill="currentColor" />
                        </svg>
                      </span>
                    {:else}
                      <span class="w-10 h-1 bg-cm-parch-lo"></span>
                    {/if}
                  </button>
                {/each}
              </div>
            </div>
          {/each}
        </div>

        <!-- divisor com medalhão (ref 06) -->
        <div class="cm-divider">
          <span
            class="w-9 h-9 rounded-full border-4 border-cm-royal-line bg-cm-parch flex items-center justify-center"
          >
            <PixelIcon name="cloud" size={18} />
          </span>
        </div>
      </div>
    </div>
  </section>

  <!-- Grimório da mão (ref 04: inventário) -->
  <section class="relative mt-3">
    <div class="absolute -top-4 left-1/2 -translate-x-1/2 z-20 flex gap-1">
      <span class="cm-btn-cream px-4 py-1.5 text-sm !shadow-none">
        <PixelIcon name="bag" size={16} /> Grimório da Mão
      </span>
    </div>
    <div class="cm-window is-dark-frame">
      <div
        class="flex flex-wrap items-end justify-center gap-3 sm:gap-4 px-3 pt-7 pb-4 min-h-52"
        style="background-image: linear-gradient(#3a3a40 2px, transparent 2px), linear-gradient(90deg, #3a3a40 2px, transparent 2px); background-size: 28px 28px;"
      >
        {#if playerHand.length === 0}
          <p class="text-[14px] text-cm-tan py-6">Todas as criaturas da sua expedição já estão no arquipélago.</p>
        {:else}
          {#each playerHand as card (card.id)}
            <CardView
              {card}
              compact={false}
              selected={selectedCardId === card.id}
              disabled={!isMyTurn}
              onclick={() => onSelectCard(card.id)}
            />
          {/each}
        {/if}
      </div>
    </div>
  </section>
</div>
