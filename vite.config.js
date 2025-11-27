// vite.config.js
import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        home: resolve(__dirname, "src/pages/home.html"),
        services: resolve(__dirname, "src/pages/services.html"),
        about: resolve(__dirname, "src/pages/about.html"),
        contact: resolve(__dirname, "src/pages/contact.html"),
      },
    },
  },
});
