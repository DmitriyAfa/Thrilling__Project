import webpack from 'webpack';

import { buildBabelLoader } from './loaders/buildBabelLoader';
import { buildCssLoader } from './loaders/buildCssLoader';
import { BuildOptions } from './types/config';

export function buildLoaders(options: BuildOptions): webpack.RuleSetRule[] {
  const { isDev } = options;
  const fileLoader = {
    test: /\.(png|jpe?g|gif|woff2|woff)$/i,
    use: [
      {
        loader: 'file-loader',
      },
    ],
  };

  const svgLoader = {
    test: /\.svg$/,
    use: [{
      loader: '@svgr/webpack',
      options: {
        // SVG будет выполнять роль иконки высоту и ширину которй можно удобно настроить
        icon: true,
        svgoConfig: {
          plugins: [
            {
              name: 'convertColors',
              params: {
                currentColor: true,
              },
            },
          ],
        },
      },
    }],
  };

  // только для файлов с расширением ts/js
  const codeBabelLoader = buildBabelLoader({ ...options, isTSX: false });
  //  для файлов с расширением tsx/jsx
  const tsxCodeBabelLoader = buildBabelLoader({ ...options, isTSX: true });

  const cssLoaders = buildCssLoader(isDev);

  // Если не используем TS - нужен babel-loader
  // const typescriptLoader = {
  //   test: /\.tsx?$/,
  //   use: 'ts-loader',
  //   exclude: /node_modules/,
  // };

  return [
    fileLoader,
    svgLoader,
    codeBabelLoader,
    tsxCodeBabelLoader,
    // typescriptLoader,
    cssLoaders,
  ];
}
