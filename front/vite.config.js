import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import compression from 'vite-plugin-compression';
import legacyPlugin from '@vitejs/plugin-legacy';

// https://vite.dev/config/
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        entryFileNames: 'js/[name]-[hash].js',
        chunkFileNames: 'js/[name]-[hash].js',
        assetFileNames(assetsInfo) {
          if (assetsInfo.name?.endsWith('.css')) {
            return `css/[name]-[hash][extname]`;
          }
          const imgExts = ['.png', '.jpg', '.jpeg', '.webp', '.gif', '.svg', '.ico', '.avif'];
          if (imgExts.some(ext => assetsInfo.name?.endsWith(ext))) {
            return `assets/[ext]/[name]-[hash][extname]`;
          }
          return `assets/[name]-[hash][extname]`;
        },
      }
    }
  },
  plugins: [
    react(),
    // Gzip 压缩插件
    compression({
      verbose: true,
      disable: false,
      threshold: 10240,// 压缩阈值，小于这个值的文件将不会被压缩（单位为字节）这里就是大于 10kb 才压缩
      algorithm: 'gzip', // 压缩算法
      ext: '.gz' // 压缩后缀名
    }),
    legacyPlugin({
      targets: ['chrome 52', 'Android > 39', 'iOS >= 10.3'], // 需要兼容的目标列表,可以设置多个
      additionalLegacyPolyfills: ['regenerator-runtime/runtime'] // 面向IE11的时候需要用到此插件
    })
  ],
})
