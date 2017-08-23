const fs = require('fs');

if (fs.existsSync('./.env')) {
  // eslint-disable-next-line global-require
  require('dotenv').config();
}

const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const PATHS = {};
PATHS.rn_uncompiled = path.resolve(__dirname, 'node_modules/react-native-uncompiled');
PATHS.dist = path.resolve(__dirname, 'web');
PATHS.src = path.resolve(__dirname, 'src');
PATHS.images = path.resolve(PATHS.src, 'images');
PATHS.fonts = path.resolve(PATHS.src, 'fonts');
PATHS.fontName = 'fonts/[name].[ext]';
PATHS.imageName = 'images/[name].[ext]';
PATHS.index = './index';

const baseConfig = {

  output: {
    path: PATHS.dist,
    filename: 'bundle.js',
    publicPath: '/',
  },

  resolve: {
    // Maps react-native imports for react-native-web
    alias: {
      'react-native-vector-icons/FontAwesome': 'react-native-vector-icons/dist/FontAwesome',
      'react-native-vector-icons/MaterialIcons': 'react-native-vector-icons/dist/MaterialIcons',
      'react-native$': 'react-native-web',
      'react-navigation/StackNavigator': 'react-navigation/lib/navigators/StackNavigator',
      'react-navigation/DrawerNavigator': 'react-navigation/lib/navigators/DrawerNavigator',
    },
    // Enable platform specific extensions
    extensions: [ '.web.js', '.js' ],
  },
  
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader',
            query: {
              babelrc: false,
              cacheDirectory: true,
              presets: [ 'es2015', 'stage-0', 'react' ],
            },
          },
        ],
        include: [
          PATHS.src,
          PATHS.rn_uncompiled,
        ],
      }, {
        test: /\.s?css$/,
        loaders: [
          'style-loader',
          'css-loader',
          'sass-loader',
        ],
        include: PATHS.css,
      }, {
        test: /\.(gif|jpe?g|png|svg)$/,
        loader: 'url-loader',
        query: {
          name: PATHS.imageName,
        },
      }, {
        test: /\.woff2$/,
        loader: 'url-loader',
        query: {
          name: PATHS.fontName,
          limit: 5000,
          mimetype: 'application/font-woff2',
        },
        include: PATHS.fonts,
      }, {
        test: /\.woff$/,
        loader: 'url-loader',
        query: {
          name: PATHS.fontName,
          limit: 5000,
          mimetype: 'application/font-woff',
        },
        include: PATHS.fonts,
      }, {
        test: /\.eot$/,
        loader: 'file-loader',
        query: {
          name: PATHS.fontName,
        },
        include: PATHS.fonts,
      }, {
        test: /\.ttf$/,
        loader: 'file-loader',
        query: {
          name: '[name].[ext]',
        },
        include: path.resolve(__dirname, 'node_modules/react-native-vector-icons'),
      }, {
        test: /\.ttf$/,
        loader: 'url-loader',
        query: {
          name: PATHS.fontName,
        },
        include: PATHS.fonts,
      },
    ],
  },
};

const sharedPlugins = [

  new HtmlWebpackPlugin({
    title: 'Aggregor',
    template: path.resolve(PATHS.src, 'index.template.ejs'),
    favicon: path.resolve(PATHS.images, 'favicon.ico'),
    inject: 'body',
  }),

];

if (process.env.NODE_ENV === 'production') {

  module.exports = Object.assign({ // PRODUCTION CONFIG
    entry: [
      PATHS.index,
    ],
    plugins: [
      ...sharedPlugins,
      
      new webpack.optimize.OccurrenceOrderPlugin(),
      new UglifyJsPlugin({
        parallel: true,
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
