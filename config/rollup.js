import path from 'path'
import babel from 'rollup-plugin-babel'

export const getRollupConfig = ({ pkg, pwd, buildName, babelConfig }) => {
  const SOURCE_DIR = path.resolve(pwd, '')
  const DIST_DIR = path.resolve(pwd, 'dist')

  const baseConfig = {
    input: `${SOURCE_DIR}/index.js`,
    plugins: [babel({ exclude: '**/node_modules/**', ...babelConfig })],
  }

  const esConfig = Object.assign({}, baseConfig, {
    output: {
      file: `${DIST_DIR}/${buildName}.es.js`,
      format: 'es',
      sourcemap: true,
    },
    external: [...Object.keys(pkg.peerDependencies || {}), ...Object.keys(pkg.dependencies || {})],
  })

  const cjsConfig = Object.assign({}, esConfig, {
    output: {
      file: `${DIST_DIR}/${buildName}.cjs.js`,
      format: 'cjs',
    },
  })

  return [esConfig, cjsConfig]
}
