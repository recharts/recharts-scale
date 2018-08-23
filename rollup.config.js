import babel from 'rollup-plugin-babel';
import { sizeSnapshot } from 'rollup-plugin-size-snapshot';
import { uglify } from 'rollup-plugin-uglify';

const input = './src/index.js';
const name = 'RechartsScale';
const babelOptions = { plugins: ['external-helpers'] };

export default [
  {
    input,
    output: { file: 'umd/RechartsScale.js', format: 'umd', name },
    plugins: [
      babel(babelOptions),
      sizeSnapshot()
    ]
  },

  {
    input,
    output: { file: 'umd/RechartsScale.min.js', format: 'umd', name },
    plugins: [
      babel(babelOptions),
      uglify()
    ]
  }
]
