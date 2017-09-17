const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('./webpack.config');

new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  contentBase: config.output.path,
  hot: true,
  stats: {
    colors: true,
    hash: false,
    timings: true,
    chunks: false,
    chunkModules: false,
    modules: false,
  },
  historyApiFallback: {
    index: 'index.html',
  },
}).listen(8080, '0.0.0.0', (err) => {
  if (err) {
    console.log(err);
    return;
  }
  
  console.log('Listening at http://0.0.0.0:8080/');
});
