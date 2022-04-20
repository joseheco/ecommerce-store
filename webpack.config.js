const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path')
const rulesCSS = {test: /\.css$/,
use:['style-loader', 'css-loader']}

const rules = [rulesCSS]

module.exports = {
  output: { 
    path: path.resolve(__dirname, './front-end/public')
  },
  devServer: {
    watchFiles: ["front-end/src/**/*"],
  },
  context: __dirname + '/front-end/src',
  entry: './index.js',
  plugins: [ new HtmlWebpackPlugin({ template: 'index.html'}) ],
  module: { rules }
}
