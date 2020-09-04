const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  // entry: ['./src/js/index.js'],
  entry: ['@babel/polyfill', './src/js/index.js'],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/bundle.js' // standard name for a webpack bundle
  },
  devServer: {
    contentBase: './dist'
  },
  plugins: [
    new htmlWebpackPlugin({
      filename: 'index.html',
      template: './src/index.html'
    })
  ],
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: {
        loader:'babel-loader'
      }
    }]
  }
};