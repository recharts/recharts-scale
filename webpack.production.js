var path = require('path');
var webpack = require('webpack');
var WebpackErrorNotificationPlugin = require('webpack-error-notification');

module.exports = {
  debug: true,
  devtool: 'source-map',
  cache: true,
  watch: true,
  watchDelay: 200,
  entry: './src/scale.js',
  output: {
    path: path.join(__dirname, 'watch/'),
    filename: 'recharts-scale.js',
    publicPath: '/watch/',
    libraryTarget: 'umd',
    library: 'recharts-scale'
  },
  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader"}
    ]
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': 'development'
      }
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.optimize.AggressiveMergingPlugin()
  ]
};
