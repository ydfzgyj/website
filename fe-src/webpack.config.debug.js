const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
	watch: true,
	entry: {
		app: './fe-src/lib/entry.js'
	},
	output: {
		filename: './static/debug/main.js'
	},
	module: {
		loaders: [{
			test: /\.(html|svg)$/,
			loader: 'raw'
		}, {
			test: /\.(css|less)$/,
			loader: ExtractTextPlugin.extract({
				notExtractLoader: 'style',
				loader: 'css-raw!less'
			})
		}, {
			test: /\.js$/,
			loader: 'babel'
		}]
	},
	resolve: {
		modules: ['lib', 'page', 'directives', 'components']
	},
	plugins: [
		new ExtractTextPlugin({
			filename: './static/debug/style.css',
			allChunks: true
		})
	]
};