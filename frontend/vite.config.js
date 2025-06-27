import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'favicon.ico', 'robots.txt', 'apple-touch-icon.png'],
      manifest: {
        name: 'Boxeur App',
        short_name: 'Boxeur',
        display:'standalone',
        description: 'Une application de boxe en PWA',
        theme_color: '#ffffff',
        icons: [
          {
            src: 'img1.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'img2.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ],
  server: {
    host: true,
    port: 5173,
    open: true
  }
})
