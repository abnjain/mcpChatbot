import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    rollupOptions: {
      output: {
        manualChunks: undefined, // disable chunk splitting
        inlineDynamicImports: true, // force one bundle
        entryFileNames: 'bundle.js', // name your single js file
      },
    },
  },
})
