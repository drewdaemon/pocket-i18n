const path = require('path');

module.exports = {
    mode: 'production',
    entry: './test/tests.js',
    output: {
        filename: 'testBundle.js',
        path: path.resolve(__dirname, 'tmp')
    },
    optimization: {
		// We no not want to minimize our code.
		minimize: false
	},
}
