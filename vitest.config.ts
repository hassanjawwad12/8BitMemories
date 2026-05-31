import { fileURLToPath } from "node:url";

import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

/**
 * Vitest config for the logic layer + component smoke tests. jsdom environment,
 * the `@` path alias mirrored from tsconfig, and CSS imports stubbed (`css:
 * false`) since jsdom doesn't apply styles — animation/reduced-motion behaviour
 * is verified visually in Playwright, not here.
 */
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  test: {
    environment: "jsdom",
    setupFiles: ["./vitest.setup.ts"],
    css: false,
    include: ["src/**/*.test.{ts,tsx}"],
    coverage: {
      provider: "v8",
      // Gate the LOGIC layer (data, store, lib, registry). Presentational
      // components, kit hooks, and the audio engine are exercised by Playwright
      // (visual + e2e, Phase 7), not by unit coverage.
      include: [
        "src/data/exhibits.ts",
        "src/data/schema.ts",
        "src/data/wings.ts",
        "src/store/useMuseumStore.ts",
        "src/lib/secrets.ts",
        "src/lib/prefs.ts",
        "src/components/micro/registry.ts",
      ],
      thresholds: {
        statements: 80,
        branches: 80,
        functions: 80,
        lines: 80,
      },
    },
  },
});
