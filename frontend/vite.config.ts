import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  define: {
    'import.meta.env.VITE_API_URL': JSON.stringify(
      process.env.VITE_API_URL || 'https://app-reservas-vehiculos-main.onrender.com'
    )
  },
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@floating-ui/core': path.resolve(__dirname, './src/shims/floating-ui-core.ts'),
      '@floating-ui/dom': path.resolve(__dirname, './src/shims/floating-ui-dom.ts'),
      '@floating-ui/utils/dom': path.resolve(
        __dirname,
        './src/shims/floating-ui-utils-dom.ts'
      ),
      '@floating-ui/utils': path.resolve(__dirname, './src/shims/floating-ui-utils.ts'),
      'resize-observer-polyfill': path.resolve(
        __dirname,
        './src/shims/resize-observer-polyfill.ts'
      )
    }
  }
})
