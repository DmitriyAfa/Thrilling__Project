export type BuildMode = 'production' | 'development';

export interface BuildPaths {
  entry: string;
  build: string;
  html: string;
  src: string;
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
