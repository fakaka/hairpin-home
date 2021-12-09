import { defineConfig } from 'vite'
import { createVuePlugin } from 'vite-plugin-vue2'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        createVuePlugin({
            jsx: true
        })
    ],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src')
        }
    },
    css: {
        preprocessorOptions: {
            scss: {
                charset: false,
                additionalData: '@import "@/styles/vars.scss";'
            }
        }
    }
})
