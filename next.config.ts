// next.config.ts
import type { NextConfig } from 'next'

const config: NextConfig = {
  reactStrictMode: true,

  async headers() {
    return [
      // Service worker: must not be cached aggressively
      {
        source: '/sw.js',
        headers: [
          { key: 'Content-Type', value: 'application/javascript; charset=utf-8' },
          { key: 'Cache-Control', value: 'no-cache, no-store, must-revalidate' },
        ],
      },

      // Manifest: keep fresh so install prompt works reliably
      {
        source: '/manifest.webmanifest',
        headers: [
          { key: 'Content-Type', value: 'application/manifest+json; charset=utf-8' },
          { key: 'Cache-Control', value: 'no-cache, no-store, must-revalidate' },
        ],
      },
    ]
  },
}

export default config
