import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';

const page = (name: string) => fileURLToPath(new URL(name, import.meta.url));

export default defineConfig({
  base: './',
  build: {
    rollupOptions: {
      input: {
        index: page('index.html'),
        oneshot: page('01-oneshot.html'),
        paint: page('02-paint-event.html'),
        transform: page('03-transform-sync.html'),
      },
    },
  },
});
