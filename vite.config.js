
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // If your index.html is not in the root, specify its path here.
  // For your setup, it's in the root, so this is usually not needed.
  // root: '.', 
  // build: {
  //   outDir: 'dist'
  // }
});
