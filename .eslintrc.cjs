process.env.ESLINT_TSCONFIG = 'tsconfig.json'
/**
 * @type {import("eslint").Linter.Config}
 */
module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    'eslint-config-prettier',
    'standard',
    'plugin:@typescript-eslint/recommended',
    'plugin:astro/recommended'
  ],
  overrides: [
    {
      env: {
        node: true
      },
      files: ['.eslintrc.{js,cjs}'],
      parserOptions: {
        sourceType: 'script'
      }
    },
    {
      files: ['*.astro'],
      parser: 'astro-eslint-parser',
      parserOptions: {
        parser: '@typescript-eslint/parser',
        extraFileExtensions: ['.astro']
      },
      extends: ['plugin:astro/recommended', 'plugin:astro/jsx-a11y-recommended'],
      rules: {
        'astro/no-conflict-set-directives': 'warn',
        'astro/no-unused-define-vars-in-style': 'warn',
        'astro/no-unused-css-selector': 'off',
        'astro/prefer-class-list-directive': 'warn',
        'astro/semi': ['warn', 'never'],
        'astro/jsx-a11y/anchor-is-valid': 'warn',
        '@stylistic/ts/indent': 'off'
      }
    }
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    parser: '@typescript-eslint/parser',
    sourceType: 'module'
  },
  plugins: ['@typescript-eslint'],
  rules: {}
}
