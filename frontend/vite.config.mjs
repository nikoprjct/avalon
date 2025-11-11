import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  // Подгружаем переменные окружения из .env
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react()],
    define: {
      'process.env': env,
    },
    server: {
      port: Number(env.VITE_PORT) || 3000,
      host: true, // чтобы можно было открыть с внешней сети, если нужно
    },
    build: {
      outDir: `dist-${mode}`,
      sourcemap: mode !== 'production',
    }
  };
});
