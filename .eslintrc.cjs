module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    'max-len': 'off', // Remove warnings on max line length exceeding 100 characters
    'no-multi-assign': 'off',
    'object-curly-newline': [
      'error',
      {
        multiline: true,
        consistent: true,
      },
    ],
    'react/require-default-props': 'off', // Disabled the requirement to default all non-required props
    'no-use-before-define': ['error', { functions: false }],
    'arrow-parens': ['error', 'always'],
  },
}
