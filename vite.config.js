import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  server: {
    proxy: {
      '/api': {
        targeet: 'http://localhost:8080',
        changeOrigin: true,
        //拦截请请求路径/api/
        rewrite: (path) => path.replace(/^\/api/,''),
      }
    }
  }
});
