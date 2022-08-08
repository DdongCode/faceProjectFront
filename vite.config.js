import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {                // ← ← ← ← ← ←
    host: '0.0.0.0',    // ← 新增内容 ←
    port: 3000,
    proxy: {
      '/api': {
        target: 'https://www.jamscoco.top',	//实际请求地址
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      },
    }
  },

})
