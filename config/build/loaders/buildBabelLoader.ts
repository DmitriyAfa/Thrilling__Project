import { BuildOptions } from '../types/config';
import babelRemovePropsPlugin from '../../babel/babelRemovePropsPlugin';

/*
  *Настройка babel-loader так чтобы он выполнял задачи ts-loader
  1)Для этой задачи нужны 2-а плагина:
  +plugin transform runtime - это
  Плагин, который позволяет повторному использованию введенного кода помощника Babel экономить на размере кода.
  +@babel/plugin-transform-typescript
  Этот плагин добавляет поддержку синтаксиса, используемого языком программирования
  TypeScript. Однако этот плагин не добавляет способность к проверке типа,
  которую JavaScript передал ему. Для этого необходимо будет установить
  и создать TypeScript.
  -
  2) После настройки данных плагинов, нужно настроить проверку типов вручную.
  Так как по умолчанию данной опциональности нет в plugin-transform-typescript.
  Данный метод не будет замедлять сборку и пересборку проекта.
  -
  Для этого используем плагин fork ts checker webpack plugin
  Благодаря этому плагину теперь проверка типов - это отдельный процесс который не влияет на скорость сбореи основного кода.
  -
  Вывод: за комплиляцию TS в JS отвечает babel-loader (а не TSloader), проверка типов
  в отдельном процессе за который отвечает (fork ts checker webpack plugin);
  -
  isTSX - опция которая позволит работать отдельно с .js/.ts и .jsx/.tsx файлами
  -
 */

interface BuildBabelLoaderProps extends BuildOptions {
  isTSX?: boolean;
}

export function buildBabelLoader({ isDev, isTSX }: BuildBabelLoaderProps) {
  return {
    test: isTSX ? /\.(jsx|tsx)$/ : /\.(js|ts)$/,
    exclude: /node_modules/,
    use: {
      loader: 'babel-loader',
      options: {
        presets: ['@babel/preset-env'],
        plugins: [
          // [
          //   'i18next-extract',
          //   {
          //     locales: ['ru', 'en'],
          //     keyAsDefaultValue: true,
          //   },
          // ],
          [
            '@babel/plugin-transform-typescript',
            {
              isTSX,
            },
          ],
          '@babel/plugin-transform-runtime',
          isTSX && [
            babelRemovePropsPlugin,
            {
              props: ['data-testid'],
            },
          ],
          isDev && require.resolve('react-refresh/babel'),
        ].filter(Boolean),
      },
    },
  };
}
