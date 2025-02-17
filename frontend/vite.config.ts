import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import generouted from '@generouted/react-router/plugin'
import tailwindcss from '@tailwindcss/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), generouted(), tailwindcss()],
  resolve: { alias: { "@": "/src" } },
  server: {
    proxy: {
      "/api/photofinish": {
        target: "http://localhost:3000",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/photofinish/, ""),
      },
    },
  },
})
