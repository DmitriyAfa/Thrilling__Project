const path = require('path');
const { Project } = require('ts-morph');

const project = new Project({});

project.addSourceFilesAtPaths('src/**/*.ts');
project.addSourceFilesAtPaths('src/**/*.tsx');

// Получаем все файлы
const files = project.getSourceFiles();
const uiPath = path.resolve(__dirname, '..', '..', 'src', 'shared', 'ui');
const sharedUIDirectory = project.getDirectory(uiPath);
const componentsDirs = sharedUIDirectory?.getDirectories();

function isAbsolute(value) {
  const layers = ['app', 'shared', 'entities', 'features', 'widgets', 'pages'];
  // если value импорта начинается с одного из представленных layers
  return layers.some((layer) => value.startsWith(layer));
}

componentsDirs?.forEach((directory) => {
  const folderName = directory.getPath();
  // Путь до index.ts файла
  const indexFilePath = `${folderName}/index.ts`;
  // получаем сам index.ts файл
  const indexFile = directory.getSourceFile(indexFilePath);
  const moduleNamePath = directory.getBaseName();

  if (!indexFile) {
    const sourceCode = `export { ${moduleNamePath} } from './${moduleNamePath}';\n`;
    const file = directory.createSourceFile(indexFilePath, sourceCode, { overwrite: true });
    file.save();
  }
});

files.forEach((sourceFile) => {
  // Работа с AST-кодом
  // Получаем импорты declarations (import) конкретного файла
  const importDeclarations = sourceFile.getImportDeclarations();

  importDeclarations.forEach((importDeclaration) => {
    const value = importDeclaration.getModuleSpecifierValue();
    const valueWithoutAlias = value.replace('@/', '');

    const segments = valueWithoutAlias.split('/');

    const isSharedLayer = segments?.[0] === 'shared';
    const isUISlice = segments?.[1] === 'ui';

    if (isAbsolute(valueWithoutAlias) && isSharedLayer && isUISlice) {
      const result = valueWithoutAlias.split('/').slice(0, 3).join('/');
      importDeclaration.setModuleSpecifier(`@/${result}`);
    }
  });
});

// в конце вызываем метод save чтобы ts-morph применил все изменения к выбранным выше файлам
project.save();