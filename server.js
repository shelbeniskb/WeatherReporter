// require('babel/register');

const WebpackDevServer = require('webpack-dev-server');
const webpack = require('webpack');
const config = require('./webpack.config');
const path = require('path');

/**
 * Start dev server that serves static webpack compiled files
 */
const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || 3000;

const serverOptions = {
  contentBase: path.resolve('./'),
  quiet: false,
  noInfo: false,
  hot: true,
  inline: true,
  lazy: false,
  publicPath: `http://${host}:${port}/build`,
  headers: {
    'Access-Control-Allow-Origin': '*',
  },
  stats: {
    colors: true,
  },
};

const webpackDevServer = new WebpackDevServer(webpack(config), serverOptions);

webpackDevServer.listen(port, host, () => {
  console.log('Webpack dev server listening on %s:%s', host, port);
});
