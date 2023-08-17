module.exports = {
  ignorePatterns: ['**/*.js'],
  overrides: [
    {
      files: ['*.ts'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        project: './tsconfig.json',
      },
      extends: [
        'plugin:@typescript-eslint/recommended',
        'plugin:prettier/recommended',
        'plugin:import/errors',
        'plugin:import/warnings',
        'plugin:import/typescript',
      ],
      rules: {
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/class-name-casing': 'off',
        '@typescript-eslint/default-param-last': 'off',
        '@typescript-eslint/lines-between-class-members': 'off',
        'padding-line-between-statements': 'off',
        '@typescript-eslint/await-thenable': 'warn',
        '@typescript-eslint/consistent-type-definitions': ['warn', 'interface'],
        '@typescript-eslint/dot-notation': 'warn',
        '@typescript-eslint/member-delimiter-style': 'warn',
        '@typescript-eslint/method-signature-style': 'warn',
        '@typescript-eslint/no-explicit-any': 'warn',
        '@typescript-eslint/no-inferrable-types': 'warn',
        '@typescript-eslint/no-unnecessary-boolean-literal-compare': 'warn',
        '@typescript-eslint/padding-line-between-statements': [
          'warn',
          {
            blankLine: 'always',
            prev: '*',
            next: ['interface', 'type', 'if', 'for'],
          },
          {
            blankLine: 'always',
            prev: ['block-like', 'block'],
            next: '*',
          },
        ],
        '@typescript-eslint/prefer-for-of': 'warn',
        '@typescript-eslint/prefer-includes': 'warn',
        '@typescript-eslint/prefer-optional-chain': 'warn',
        'class-methods-use-this': 'off',
        'func-names': 'off',
        'import/extensions': 'off',
        'import/namespace': 'off',
        'import/no-unresolved': 'off',
        'import/prefer-default-export': 'off',
        'lines-between-class-members': 'error',
        'max-classes-per-file': 'off',
        'newline-before-return': 'error',
        'no-console': 'off',
        'no-control-regex': 'off',
        'no-empty-function': 'off',
        'no-empty-lifecycle-method': 'off',
        'no-param-reassign': 'off',
        'no-prototype-builtins': 'off',
        'no-underscore-dangle': 'off',
        'no-unused-vars': 'off',
        '@typescript-eslint/no-unused-vars': ['warn'],
        'prettier/prettier': 'error',
      },
    },
    {
      files: ['*.tsx'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        project: './tsconfig.json',
      },
      extends: [
        'plugin:@stencil/recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:prettier/recommended',
        'plugin:import/errors',
        'plugin:import/warnings',
        'plugin:import/typescript',
      ],
      rules: {
        '@stencil/class-pattern': [
          'error',
          { pattern: '^C[A-Z]{1}', ignoreCase: false },
        ],
        '@stencil/strict-boolean-conditions': 'off',
        '@stencil/decorators-style': [
          'error',
          { prop: 'inline', method: 'multiline' },
        ],
        'react/jsx-no-bind': 'off',

        // ----------------------------------------------------------------

        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/class-name-casing': 'off',
        '@typescript-eslint/default-param-last': 'off',
        '@typescript-eslint/lines-between-class-members': 'off',
        'padding-line-between-statements': 'off',
        '@typescript-eslint/await-thenable': 'warn',
        '@typescript-eslint/consistent-type-definitions': ['warn', 'interface'],
        '@typescript-eslint/dot-notation': 'warn',
        '@typescript-eslint/member-delimiter-style': 'warn',
        '@typescript-eslint/method-signature-style': 'warn',
        '@typescript-eslint/no-explicit-any': 'warn',
        '@typescript-eslint/no-inferrable-types': 'warn',
        '@typescript-eslint/no-unnecessary-boolean-literal-compare': 'warn',
        '@typescript-eslint/padding-line-between-statements': [
          'warn',
          {
            blankLine: 'always',
            prev: '*',
            next: ['interface', 'type', 'if', 'for'],
          },
          {
            blankLine: 'always',
            prev: ['block-like', 'block'],
            next: '*',
          },
        ],
        '@typescript-eslint/prefer-for-of': 'warn',
        '@typescript-eslint/prefer-includes': 'warn',
        '@typescript-eslint/prefer-optional-chain': 'warn',
        'class-methods-use-this': 'off',
        'func-names': 'off',
        'import/extensions': 'off',
        'import/namespace': 'off',
        'import/no-unresolved': 'off',
        'import/prefer-default-export': 'off',
        'lines-between-class-members': 'error',
        'max-classes-per-file': 'off',
        'newline-before-return': 'error',
        'no-console': 'off',
        'no-control-regex': 'off',
        'no-empty-function': 'off',
        'no-empty-lifecycle-method': 'off',
        'no-param-reassign': 'off',
        'no-prototype-builtins': 'off',
        'no-underscore-dangle': 'off',
        'no-unused-vars': 'off',
        '@typescript-eslint/no-unused-vars': ['warn'],
        'prettier/prettier': 'error',
      },
    },
  ],
};
