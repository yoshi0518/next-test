import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { FlatCompat } from '@eslint/eslintrc';
import typescript from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';
import importPlugin from 'eslint-plugin-import';
import unicorn from 'eslint-plugin-unicorn';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  {
    files: ['**/*.ts', '**/*.tsx'],
    plugins: {
      '@typescript-eslint': typescript,
      'unicorn': unicorn,
      'import': importPlugin,
    },
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        project: true,
      },
    },
    rules: {
      ...(typescript.configs?.['recommended-type-checked']?.rules ?? {}),
      ...(typescript.configs?.['stylistic-type-checked']?.rules ?? {}),
      '@typescript-eslint/array-type': 'off',
      '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
      '@typescript-eslint/consistent-type-imports': [
        'warn',
        {
          prefer: 'type-imports',
          fixStyle: 'inline-type-imports',
        },
      ],
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/require-await': 'off',
      '@typescript-eslint/no-misused-promises': [
        'error',
        {
          checksVoidReturn: { attributes: false },
        },
      ],
      'unicorn/filename-case': [
        'error',
        {
          case: 'kebabCase',
        },
      ],
      'import/no-default-export': 'error',
    },
  },
  {
    files: ['**/next-auth.d.ts', '**/supabase.ts'],
    rules: {
      '@typescript-eslint/consistent-type-definitions': 'off',
      '@typescript-eslint/no-redundant-type-constituents': 'off',
    },
  },
  {
    files: [
      '**/layout.tsx',
      '**/page.tsx',
      '**/loading.tsx',
      '**/not-found.tsx',
      '**/error.tsx',
      '**/global-error.tsx',
      '**/template.tsx',
      '**/default.tsx',
      '**/route.ts',
      '**/manifest.ts',
      '**/middleware.ts',
      '**/sitemap.ts',
      'next.config.ts',
      'postcss.config.mjs',
      'tailwind.config.ts',
    ],
    rules: {
      'import/no-default-export': 'off',
      'import/prefer-default-export': 'error',
    },
  },
  {
    ignores: ['src/common/components/*', '*.md'],
  },
];

export default eslintConfig;
