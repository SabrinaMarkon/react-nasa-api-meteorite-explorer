const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = {
  mode: 'production',     // set mode option, 'development' or 'production'
  entry: [
    './src/index.js'
  ],
  output: {
    path: path.resolve(__dirname,'dist'),
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: './dist'
  },
  module: {
    rules: [
      {
        test: /\.js$/,      
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
    template: './src/index.html'
    })
    ]
};

module.exports = config
