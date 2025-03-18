import globals from 'globals'
import pluginJs from '@eslint/js'
import pluginReact from 'eslint-plugin-react'
import js from '@eslint/js'
import stylisticJs from '@stylistic/eslint-plugin-js'



/** @type {import('eslint').Linter.Config[]} */
export default [
  js.configs.recommended,
  {files: ['**/*.{js,mjs,cjs,jsx}']},
  {files: ['**/*.js'], languageOptions: {sourceType: 'commonjs'}},
  {languageOptions: { globals: globals.browser }},
  
  {
    plugins: {
      '@stylistic/js': stylisticJs
    },
    rules: {
      '@stylistic/js/indent': [
        'error',
        2
      ],
      '@stylistic/js/linebreak-style': [
        'error',
        'unix'
      ],
      '@stylistic/js/quotes': [
        'error',
        'single'
      ],
      '@stylistic/js/semi': [
        'error',
        'never'
      ],
    },
  },

  pluginJs.configs.recommended,
  pluginReact.configs.flat.recommended,
]