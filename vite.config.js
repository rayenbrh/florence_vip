import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.png', 'icons/icon-192.png', 'icons/icon-512.png'],
      manifest: {
        name: 'Florence VIP — Luxury Residences',
        short_name: 'Florence VIP',
        description: 'Private luxury residences in the heart of Florence, Italy. 200sqm, Carrara marble, panoramic terrace, Duomo views.',
        theme_color: '#0F0E0C',
        background_color: '#0F0E0C',
        display: 'standalone',
        orientation: 'portrait-primary',
        scope: '/',
        start_url: '/',
        icons: [
          { src: 'icons/icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: 'icons/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any maskable' }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,jpg,jpeg,webp,svg,woff2}'],
        maximumFileSizeToCacheInBytes: 12 * 1024 * 1024,
        runtimeCaching: [
          {
            urlPattern: /\/frames\/v1\/.*/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'video-frames-v1',
              expiration: { maxEntries: 210, maxAgeSeconds: 60 * 60 * 24 * 60 }
            }
          },
          {
            urlPattern: /\/images\/.*/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'apartment-images',
              expiration: { maxEntries: 30, maxAgeSeconds: 60 * 60 * 24 * 60 }
            }
          }
        ]
      }
    })
  ]
})
