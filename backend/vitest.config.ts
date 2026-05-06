import { resolve } from "path";
import { defineConfig } from "vitest/config";

export default defineConfig({
  resolve: {
    alias: {
      "@services": resolve(__dirname, "src/services"),
      "@controllers": resolve(__dirname, "src/controllers"),
      "@repositories": resolve(__dirname, "src/repositories"),
      "@utils": resolve(__dirname, "src/utils"),
      "@routes": resolve(__dirname, "src/routes"),
      "@middleware": resolve(__dirname, "src/middleware"),
      "@helpers": resolve(__dirname, "src/helpers"),
      "@validators": resolve(__dirname, "src/validators"),
    },
  },
  test: {
    globals: true,
  },
});
