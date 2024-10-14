module.exports = {
  root: true,
  plugins: ['@typescript-eslint', 'import', 'prettier'],
  extends: ['eslint:recommended', 'plugin:import/recommended', 'plugin:import/typescript', 'plugin:@typescript-eslint/recommended', 'airbnb', 'prettier'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  env: {
    jest: true,
  },
  settings: {
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
        paths: './tsconfig.json',
      },
    },
  },
  rules: {
    /**
     * Ignore 2x NPM package imports used for data migration.
     * We do not want to include these packages in package.json when data migration is irrelevant.
     * We only need these packages and data migration during major phases/releases of EXIPs,
     * that contain breaking data changes.
     */
    'import/no-unresolved': [2, { caseSensitive: false, ignore: ['@paralleldrive/cuid2', 'mysql2/promise'] }],
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
    'no-underscore-dangle': ['error', { allow: ['_id'] }],
    'import/no-named-as-default': 'off',
    'import/extensions': 'off',
    'implicit-arrow-linebreak': 'off',
    'import/newline-after-import': 'off',
    'import/first': 'off',
    'import/prefer-default-export': 'off',
    'consistent-return': 'off',
    'import/order': 'off',
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
