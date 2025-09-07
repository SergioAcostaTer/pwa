// next.config.ts
import type { NextConfig } from 'next'

const config: NextConfig = {
  reactStrictMode: true,

  // Helpful for debugging PWA issues locally; remove if you prefer quieter logs.
  poweredByHeader: false,

  async headers() {
    return [
      // Ensure the service worker is always fetched fresh and with the right MIME type.
      {
        source: '/sw.js',
        headers: [
          { key: 'Content-Type', value: 'application/javascript; charset=utf-8' },
          { key: 'Cache-Control', value: 'no-cache, no-store, must-revalidate' },
          { key: 'Pragma', value: 'no-cache' },
          { key: 'Expires', value: '0' },
        ],
      },

      // Keep the web app manifest fresh as you iterate.
      // If you use app/manifest.ts, the route is /manifest.webmanifest.
      {
        source: '/manifest.webmanifest',
        headers: [
          { key: 'Content-Type', value: 'application/manifest+json; charset=utf-8' },
          { key: 'Cache-Control', value: 'no-cache, no-store, must-revalidate' },
          { key: 'Pragma', value: 'no-cache' },
          { key: 'Expires', value: '0' },
        ],
      },

      // Cache icons aggressively (safe to change filename when you update).
      {
        source: '/:icon((icon|apple-touch-icon|maskable)-:size(\\d+)x\\d+\\.png)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },

      // Optional: cache other static assets in /public with a long TTL
      // (HTML and SW are excluded so they can update immediately).
      {
        source: '/:file*\\.(?:css|js|woff2?|ttf|eot|gif|jpg|jpeg|png|svg|webp|avif)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
    ]
  },
}

export default config
