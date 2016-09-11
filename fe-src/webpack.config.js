'use strict';
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
	watch: true,
	entry: {
		app: './fe-src/lib/entry.js'
	},
	output: {
		filename: './static/main.js'
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
		modules: ['lib', 'page', 'directives', 'components', '../node_modules']
	},
	plugins: [
		new ExtractTextPlugin({
			filename: './static/style.css',
			allChunks: true
		})
	]
};