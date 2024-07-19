import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import basicSsl from "@vitejs/plugin-basic-ssl";
const port: any = process.env.PORT || 5173;

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    basicSsl({
      /** name of certification */
      name: "test",
      /** custom trust domains */
      domains: ["*.dementia-care.com", "localhost"],
      /** custom certification directory */
      certDir:
        "/Users/Abhishek%20Sharma/project/kappa-phi-sigma/dementia-care-ui",
    }),
  ],
  resolve: {
    alias: [{ find: "@", replacement: "/src" }],
  },
  server: {
    cors: true,
    watch: {
      usePolling: true,
    },
    host: true, // needed for the Docker Container port mapping to work
    strictPort: true,
    port: port, // you can replace this port with any port
    https: {},
    cors: true
  },
});
