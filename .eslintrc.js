// const process = require('process');

module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true,
  },
  extends: ['plugin:react/recommended', 'airbnb',
    'plugin:i18next/recommended', 'plugin:storybook/recommended'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    'react',
    '@typescript-eslint',
    'i18next',
    'react-hooks',
    'dm-fsd-rules',
  ],
  rules: {
    'react/jsx-indent': [2, 2],
    'react/jsx-indent-props': [2, 2],
    indent: [2, 2],
    'react/jsx-filename-extension': [2, {
      extensions: ['.js', '.jsx', '.tsx'],
    }],
    // 'linebreak-style': ['error', (process.platform === 'win32' ? 'windows' : 'unix')],
    'linebreak-style': 0,
    'import/no-unresolved': 'off',
    'import/prefer-default-export': 'off',
    'no-unused-vars': 'warn',
    'react/require-default-props': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/function-component-definition': 'off',
    'no-shadow': 'off',
    'import/extensions': 'off',
    'import/no-extraneous-dependencies': 'off',
    'no-underscore-dangle': 'off',
    'i18next/no-literal-string': 'off',
    'max-len': ['error', {
      ignoreComments: true,
      code: 120,
    }],
    'arrow-body-style': ['error', 'as-needed'],
    'no-param-reassign': 'off',
    'jsx-a11y/no-static-element-interactions': 'off',
    'jsx-a11y/click-events-have-key-events': 'off',
    'react-hooks/rules-of-hooks': 'error', // Проверяем правила хуков
    'react-hooks/exhaustive-deps': 'error', // Проверяем зависимости эффекта
    'eol-last': 'off',
    'no-undef': 'off',
    'react/no-array-index-key': 'off',
    'dm-fsd-rules/path-checker': ['error', { alias: '@' }],
    'jsx-quotes': ['error', 'prefer-single'],
  },
  // globals - сообщаем линтеру о существовании глобальных переменных
  globals: {
    __IS_DEV__: true,
    __API__: true,
    // Разделение сред выполнения кода
    __PROJECT__: true,
  },
  overrides: [{
    files: ['**/src/**/*.{test,stories}.{ts,tsx}'],
    rules: {
      'i18next/no-literal-string': 'off',
      'max-len': 'off',
    },
  }],
  settings: {
    react: {
      version: 'detect',
    },
  },
};
