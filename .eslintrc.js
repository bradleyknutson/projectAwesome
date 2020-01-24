module.exports = {
	'env': {
		'browser': true,
		'es6': true,
        'node': true,
		'commonjs': true,
		'jquery': true
	},
	'extends': 'eslint:recommended',
	'globals': {
		'Atomics': 'readonly',
		'SharedArrayBuffer': 'readonly'
	},
	'parserOptions': {
		'ecmaVersion': 2018,
		'sourceType': 'module'
	},
	'rules': {
		'indent': [
			'error',
			4
		],
		'linebreak-style': [
			'error',
			'unix'
		],
		'quotes': [
			'error',
			'backtick'
		],
		'semi': [
			'error',
			'always'
        ],
        'no-duplicate-case':'error',
        'no-empty':'error',
        'no-extra-semi':'error',
        'no-func-assign': 'error',
        'no-irregular-whitespace':'error',
        'no-unreachable': 'error',
        'curly': 'error',
        'dot-notation': 'error',
        'eqeqeq': 'error',
        'no-empty-function': 'error',
        'no-multi-spaces': 'error',
        'no-unused-vars': 'error',
        'camelcase': 'error',
	}
};