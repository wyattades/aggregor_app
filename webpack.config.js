require('dotenv').config();

const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const PATHS = {};
PATHS.rnvi_fonts = path.resolve(__dirname, 'node_modules/react-native-vector-icons/Fonts');
PATHS.rn_uncompiled = path.resolve(__dirname, 'node_modules/react-native-uncompiled');
PATHS.dist = path.resolve(__dirname, 'web');
PATHS.src = path.resolve(__dirname, 'src');
PATHS.images = path.resolve(PATHS.src, 'images');
PATHS.fonts = path.resolve(PATHS.src, 'fonts');
PATHS.fontName = 'fonts/[name].[ext]';
PATHS.imageName = 'images/[name].[ext]';
PATHS.index = './index';

const baseConfig = {

  resolve: {
    // Maps react-native imports for react-native-web
    alias: {
      'react-native$': 'react-native-web',
      'react-native-vector-icons/FontAwesome': 'react-native-vector-icons/dist/FontAwesome',
      'react-native-vector-icons/MaterialIcons': 'react-native-vector-icons/dist/MaterialIcons',
    },
    // Enable platform specific extensions
    extensions: [ '.web.js', '.js' ],
  },
  
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [{
          loader: 'babel-loader',
          options: {
            babelrc: false,
            cacheDirectory: true,
            plugins: [ 'react-native-web/babel' ],
            presets: [ 'react-native' ],
          },
        }],
        include: [
          PATHS.src,
          PATHS.rn_uncompiled,
        ],
      }, {
        test: /\.s?css$/,
        loaders: ExtractTextPlugin.extract({ fallback: 'style-loader', use: ['css-loader', 'sass-loader'] }),
        include: PATHS.css,
      }, {
        test: /\.(gif|jpe?g|png|svg)$/,
        loader: 'url-loader',
        query: {
          name: PATHS.imageName,
          limit: 10000,
        },
      }, {
        test: /\.ttf$/,
        loader: 'url-loader',
        query: {
          name: PATHS.fontName,
          limit: 10000,
        },
        include: [
          PATHS.rnvi_fonts,
          PATHS.fonts,
        ],
      },
    ],
  },
};

const sharedPlugins = [

  new HtmlWebpackPlugin({
    title: 'Aggregor',
    template: path.resolve(PATHS.src, 'index.web.ejs'),
    favicon: path.resolve(PATHS.images, 'favicon.ico'),
    inject: 'body',
  }),

  new ExtractTextPlugin({
    filename: '[contenthash].css',
    allChunks: true,
    disable: process.env.NODE_ENV !== 'production',
  }),

];

if (process.env.NODE_ENV === 'production') {

  module.exports = Object.assign({ // PRODUCTION CONFIG
    
    entry: [
      PATHS.index,
    ],

    output: {
      path: PATHS.dist,
      filename: '[name].[chunkhash].js',
      publicPath: './',
    },

    plugins: [
      ...sharedPlugins,

      new CleanWebpackPlugin([ 'web' ]),
      
      new webpack.optimize.OccurrenceOrderPlugin(),

      new UglifyJsPlugin({
        parallel: true,
      }),

      // CommonsChunkPlugin: vendor must come before runtime
      new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        minChunks: ({ resource }) => /node_modules/.test(resource),
      }),
      
      new webpack.optimize.CommonsChunkPlugin({
        name: 'runtime',
      }),

      new OptimizeCssAssetsPlugin({
        cssProcessorOptions: { discardComments: { removeAll: true } },
      }),
      
      new webpack.DefinePlugin({
        'process.env': {
          API_URL: JSON.stringify(process.env.API_URL),
          API_KEY: JSON.stringify(process.env.API_KEY),
          NODE_ENV: JSON.stringify('production'),
        },
        __DEV__: false,
      }),
    ],
  }, baseConfig);

} else {

  // Add react-hot-loader to development
  baseConfig.module.rules[0].use.unshift({ loader: 'react-hot-loader/webpack' });

  module.exports = Object.assign({ // DEVELOPMENT CONFIG
    devtool: 'eval-source-map',
    entry: [
      'react-hot-loader/patch',
      'webpack-dev-server/client?http://localhost:8080',
      'webpack/hot/only-dev-server',
      PATHS.index,
    ],
    plugins: [

      ...sharedPlugins,

      new webpack.NamedModulesPlugin(),

      new webpack.HotModuleReplacementPlugin(),

      new webpack.DefinePlugin({
        'process.env': {
          API_URL: JSON.stringify('http://localhost:3000'),
          API_KEY: JSON.stringify(process.env.API_KEY),
          NODE_ENV: JSON.stringify('development'),
        },
        __DEV__: true,
      }),

    ],
  }, baseConfig);

}
