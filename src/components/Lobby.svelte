<script lang="ts">
  import type { Archetype } from '../lib/types';
  import { ARCHETYPES } from '../lib/engine/cards';
  import { soundscape } from '../lib/audio/soundscape';
  import AnthroArt from './AnthroArt.svelte';

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

  let inputJoinCode = $state('');
  let botArchetype = $state<Archetype>('raiz');
  let copiedLink = $state(false);

  function copyCode() {
    if (!hostRoomCode) return;
    navigator.clipboard.writeText(hostRoomCode);
    copiedLink = true;
    setTimeout(() => { copiedLink = false; }, 2000);
  }

  function handleJoinSubmit(e: Event) {
    e.preventDefault();
    if (inputJoinCode.trim().length >= 4) {
      onJoinRoom(inputJoinCode.trim().toUpperCase());
    }
  }
</script>

<div class="relative w-full max-w-5xl mx-auto flex flex-col items-center gap-5 py-4 px-3 select-none">
  <!-- CABEÇALHO PRINCIPAL ESTILO CLOUD MEADOW (FRONTEIRA CELESTE) -->
  <div class="text-center flex flex-col items-center gap-1.5">
    <div class="inline-flex items-center gap-2 px-3.5 py-0.5 rounded-full bg-gradient-to-r from-[#442b15] via-[#8c6d44] to-[#442b15] border border-[#ffeaae] text-[#ffeaae] text-[11px] font-mono font-black tracking-widest uppercase shadow-lg">
      <span>☁️ Cloud Meadow • Anthro Monster Edition</span>
    </div>

    <h1 class="text-3xl md:text-5xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-[#fff6db] via-[#f5d07c] to-[#996a1a] drop-shadow-md font-serif">
      DIVIDE ET IMPERA
    </h1>
    <div class="text-xs md:text-sm font-black tracking-widest text-[#d4a34b] font-mono">
      SKYWARD INVERSIONS <span class="text-stone-500">•</span> MONSTROS ANTHRO DA PRADARIA
    </div>
    <p class="max-w-lg text-xs text-[#c9b596] mt-0.5 font-sans leading-relaxed">
      Duelos táticos inspirados no universo das ilhas flutuantes de Cloud Meadow, movidos pela execução cinética do algoritmo de contagem de inversões <span class="font-mono text-[#ffeaae] font-bold">O(n log n)</span>.
    </p>
  </div>

  <!-- OS 4 GRIMÓRIOS DAS ESPÉCIES ANTHRO FURRY -->
  <div class="w-full flex flex-col gap-2.5">
    <div class="flex items-center justify-between border-b-2 border-[#5a3c26] pb-1.5">
      <h2 class="text-sm md:text-base font-black text-[#ffeaae] font-serif flex items-center gap-2">
        <span>🐾</span> Escolha seu Guardião Anthro
      </h2>
      <button
        onclick={onOpenTutorial}
        class="text-xs font-bold text-[#ffd369] hover:text-[#fff2c4] underline flex items-center gap-1 font-serif"
      >
        <span>📖</span> Manual Algorítmico & Táticas
      </button>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
      {#each (['rajadas', 'raiz', 'zefiro', 'eter'] as Archetype[]) as arch}
        {@const meta = ARCHETYPES[arch]}
        <!-- svelte-ignore a11y_click_events_have_key_events -->
        <!-- svelte-ignore a11y_no_static_element_interactions -->
        <div
          onclick={() => onSelectArchetype(arch)}
          class="cursor-pointer transition-all duration-200 rounded-3xl p-3.5 cloud-wood-panel border-2 flex flex-col justify-between text-left relative overflow-hidden group
            {selectedArchetype === arch
              ? 'border-[#ffeaae] ring-4 ring-[#ffd369]/70 scale-[1.02] shadow-2xl z-10'
              : 'border-[#6e4e30] hover:border-[#d4a34b] hover:-translate-y-1'}"
        >
          <!-- Badge de Selecionado em Latão -->
          {#if selectedArchetype === arch}
            <div class="absolute top-2 right-2 px-2.5 py-0.5 rounded-full cloud-btn-brass text-[8.5px] uppercase tracking-wider z-20 shadow">
              Ativo
            </div>
          {/if}

          <div>
            <!-- Retrato Ilustrado do Personagem Anthro Furry do Deck -->
            <div class="w-full h-36 rounded-2xl overflow-hidden border-2 border-[#8c6d44] mb-2.5 relative bg-[#170f09] group-hover:border-[#ffeaae] transition-colors shadow-inner">
              <AnthroArt character={meta.artKey} class="w-full h-full" />
              <span class="absolute bottom-1.5 left-2 px-2 py-0.5 rounded-md bg-stone-950/85 border border-[#b4925e] text-[#f7e3ba] text-[9px] font-black uppercase tracking-wider backdrop-blur-sm z-10">
                {meta.species}
              </span>
            </div>

            <!-- Título e Subtítulo -->
            <div>
              <h3 class="font-black text-xs sm:text-sm text-[#ffeaae] font-serif group-hover:text-amber-200 transition-colors leading-tight">
                {meta.name}
              </h3>
              <div class="text-[9.5px] font-mono font-bold {meta.themeColor} mt-0.5">
                {meta.subtitle}
              </div>
            </div>

            <p class="text-[10px] text-[#c9b596] leading-relaxed my-1.5 line-clamp-3">
              {meta.description}
            </p>
          </div>

          <div class="pt-1.5 border-t border-[#5a3c26] flex items-center justify-between text-[10px] font-mono text-[#c9b596]">
            <span>Pesos: <strong class="text-[#ffeaae]">{meta.weightRange}</strong></span>
            <span class="text-xs">{arch === 'rajadas' ? '🐺' : arch === 'raiz' ? '🐮' : arch === 'zefiro' ? '🐱' : '🦊'}</span>
          </div>
        </div>
      {/each}
    </div>
  </div>

  <!-- MODOS DE JOGO: SOLO VS AUTÔMATO OU MULTIPLAYER P2P -->
  <div class="w-full grid grid-cols-1 md:grid-cols-2 gap-3 mt-1">
    <!-- MODO SOLO (BOT HEURÍSTICO) -->
    <div class="rounded-2xl p-5 cloud-wood-panel border-2 border-[#8c6d44] shadow-2xl flex flex-col justify-between gap-3">
      <div class="flex flex-col gap-1.5">
        <div class="flex items-center gap-2 text-[#ffeaae] font-black text-base font-serif">
          <span class="text-xl">⚔️</span>
          <h3>Duelo Solo vs Autômato Local</h3>
        </div>
        <p class="text-xs text-[#c9b596] leading-relaxed">
          Enfrente uma inteligência heurística em TypeScript executada no próprio navegador. O bot calcula a melhor jogada simulando a árvore rasa de inversões com seu monstro anthro.
        </p>

        <!-- Seleção do Grimório do Bot -->
        <div class="mt-1 flex flex-col gap-1">
          <span class="text-[10px] font-mono uppercase tracking-wider text-[#d4a34b] font-bold">
            Guardião Anthro do Oponente:
          </span>
          <div class="grid grid-cols-2 gap-1.5">
            {#each (['rajadas', 'raiz', 'zefiro', 'eter'] as Archetype[]) as arch}
              <button
                onclick={() => botArchetype = arch}
                class="px-3 py-1.5 rounded-xl text-xs font-serif font-bold border transition-all text-left flex items-center justify-between
                  {botArchetype === arch
                    ? 'cloud-btn-brass text-stone-950 shadow'
                    : 'cloud-btn-wood text-[#c9b596]'}"
              >
                <span>{ARCHETYPES[arch].name.split(' ')[0]}</span>
                <span class="text-xs">{arch === 'rajadas' ? '🐺' : arch === 'raiz' ? '🐮' : arch === 'zefiro' ? '🐱' : '🦊'}</span>
              </button>
            {/each}
          </div>
        </div>
      </div>

      <button
        onclick={() => onStartSolo(botArchetype)}
        class="w-full py-3.5 rounded-xl cloud-btn-brass font-black text-xs uppercase tracking-wider shadow-xl active:scale-98"
      >
        Decolar em Voo Solo ⚔️
      </button>
    </div>

    <!-- MODO MULTIPLAYER P2P (WEBRTC ZERO BACKEND) -->
    <div class="rounded-2xl p-5 cloud-wood-panel border-2 border-[#8c6d44] shadow-2xl flex flex-col justify-between gap-3">
      <div class="flex flex-col gap-1.5">
        <div class="flex items-center gap-2 text-sky-300 font-black text-base font-serif">
          <span class="text-xl">🌐</span>
          <h3>Multiplayer P2P (WebRTC Zepelim)</h3>
        </div>
        <p class="text-xs text-[#c9b596] leading-relaxed">
          Conexão direta entre navegadores via PeerJS DataConnection. O Jogador 1 gera um código de 5 letras e o Jogador 2 conecta em tempo real sem servidor dedicado.
        </p>

        <!-- Área de Código P2P -->
        {#if hostRoomCode}
          <div class="mt-1 p-3 rounded-xl cloud-parchment border-2 border-[#8c6d44] flex flex-col items-center gap-1.5 text-center animate-fadeIn shadow-inner">
            <span class="text-xs text-[#5a3810] font-bold">Transmita este código ao seu adversário:</span>
            <div class="text-2xl font-mono font-black tracking-widest text-[#2e1d11] bg-[#ffe7a3] px-5 py-1 rounded-xl border-2 border-[#b0966d] shadow-inner">
              {hostRoomCode}
            </div>
            <button
              onclick={copyCode}
              class="px-3.5 py-1 rounded-xl cloud-btn-brass text-xs active:scale-95 flex items-center gap-1.5"
            >
              <span>{copiedLink ? '✓ Copiado!' : '📋 Copiar Código da Sala'}</span>
            </button>
            <div class="flex items-center gap-2 text-[10px] text-[#785b3b] animate-pulse mt-0.5">
              <span class="w-2.5 h-2.5 rounded-full bg-emerald-600"></span>
              <span>Aguardando oponente se conectar à doca aérea...</span>
            </div>
          </div>
        {:else}
          <div class="flex flex-col gap-2 mt-1">
            <button
              onclick={onHostRoom}
              disabled={isConnectingP2P}
              class="w-full py-3 rounded-xl cloud-btn-brass text-xs uppercase tracking-wider shadow-lg active:scale-98"
            >
              {isConnectingP2P ? 'Ancorando Sala P2P...' : 'Criar Nova Sala (Código 5 Letras)'}
            </button>

            <!-- Entrar com Código Existente -->
            <form onsubmit={handleJoinSubmit} class="flex items-center gap-2">
              <input
                type="text"
                maxlength="5"
                placeholder="Ex: SKYWD"
                bind:value={inputJoinCode}
                class="flex-1 uppercase font-mono tracking-widest text-center px-3 py-2.5 rounded-xl bg-[#120b07] border-2 border-[#785328] text-[#ffeaae] placeholder:text-[#5a3810] text-sm focus:outline-none focus:border-[#ffd369]"
              />
              <button
                type="submit"
                disabled={isConnectingP2P || inputJoinCode.trim().length < 4}
                class="px-4 py-2.5 rounded-xl cloud-btn-wood disabled:opacity-50 text-xs uppercase tracking-wider font-bold active:scale-98"
              >
                Conectar
              </button>
            </form>
          </div>
        {/if}

        {#if connectionError}
          <div class="text-xs text-rose-300 bg-rose-950/80 p-2.5 rounded-xl border border-rose-800 text-center">
            {connectionError}
          </div>
        {/if}
      </div>

      <div class="text-[10px] text-[#785328] text-center font-mono font-bold">
        WebRTC DataChannel 1v1 • Zero Infraestrutura & Zero Backend
      </div>
    </div>
  </div>
</div>
