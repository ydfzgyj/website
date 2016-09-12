const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const BabiliPlugin = require('babili-webpack-plugin');

module.exports = {
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
		modules: ['lib', 'page', 'directives', 'components']
	},
	plugins: [
		new ExtractTextPlugin({
			filename: './static/style.css',
			allChunks: true
		}),
		new OptimizeCssAssetsPlugin(),
		new BabiliPlugin()
	]
};