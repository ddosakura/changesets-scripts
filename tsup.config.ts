import { defineConfig } from 'tsup';

export default defineConfig({
  format: ['esm'],
  dts: true,
  entry: [
    'src/commit.ts',
  ],
});
