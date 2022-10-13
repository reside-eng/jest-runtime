module.exports = {
  root: true,
  extends: ['@side/base', 'plugin:jsdoc/recommended', 'prettier'],
  rules: {
    'jsdoc/require-returns-type': 0,
    'jsdoc/require-param-type': 0,
    'jsdoc/valid-types': 0,
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
