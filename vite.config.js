import { defineConfig, loadEnv } from "vite";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const baseUrl = env.BASE_URL;
  const port = Number(env.PORT);

  return {
    server: {
      port: 5173,
      allowedHosts: [baseUrl],
      hmr: {
        protocol: "wss",
        host: baseUrl,
        clientPort: 443,
      },
      proxy: {
        "/api": {
          target: `http://localhost:${port}`,
          changeOrigin: true,
        },
      },
    },
  };
});
