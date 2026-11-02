import { defineConfig } from 'astro/config';
import svelte from '@astrojs/svelte';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  // Publicado no GitHub Pages em projeto-de-algoritmos-2026.github.io/G6_Dividir_e_Conquistar_PA-26.2/
  site: 'https://projeto-de-algoritmos-2026.github.io',
  base: '/G6_Dividir_e_Conquistar_PA-26.2/',
  output: 'static',
  integrations: [svelte()],
  vite: {
    plugins: [tailwindcss()]
  }
});
