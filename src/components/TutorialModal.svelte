<script lang="ts">
  interface Props {
    isOpen: boolean;
    onClose: () => void;
  }

  let { isOpen, onClose }: Props = $props();
</script>

{#if isOpen}
  <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn select-none">
    <div class="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto cloud-wood-panel border-2 border-[#d4a34b] rounded-3xl p-6 shadow-2xl text-[#ede0c8] flex flex-col gap-5">
      <!-- Rebites decorativos -->
      <div class="absolute top-2.5 left-2.5 cloud-rivet"></div>
      <div class="absolute top-2.5 right-2.5 cloud-rivet"></div>
      <div class="absolute bottom-2.5 left-2.5 cloud-rivet"></div>
      <div class="absolute bottom-2.5 right-2.5 cloud-rivet"></div>

      <!-- Header -->
      <div class="flex items-center justify-between border-b-2 border-[#5a3c26] pb-3">
        <div class="flex items-center gap-2">
          <span class="text-3xl">📜</span>
          <h2 class="text-xl font-black text-[#ffeaae] font-serif">
            Manual do Motor Algorítmico & Táticas de Combate
          </h2>
        </div>
        <button
          onclick={onClose}
          class="p-2 rounded-xl cloud-btn-wood text-xs font-bold"
        >
          ✕ Fechar
        </button>
      </div>

      <!-- Seção 1: O Que é a Contagem de Inversões? -->
      <div class="flex flex-col gap-2">
        <h3 class="text-sm font-black text-[#ffd369] uppercase tracking-wider font-serif flex items-center gap-1.5">
          <span>1. O Motor Dividir-e-Conquistar O(n log n)</span>
        </h3>
        <p class="text-xs text-[#c9b596] leading-relaxed">
          Uma inversão em uma sequência ocorre sempre que uma criatura mais pesada aparece antes de uma mais leve (posição <code>i &lt; j</code> e peso <code>a[i] &gt; a[j]</code>).
          Em vez de comparar todos os pares em O(n²), o algoritmo <strong>Sort-and-Count</strong> decompõe os 8 slots recursivamente em estratos, ordenando e contando inversões em tempo recorde <strong>O(n log n)</strong>.
        </p>
      </div>

      <!-- Seção 2: A Tríade da Conquista -->
      <div class="flex flex-col gap-2">
        <h3 class="text-sm font-black text-[#ffd369] uppercase tracking-wider font-serif flex items-center gap-1.5">
          <span>2. O Fluxo de Cada Rodada</span>
        </h3>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
          <div class="p-3 rounded-2xl bg-[#190f09] border border-[#785328] flex flex-col gap-1">
            <span class="font-serif font-black text-sky-300">Nível 1: Duelos T(2)</span>
            <p class="text-[#c9b596] text-[11px] leading-relaxed">
              O tabuleiro divide-se em 4 nichos. Se <code>a_esq &gt; a_dir</code>, ocorre um <strong>Swap</strong> no ar e +1 inversão é somada.
            </p>
          </div>
          <div class="p-3 rounded-2xl bg-[#190f09] border border-[#785328] flex flex-col gap-1">
            <span class="font-serif font-black text-amber-300">Nível 2: Fusão das Alas</span>
            <p class="text-[#c9b596] text-[11px] leading-relaxed">
              Os nichos fundem-se formando a <strong>Ala Poente (A)</strong> e a <strong>Ala Nascente (B)</strong>, acumulando inversões r_A e r_B.
            </p>
          </div>
          <div class="p-3 rounded-2xl bg-[#190f09] border border-[#785328] flex flex-col gap-1">
            <span class="font-serif font-black text-purple-300">Nível 3: O Grande Vórtice</span>
            <p class="text-[#c9b596] text-[11px] leading-relaxed">
              Ponteiro Aurora (A) vs Ocaso (B). Quando <code>a[j] &lt; a[i]</code>, a criatura de B ultrapassa <strong>todas as k cartas restantes</strong> de uma só vez!
            </p>
          </div>
        </div>
      </div>

      <!-- Seção 3: Habilidades e Sinergias -->
      <div class="flex flex-col gap-2">
        <h3 class="text-sm font-black text-[#ffd369] uppercase tracking-wider font-serif flex items-center gap-1.5">
          <span>3. Sinergias dos 4 Decks de Guardiões Anthro</span>
        </h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          <div class="p-3 rounded-2xl bg-[#2b1b11] border border-[#b45309]">
            <div class="font-serif font-black text-[#ffeaae] flex items-center gap-1.5">
              <span>🐺</span> Matilha dos Lobos & Harpias (Pesos 1 - 5)
            </div>
            <p class="text-[#c9b596] text-[11px] mt-1 leading-relaxed">
              Posicione na <strong>Ala Nascente (B, slots 4..7)</strong>. No Nível 3, elas provocam <strong>k-inversões massivas</strong>, disparando <em>Ultrapassagem (Salto Lupino)</em> em combo devastador!
            </p>
          </div>
          <div class="p-3 rounded-2xl bg-[#192419] border border-[#15803d]">
            <div class="font-serif font-black text-emerald-300 flex items-center gap-1.5">
              <span>🐮</span> Baluartes Holstaur & Ursídeos (Pesos 16 - 25)
            </div>
            <p class="text-[#c9b596] text-[11px] mt-1 leading-relaxed">
              Ancore na <strong>Ala Poente (A, slots 0..3)</strong>. Suas defesas pesadas resistem e ativam <em>Pedágio (Marreta de Musgo)</em> toda vez que uma criatura rápida tenta saltá-los!
            </p>
          </div>
          <div class="p-3 rounded-2xl bg-[#13222e] border border-[#0284c7]">
            <div class="font-serif font-black text-sky-300 flex items-center gap-1.5">
              <span>🐱</span> Santuário dos Felinos & Draconianos (Pesos 8 - 14)
            </div>
            <p class="text-[#c9b596] text-[11px] mt-1 leading-relaxed">
              Posicione em ordem natural crescente. Recompensam zero atrito com <em>Fluxo Sereno</em>: cura direta de vida e golpes harmônicos puros.
            </p>
          </div>
          <div class="p-3 rounded-2xl bg-[#25152b] border border-[#9333ea]">
            <div class="font-serif font-black text-purple-300 flex items-center gap-1.5">
              <span>🦊</span> Guilda das Raposas Alquímicas (Variável)
            </div>
            <p class="text-[#c9b596] text-[11px] mt-1 leading-relaxed">
              Mutam seus próprios valores numéricos ao sofrerem inversões ou ao reagirem com fórmulas alquímicas nas janelas Alpha e Beta.
            </p>
          </div>
        </div>
      </div>

      <!-- Rodapé -->
      <div class="pt-3 border-t-2 border-[#5a3c26] flex justify-end">
        <button
          onclick={onClose}
          class="px-6 py-2.5 rounded-2xl cloud-btn-brass text-xs uppercase font-serif tracking-wider shadow-lg active:scale-95"
        >
          Entendido, Levantar Voo! ⚔️
        </button>
      </div>
    </div>
  </div>
{/if}
