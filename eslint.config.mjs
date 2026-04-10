import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import tsparser from '@typescript-eslint/parser';
import typescriptEslintPlugin from '@typescript-eslint/eslint-plugin';
import vitest from '@vitest/eslint-plugin';
import testingLibrary from 'eslint-plugin-testing-library';
import { defineConfig } from 'eslint/config';

export default defineConfig(
  { ignores: ['dist'] },
  // Disallow .js and .cjs files (project uses ESM with .mjs and TypeScript)
  {
    files: ['**/*.js', '**/*.cjs'],
    rules: {
      'no-restricted-syntax': [
        'error',
        {
          selector: 'Program',
          message: 'JavaScript (.js) and CommonJS (.cjs) files are not allowed. Use TypeScript (.ts) or ES modules (.mjs) instead.',
        },
      ],
    },
  },
  // JavaScript configuration files (jest.config.mjs, etc.)
  {
    files: ['*.mjs'],
    ...js.configs.recommended,
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
      globals: {
        ...globals.node,
      },
    },
  },
  {
    files: ['src/**/*.{ts,tsx}'],
    plugins: {
      '@typescript-eslint': typescriptEslintPlugin,
    },
    rules: {
      ...tseslint.configs.recommended.rules,
      ...tseslint.configs.recommendedTypeChecked.rules,
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],
      '@typescript-eslint/explicit-function-return-type': 'error',
      // Disabled to allow type inference at module boundaries
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-non-null-assertion': 'warn',
      // Disallow `unknown` in type assertions (`x as unknown`) and in variable-type
      // annotations (`const x: unknown`). Both are escape hatches that bypass type
      // safety. Function-parameter and interface-field annotations are not targeted
      // by these selectors. If genuinely unavoidable, add eslint-disable-next-line
      // with a justification.
      'no-restricted-syntax': [
        'error',
        {
          selector: 'TSAsExpression[typeAnnotation.type="TSUnknownKeyword"], VariableDeclarator[id.typeAnnotation.typeAnnotation.type="TSUnknownKeyword"]',
          message: 'Avoid `unknown` in type assertions and variable-type annotations. If unavoidable, add eslint-disable-next-line with a justification.',
        },
      ],
      // Disabled to allow console logging in VS Code extension
      'no-console': 'off',
    },
    languageOptions: {
      parser: tsparser,
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
        project:  './tsconfig.json',
      },
      globals: globals.browser,
    },
  },
  {
    files: ['src/**/*.{test,spec}.{ts,tsx}'],
    plugins: {
      vitest,
      'testing-library': testingLibrary,
    },
    rules: {
      ...vitest.configs.recommended.rules,
    },
    languageOptions: {
      globals: {
        ...vitest.environments.env.globals,
      },
    },
  },
);
