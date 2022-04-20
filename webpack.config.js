const HtmlWebpackPlugin = require('html-webpack-plugin');
const rulesCSS = {test: /\.css$/,
use:['style-loader', 'css-loader']}

const rules = [rulesCSS]

module.exports = {
  devServer: {
    watchFiles: ["front-end/src/**/*"],
  },
  context: __dirname + '/front-end/src',
  entry: './index.js',
  plugins: [ new HtmlWebpackPlugin({ template: 'index.html'}) ],
  module: { rules }
}
