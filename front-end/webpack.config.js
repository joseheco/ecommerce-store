const HtmlWebpackPlugin = require('html-webpack-plugin');

const rulesCSS = {test: /\.css$/,
use:['style-loader', 'css-loader', 'postcss-loader']}

const rules = [rulesCSS]

module.exports = {
  devServer: {
    watchFiles: ["src/**/*"],
  },
  plugins: [ new HtmlWebpackPlugin({ template: 'src/index.html'}) ],
  module: { rules }
}