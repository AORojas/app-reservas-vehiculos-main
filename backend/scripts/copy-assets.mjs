import { cpSync, existsSync, mkdirSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const currentDirectory = path.dirname(fileURLToPath(import.meta.url))
const projectRoot = path.resolve(currentDirectory, '..')
const sourceAssetsPath = path.join(projectRoot, 'src', 'assets')
const targetAssetsPath = path.join(projectRoot, 'dist', 'assets')

if (existsSync(sourceAssetsPath)) {
  mkdirSync(targetAssetsPath, { recursive: true })
  cpSync(sourceAssetsPath, targetAssetsPath, { recursive: true })
  console.log('Assets copied to dist/assets')
}
