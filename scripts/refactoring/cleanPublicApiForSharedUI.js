const path = require('path');
const { Project } = require('ts-morph');

const project = new Project({});

project.addSourceFilesAtPaths('src/**/*.ts');
project.addSourceFilesAtPaths('src/**/*.tsx');

const uiPath = path.resolve(__dirname, '..', '..', 'src', 'shared', 'ui');
const sharedUIDirectory = project.getDirectory(uiPath);
const componentsDirs = sharedUIDirectory?.getDirectories();

componentsDirs?.forEach((directory) => {
  const indexFilePath = `${directory.getPath()}/index.ts`;
  const indexFile = directory.getSourceFile(indexFilePath);
  const moduleNamePath = directory.getBaseName();

  if (indexFile) {
    indexFile.delete();
  }
});

// в конце вызываем метод save чтобы ts-morph применил все изменения к выбранным выше файлам
project.save();