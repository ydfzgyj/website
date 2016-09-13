const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const BabiliPlugin = require('babili-webpack-plugin');
const pkg = require('../package.json');

module.exports = {
	entry: {
		app: './fe-src/lib/entry.js'
	},
	output: {
		filename: './static/main-v' + pkg.version + '.js'
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
		new HtmlWebpackPlugin({
			template: './fe-src/template.js',
			filename: './static/index.html',
			vueBundle: '/vue.bundle-v' + pkg.version + '.js',
			inject: false,
			minify: {
				collapseWhitespace: true
			}
		}),
		new ExtractTextPlugin({
			filename: './static/style-v' + pkg.version + '.css',
			allChunks: true
		}),
		new OptimizeCssAssetsPlugin(),
		new BabiliPlugin()
	]
};