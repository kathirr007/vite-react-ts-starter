import path from 'node:path'
import AutoImport from 'unplugin-auto-import/vite'
import Pages from 'vite-plugin-pages'
import { VitePWA } from 'vite-plugin-pwa'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import FastGlob from 'fast-glob'
import { minimatch } from 'minimatch'

function pascalCaseWithCapitals(str: string) {
  return str
    .split('/')
    .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
    .join('')
}

function removeExtension(str: string) {
  return path.basename(str, path.extname(str))
}

function getComponentImports() {
  const directories = [
    {
      pattern: './src/components/**/*.{tsx,jsx}',
      omit: './src/components',
    },
    {
      pattern: './src/layouts/*.{tsx,jsx}',
      omit: './src/',
    },
  ]

  const entries = FastGlob.sync(
    directories.map(x => x.pattern),
    {
      dot: true,
      objectMode: true,
    },
  )

  return entries.map((entry: any) => {
    const dirOptions = directories.find(dir => minimatch(entry.path, dir.pattern))

    const componentName = entry.path
      .replace(new RegExp(dirOptions?.omit as string, 'gi'), '')
      .split('/')
      .filter(Boolean)
      .map(pascalCaseWithCapitals)
      .join('')

    const fromPath = entry.path
      .replace(/\.\/src/gi, '@')

    return {
      [fromPath]: [
        [removeExtension(entry.name), removeExtension(componentName)],
      ],
    }
  })
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    AutoImport({
      dts: './auto-imports.d.ts',
      defaultExportByFilename: true,
      eslintrc: {
        enabled: true,
      },
      include: [
        /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
      ],
      dirs: [
        './src/hooks',
      ],
      imports: [
        ...getComponentImports(),
        'react',
        'react-router',
      ],
    }),
    react(),
    Pages({
      // eslint-disable-next-line unused-imports/no-unused-vars
      extendRoute(route, parent) {
        if (route.path === '/') {
          // Index is unauthenticated.
          return route
        }

        // Augment the route with meta that indicates that the route requires authentication.
        return {
          ...route,
          meta: { layout: 'home' },
        }
      },
    }),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'safari-pinned-tab.svg'],
      manifest: {
        name: 'React-Vitesse',
        short_name: 'React-Vitesse',
        theme_color: '#ffffff',
        icons: [
          {
            src: '/pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: '/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable',
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      '@/': `${path.resolve(__dirname, 'src')}/`,
    },
  },
  server: {
    host: '0.0.0.0',
    port: 3000,
  },
})
