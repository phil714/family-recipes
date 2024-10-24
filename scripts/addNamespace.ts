import * as fs from 'fs'
import * as path from 'path'

// Paths for your locales and types file
const localesDir = path.join(__dirname, '../web/src/locales')
const typesFile = path.join(__dirname, '../web/types/i18next.d.ts')
const i18nConfigFile = path.join(__dirname, '../web/src/i18n.js')
const inlangSettingsFile = path.join(
  __dirname,
  '../project.inlang/settings.json'
)

// Get namespace from command-line argument
const namespace = process.argv[2]

if (!namespace) {
  console.log('Please provide a namespace.')
  process.exit(1)
}

// List of languages, you can add more as needed
const languages: string[] = ['en', 'fr', 'es', 'zh']

// Step 1: Create empty JSON files for the namespace in each language
languages.forEach((lang: string) => {
  const filePath = path.join(localesDir, lang, `${namespace}.json`)

  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, '{}', 'utf8')
    console.log(`Created ${filePath}`)
  } else {
    console.log(`${filePath} already exists.`)
  }
})

// Step 2: Update i18next.d.ts file
const addNamespaceToTypes = (namespace: string): void => {
  const typesContent = fs.readFileSync(typesFile, 'utf8')

  const newNamespaceImport = `import en${capitalize(namespace)} from '../src/locales/en/${namespace}.json'`
  const newResource = `  ${namespace}: typeof en${capitalize(namespace)}`

  // Add the new import statement after the last import line
  if (!typesContent.includes(newNamespaceImport)) {
    const updatedTypesContent = typesContent.replace(
      /(import [^\n]+[\n]?)(?![\s\S]*import)/,
      `$1\n${newNamespaceImport}\n`
    )

    // Add the new namespace in the resources section
    const finalTypesContent = updatedTypesContent.replace(
      /resources: {([^}]*)}/,
      `resources: {$1${newResource}\n    }`
    )

    fs.writeFileSync(typesFile, finalTypesContent, 'utf8')
    console.log(`Updated i18next.d.ts with new namespace: ${namespace}`)
  } else {
    console.log('Namespace already exists in types file.')
  }
}

// Step 3: Update i18n configuration ns field
const updateI18nConfig = (namespace: string): void => {
  let i18nConfigContent = fs.readFileSync(i18nConfigFile, 'utf8')

  const nsMatch = i18nConfigContent.match(/ns: \[([^\]]*)\]/)
  if (nsMatch) {
    const nsArray = nsMatch[1]
      .split(',')
      .map((ns) => ns.trim().replace(/['"]+/g, ''))

    if (!nsArray.includes(namespace)) {
      nsArray.push(namespace)

      // Recreate the ns field with the new namespace
      const updatedNsField = `ns: ['${nsArray.join("', '")}']`

      // Replace the old ns field with the new one
      i18nConfigContent = i18nConfigContent.replace(
        /ns: \[[^\]]*\]/,
        updatedNsField
      )

      fs.writeFileSync(i18nConfigFile, i18nConfigContent, 'utf8')
      console.log(`Updated i18n config file with new namespace: ${namespace}`)
    } else {
      console.log('Namespace already exists in i18n config file.')
    }
  } else {
    console.log('No ns field found in i18n config file.')
  }
}

// Step 4: Update inlang settings.json file
const updateInlangSettings = (namespace: string): void => {
  const inlangSettingsContent = fs.readFileSync(inlangSettingsFile, 'utf8')
  const settings = JSON.parse(inlangSettingsContent)

  if (!settings['plugin.inlang.i18next'].pathPattern[namespace]) {
    settings['plugin.inlang.i18next'].pathPattern[namespace] =
      `./web/src/locales/{languageTag}/${namespace}.json`

    fs.writeFileSync(
      inlangSettingsFile,
      JSON.stringify(settings, null, 2),
      'utf8'
    )
    console.log(`Updated inlang settings file with new namespace: ${namespace}`)
  } else {
    console.log('Namespace already exists in inlang settings file.')
  }
}

// Capitalize the first letter of the namespace for correct typing
const capitalize = (str: string): string =>
  str.charAt(0).toUpperCase() + str.slice(1)

addNamespaceToTypes(namespace)
updateI18nConfig(namespace)
updateInlangSettings(namespace)
