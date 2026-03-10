import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import wasm from 'vite-plugin-wasm'
import topLevelAwait from 'vite-plugin-top-level-await'
import { viteStaticCopy } from 'vite-plugin-static-copy'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(), 
    wasm(), 
    topLevelAwait(),
    viteStaticCopy({
      targets: [
        {
          src: 'node_modules/@shelby-protocol/clay-codes/dist/clay.wasm',
          dest: 'node_modules/@shelby-protocol/clay-codes/dist'
        }
      ]
    })
  ],
  define: {
    // Provide a shim for Node.js Buffer in the browser needed by some Aptos/Shelby SDKs
    global: 'globalThis',
  },
  resolve: {
    alias: {
      buffer: 'buffer',
    }
  },
  optimizeDeps: {
    exclude: ['@shelby-protocol/clay-codes']
  }
})
