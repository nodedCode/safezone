import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import Sitemap from 'vite-plugin-sitemap';
import { copyFileSync, writeFileSync } from 'node:fs';

export default defineConfig({
  plugins: [
    vue(),
    Sitemap({
      hostname: 'https://safezone.nodedcode.studio',
      dynamicRoutes: ['/']
    })
  ],
  ssgOptions: {
    script: 'async',
    formatting: 'minify',
    onFinished() {
      // 1. Generate robots.txt
      writeFileSync(
        'dist/robots.txt',
        'User-agent: *\nAllow: /\nSitemap: https://safezone.nodedcode.studio/sitemap.xml'
      );
      // 2. Generate 404.html (Crucial for GitHub Pages deep linking)
      copyFileSync('dist/index.html', 'dist/404.html');
    }
  }
});
