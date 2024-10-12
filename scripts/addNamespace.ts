import * as fs from 'fs';
import * as path from 'path';

// Paths for your locales and types file
const localesDir = path.join(__dirname, '../web/src/locales');
const typesFile = path.join(__dirname, '../web/types/i18next.d.ts');

// Get namespace from command-line argument
const namespace = process.argv[2];

if (!namespace) {
  console.log('Please provide a namespace.');
  process.exit(1);
}

// List of languages, you can add more as needed
const languages: string[] = ['en', 'fr', 'es', 'zh'];

// Step 1: Create empty JSON files for the namespace in each language
languages.forEach((lang: string) => {
  const filePath = path.join(localesDir, lang, `${namespace}.json`);

  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, '{}', 'utf8');
    console.log(`Created ${filePath}`);
  } else {
    console.log(`${filePath} already exists.`);
  }
});

// Step 2: Update i18next.d.ts file
const addNamespaceToTypes = (namespace: string): void => {
  const typesContent = fs.readFileSync(typesFile, 'utf8');

  const newNamespaceImport = `import en${capitalize(namespace)} from '../src/locales/en/${namespace}.json';`;
  const newResource = `      ${namespace}: typeof en${capitalize(namespace)};`;

  if (typesContent.includes(newNamespaceImport)) {
    console.log('Namespace already exists in types file.');
    return;
  }

  // Add import statement
  const updatedTypesContent = typesContent.replace(
    /(import en[^\n]+;)(?![\s\S]*import)/,
    `$1\n${newNamespaceImport}`
  );

  // Add new resource type
  const finalTypesContent = updatedTypesContent.replace(
    /resources: {([^}]*)}/,
    `resources: {$1\n${newResource}`
  );

  fs.writeFileSync(typesFile, finalTypesContent, 'utf8');
  console.log(`Updated i18next.d.ts with new namespace: ${namespace}`);
};

// Capitalize the first letter of the namespace for correct typing
const capitalize = (str: string): string => str.charAt(0).toUpperCase() + str.slice(1);

addNamespaceToTypes(namespace);
