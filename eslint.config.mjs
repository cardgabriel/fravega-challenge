import { FlatCompat } from '@eslint/eslintrc'
import { dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname,
})

const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  {
    rules: {
      // TypeScript - Only rules that add real value
      '@typescript-eslint/no-explicit-any': 'warn', // Useful for type safety
      '@typescript-eslint/no-non-null-assertion': 'off', // Needed for TanStack Query

      // Code Quality - Only critical rules not covered by other tools
      'no-console': ['warn', { allow: ['warn', 'error'] }], // Useful for production builds
      'no-debugger': 'error', // Critical for production
      'no-unreachable': 'error', // Detects actual dead code
      eqeqeq: ['error', 'always'], // Prevents subtle coercion bugs

      // React - Only really essential not covered elsewhere
      'react/self-closing-comp': 'error', // Good practice, Prettier doesn't handle this

      // TanStack Query - Override needed for dependency tracking
      'react-hooks/exhaustive-deps': [
        'warn',
        {
          additionalHooks: '^(useQuery|useMutation|useInfiniteQuery|useSuspenseQuery)$',
        },
      ],
    },
  },
  // Test overrides - Only if you have real issues
  {
    files: ['**/__tests__/**/*', '**/*.test.*', '**/*.spec.*'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off', // Allow any in tests for mocking
    },
  },
]

export default eslintConfig
