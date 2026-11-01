<script lang="ts">
  import RoyalBanner from './ui/RoyalBanner.svelte';
  import PixelIcon from './ui/PixelIcon.svelte';

  interface Props {
    isOpen: boolean;
    onClose: () => void;
  }

  let { isOpen, onClose }: Props = $props();
</script>

{#if isOpen}
  <div class="cm-overlay select-none cm-anim-pop">
    <div class="cm-window max-w-2xl w-full p-2 max-h-[90vh] flex flex-col">
      <div class="cm-window-body overflow-hidden flex flex-col flex-1">
        <!-- Banner Azul Real com Runas (ref 06) -->
        <RoyalBanner
          runes="manual"
          title="Manual do Estrategista Celeste"
          subtitle="Fundamentos Algorítmicos • Dividir e Conquistar"
        />

        <!-- Conteúdo Rolável em Pergaminho Envelhecido (ref 02 & 03) -->
        <div class="cm-parch p-4 sm:p-6 overflow-y-auto flex-1 flex flex-col gap-5 text-cm-ink">
          <!-- Seção 1: O Motor Dividir-e-Conquistar -->
          <div class="flex flex-col gap-2">
            <h3 class="text-xs sm:text-sm font-bold text-cm-royal uppercase tracking-wide flex items-center gap-1.5 border-b-2 border-cm-tan pb-1">
              <PixelIcon name="scroll" size={14} />
              1. O Motor Dividir-e-Conquistar O(n log n)
            </h3>
            <p class="text-[13px] text-cm-ink leading-snug">
              Uma inversão em uma sequência ocorre sempre que uma criatura mais pesada aparece antes de uma mais leve (posição <code>i &lt; j</code> e peso <code>a[i] &gt; a[j]</code>).
              Em vez de comparar todos os pares em O(n²), o algoritmo <strong>Sort-and-Count</strong> decompõe os 8 slots recursivamente em estratos, ordenando e contando inversões em tempo recorde <strong>O(n log n)</strong>.
            </p>
          </div>

          <!-- Seção 2: O Fluxo de Cada Rodada -->
          <div class="flex flex-col gap-2">
            <h3 class="text-xs sm:text-sm font-bold text-cm-royal uppercase tracking-wide flex items-center gap-1.5 border-b-2 border-cm-tan pb-1">
              <PixelIcon name="flag" size={14} />
              2. As Três Fases de Resolução
            </h3>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div class="cm-card !p-2.5 flex flex-col gap-1">
                <span class="font-bold text-xs text-cm-royal flex items-center gap-1">
                  <PixelIcon name="swap" size={12} /> Nível 1: Duelos T(2)
                </span>
                <p class="text-[12px] text-cm-ink-soft leading-tight">
                  O arquipélago divide-se em 4 nichos. Se <code>a_esq &gt; a_dir</code>, ocorre um <strong>Swap</strong> no ar e +1 inversão é somada.
                </p>
              </div>

              <div class="cm-card !p-2.5 flex flex-col gap-1">
                <span class="font-bold text-xs text-[#c2622d] flex items-center gap-1">
                  <PixelIcon name="swirl" size={12} /> Nível 2: Fusão das Alas
                </span>
                <p class="text-[12px] text-cm-ink-soft leading-tight">
                  Os nichos fundem-se formando a <strong>Ala Poente (A)</strong> e a <strong>Ala Nascente (B)</strong>, acumulando inversões r_A e r_B.
                </p>
              </div>

              <div class="cm-card !p-2.5 flex flex-col gap-1">
                <span class="font-bold text-xs text-[#9a6be0] flex items-center gap-1">
                  <PixelIcon name="bolt" size={12} /> Nível 3: O Grande Vórtice
                </span>
                <p class="text-[12px] text-cm-ink-soft leading-tight">
                  Ponteiro Aurora (A) vs Ocaso (B). Quando <code>a[j] &lt; a[i]</code>, a criatura de B ultrapassa <strong>todas as k cartas restantes</strong> de uma só vez!
                </p>
              </div>
            </div>
          </div>

          <!-- Seção 3: Sinergias dos Decks de Guardiões -->
          <div class="flex flex-col gap-2">
            <h3 class="text-xs sm:text-sm font-bold text-cm-royal uppercase tracking-wide flex items-center gap-1.5 border-b-2 border-cm-tan pb-1">
              <PixelIcon name="paw" size={14} />
              3. Sinergias dos Guardiões Celestes
            </h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
              <!-- Rajadas -->
              <div class="cm-card !p-3">
                <div class="font-bold text-xs text-[#f08a3c] flex items-center gap-1.5 pb-1 border-b border-cm-tan">
                  <PixelIcon name="bolt" size={13} /> Matilha dos Ventos & Harpias (Pesos 1 - 5)
                </div>
                <p class="text-[12px] text-cm-ink leading-tight mt-1">
                  Posicione na <strong>Ala Nascente (B, slots 4..7)</strong>. No Nível 3, provocam <strong>k-inversões massivas</strong>, disparando <em>Ultrapassagem (Salto Lupino)</em> em combos devastadores!
                </p>
              </div>

              <!-- Raiz -->
              <div class="cm-card !p-3">
                <div class="font-bold text-xs text-[#4459ad] flex items-center gap-1.5 pb-1 border-b border-cm-tan">
                  <PixelIcon name="shield" size={13} /> Baluartes da Terra & Ursídeos (Pesos 16 - 25)
                </div>
                <p class="text-[12px] text-cm-ink leading-tight mt-1">
                  Ancore na <strong>Ala Poente (A, slots 0..3)</strong>. Suas defesas pesadas resistem e ativam <em>Pedágio (Marreta Rúnica)</em> toda vez que uma criatura rápida tenta saltá-los!
                </p>
              </div>

              <!-- Zéfiro -->
              <div class="cm-card !p-3">
                <div class="font-bold text-xs text-[#45c552] flex items-center gap-1.5 pb-1 border-b border-cm-tan">
                  <PixelIcon name="leaf" size={13} /> Santuário dos Felinos & Draconianos (Pesos 8 - 14)
                </div>
                <p class="text-[12px] text-cm-ink leading-tight mt-1">
                  Posicione em ordem natural crescente. Recompensam zero atrito com <em>Fluxo Sereno</em>: regeneração direta de vida e golpes harmônicos puros.
                </p>
              </div>

              <!-- Éter -->
              <div class="cm-card !p-3">
                <div class="font-bold text-xs text-[#9a6be0] flex items-center gap-1.5 pb-1 border-b border-cm-tan">
                  <PixelIcon name="flask" size={13} /> Guilda das Raposas Alquímicas (Variável)
                </div>
                <p class="text-[12px] text-cm-ink leading-tight mt-1">
                  Mutam seus próprios valores numéricos ao sofrerem inversões ou ao reagirem com fórmulas alquímicas nas janelas Alpha e Beta.
                </p>
              </div>
            </div>
          </div>

          <!-- Seção 4: Fórmulas Alquímicas e Janelas de Intervenção -->
          <div class="flex flex-col gap-2">
            <h3 class="text-xs sm:text-sm font-bold text-cm-royal uppercase tracking-wide flex items-center gap-1.5 border-b-2 border-cm-tan pb-1">
              <PixelIcon name="flask" size={14} />
              4. Fórmulas Alquímicas e Poções Táticas
            </h3>
            <div class="cm-bubble tail-left p-3 text-xs leading-relaxed text-cm-ink">
              Cada comandante recebe <strong>2 fórmulas alquímicas</strong> em sua bolsa. Durante a resolução, o algoritmo pausa nas <strong>Janelas de Intervenção Alpha</strong> (após nichos T(2)) e <strong>Beta</strong> (após fusão das alas). Você pode usá-las para alterar o peso de uma criatura ou permutar unidades vizinhas, manipulando as inversões antes dos merges finais!
            </div>
          </div>

          <!-- Rodapé com Botão -->
          <div class="pt-2 border-t-2 border-cm-tan flex justify-end">
            <button
              onclick={onClose}
              class="cm-btn px-6 py-2.5 text-xs sm:text-sm"
            >
              <PixelIcon name="sword" size={14} />
              <span>Entendido, Levantar Voo!</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
{/if}
