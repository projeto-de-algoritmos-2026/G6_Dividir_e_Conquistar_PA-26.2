<script lang="ts">
  interface Props {
    character: string;
    class?: string;
  }

  let { character, class: className = 'w-full h-full' }: Props = $props();

  const ART_MAP: Record<string, { image: string; name: string }> = {
    wolf: { image: '/assets/cards/wolf_anthro.jpg', name: 'Fenrir Lupino' },
    wolf_leader: { image: '/assets/cards/wolf_anthro.jpg', name: 'Fenrir Lupino' },
    harpy: { image: '/assets/cards/harpy_anthro.jpg', name: 'Aria Harpia' },
    holstaur: { image: '/assets/cards/holstaur_anthro.jpg', name: 'Brena Holstaur' },
    holstaur_matriarch: { image: '/assets/cards/holstaur_anthro.jpg', name: 'Brena Holstaur' },
    bear: { image: '/assets/cards/bear_anthro.jpg', name: 'Korgn Urso' },
    cat: { image: '/assets/cards/cat_anthro.jpg', name: 'Elara Felina' },
    cat_mystic: { image: '/assets/cards/cat_anthro.jpg', name: 'Elara Felina' },
    dragon: { image: '/assets/cards/dragon_anthro.jpg', name: 'Kallista Draconiana' },
    kitsune: { image: '/assets/cards/kitsune_anthro.jpg', name: 'Kael Kitsune' },
    kitsune_alchemist: { image: '/assets/cards/kitsune_anthro.jpg', name: 'Kael Kitsune' },
  };

  const currentArt = $derived(
    ART_MAP[character] || { image: '/assets/cards/wolf_anthro.jpg', name: 'Guardião Anthro' }
  );

  let hasError = $state(false);
</script>

<div class="relative flex items-center justify-center overflow-hidden bg-[#181009] {className}">
  {#if !hasError}
    <img
      src={currentArt.image}
      alt={currentArt.name}
      class="w-full h-full object-cover object-top transition-transform duration-300 hover:scale-105"
      onerror={() => hasError = true}
      loading="lazy"
    />
    <!-- Vinheta Suave de Borda & Efeito de Profundidade Pastoral -->
    <div class="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/40 via-transparent to-black/10"></div>
  {:else}
    <!-- Fallback Elegante com Emblema Monocromático caso a imagem demore -->
    <div class="w-full h-full flex flex-col items-center justify-center p-2 text-center bg-[#251810] text-[#ffeaae]">
      <span class="text-2xl">🐾</span>
      <span class="text-[9px] font-serif font-black uppercase tracking-wider mt-1">{currentArt.name}</span>
    </div>
  {/if}
</div>
