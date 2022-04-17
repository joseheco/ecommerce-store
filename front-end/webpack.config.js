const HtmlWebpackPlugin = require('html-webpack-plugin');

const rulesJS = {test: /\.js$/,
loader: 'babel-loader',
options: {
  presets: ['@babel/preset-env']
}}

const rulesCSS = {test: /\.css$/,
use:['style-loader', 'css-loader', 'postcss-loader']}

const rules = [rulesJS, rulesCSS]

module.exports = {
  devServer: {
    watchFiles: ["src/**/*"],
  },
  plugins: [ new HtmlWebpackPlugin({ template: 'src/index.html'}) ],
  module: { rules }
}