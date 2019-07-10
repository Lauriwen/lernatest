import { getRollupConfig } from '../../config/rollup'
import pkg from './package.json'

const babelConfig = require('./babel.config')

export default getRollupConfig({
  pwd: __dirname,
  buildName: pkg.nameSpaces.name,
  pkg,
  babelConfig,
})
