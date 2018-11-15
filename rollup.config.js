import babel from 'rollup-plugin-babel'
import commonjs from 'rollup-plugin-commonjs'
import resolve from 'rollup-plugin-node-resolve'
import postcss from 'rollup-plugin-postcss'
import { uglify } from 'rollup-plugin-uglify'
import autoExternal from 'rollup-plugin-auto-external'

export default {
  input: 'src/index.js',
  output: {
    file: 'dist/index.js',
    format: 'cjs'
  },
  plugins: [
    postcss({
      extract: true,
      minimize: true
    }),
    autoExternal({
      dependencies: true
    }),
    resolve(),
    commonjs({
      include: ['node_modules/**'],
      namedExports: {
        'node_modules/react/index.js': ['Component'],
        'node_modules/prop-types/index.js': ['number', 'func', 'bool', 'arrayOf', 'object', 'string'],
      }
    }),
    babel({
      exclude: 'node_modules/**',
      plugins: ['external-helpers']
    }),
    uglify({
      toplevel: true,
      output: {
        comments: false
      },
      compress: {
        pure_getters: true,
        unsafe: false,
        warnings: false
      }
    })
  ]
}
