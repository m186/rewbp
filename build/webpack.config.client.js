const path = require('path')
const HtmlPlugin = require('html-webpack-plugin')
const isDev = process.env.NODE_ENV === 'development'

const config = {
	mode: 'none',
	entry: {
		app: path.join(__dirname, '../client/app.js')
	},
	output: {
		filename: '[name].[hash].js',
		path: path.join(__dirname, '../dist/'),
		publicPath: '/public'
	},
	module: {
		rules: [
			{
				test: /.(jsx|js)$/,
				exclude: /node_modules/,
				use: [
					{
						loader: 'babel-loader'
					}
				]
			}
		]
	},
	plugins: [
		new HtmlPlugin({
			template: path.join(__dirname, '../client/template.html')
		})
	]
}

if (isDev) {
	config.devServer = {
		port: '3333',
		host: '0.0.0.0',
		contentBase: path.join(__dirname, '../dist'),
		hot: true,
		overlay: {
			errors: true
		},
		// 配置虚拟文件名挂载
		publicPath: '/public',
		historyApiFallback: {
			index: '/public/index.html'
		}
	}
}

module.exports = config