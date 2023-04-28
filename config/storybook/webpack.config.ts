import path from 'path';
import webpack, { DefinePlugin, RuleSetRule } from 'webpack';
import { buildCssLoader } from '../build/loaders/buildCssLoader';
import { BuildPaths } from '../build/types/config';

export default ({ config }: { config: webpack.Configuration }) => {
  const paths: BuildPaths = {
    build: '',
    html: '',
    entry: '',
    src: path.resolve(__dirname, '..', '..', 'src'),
    locales: '',
    buildLocales: '',
  };
  config!.resolve!.modules!.push(paths.src);
  config!.resolve!.extensions!.push('.ts', '.tsx');
  // @бсолютные алиасы
  config!.resolve!.alias = {
    // развернем предыдущие алиасы ( если вдруг они есть в конфиге вебпака самого сторибука)
    ...config!.resolve!.alias,
    '@': paths.src,
  };
  // @ts-ignore
  config!.module!.rules = config.module!.rules!.map((rule: RuleSetRule) => {
    if (/svg/.test(rule.test as string)) {
      return { ...rule, exclude: /\.svg$/i };
    }
    return rule;
  });

  config!.module!.rules.push({
    test: /\.svg$/,
    use: ['@svgr/webpack'],
  });
  config!.module!.rules.push(buildCssLoader(true));

  config!.plugins!.push(new DefinePlugin({
    __IS_DEV__: true,
    //  Storybook mock addon for RTK query
    // делаем моковый апи, можно пустую строку
    __API__: JSON.stringify('https://testapi.ru'),
    // Разделение сред выполнения кода - переопределим глобальную переменную __PROJECT__ для storybook-среды выполнения кода программы
    __PROJECT__: JSON.stringify('storybook'),
  }));

  return config;
};
