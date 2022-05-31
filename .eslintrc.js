module.exports = {
  root: true,
  extends: [
    '@side/base',
    'plugin:@typescript-eslint/recommended',
    'plugin:jsdoc/recommended',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  // TODO: Move settings to lint-config base
  settings: {
    'import/extensions': ['.js', '.jsx', '.ts', '.tsx'],
    'import/resolver': {
      node: {
        extensions: ['.js', '.json', '.jsx', '.ts', '.tsx'],
      },
    },
  },
  rules: {
    'jsdoc/require-returns-type': 0,
    'jsdoc/require-param-type': 0,
    quotes: ['error', 'single', { avoidEscape: true }],
    // Override airbnb extensions settings
    // TODO: Move this to lint-config base
    // Ensure consistent use of file extension within the import path
    // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/extensions.md
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        mjs: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
    // NOTE: This is added since eslint-plugin-import does not support exports in package.json
    // which is what firebase-admin v10 uses. See: https://github.com/import-js/eslint-plugin-import/issues/1810
    'import/no-unresolved': [
      2,
      {
        ignore: [
          'firebase-admin/database',
          'firebase-admin/app',
          'firebase-admin/auth',
          'firebase-admin/storage',
          'firebase-admin/firestore',
        ],
      },
    ],
  },
  overrides: [
    {
      files: ['./jest.setup.js'],
      extends: ['@side/jest'],
      rules: {
        '@typescript-eslint/no-var-requires': 0,
      },
    },
  ],
};
