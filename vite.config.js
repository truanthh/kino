import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
// import { vite as vidstack } from "vidstack/plugins";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    // vidstack(),
    vue({
      template: {
        compilerOptions: { isCustomElement: (tag) => tag.startsWith("media-") },
      },
    }),
  ],
  resolve: {
    alias: [{ find: "@", replacement: path.resolve(__dirname, "src") }],
  },
});
