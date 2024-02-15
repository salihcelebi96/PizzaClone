// vite.config.js

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react(),
  ],
  server: {
    fs: {
      allow: [
        'C:/Users/Çelebi/Github/salihcelebi96/zPizza/my-app/client',
        'C:/Users/Çelebi/Github/salihcelebi96/zPizza/my-app/client/node_modules/vite/dist/client',
      ],
    },
  },
});
