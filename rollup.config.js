import nodeResolve from 'rollup-plugin-node-resolve'
import babel from 'rollup-plugin-babel'
import replace from 'rollup-plugin-replace'
import commonJs from 'rollup-plugin-commonjs'

export const config = {
  entry: 'src/index.js',
  format: 'umd',
  moduleName: 'react-bem-next',
  plugins: [
    nodeResolve(),
    babel({
      exclude: '**/node_modules/**',
    }),
    replace({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    }),
    commonJs(),
  ],
}

export default config
