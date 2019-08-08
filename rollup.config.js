import babel from 'rollup-plugin-babel'
import commonjs from 'rollup-plugin-commonjs'
import external from 'rollup-plugin-peer-deps-external'
import postcss from 'rollup-plugin-postcss'
import resolve from 'rollup-plugin-node-resolve'
import { uglify } from 'rollup-plugin-uglify'
import autoprefixer from 'autoprefixer'

import pkg from './package.json'

export default {
  input: 'src/index.js',
  output: [
    {
      file: pkg.main,
      format: 'cjs',
    }
  ],
  plugins: [
    postcss({
      plugins: [autoprefixer],
      minimize: true,
      extract: true
    }),
    external({
      includeDependencies: true
    }),
    resolve(),
    babel({
      plugins: [
        '@babel/plugin-proposal-object-rest-spread',
        '@babel/plugin-proposal-class-properties'
      ],
      exclude: 'node_modules/**'
    }),
    commonjs(),
    uglify({
      toplevel: true,
      output: {
        comments: false
      },
      compress: {
        pure_getters: true,
        unsafe: false
      }
    })
  ],
}
