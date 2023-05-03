import { Project } from 'ts-morph';

// *@бсолютные алиасы

const project = new Project({});

/*
  Добавляем исходные файлы с которыми будем работать - все файлы в папке src с расширениями tsx/ts;
  -
  ts-morph рекурсивно пройдется по файлам и мы сможем работать с ними как с обычными объектами;
*/
project.addSourceFilesAtPaths('src/**/*.ts');
project.addSourceFilesAtPaths('src/**/*.tsx');

// Получаем все файлы
const files = project.getSourceFiles();

function isAbsolute(value: string) {
  const layers = ['app', 'shared', 'entities', 'features', 'widgets', 'pages'];
  // если value импорта начинается с одного из представленных layers
  return layers.some((layer) => value.startsWith(layer));
}

files.forEach((sourceFile) => {
  // Работа с AST-кодом
  // Получаем импорты declarations (import) конкретного файла
  const importDeclarations = sourceFile.getImportDeclarations();

  importDeclarations.forEach((importDeclaration) => {
    const value = importDeclaration.getModuleSpecifierValue();

    if (isAbsolute(value)) {
      importDeclaration.setModuleSpecifier(`@/${value}`);
    }
  });
});

// в конце вызываем метод save чтобы ts-morph применил все изменения к выбранным выше файлам
project.save();