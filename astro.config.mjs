import { defineConfig } from 'astro/config';
import react from "@astrojs/react";
import glsl from 'vite-plugin-glsl';
import compress from "astro-compress";

// https://astro.build/config
export default defineConfig({
  // base: '/dist',
  // trailingSlash: 'never',
  // build: {
  //     format: 'file'
  // },
  vite: {
    plugins: [glsl()]
  },
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'viewport'
  },
  integrations: [react({
    experimentalReactChildren: true
  })
    // , compress()
  ]
});