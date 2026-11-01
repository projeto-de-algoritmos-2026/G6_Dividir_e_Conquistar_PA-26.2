<script lang="ts">
  import { iconRects } from '../../lib/ui/pixelIcons';

  interface Props {
    name: string;
    size?: number;
    flip?: boolean;
    class?: string;
    title?: string;
  }

  let { name, size = 20, flip = false, class: className = '', title }: Props = $props();

  const rects = $derived(iconRects(name));
</script>

<svg
  viewBox="0 0 10 10"
  width={size}
  height={size}
  class="inline-block shrink-0 {className}"
  style="shape-rendering: crispEdges; image-rendering: pixelated; {flip ? 'transform: scaleX(-1);' : ''}"
  role={title ? 'img' : 'presentation'}
  aria-hidden={title ? undefined : 'true'}
  aria-label={title}
>
  {#each rects as r}
    <rect x={r.x} y={r.y} width="1.02" height="1.02" fill={r.fill} />
  {/each}
</svg>
