const path = require('path')
const webpack = require('webpack')
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
    publicPath: '/public/'
  },
  resolve: {
    extensions: ['.js', '.jsx']
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
  plugins: [new HtmlPlugin(
    {
      template: path.join(__dirname, '../client/template.html')
    }
  )]
}

if (isDev) {
  config.entry = {
    app: [
      "react-hot-loader/patch", path.join(__dirname, '../client/app.js')
    ]
  }
  config.devServer = {
    port: '3333',
    host: '0.0.0.0',
    contentBase: path.join(__dirname, '../dist'),
    hot: true,
    overlay: {
      errors: true
    },
    publicPath: '/public', // 配置虚拟文件名挂载
    historyApiFallback: { // 如果加载不正确，则返回这个页面
      index: '/public/index.html'
    }
  },
  config.plugins.push(new webpack.HotModuleReplacementPlugin())
}

module.exports = config
