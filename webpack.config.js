const HtmlWebpackPlugin = require('html-webpack-plugin');
const rulesCSS = {test: /\.css$/,
use:['style-loader', 'css-loader']}

const rules = [rulesCSS]

module.exports = {
  devServer: {
    watchFiles: ["/src/**/*"],
  },
  context: __dirname + '/src',
  entry: './index.js',
  plugins: [ new HtmlWebpackPlugin({ template: 'index.html'}) ],
  module: { rules }
}
