import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { copyFileSync } from 'node:fs';

export default defineConfig({
  plugins: [
    vue()
  ],
  ssgOptions: {
    script: 'async',
    formatting: 'minify',
    onFinished() {
      // robots.txt is served from public/ and copied to dist/ automatically by Vite.
      // This hook only handles 404.html, which GitHub Pages requires for client-side
      // routing to work correctly on direct URL navigation and page refresh.
      copyFileSync('dist/index.html', 'dist/404.html');
    }
  }
});
