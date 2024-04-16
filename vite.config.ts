import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

const repoName = 'nwitter-reloaded';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: `/`,
})
