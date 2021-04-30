import { defineConfig } from 'vite'
import { resolve } from "path";
import vueJsx from '@vitejs/plugin-vue-jsx'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      // @ts-ignore
      'assets': resolve(__dirname, './src/assets'),
      // @ts-ignore
      'components': resolve(__dirname, './src/components'),
      // @ts-ignore
      'pages': resolve(__dirname, './src/pages'),
      // @ts-ignore
      'routes': resolve(__dirname, './src/routes'),
    }
  },
  plugins: [vueJsx()]
})
