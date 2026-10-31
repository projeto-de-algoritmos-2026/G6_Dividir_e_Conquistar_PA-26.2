<script lang="ts">
  import type { Card } from '../lib/types';
  import CardView from './CardView.svelte';

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
  const selectedCard = $derived(playerHand.find(c => c.id === selectedCardId));
</script>

<div class="w-full max-w-5xl mx-auto flex flex-col items-center gap-3 py-1 select-none">
  <!-- Banner de Turno Limpo & Elegante (Estilo Pergaminho de Expedição) -->
  <div class="w-full flex items-center justify-between px-5 py-3 rounded-2xl cloud-wood-panel border-2 border-[#8c6d44] shadow-2xl">
    <div class="flex items-center gap-3">
      <!-- Lâmpada de Aether / Indicador de Turno -->
      <div class="w-4 h-4 rounded-full {isMyTurn ? 'bg-emerald-400 ring-4 ring-emerald-400/40 animate-pulse' : 'bg-[#5a3810]'}"></div>
      <div>
        <h2 class="text-sm font-black text-[#ffeaae] font-serif tracking-wide">
          {isMyTurn ? 'Sua Vez de Semear as Ilhas' : 'Oponente está calculando a jogada ótima...'}
        </h2>
        <p class="text-xs text-[#c9b596]">
          Posicione 4 cartas. <span class="text-sky-300 font-bold">Slots 0-3 = Ala Poente (A)</span> • <span class="text-amber-300 font-bold">Slots 4-7 = Ala Nascente (B)</span>.
        </p>
      </div>
    </div>

    <!-- Contador de cartas do oponente -->
    <div class="flex items-center gap-2 bg-[#120b07] px-3.5 py-1.5 rounded-xl border border-[#785328] text-xs font-mono text-[#ede0c8]">
      <span class="text-[#d4a34b]">Oponente:</span>
      <span class="font-bold text-[#ffeaae]">{opponentHandCount} cartas</span>
    </div>
  </div>

  <!-- O TABULEIRO DAS 8 ILHAS (DUAS ALAS LADO A LADO) -->
  <div class="w-full grid grid-cols-1 md:grid-cols-2 gap-3">
    <!-- Ala Poente: Slots 0, 1, 2, 3 -->
    <div class="p-3 rounded-2xl cloud-wood-panel border-2 border-sky-700/60 shadow-lg flex flex-col gap-2">
      <div class="flex items-center justify-between border-b border-sky-800/60 pb-1 text-xs font-serif font-black text-sky-200">
        <span>ALA POENTE (Slots 0..3)</span>
        <span class="text-[10px] font-mono text-sky-400">Âncora & Pedágio</span>
      </div>

      <div class="grid grid-cols-4 gap-2 justify-items-center">
        {#each [0, 1, 2, 3] as idx}
          <button
            onclick={() => onPlaceCard(idx)}
            disabled={!isMyTurn || slots[idx] !== null || !selectedCardId}
            class="relative flex flex-col items-center justify-center p-1 rounded-xl transition-all duration-150
              {slots[idx] !== null
                ? 'cursor-default'
                : isMyTurn && selectedCardId
                ? 'border-2 border-dashed border-amber-400 bg-amber-500/10 hover:bg-amber-500/20 hover:scale-105 cursor-pointer animate-pulse w-20 sm:w-24 h-32 sm:h-36'
                : 'border-2 border-dashed border-[#5a3c26] bg-[#140b06]/60 cursor-not-allowed opacity-50 w-20 sm:w-24 h-32 sm:h-36'}"
          >
            {#if slots[idx]}
              <CardView card={slots[idx]!} compact={true} />
            {:else}
              <div class="flex flex-col items-center gap-1 text-[#b4925e]">
                <span class="text-lg">🏝️</span>
                <span class="text-[10px] font-mono font-bold">Slot #{idx}</span>
              </div>
            {/if}
          </button>
        {/each}
      </div>
    </div>

    <!-- Ala Nascente: Slots 4, 5, 6, 7 -->
    <div class="p-3 rounded-2xl cloud-wood-panel border-2 border-amber-700/60 shadow-lg flex flex-col gap-2">
      <div class="flex items-center justify-between border-b border-amber-800/60 pb-1 text-xs font-serif font-black text-amber-200">
        <span>ALA NASCENTE (Slots 4..7)</span>
        <span class="text-[10px] font-mono text-amber-400">Impulso & Vórtice</span>
      </div>

      <div class="grid grid-cols-4 gap-2 justify-items-center">
        {#each [4, 5, 6, 7] as idx}
          <button
            onclick={() => onPlaceCard(idx)}
            disabled={!isMyTurn || slots[idx] !== null || !selectedCardId}
            class="relative flex flex-col items-center justify-center p-1 rounded-xl transition-all duration-150
              {slots[idx] !== null
                ? 'cursor-default'
                : isMyTurn && selectedCardId
                ? 'border-2 border-dashed border-amber-400 bg-amber-500/10 hover:bg-amber-500/20 hover:scale-105 cursor-pointer animate-pulse w-20 sm:w-24 h-32 sm:h-36'
                : 'border-2 border-dashed border-[#5a3c26] bg-[#140b06]/60 cursor-not-allowed opacity-50 w-20 sm:w-24 h-32 sm:h-36'}"
          >
            {#if slots[idx]}
              <CardView card={slots[idx]!} compact={true} />
            {:else}
              <div class="flex flex-col items-center gap-1 text-[#b4925e]">
                <span class="text-lg">🏝️</span>
                <span class="text-[10px] font-mono font-bold">Slot #{idx}</span>
              </div>
            {/if}
          </button>
        {/each}
      </div>
    </div>
  </div>

  <!-- BANDEJA DA MÃO DO JOGADOR -->
  <div class="w-full flex flex-col items-center gap-2 mt-1">
    <div class="flex items-center gap-2 text-xs font-serif font-bold text-[#ffeaae]">
      <span class="uppercase tracking-wider text-[#d4a34b]">Grimório da Mão</span>
      <span class="text-stone-500">•</span>
      <span class="text-[#c9b596]">Selecione uma criatura anthro e clique em uma ilha vazia:</span>
    </div>

    <div class="flex flex-wrap items-center justify-center gap-3 p-4 rounded-3xl cloud-wood-panel border-2 border-[#8c6d44] shadow-2xl max-w-5xl">
      {#if playerHand.length === 0}
        <p class="text-xs text-[#c9b596] italic py-3">Todas as criaturas da sua expedição foram semeadas no tabuleiro.</p>
      {:else}
        {#each playerHand as card}
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

    {#if selectedCard}
      <div class="text-xs font-mono text-[#2b1803] cloud-btn-brass px-5 py-2 rounded-full shadow">
        Criatura Selecionada: <strong>{selectedCard.name}</strong> (Peso {selectedCard.weight}). Clique no slot desejado acima.
      </div>
    {/if}
  </div>
</div>
