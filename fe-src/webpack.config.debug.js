const HtmlWebpackPlugin = require('html-webpack-plugin');
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
		new HtmlWebpackPlugin({
			template: './fe-src/template.js',
			filename: './static/debug/index.html',
			vueBundle: '/debug/vue.bundle.js',
			inject: false
		}),
		new ExtractTextPlugin({
			filename: './static/debug/style.css',
			allChunks: true
		})
	]
};