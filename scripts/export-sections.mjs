/**
 * Export script: copies component files from src/sections to product-plan/sections
 * with import path transformations.
 */
import { readFileSync, writeFileSync, mkdirSync, copyFileSync, readdirSync, existsSync } from 'fs'
import { join, dirname } from 'path'

const ROOT = dirname(dirname(new URL(import.meta.url).pathname))

const SECTIONS = [
  'home',
  'onboarding-and-activation',
  'compliance-dashboard',
  'incident-management',
  'vehicle-and-driver-management',
]

function transformImports(content, sectionId) {
  let result = content

  // Transform: import ... from '@/../product/sections/<section>/types'  ->  import ... from '../types'
  result = result.replace(
    /import\s+(.*?)\s+from\s+['"]@\/\.\.\/product\/sections\/[^/]+\/types['"]/g,
    "import $1 from '../types'"
  )

  // Transform: import ... from '@/../product/sections/<section>/data.json'
  // -> comment out and note
  result = result.replace(
    /^(import\s+.*?\s+from\s+['"]@\/\.\.\/product\/sections\/[^/]+\/data\.json['"])/gm,
    '// [EXTERNAL] $1 // Use ../sample-data.json — wire up via props or fetch'
  )

  // Transform: import ... from '@/shell/components/LanguageContext'
  // -> comment out and note as external dependency
  result = result.replace(
    /^(import\s+\{[^}]*\}\s+from\s+['"]@\/shell\/components\/LanguageContext['"])/gm,
    '// [EXTERNAL DEPENDENCY] $1\n// You must provide a LanguageContext with { language } value (Language = "en" | "hi")\n// For quick setup, create a simple context that returns { language: "en" }'
  )

  // Transform: import ... from '@/sections/...' -> comment out as cross-section dependency
  result = result.replace(
    /^(import\s+.*?\s+from\s+['"]@\/sections\/[^'"]+['"])/gm,
    '// [CROSS-SECTION DEPENDENCY] $1'
  )

  // Transform: import ... from '@/../product/sections/.../data.json' (incident-management data in VehicleDetail)
  result = result.replace(
    /^(import\s+.*?\s+from\s+['"]@\/\.\.\/product\/sections\/[^/]+\/data\.json['"])/gm,
    '// [EXTERNAL] $1 // Wire up via props or fetch'
  )

  return result
}

for (const sectionId of SECTIONS) {
  const srcDir = join(ROOT, 'src', 'sections', sectionId, 'components')
  const destDir = join(ROOT, 'product-plan', 'sections', sectionId, 'components')
  const destSection = join(ROOT, 'product-plan', 'sections', sectionId)

  // Ensure directories exist
  mkdirSync(destDir, { recursive: true })

  // Copy types.ts
  const typesPath = join(ROOT, 'product', 'sections', sectionId, 'types.ts')
  if (existsSync(typesPath)) {
    copyFileSync(typesPath, join(destSection, 'types.ts'))
    console.log(`  [types] ${sectionId}/types.ts`)
  }

  // Copy data.json as sample-data.json
  const dataPath = join(ROOT, 'product', 'sections', sectionId, 'data.json')
  if (existsSync(dataPath)) {
    copyFileSync(dataPath, join(destSection, 'sample-data.json'))
    console.log(`  [data]  ${sectionId}/sample-data.json`)
  }

  // Copy and transform component files
  if (!existsSync(srcDir)) {
    console.log(`  [SKIP] No components directory for ${sectionId}`)
    continue
  }

  const files = readdirSync(srcDir).filter(f => f.endsWith('.tsx') || f.endsWith('.ts'))

  for (const file of files) {
    const srcFile = join(srcDir, file)
    const destFile = join(destDir, file)
    const content = readFileSync(srcFile, 'utf-8')
    const transformed = transformImports(content, sectionId)
    writeFileSync(destFile, transformed)
    console.log(`  [comp]  ${sectionId}/components/${file}`)
  }
}

console.log('\nAll sections exported successfully.')
