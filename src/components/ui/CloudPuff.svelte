<script lang="ts">
  // Nuvem estilizada de canto (ref 02: cantos azul/terracota; ref 06: nuvens creme no banner)
  interface Props {
    tone?: 'blue' | 'red' | 'sky' | 'cream';
    flip?: boolean;
    flipY?: boolean;
    class?: string;
  }

  let { tone = 'blue', flip = false, flipY = false, class: className = '' }: Props = $props();

  const TONES = {
    blue: { main: '#3d5d94', hi: '#5f80b8', line: '#a7c6e6' },
    red: { main: '#8e3b2c', hi: '#a9523e', line: '#e3a184' },
    sky: { main: '#a7c6e6', hi: '#c6dcf2', line: '#ffffff' },
    cream: { main: '#f2e5bf', hi: '#fff8e4', line: '#ffffff' }
  };

  const t = $derived(TONES[tone]);
  const transform = $derived(
    `${flip ? 'scaleX(-1)' : ''} ${flipY ? 'scaleY(-1)' : ''}`.trim() || 'none'
  );
</script>

<svg
  viewBox="0 0 140 90"
  class="pointer-events-none {className}"
  style="transform: {transform}"
  aria-hidden="true"
>
  <g fill={t.main}>
    <circle cx="18" cy="64" r="30" />
    <circle cx="52" cy="50" r="27" />
    <circle cx="86" cy="60" r="24" />
    <circle cx="116" cy="70" r="20" />
    <circle cx="34" cy="30" r="18" />
    <circle cx="70" cy="30" r="14" />
    <rect x="0" y="62" width="140" height="28" />
  </g>
  <g fill={t.hi}>
    <circle cx="30" cy="34" r="10" />
    <circle cx="56" cy="44" r="13" />
    <circle cx="90" cy="58" r="10" />
  </g>
  <g fill="none" stroke={t.line} stroke-width="3" stroke-linecap="round">
    <path d="M20 46 q10 -14 22 -4" />
    <path d="M44 34 q12 -12 24 0" />
    <path d="M70 52 q10 -10 22 0 q6 6 0 12" />
    <path d="M104 64 q8 -8 16 0" />
    <path d="M8 72 q8 -6 14 0" />
  </g>
</svg>
