import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import babel from 'vite-plugin-babel'
import { viteCommonjs, esbuildCommonjs } from '@originjs/vite-plugin-commonjs'

// https://vitejs.dev/config/
export default defineConfig({
  // base: process.env.NODE_ENV === 'production' ? '/sprotty-routing-libavoid-demo/' : '',
  build: {
    outDir: 'docs',
    commonjsOptions: { include: [/sprotty/, /node_modules/] },
    minify: false
  },
  plugins: [
    vue(),
    babel({
      babelConfig: {
          plugins: [
            ['@babel/plugin-proposal-decorators', { version: "legacy" }],
            '@babel/plugin-proposal-class-properties'
          ]
      }
    }),
    viteCommonjs(),
  ],

  optimizeDeps: {
    include: ['sprotty'],
    esbuildOptions: {
      plugins: [
        esbuildCommonjs(['@vscode/codicons'])
      ],
    }
  }
})
