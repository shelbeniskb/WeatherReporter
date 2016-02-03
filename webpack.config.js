const path = require('path');
const webpack = require('webpack');

const host = process.env.HOST || '127.0.0.1';
const port = process.env.PORT || 3000;

const sassLoader = 'style!css!sass?sourceMap=true&sourceMapContents=true&includePaths[]=' +
  encodeURIComponent(path.resolve(__dirname, './src'));

module.exports = {
  entry: [
    `webpack-dev-server/client?http://${host}:${port}`,
    'webpack/hot/only-dev-server',
    './app.js',
  ],

  devServer: {
    hot: true,
  },

  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js',
    publicPath: `http://${host}:${port}/build`,
  },

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel',
        include: [
          path.resolve(__dirname, './app.js'),
          path.resolve(__dirname, './src'),
        ],
      },
      {
        test: /\.scss$/,
        loader: sassLoader,
        include: [
          path.resolve(__dirname, './src'),
        ],
      },
    ],
  },

  stats: {
    colors: true,
    reasons: true,
    chunks: false,
  },

  resolve: {
    extensions: ['', '.js', '.jsx'],
  },

  debug: true,

  devtool: 'source-map',

  watch: true,

  plugins: [
    new webpack.NoErrorsPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ],
};
