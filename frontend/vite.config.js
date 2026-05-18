import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import fs from "fs";

export default defineConfig({
  plugins: [react()],
  server: {
    https: {
      key: fs.readFileSync("./key.pem"),
      cert: fs.readFileSync("./cert.pem"),
    },
    host: "localhost",
  },
  build: {
    cssMinify: false, // Evita que todo el CSS colapse en la línea 1
    minify: false, // Opcional: desactiva también la minificación de JS
  },
});
