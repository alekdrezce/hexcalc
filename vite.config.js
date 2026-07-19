import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  // Base en '/' para evitar conflictos de ruteo durante el desarrollo
  base: '/',
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'HexCalc',
        short_name: 'HexCalc',
        theme_color: '#000000',
        icons: [
          { src: 'pwa-192x192.png', sizes: '192x192', type: 'image/png' },
          { src: 'pwa-512x512.png', sizes: '512x512', type: 'image/png' }
        ]
      }
    })
  ],
  server: {
    host: '0.0.0.0', // Escucha en todas las interfaces
    port: 5173,
    strictPort: true,
    hmr: {
      clientPort: 443 // Ayuda a que el túnel de GitHub pase correctamente
    }
  }
});