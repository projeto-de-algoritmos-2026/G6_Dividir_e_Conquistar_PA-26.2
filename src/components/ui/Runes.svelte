<script lang="ts">
  // Escrita rúnica decorativa de Cloud Meadow (refs 02 e 06).
  // Cada letra vira um glifo determinístico desenhado com traços grossos.
  interface Props {
    text: string;
    height?: number;
    class?: string;
    color?: string;
  }

  let { text, height = 22, class: className = '', color = 'currentColor' }: Props = $props();

  // Glifos numa grade 4x6 (polilinhas)
  const GLYPHS: number[][][] = [
    [[0, 0], [0, 6], [4, 6]],
    [[0, 0], [4, 0], [4, 3], [0, 3], [0, 6], [4, 6]],
    [[0, 0], [0, 6], [4, 6], [4, 0]],
    [[0, 6], [2, 0], [4, 6], [1, 3], [3, 3]],
    [[0, 1], [2, 0], [4, 1], [4, 6], [0, 6]],
    [[0, 0], [4, 0], [2, 0], [2, 6], [0, 6], [4, 6]],
    [[4, 0], [0, 0], [0, 6], [4, 6], [4, 3], [2, 3]],
    [[0, 0], [0, 6], [0, 3], [4, 0], [0, 3], [4, 6]],
    [[0, 3], [2, 0], [4, 3], [2, 6], [0, 3]],
    [[0, 0], [2, 3], [4, 0], [2, 3], [2, 6]],
    [[0, 6], [0, 2], [2, 0], [4, 2], [4, 6], [0, 4]],
    [[0, 0], [4, 0], [0, 6], [4, 6]],
    [[0, 0], [0, 6], [2, 4], [4, 6], [4, 0]],
    [[1, 0], [1, 6], [3, 6], [3, 0], [1, 2]],
    [[0, 2], [4, 2], [0, 4], [4, 4], [2, 0], [2, 6]],
    [[4, 0], [0, 2], [4, 4], [0, 6]]
  ];

  const ADVANCE = 6.5;

  const chars = $derived(Array.from(text));
  const width = $derived(Math.max(1, chars.length) * ADVANCE);

  function glyphFor(ch: string): number[][] | null {
    if (ch === ' ') return null;
    const code = ch.toLowerCase().charCodeAt(0);
    return GLYPHS[(code * 7 + 3) % GLYPHS.length];
  }

  function pts(g: number[][], offset: number): string {
    return g.map(([x, y]) => `${x + offset + 1},${y + 1}`).join(' ');
  }
</script>

<svg
  viewBox="0 0 {width} 8"
  height={height}
  width={(height / 8) * width}
  class="inline-block shrink-0 {className}"
  aria-hidden="true"
>
  {#each chars as ch, i}
    {@const g = glyphFor(ch)}
    {#if g}
      <polyline
        points={pts(g, i * ADVANCE)}
        fill="none"
        stroke={color}
        stroke-width="1.15"
        stroke-linecap="square"
        stroke-linejoin="miter"
      />
    {/if}
  {/each}
</svg>
