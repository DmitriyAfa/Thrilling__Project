// const process = require('process');

module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true,
  },
  extends: ['plugin:react/recommended', 'airbnb', 'plugin:i18next/recommended'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint', 'i18next'],
  rules: {
    'react/jsx-indent': [2, 2],
    'react/jsx-indent-props': [2, 2],
    indent: [2, 2],
    'react/jsx-filename-extension': [
      2,
      { extensions: ['.js', '.jsx', '.tsx'] },
    ],
    // 'linebreak-style': ['error', (process.platform === 'win32' ? 'windows' : 'unix')],
    'linebreak-style': 0,
    'import/no-unresolved': 'off',
    'import/prefer-default-export': 'off',
    'no-unused-vars': 'warn',
    'react/require-default-props': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/jsx-props-no-spreading': 'warn',
    'react/function-component-definition': 'off',
    'no-shadow': 'off',
    'import/extensions': 'off',
    'import/no-extraneous-dependencies': 'off',
    'no-underscore-dangle': 'off',
    'i18next/no-literal-string': ['error', { markupOnly: true }],
    'max-len': ['error', { ignoreComments: true, code: 100 }],
    'arrow-body-style': ['error', 'always'],
  },
  globals: {
    __IS_DEV__: true,

  },
  overrides: [
    {
      files: ['**/src/**/*.test.{ts, tsx}'],
      ruels: {
        'i18next/no-literal-string': 'off',
      },
    },
  ],
  settings: {
    react: {
      version: 'detect',
    },
  },
};
