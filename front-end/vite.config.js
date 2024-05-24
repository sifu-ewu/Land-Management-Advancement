import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import envCompatible from 'vite-plugin-env-compatible'
// https://vitejs.dev/config/



export default defineConfig({
  envPrefix: "REACT_APP_",
  plugins: [react(),
  envCompatible()],
  server: {
    port: 8000
  },
  resolve: {
    alias: {
      'non-fetch': 'isomorphic-fetch'
    }
  },

  define: {
    // By default, Vite doesn't include shims for NodeJS/
    // necessary for segment analytics lib to work
    global: {},
  },

})
