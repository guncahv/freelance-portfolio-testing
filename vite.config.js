import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5174,
    strictPort: true,
    // запросы /api/... уходят на Express-сервер из ЛР №28
    proxy: { '/api': 'http://localhost:5000' },
  },
});
