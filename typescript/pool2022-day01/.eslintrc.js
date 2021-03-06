module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['airbnb-base'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 13,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint'],
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.ts'],
      },
    },
  },
  rules: {
    'no-console': 'off',
    'no-unused-vars': 'off',
    'max-len': 'off',
    'no-param-reassign': 'off',
    'no-await-in-loop': 'off',
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        ts: 'never',
      },
    ],
  },
  globals: {
    NodeJS: true,
  },
};
