module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'plugin:prettier/recommended',
    'plugin:import/warnings',
    'plugin:import/typescript',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: [
    'react-refresh',
    'react',
    '@typescript-eslint',
    'sort-keys-fix',
    'sort-destructure-keys',
    'prettier',
    'typescript-sort-keys',
  ],
  rules: {
    '@typescript-eslint/no-duplicate-enum-values': ['off'],
    '@typescript-eslint/no-explicit-any': ['off', { ignoreRestArgs: true }],
    '@typescript-eslint/no-non-null-assertion': ['off'],
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        args: 'none',
        ignoreRestSiblings: false,
        vars: 'all',
      },
    ],
    'dot-notation': 'warn',
    eqeqeq: 'error',
    'import/no-named-as-default': ['off'],
    'import/order': [
      'warn',
      {
        alphabetize: { caseInsensitive: true, order: 'asc' },
        groups: ['external', 'builtin', 'parent', 'sibling'],
        'newlines-between': 'always',
        pathGroups: [
          {
            group: 'builtin',
            pattern: 'assets/**',
          },
          {
            group: 'builtin',
            pattern: 'pages/**',
          },
          {
            group: 'builtin',
            pattern: 'templates/**',
          },
          {
            group: 'builtin',
            pattern: 'components/**',
          },
          {
            group: 'builtin',
            pattern: 'helpers/**',
          },
          {
            group: 'builtin',
            pattern: 'context/**',
          },
          {
            group: 'builtin',
            pattern: 'modules/**',
          },
          {
            group: 'builtin',
            pattern: 'types/**',
          },
        ],

        // Exclude imports of type 'builtin' from path grouping.
        pathGroupsExcludedImportTypes: ['builtin'],
      },
    ],

    // Turn off the 'indent' rule to avoid conflicts with Prettier.
    indent: 'off',

    // Warn if double quotes are used for JSX attributes instead of single quotes.
    'jsx-quotes': ['warn', 'prefer-single'],

    // Warn if the linebreak style is not set to 'unix'.
    'linebreak-style': ['warn', 'unix'],

    // Warn if there are no empty lines between class members.
    'lines-between-class-members': ['warn', 'always'],

    // Error on the use of console.log except for specific allowed methods: 'info', 'error', and 'warn'.
    'no-console': ['error', { allow: ['info', 'error', 'warn'] }],

    // Warn if there are duplicate import statements.
    'no-duplicate-imports': 'warn',

    // Error when an empty block statement is found.
    'no-empty': 'error',

    // Turn off the 'no-unused-vars' rule to avoid conflicts with TypeScript.
    'no-unused-vars': ['off'],

    // Disallow the use of var and enforce the use of let or const.
    'no-var': 'error',

    // Warn if there is whitespace before a property's dot notation.
    'no-whitespace-before-property': 'warn',

    // Prefer object destructuring over array destructuring.
    'prefer-destructuring': ['warn', { array: false, object: true }],

    // Prefer template literals instead of string concatenation.
    'prefer-template': 'warn',

    // Warn if double quotes are used for string literals, preferring single quotes.
    quotes: [
      'warn',
      'single',
      {
        allowTemplateLiterals: true,
        avoidEscape: true,
      },
    ],
    'react-hooks/exhaustive-deps': 'off',
    'react/display-name': 'off',
    'react/sort-default-props': ['warn', { ignoreCase: false }],
    'react/jsx-sort-props': 'warn',
    'react/prop-types': 0,
    semi: ['warn', 'never'],
    'sort-destructure-keys/sort-destructure-keys': 2,
    'sort-vars': 'off',
    'typescript-sort-keys/interface': 'warn',
    'typescript-sort-keys/string-enum': 'warn',
  },
}
