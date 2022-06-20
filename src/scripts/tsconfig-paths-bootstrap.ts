const tsConfig = require('../../tsconfig.json')
import tsConfigPaths from 'tsconfig-paths'

tsConfigPaths.register({
  baseUrl: './build',
  paths: tsConfig.compilerOptions.paths,
})
