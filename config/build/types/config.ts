export type BuildMode = 'production' | 'development';

export interface BuildPaths {
  entry: string;
  build: string;
  html: string;
  src: string;
  /**
   * *перевод в prod сборку
   * locales - путь до файлов с переводами
   * buildLocales - то, куда будем перемещать эти переводы
  */
  locales: string;
  buildLocales: string;
}

export interface BuildEnv {
  mode: BuildMode;
  port: number;
  apiUrl?: string;
}

export interface BuildOptions {
  mode: BuildMode;
  paths: BuildPaths;
  isDev: boolean;
  port: number;
  apiUrl: string;
  /*
    Разделение сред выполнения кода
    -
    Для каждого из значений будет своя конфигурация
  */
  project: 'storybook' | 'frontend' | 'jest';
}
