import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ command }) => {
  const isProd = command === 'build'; // Check agar hum build bana rahe hain
  return {
    plugins: [react()],
    // Agar production build hai to repo name, nahi to root '/'
    base: isProd ? '/Institute-Website/' : '/',
  };
})