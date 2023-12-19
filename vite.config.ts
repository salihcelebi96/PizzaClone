import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import ViteStyleImport from 'vite-plugin-style-import';

export default defineConfig({
  plugins: [
    react(),
    ViteStyleImport({
      libs: [
        {
          libraryName: 'slick-carousel',
          esModule: true,
          resolveStyle: (name) => {
            return `slick-carousel/slick/${name}.css`;
          },
        },
      ],
    }),
  ],
  server: {
    port: 3000,
  },
});
