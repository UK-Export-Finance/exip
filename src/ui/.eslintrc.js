module.exports = {
  parser: '@typescript-eslint/parser',
  extends: ['eslint:recommended', 'plugin:import/recommended', 'plugin:import/typescript', 'plugin:@typescript-eslint/recommended', 'airbnb', 'prettier'],
  plugins: ['@typescript-eslint', 'import', 'prettier'],

  parserOptions: {
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  env: {
    jest: true,
    browser: true,
  },
  root: true,
  settings: {
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
        paths: './tsconfig.json',
      },
    },
  },
  rules: {
    'import/no-unresolved': [2, { caseSensitive: false }],
    '@typescript-eslint/indent': ['error', 2],
    'max-len': [
      'error',
      160,
      2,
      {
        ignoreUrls: true,
        ignoreComments: false,
        ignoreRegExpLiterals: true,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
      },
    ],
    'no-console': ['error', { allow: ['info', 'error'] }],
    'no-underscore-dangle': ['error', { allow: ['_id', '_csrf'] }],
    'import/no-named-as-default': 'off',
    'implicit-arrow-linebreak': 'off',
    'object-curly-newline': [
      'error',
      {
        consistent: true,
      },
    ],
    'no-unneeded-ternary': 'off',
    '@typescript-eslint/dot-notation': 'off',
    'import/extensions': 'off',
    'import/newline-after-import': 'off',
    'import/first': 'off',
    'import/prefer-default-export': 'off',
    'consistent-return': 'off',
    'import/order': 'off',
    'function-paren-newline': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'prefer-destructuring': [
      'error',
      {
        array: true,
        object: true,
      },
    ],
  },
};
