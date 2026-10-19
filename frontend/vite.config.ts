import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Vite already hot-reloads source edits, but it does not watch files in public/
// (the images), so reload the page whenever one of them changes.
const reloadOnPublicChanges = () => ({
  name: 'reload-on-public-changes',
  configureServer(server: import('vite').ViteDevServer) {
    const publicDir = server.config.publicDir
    server.watcher.add(publicDir)
    const reload = (file: string) => {
      if (file.startsWith(publicDir)) server.ws.send({ type: 'full-reload' })
    }
    server.watcher.on('change', reload)
    server.watcher.on('add', reload)
  },
})

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), reloadOnPublicChanges()],
})
