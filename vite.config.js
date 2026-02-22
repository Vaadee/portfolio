import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [tailwindcss()],
  // Set the base path to your repository name for GitHub Pages deployments
  base: "/portfolio/",
});
