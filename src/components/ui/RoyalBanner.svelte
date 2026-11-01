<script lang="ts">
  // Banner superior azul royal com nuvens creme, estrelinhas e runas (ref 06).
  import Runes from './Runes.svelte';
  import CloudPuff from './CloudPuff.svelte';

  interface Props {
    runes: string;
    title?: string;
    subtitle?: string;
    onClose?: () => void;
    class?: string;
  }

  let { runes, title, subtitle, onClose, class: className = '' }: Props = $props();
</script>

<div class="cm-royal-banner px-4 pt-2.5 pb-2 {className}">
  <!-- nuvens creme laterais -->
  <CloudPuff tone="cream" class="absolute -left-3 -bottom-4 w-28 h-[72px] opacity-95" />
  <CloudPuff tone="cream" flip class="absolute -right-3 -bottom-4 w-28 h-[72px] opacity-95" />

  <!-- estrelinhas -->
  {#each [[17, 22], [26, 10], [78, 14], [86, 30], [70, 34]] as [x, y], i}
    <span
      class="absolute block bg-cm-cream {i % 2 ? 'cm-anim-blink' : ''}"
      style="left: {x}%; top: {y}%; width: 4px; height: 4px; box-shadow: 4px 0 0 #f2e5bf, -4px 0 0 #f2e5bf, 0 4px 0 #f2e5bf, 0 -4px 0 #f2e5bf; animation-delay: {i * 0.3}s"
    ></span>
  {/each}

  <div class="relative z-10 flex flex-col items-center text-center gap-1">
    <Runes text={runes} height={20} color="#f2e5bf" />
    {#if title}
      <h2 class="cm-title text-lg sm:text-xl text-white cm-outline-thin">{title}</h2>
    {/if}
    {#if subtitle}
      <p class="text-xs sm:text-[13px] text-[#dfe6ff] max-w-xl leading-snug">{subtitle}</p>
    {/if}
  </div>

  {#if onClose}
    <button
      onclick={onClose}
      class="absolute right-2 top-2 z-20 p-1 hover:-translate-y-px transition-transform"
      aria-label="Fechar"
    >
      <svg viewBox="0 0 10 10" width="18" height="18" style="shape-rendering: crispEdges">
        <path d="M1 1 L9 9 M9 1 L1 9" stroke="#2b3a80" stroke-width="2.2" />
      </svg>
    </button>
  {/if}
</div>
