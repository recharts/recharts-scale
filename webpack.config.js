const { DefinePlugin } = require('webpack');

const env = process.env.NODE_ENV;

const config = {
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
    ],
  },

  plugins: [
    new DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    })
  ]
};

if (env === 'development') {
  config.mode = 'development';
}

if (env === 'production') {
  config.mode = 'production';
}

module.exports = config;
