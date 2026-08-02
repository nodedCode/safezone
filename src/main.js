import { ViteSSG } from 'vite-ssg';
import App from './App.vue';
import { createHead } from '@unhead/vue';
import './assets/styles.css';

const routes = [
  { path: '/', component: App }
];

export const createApp = ViteSSG(
  App,
  { routes },
  ({ app, router, head, isClient }) => {
    // Optionally install plugins here if needed
  }
);
