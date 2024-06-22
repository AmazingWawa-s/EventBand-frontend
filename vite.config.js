import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  define: {
    __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: 'true'
  },
  server: {
    open: true,
    host: '0.0.0.0',
    port: '5137',
    cors: true,
    hmr: true,
    proxy: {
      '/api': {
        target: 'http://192.168.43.66:8000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      },
      '/wsUrl': {
        target: 'ws://192.168.43.66:8000',
        changeOrigin: true,
        ws: true,
        rewrite: (path) => path.replace(/^\/wsUrl/, '')
      },
    }
  },
  css: {
    preprocessorOptions: {
      less: {
        additionalData: `@import "./src/config.less";`
      }
    }
  }
})
