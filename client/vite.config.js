import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vite.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/api": {
        target: "https://gammaridge-server.vercel.app",
        changeOrigin: true,
        secure: false,
      },
    },
  },
  plugins: [react()],
});
