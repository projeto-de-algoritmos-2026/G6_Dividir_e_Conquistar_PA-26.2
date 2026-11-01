<script lang="ts">
  // Céu pastoral com nuvens pixel e ilhas flutuantes ao fundo.
  const clouds = [
    { top: 6, scale: 1.4, dur: 140, delay: -20, opacity: 0.95 },
    { top: 18, scale: 0.9, dur: 190, delay: -120, opacity: 0.8 },
    { top: 34, scale: 1.1, dur: 160, delay: -70, opacity: 0.85 },
    { top: 52, scale: 0.7, dur: 220, delay: -160, opacity: 0.7 },
    { top: 66, scale: 1.6, dur: 180, delay: -40, opacity: 0.9 },
    { top: 80, scale: 1, dur: 200, delay: -100, opacity: 0.75 }
  ];

  const islands = [
    { left: 6, bottom: 14, w: 120, delay: 0 },
    { left: 78, bottom: 26, w: 90, delay: -1.5 },
    { left: 46, bottom: 6, w: 70, delay: -0.7 }
  ];
</script>

<div class="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
  {#each clouds as c}
    <div
      class="absolute left-0"
      style="top: {c.top}%; opacity: {c.opacity}; animation: cm-drift {c.dur}s linear {c.delay}s infinite;"
    >
      <svg
        viewBox="0 0 48 18"
        width={48 * 4 * c.scale}
        height={18 * 4 * c.scale}
        style="shape-rendering: crispEdges"
      >
        <rect x="10" y="4" width="10" height="4" fill="#ffffff" />
        <rect x="18" y="0" width="12" height="6" fill="#ffffff" />
        <rect x="28" y="3" width="10" height="5" fill="#ffffff" />
        <rect x="4" y="8" width="40" height="5" fill="#ffffff" />
        <rect x="0" y="12" width="48" height="4" fill="#ffffff" />
        <rect x="0" y="15" width="48" height="3" fill="#cfe6f6" />
        <rect x="6" y="13" width="10" height="2" fill="#e4f1fa" />
        <rect x="30" y="13" width="12" height="2" fill="#e4f1fa" />
      </svg>
    </div>
  {/each}

  {#each islands as isl}
    <div
      class="absolute cm-anim-bob"
      style="left: {isl.left}%; bottom: {isl.bottom}%; animation-duration: 3.2s; animation-delay: {isl.delay}s; opacity: .55"
    >
      <svg viewBox="0 0 30 16" width={isl.w} height={(isl.w * 16) / 30} style="shape-rendering: crispEdges">
        <rect x="0" y="2" width="30" height="3" fill="#6cbf5a" />
        <rect x="2" y="0" width="8" height="2" fill="#4f9a45" />
        <rect x="18" y="0" width="6" height="2" fill="#4f9a45" />
        <rect x="1" y="5" width="28" height="3" fill="#a06a43" />
        <rect x="4" y="8" width="22" height="3" fill="#8a5a3b" />
        <rect x="8" y="11" width="14" height="2" fill="#6e4530" />
        <rect x="12" y="13" width="6" height="3" fill="#5a3826" />
      </svg>
    </div>
  {/each}
</div>
