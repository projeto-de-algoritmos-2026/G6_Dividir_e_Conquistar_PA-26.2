<script lang="ts">
  // Estandarte de torneio pendurado (ref 05): azul, bordas creme, costuras e emblema.
  interface Props {
    emblem?: 'sword' | 'shield' | 'leaf' | 'flask' | 'star';
    tone?: 'blue' | 'red';
    class?: string;
    sway?: boolean;
  }

  let { emblem = 'sword', tone = 'blue', class: className = '', sway = true }: Props = $props();

  const TONES = {
    blue: { main: '#3a7bbd', fold: '#2f69a6', crease: '#24548a', stitch: '#16243e' },
    red: { main: '#c0533a', fold: '#a5432e', crease: '#7f3022', stitch: '#3a140d' }
  };
  const t = $derived(TONES[tone]);
  const cream = '#f2e5bf';
</script>

<svg
  viewBox="0 0 200 380"
  class="{sway ? 'cm-anim-sway' : ''} {className}"
  aria-hidden="true"
>
  <!-- haste -->
  <rect x="0" y="0" width="200" height="8" fill="#1e1d21" />
  <rect x="2" y="2" width="196" height="3" fill="#5a5a62" />

  <!-- tecido -->
  <path
    d="M8 8 H192 V338 Q176 352 160 342 Q140 330 120 344 Q100 356 80 344 Q60 332 40 346 Q24 354 8 342 Q14 180 8 8 Z"
    fill={t.main}
    stroke="#1e1d21"
    stroke-width="3"
  />
  <!-- dobra sombreada à direita -->
  <path d="M150 8 H192 V338 Q176 352 160 342 Q164 200 150 8 Z" fill={t.fold} />
  <path d="M60 30 Q66 160 54 330" stroke={t.crease} stroke-width="3" fill="none" opacity="0.55" />
  <path d="M146 40 Q150 140 140 250" stroke={t.crease} stroke-width="3" fill="none" opacity="0.5" />
  <path d="M110 260 l-14 22 m26 -14 l-10 18" stroke={t.crease} stroke-width="3" fill="none" opacity="0.6" />

  <!-- bordas creme -->
  <path d="M16 12 Q22 180 16 340" stroke={cream} stroke-width="6" fill="none" />
  <path d="M184 12 V336" stroke={cream} stroke-width="6" fill="none" />
  <rect x="10" y="10" width="180" height="5" fill={cream} />

  <!-- costuras pontilhadas -->
  <path d="M10 44 Q100 76 190 34" stroke={t.stitch} stroke-width="2.5" fill="none" stroke-dasharray="7 6" />
  <path d="M10 300 Q100 326 190 288" stroke={t.stitch} stroke-width="2.5" fill="none" stroke-dasharray="7 6" />

  <!-- emblema -->
  <path
    d="M100 112 C140 110 164 140 162 176 C160 214 134 238 98 236 C62 234 38 208 40 172 C42 136 66 113 100 112 Z"
    fill="none"
    stroke={cream}
    stroke-width="9"
  />

  {#if emblem === 'sword'}
    <g transform="rotate(38 100 175)">
      <polygon points="91,190 91,128 100,112 109,128 109,190" fill={cream} />
      <polygon points="100,116 104,128 104,188 100,188" fill={t.main} opacity="0.35" />
      <rect x="76" y="188" width="48" height="10" fill={cream} />
      <rect x="95" y="198" width="10" height="22" fill={cream} />
      <rect x="91" y="220" width="18" height="9" fill={cream} />
    </g>
  {:else if emblem === 'shield'}
    <path d="M68 132 H132 V172 Q132 206 100 222 Q68 206 68 172 Z" fill={cream} />
    <path d="M100 140 V210 M76 168 H124" stroke={t.main} stroke-width="7" />
  {:else if emblem === 'leaf'}
    <path d="M66 214 Q64 140 138 130 Q140 204 66 214 Z" fill={cream} />
    <path d="M70 210 Q100 176 128 140" stroke={t.main} stroke-width="5" fill="none" />
    <path d="M92 186 l-12 -12 M106 168 l-6 -16 M104 176 l16 2" stroke={t.main} stroke-width="4" fill="none" />
  {:else if emblem === 'flask'}
    <rect x="90" y="126" width="20" height="34" fill={cream} />
    <rect x="84" y="122" width="32" height="8" fill={cream} />
    <circle cx="100" cy="190" r="34" fill={cream} />
    <path d="M70 196 Q100 182 130 196" stroke={t.main} stroke-width="6" fill="none" />
    <circle cx="90" cy="206" r="5" fill={t.main} />
    <circle cx="108" cy="212" r="3" fill={t.main} />
  {:else}
    <polygon
      points="100,124 112,160 150,160 120,182 131,218 100,196 69,218 80,182 50,160 88,160"
      fill={cream}
    />
  {/if}

  <!-- pingentes na barra -->
  {#each [28, 64, 100, 136, 172] as x, i}
    <rect x={x - 2} y={340 + (i % 2) * 6} width="5" height="12" fill={cream} stroke="#1e1d21" stroke-width="1.5" />
  {/each}
</svg>
