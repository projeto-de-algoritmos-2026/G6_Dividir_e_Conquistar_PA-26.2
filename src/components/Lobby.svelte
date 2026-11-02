<script lang="ts">
  import type { Archetype } from '../lib/types';
  import { ARCHETYPES } from '../lib/engine/cards';
  import CharacterArt from './CharacterArt.svelte';
  import PixelIcon from './ui/PixelIcon.svelte';
  import Runes from './ui/Runes.svelte';
  import CloudPuff from './ui/CloudPuff.svelte';
  import Pennant from './ui/Pennant.svelte';
  import { ARCH_STYLE } from '../lib/ui/theme';

  interface Props {
    selectedArchetype: Archetype;
    onSelectArchetype: (archetype: Archetype) => void;
    onStartSolo: (botArchetype: Archetype) => void;
    onHostRoom: () => void;
    onJoinRoom: (code: string) => void;
    onOpenTutorial: () => void;
    isConnectingP2P: boolean;
    hostRoomCode: string;
    connectionError: string | null;
  }

  let {
    selectedArchetype,
    onSelectArchetype,
    onStartSolo,
    onHostRoom,
    onJoinRoom,
    onOpenTutorial,
    isConnectingP2P,
    hostRoomCode,
    connectionError
  }: Props = $props();

  const ORDER: Archetype[] = ['rajadas', 'raiz', 'zefiro', 'eter'];

  let inputJoinCode = $state('');
  let botArchetype = $state<Archetype>('raiz');
  let copiedLink = $state(false);
  let mode = $state<'solo' | 'p2p'>('solo');

  const meta = $derived(ARCHETYPES[selectedArchetype]);
  const style = $derived(ARCH_STYLE[selectedArchetype]);
  const botMeta = $derived(ARCHETYPES[botArchetype]);

  function cycle(dir: number) {
    const i = ORDER.indexOf(selectedArchetype);
    onSelectArchetype(ORDER[(i + dir + ORDER.length) % ORDER.length]);
  }

  function copyCode() {
    if (!hostRoomCode) return;
    navigator.clipboard.writeText(hostRoomCode);
    copiedLink = true;
    setTimeout(() => {
      copiedLink = false;
    }, 2000);
  }

  function handleJoinSubmit(e: Event) {
    e.preventDefault();
    if (inputJoinCode.trim().length >= 4) {
      onJoinRoom(inputJoinCode.trim().toUpperCase());
    }
  }

  const PASSIVE_LABEL: Record<Archetype, string> = {
    rajadas: 'Ultrapassagem',
    raiz: 'Pedágio',
    zefiro: 'Fluxo Sereno',
    eter: 'Mutação'
  };

  const IDEAL_ALA: Record<Archetype, string> = {
    rajadas: 'Ala Nascente',
    raiz: 'Ala Poente',
    zefiro: 'Ordem crescente',
    eter: 'Qualquer ala'
  };
</script>

