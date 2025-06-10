import js from '@eslint/js'
import {FlatCompat} from '@eslint/eslintrc'

const compat = new FlatCompat({
  // import.meta.dirname is available after Node.js v20.11.0
  baseDirectory: import.meta.dirname,
  recommendedConfig: js.configs.recommended,
})

const eslintConfig = [
  ...compat.config({
    plugins: ["@typescript-eslint"],
    extends: ['eslint:recommended', 'next'],
    rules: {
      'react/no-unescaped-entities': 'off',
      '@next/next/no-page-custom-font': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      'no-unused-vars': "off",
      'no-undef': 'off',
      '@typescript-eslint/ban-ts-comment': 'off'
    },
  }),
]

export default eslintConfig