<script lang="ts">
  // Relógio-clima circular com tag pendurada por corrente (ref 01).
  import { onMount } from 'svelte';

  interface Props {
    tag: string;
    class?: string;
  }

  let { tag, class: className = '' }: Props = $props();

  let now = $state(new Date());

  onMount(() => {
    const id = setInterval(() => (now = new Date()), 15000);
    return () => clearInterval(id);
  });

  const hh = $derived(String(now.getHours()).padStart(2, '0'));
  const mm = $derived(String(now.getMinutes()).padStart(2, '0'));
  const isNight = $derived(now.getHours() < 6 || now.getHours() >= 19);
</script>

<div class="relative flex flex-col items-center select-none {className}">
  <!-- gancho -->
  <div class="w-3 h-3 bg-cm-brass border-[3px] border-cm-frame -mb-1 z-10"></div>

  <div class="relative w-[88px] h-[88px]">
    <svg viewBox="0 0 88 88" class="absolute inset-0 w-full h-full" style="shape-rendering: crispEdges">
      <defs>
        <clipPath id="cm-dial-clip"><circle cx="44" cy="44" r="31" /></clipPath>
      </defs>
      <!-- anel de latão -->
      <circle cx="44" cy="44" r="42" fill="#1e1d21" />
      <circle cx="44" cy="44" r="39" fill="#c9a456" />
      <circle cx="44" cy="44" r="39" fill="none" stroke="#f1d892" stroke-width="2" stroke-dasharray="40 200" transform="rotate(200 44 44)" />
      <circle cx="44" cy="44" r="34" fill="#1e1d21" />
      <!-- parafusos -->
      {#each [[44, 6], [82, 44], [44, 82], [6, 44]] as [x, y]}
        <rect x={x - 2.5} y={y - 2.5} width="5" height="5" fill="#85672c" stroke="#1e1d21" stroke-width="1" />
      {/each}

      <!-- mostrador céu -->
      <g clip-path="url(#cm-dial-clip)">
        {#if isNight}
          <rect x="0" y="0" width="88" height="88" fill="#1f2b5e" />
          <rect x="0" y="50" width="88" height="40" fill="#2c3d7a" />
          <circle cx="44" cy="26" r="7" fill="#f4efd6" />
          <circle cx="47" cy="24" r="6" fill="#1f2b5e" />
          <rect x="22" y="20" width="2" height="2" fill="#fff" />
          <rect x="62" y="30" width="2" height="2" fill="#fff" />
          <rect x="30" y="38" width="2" height="2" fill="#fff" />
        {:else}
          <rect x="0" y="0" width="88" height="88" fill="#3f9be0" />
          <rect x="0" y="36" width="88" height="14" fill="#6cb8ee" />
          <rect x="0" y="50" width="88" height="40" fill="#a9d8f5" />
          <circle cx="44" cy="24" r="9" fill="#ffe48a" />
          <circle cx="44" cy="24" r="6" fill="#fff6c8" />
        {/if}
        <!-- nuvens -->
        <g fill={isNight ? '#5468a8' : '#ffffff'}>
          <rect x="12" y="58" width="22" height="8" />
          <rect x="18" y="52" width="12" height="8" />
          <rect x="48" y="62" width="30" height="8" />
          <rect x="56" y="55" width="14" height="8" />
          <rect x="8" y="68" width="74" height="16" />
        </g>
      </g>
    </svg>

    <span class="absolute inset-0 flex items-center justify-center pt-2 text-[22px] font-bold text-white cm-outline tracking-tight">
      {hh}:{mm}
    </span>

    <!-- engrenagem-sol lateral -->
    <div class="absolute -left-6 bottom-0 w-9 h-9 rounded-full bg-[#3a3a3f] border-[3px] border-cm-frame flex items-center justify-center shadow-[inset_0_2px_0_#5c5c63]">
      <svg viewBox="0 0 10 10" class="w-5 h-5" style="shape-rendering: crispEdges">
        <rect x="4" y="0" width="2" height="2" fill="#f2e5bf" />
        <rect x="4" y="8" width="2" height="2" fill="#f2e5bf" />
        <rect x="0" y="4" width="2" height="2" fill="#f2e5bf" />
        <rect x="8" y="4" width="2" height="2" fill="#f2e5bf" />
        <rect x="1" y="1" width="2" height="2" fill="#f2e5bf" />
        <rect x="7" y="1" width="2" height="2" fill="#f2e5bf" />
        <rect x="1" y="7" width="2" height="2" fill="#f2e5bf" />
        <rect x="7" y="7" width="2" height="2" fill="#f2e5bf" />
        <rect x="3" y="3" width="4" height="4" fill="#f2e5bf" />
      </svg>
    </div>
  </div>

  <!-- corrente -->
  <svg viewBox="0 0 10 22" class="w-[10px] h-[22px] -my-0.5" aria-hidden="true">
    <rect x="2" y="0" width="6" height="7" rx="2" fill="none" stroke="#9aa0a8" stroke-width="2" />
    <rect x="3.5" y="7" width="3" height="8" fill="#5c6068" />
    <rect x="2" y="15" width="6" height="7" rx="2" fill="none" stroke="#9aa0a8" stroke-width="2" />
  </svg>

  <!-- tag -->
  <div class="px-2.5 py-1 min-w-12 text-center bg-cm-slate border-[3px] border-cm-frame rounded-[3px] shadow-[inset_0_0_0_2px_#5a5a62,0_3px_0_rgba(20,18,34,.35)]">
    <span class="text-[15px] font-bold text-white cm-outline-thin leading-none">{tag}</span>
  </div>
</div>
