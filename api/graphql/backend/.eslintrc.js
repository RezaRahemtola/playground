/**
 * @description Config codingRules
 * A simple eslint file based on airbnb rules
 * Find all rules here https://eslint.org/docs/rules/
 */

module.exports = {
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 2020,
		project: './tsconfig.json',
		sourceType: 'module',
		createDefaultProgram: true,
	},
	env: {
		node: true,
	},
	extends: ['airbnb-typescript/base', 'plugin:@typescript-eslint/recommended', 'plugin:prettier/recommended'],
	rules: {
		'no-console': 'off',
		'max-classes-per-file': 'off',
	},
};
