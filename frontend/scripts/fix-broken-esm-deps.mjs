import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const projectRoot = path.resolve(__dirname, '..')

const compatibilityFiles = [
  {
    relativePath: 'node_modules/@jridgewell/remapping/dist/remapping.mjs',
    fallbackPath: './remapping.umd.js',
    contents: `import remapping from './remapping.umd.js'

export default remapping
`
  },
  {
    relativePath: 'node_modules/@jridgewell/gen-mapping/dist/gen-mapping.mjs',
    fallbackPath: './gen-mapping.umd.js',
    contents: `import GenMappingModule from './gen-mapping.umd.js'

export const GenMapping = GenMappingModule.GenMapping
export const addMapping = GenMappingModule.addMapping
export const addSegment = GenMappingModule.addSegment
export const allMappings = GenMappingModule.allMappings
export const fromMap = GenMappingModule.fromMap
export const maybeAddMapping = GenMappingModule.maybeAddMapping
export const maybeAddSegment = GenMappingModule.maybeAddSegment
export const setIgnore = GenMappingModule.setIgnore
export const setSourceContent = GenMappingModule.setSourceContent
export const toDecodedMap = GenMappingModule.toDecodedMap
export const toEncodedMap = GenMappingModule.toEncodedMap
export default GenMappingModule
`
  },
  {
    relativePath: 'node_modules/magic-string/dist/magic-string.es.mjs',
    fallbackPath: './magic-string.cjs.js',
    contents: `import MagicStringModule from './magic-string.cjs.js'

export const Bundle = MagicStringModule.Bundle
export const SourceMap = MagicStringModule.SourceMap
export default MagicStringModule
`
  }
]

for (const file of compatibilityFiles) {
  const targetPath = path.join(projectRoot, file.relativePath)
  const fallbackTargetPath = path.resolve(path.dirname(targetPath), file.fallbackPath)

  if (fs.existsSync(targetPath) || !fs.existsSync(fallbackTargetPath)) {
    continue
  }

  fs.writeFileSync(targetPath, file.contents, 'utf8')
  console.log(`Created compatibility wrapper: ${path.relative(projectRoot, targetPath)}`)
}
