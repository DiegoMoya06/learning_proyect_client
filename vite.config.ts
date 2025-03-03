import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    // TODO: server might be deleted, check after connecting with backend
    server: {
        proxy: {
            '/api': {
                target: 'https://api.deepseek.com/v1/files/upload',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, ''),
            }
        }
    }
})