<div class="relative w-full max-w-5xl mx-auto flex flex-col items-stretch gap-5 py-4 px-3 select-none">
  <!-- ============ TÍTULO EM CAIXA DE DIÁLOGO (ref 02) ============ -->
  <section class="cm-dialog cm-parch overflow-hidden px-6 sm:px-24 pt-7 pb-8 cm-anim-pop">
    <CloudPuff tone="sky" class="absolute -left-4 -top-6 w-36 h-24" flipY />
    <CloudPuff tone="sky" flip flipY class="absolute -right-4 -top-6 w-36 h-24" />

    <div class="absolute left-5 top-2 text-cm-ink-soft opacity-70">
      <Runes text="~skyward~" height={11} />
    </div>
    <div class="absolute right-5 top-2 text-cm-ink-soft opacity-70 hidden sm:block">
      <Runes text="beta 0.2" height={11} />
    </div>

    <div class="relative z-10 flex flex-col items-center text-center gap-2">
      <h1 class="cm-title text-4xl sm:text-6xl text-cm-ink drop-shadow-[3px_3px_0_#e2cf9c]">
        DIVIDE ET IMPERA
      </h1>
      <div class="flex items-center gap-2 text-cm-royal font-bold text-sm sm:text-base">
        <PixelIcon name="cloud" size={18} />
        <span>Skyward Inversions</span>
        <PixelIcon name="cloud" size={18} flip />
      </div>
      <p class="max-w-2xl text-[15px] sm:text-base text-cm-ink leading-snug mt-1">
        Duelos táticos nas ilhas flutuantes movidos pelo algoritmo de contagem de inversões
        <span class="text-cm-royal font-bold">O(n log n)</span>. Posicione suas criaturas nas alas e domine
        o Grande Vórtice.
      </p>
    </div>

    <!-- canto azul: manual -->
    <button
      onclick={onOpenTutorial}
      class="absolute -left-2 -bottom-3 w-32 h-20 group z-20"
      aria-label="Abrir manual"
      title="Manual algorítmico"
    >
      <CloudPuff tone="blue" class="absolute inset-0 w-full h-full" />
      <span class="absolute left-7 top-7 group-hover:-translate-y-0.5 transition-transform">
        <PixelIcon name="scroll" size={30} />
      </span>
    </button>

    <!-- canto terracota: avançar -->
    <a
      href="#cm-prep"
      class="absolute -right-2 -bottom-3 w-32 h-20 group z-20"
      aria-label="Ir para preparação"
      title="Preparar duelo"
    >
      <CloudPuff tone="red" flip class="absolute inset-0 w-full h-full" />
      <span
        class="absolute right-7 top-6 w-10 h-10 rounded-full border-[3px] border-[#f2e5bf] flex items-center justify-center group-hover:-translate-y-0.5 transition-transform"
      >
        <PixelIcon name="next" size={20} />
      </span>
    </a>

    <span class="absolute left-1/2 -translate-x-1/2 bottom-2 text-cm-ink-soft font-bold cm-anim-blink">»</span>
    <div class="cm-dialog-tab"></div>
  </section>

  <!-- ============ JANELA DE PREPARAÇÃO (ref 05) ============ -->
  <section id="cm-prep" class="flex flex-col items-center">
    <div class="cm-window w-full cm-anim-pop">
      <div class="cm-window-body is-dark p-3 sm:p-4 flex flex-col gap-4">
        <!-- Faixa de retratos -->
        <div class="flex items-center gap-2">
          <button class="text-cm-cream/70 hover:text-white p-1" onclick={() => cycle(-1)} aria-label="Anterior">
            <PixelIcon name="play" size={18} flip />
          </button>
          <div class="flex-1 grid grid-cols-4 gap-2 sm:gap-3">
            {#each ORDER as arch}
              {@const m = ARCHETYPES[arch]}
              <button
                onclick={() => onSelectArchetype(arch)}
                class="cm-slot-light h-14 sm:h-16 overflow-hidden relative transition-transform
                  {selectedArchetype === arch ? 'cm-gold-ring' : 'hover:-translate-y-0.5 opacity-80 hover:opacity-100'}"
                title={m.name}
              >
                <CharacterArt character={m.artKey} class="w-full h-full" />
                <span
                  class="absolute bottom-0 inset-x-0 h-1"
                  style="background: {ARCH_STYLE[arch].stripe}"
                ></span>
              </button>
            {/each}
          </div>
          <button class="text-cm-cream/70 hover:text-white p-1" onclick={() => cycle(1)} aria-label="Próximo">
            <PixelIcon name="play" size={18} />
          </button>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-4">
          <!-- ======= COLUNA ESQUERDA: GUARDIÃO ======= -->
          <div class="flex flex-col gap-2.5">
            <div class="text-[13px] text-cm-tan font-bold flex items-center gap-1.5">
              <PixelIcon name="paw" size={14} /> Seu Guardião
            </div>

            <!-- Retrato principal (preenche o container de ponta a ponta sem barras pretas) -->
            <div class="relative cm-slot h-52 sm:h-60 overflow-hidden" style="border-color: #c9b98c">
              {#key selectedArchetype}
                <div class="absolute inset-0 cm-anim-pop">
                  <CharacterArt character={meta.artKey} class="w-full h-full" />
                </div>
              {/key}
              <span class="absolute -top-[3px] -left-[3px] w-9 h-9 bg-cm-slate border-[3px] border-[#c9b98c] flex items-center justify-center z-20">
                <PixelIcon name={style.icon} size={18} />
              </span>
            </div>

            <!-- Placa de nome -->
            <div class="cm-slot px-3 py-2">
              <div class="font-bold text-[15px] text-white leading-tight">{meta.name}</div>
              <div class="text-xs text-cm-tan mt-0.5">{meta.subtitle}</div>
            </div>

            <!-- Barras -->
            <div class="flex flex-col gap-1.5">
              <div class="flex items-center gap-2">
                <span class="w-14 text-xs text-cm-tan">Vigor</span>
                <div class="cm-bar flex-1"><div class="cm-bar-fill is-hp" style="width: {style.vigor}%"></div></div>
              </div>
              <div class="flex items-center gap-2">
                <span class="w-14 text-xs text-cm-tan">Ímpeto</span>
                <div class="cm-bar flex-1"><div class="cm-bar-fill is-mp" style="width: {style.impeto}%"></div></div>
              </div>
            </div>

            <!-- Caixas de estatística -->
            <div class="grid grid-cols-2 gap-1.5 text-[13px]">
              <div class="cm-stat">
                <span class="cm-stat-icon" style="background:#f08a3c"><PixelIcon name="coin" size={14} /></span>
                <span class="truncate">Pesos {meta.weightRange}</span>
              </div>
              <div class="cm-stat">
                <span class="cm-stat-icon" style="background:#45c552"><PixelIcon name="heart" size={14} /></span>
                <span class="truncate">{PASSIVE_LABEL[selectedArchetype]}</span>
              </div>
              <div class="cm-stat">
                <span class="cm-stat-icon" style="background:#9a6be0"><PixelIcon name="eye" size={14} /></span>
                <span class="truncate">{meta.species}</span>
              </div>
              <div class="cm-stat">
                <span class="cm-stat-icon" style="background:#4f8fe0"><PixelIcon name="bolt" size={14} /></span>
                <span class="truncate">{IDEAL_ALA[selectedArchetype]}</span>
              </div>
            </div>

            <p class="text-[13px] text-cm-cream/85 leading-snug">{meta.description}</p>

            <!-- Fórmulas ocultas "?" -->
            <div class="flex items-center gap-2">
              {#each [0, 1, 2, 3] as i}
                <span class="cm-btn-blue w-11 h-11 text-lg cursor-help" title="Fórmula alquímica revelada durante o duelo">?</span>
              {/each}
              <button
                onclick={onOpenTutorial}
                class="ml-auto text-xs text-cm-tan hover:text-white underline underline-offset-4 flex items-center gap-1"
              >
                <PixelIcon name="scroll" size={14} /> Manual & táticas
              </button>
            </div>
          </div>

          <!-- ======= COLUNA DIREITA: MODO ======= -->
          <div class="flex flex-col gap-3 md:border-l-[3px] md:border-[#3c3c42] md:pl-4">
            {#if mode === 'solo'}
              <div class="text-[13px] text-cm-tan font-bold flex items-center gap-1.5">
                <PixelIcon name="sword" size={14} /> Oponente Autômato
              </div>

              <div class="grid grid-cols-4 gap-2">
                {#each ORDER as arch}
                  <button
                    onclick={() => (botArchetype = arch)}
                    class="cm-slot-light h-12 overflow-hidden relative
                      {botArchetype === arch ? 'cm-gold-ring' : 'opacity-70 hover:opacity-100'}"
                    title={ARCHETYPES[arch].name}
                  >
                    <CharacterArt character={ARCHETYPES[arch].artKey} class="w-full h-full" />
                  </button>
                {/each}
              </div>

              <div class="relative flex items-start justify-between gap-2 min-h-72">
                <div class="flex flex-col items-start gap-1 pt-4 z-10">
                  <PixelIcon name="flag" size={34} />
                  <span class="text-2xl font-bold text-[#bfbfc6] cm-outline-thin mt-1">Rodada</span>
                  <span class="text-2xl font-bold text-[#bfbfc6] cm-outline-thin -mt-1 pl-6">1</span>
                  <span class="text-7xl font-bold text-[#d4d4da] cm-outline italic -skew-x-12 leading-none mt-1">
                    VS
                  </span>
                  <div class="mt-3 cm-bubble tail-bottom px-3 py-2 text-[13px] max-w-44 leading-snug">
                    {botMeta.quote}
                  </div>
                </div>

                {#key botArchetype}
                  <Pennant emblem={ARCH_STYLE[botArchetype].emblem} class="w-36 sm:w-44 h-auto shrink-0 -mt-1" />
                {/key}
              </div>

              <div class="text-center text-xs text-cm-tan -mt-1">
                Enfrentando: <span class="text-white font-bold">{botMeta.name}</span>
              </div>

              <button
                onclick={() => onStartSolo(botArchetype)}
                class="cm-btn w-full py-3 text-base"
              >
                <PixelIcon name="sword" size={18} /> Decolar em Voo Solo
              </button>
            {:else}
              <div class="text-[13px] text-cm-tan font-bold flex items-center gap-1.5">
                <PixelIcon name="net" size={14} /> Multiplayer P2P (WebRTC)
              </div>

              <div class="cm-dialog cm-parch px-4 py-4 flex flex-col gap-3">
                <p class="text-[14px] leading-snug">
                  Duelo direto entre navegadores. O anfitrião gera um código de 5 letras e o rival se conecta em
                  tempo real — sem servidor.
                </p>

                {#if hostRoomCode}
                  <div class="flex flex-col items-center gap-2 text-center">
                    <span class="text-[13px] font-bold">Envie este código ao seu adversário:</span>
                    <div class="cm-royal-banner border-[3px] border-cm-frame px-5 py-2 rounded-[3px]">
                      <span class="relative z-10 text-3xl font-bold tracking-[0.3em] text-white cm-outline-thin">
                        {hostRoomCode}
                      </span>
                    </div>
                    <button onclick={copyCode} class="cm-btn px-4 py-2 text-sm">
                      <PixelIcon name="scroll" size={14} />
                      {copiedLink ? 'Copiado!' : 'Copiar código'}
                    </button>
                    <div class="flex items-center gap-2 text-[13px] text-cm-ink-soft">
                      <span class="w-2.5 h-2.5 bg-cm-hp border-2 border-cm-frame cm-anim-blink"></span>
                      Aguardando oponente atracar na doca aérea…
                    </div>
                  </div>
                {:else}
                  <button onclick={onHostRoom} disabled={isConnectingP2P} class="cm-btn w-full py-2.5 text-sm">
                    <PixelIcon name="flag" size={16} />
                    {isConnectingP2P ? 'Ancorando sala…' : 'Criar nova sala'}
                  </button>

                  <div class="cm-divider text-cm-royal text-xs font-bold">ou</div>

                  <form onsubmit={handleJoinSubmit} class="flex items-stretch gap-2">
                    <input
                      type="text"
                      maxlength="5"
                      placeholder="SKYWD"
                      bind:value={inputJoinCode}
                      class="flex-1 min-w-0 uppercase tracking-[0.3em] text-center px-3 py-2 bg-cm-parch-hi border-[3px] border-cm-frame rounded-[3px] text-cm-ink placeholder:text-cm-tan-dark text-lg font-bold focus:outline-4 focus:outline-cm-gold"
                    />
                    <button
                      type="submit"
                      disabled={isConnectingP2P || inputJoinCode.trim().length < 4}
                      class="cm-btn-dark px-4 text-sm"
                    >
                      Conectar
                    </button>
                  </form>
                {/if}

                {#if connectionError}
                  <div class="cm-bubble px-3 py-2 text-[13px] !bg-[#f6b8a8] !border-cm-terra">
                    {connectionError}
                  </div>
                {/if}
              </div>

              <div class="flex items-end justify-center gap-4 mt-auto">
                <Pennant emblem={style.emblem} class="w-24 h-auto" />
                <span class="text-5xl font-bold text-[#d4d4da] cm-outline italic -skew-x-12 pb-12">VS</span>
                <Pennant emblem="star" tone="red" class="w-24 h-auto" />
              </div>
            {/if}
          </div>
        </div>
      </div>
    </div>

    <!-- Aba inferior com botões (ref 05) -->
    <div
      class="-mt-[5px] z-10 bg-cm-tan border-[5px] border-t-0 border-cm-frame rounded-b-[10px] px-3 pt-3 pb-3 flex gap-3 shadow-[inset_0_-3px_0_#a8925f,0_6px_0_rgba(20,18,34,.35)]"
    >
      <button
        onclick={() => (mode = 'solo')}
        class="{mode === 'solo' ? 'cm-btn' : 'cm-btn-dark'} w-36 sm:w-48 py-3 text-sm sm:text-base"
      >
        <PixelIcon name="sword" size={16} /> Duelo Solo
      </button>
      <button
        onclick={() => (mode = 'p2p')}
        class="{mode === 'p2p' ? 'cm-btn' : 'cm-btn-dark'} w-36 sm:w-48 py-3 text-sm sm:text-base"
      >
        <PixelIcon name="net" size={16} /> Multiplayer
      </button>
    </div>
  </section>
</div>
