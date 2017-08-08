const fs = require('fs');
if (fs.existsSync('./.env')) {
  require('dotenv').config();
}

//TODO: output fonts to ./fonts folder

const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const PATHS = {};
PATHS.src = path.resolve(__dirname, 'src');
PATHS.assets = path.resolve(__dirname, 'assets');
PATHS.fonts = path.resolve(__dirname, PATHS.assets, 'fonts');
PATHS.fontName = path.resolve(__dirname, PATHS.fonts, '[name].[ext]');
PATHS.imageName = path.resolve(__dirname, 'images/[name].[ext]');
PATHS.dist = path.resolve(__dirname, 'web');
PATHS.index = './index';
PATHS.rn_uncompiled = path.resolve(__dirname, 'node_modules/react-native-uncompiled');

const baseConfig = {

  output: {
    path: PATHS.dist,
    filename: 'bundle.js',
    publicPath: '/'
  },

  resolve: {
    // Maps react-native imports for react-native-web
    alias: {
      'react-native-vector-icons/FontAwesome': 'react-native-vector-icons/dist/FontAwesome',
      'react-native-vector-icons/MaterialIcons': 'react-native-vector-icons/dist/MaterialIcons',
      'react-native$': 'react-native-web',
      'react-navigation/StackNavigator': 'react-navigation/lib/navigators/StackNavigator',
      'react-navigation/DrawerNavigator': 'react-navigation/lib/navigators/DrawerNavigator'
    },
    // Enable platform specific extensions (doesn't webpack do this be default?)
    extensions: [ '.web.js', '.js' ]
  },
  
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['babel-loader?cacheDirectory=true'],
        include: [
          PATHS.src,
          PATHS.rn_uncompiled
        ]
      }, {
        test: /\.s?css$/,
        loaders: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ],
        include: PATHS.css
      }, {
        test: /\.(gif|jpe?g|png|svg)$/,
        loader: 'url-loader',
        query: {
          name: PATHS.imageName
        }
      }, {
        test: /\.woff2$/,
        loader: 'url-loader',
        query: {
          name: PATHS.fontName,
          limit: 5000,
          mimetype: 'application/font-woff2'
        },
        include: PATHS.fonts
      }, {
        test: /\.woff$/,
        loader: 'url-loader',
        query: {
          name: PATHS.fontName,
          limit: 5000,
          mimetype: 'application/font-woff'
        },
        include: PATHS.fonts
      }, {
        test: /\.eot$/,
        loader: 'file-loader',
        query: {
          name: PATHS.fontName,
        },
        include: PATHS.fonts
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
    ]
  }
};

const sharedPlugins = [

  new HtmlWebpackPlugin({
    title: 'Aggregor',
    template: path.resolve(PATHS.src, 'index.template.ejs'),
    favicon: path.resolve(PATHS.assets, 'favicon.ico'),
    inject: 'body',
  }),

  // Ignore react-native specific dependencies
  new webpack.IgnorePlugin(/^react-native-material-ui\/?.*/),
  new webpack.IgnorePlugin(/^react-native-prompt\/?.*/),
  new webpack.IgnorePlugin(/^react-native-timeago\/?.*/),

];

if (process.env.NODE_ENV === 'production') {

  module.exports = Object.assign({ // PRODUCTION CONFIG
    entry: [
      PATHS.index
    ],
    plugins: [
      ...sharedPlugins,
      
      new webpack.optimize.OccurrenceOrderPlugin(),      
      new webpack.optimize.UglifyJsPlugin({
        minimize: true,
        compressor: {
          warnings: false,
          screw_ie8: true
        }
      }),
      
      new webpack.DefinePlugin({
        'process.env': {
          'API_URL': JSON.stringify(process.env.API_URL),
          'API_KEY': JSON.stringify(process.env.API_KEY),
          'NODE_ENV': JSON.stringify('production'),
        },
        '__DEV__': false,
      })
    ]
  }, baseConfig);

} else {

  // Add react-hot-loader to development
  baseConfig.module.loaders[0].loaders.unshift('react-hot-loader/webpack');

  module.exports = Object.assign({ // DEVELOPMENT CONFIG
    devtool: 'eval-source-map',
    entry: [
      'react-hot-loader/patch',
      'webpack-dev-server/client?http://localhost:8080',
      'webpack/hot/only-dev-server',
      PATHS.index
    ],
    plugins: [
      ...sharedPlugins,
      new webpack.NamedModulesPlugin(),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.DefinePlugin({
        'process.env': {
          'API_URL': JSON.stringify('http://localhost:3000'),
          'API_KEY': JSON.stringify(process.env.API_KEY),
          'NODE_ENV': JSON.stringify('development'),
        },
        '__DEV__': true,
      })
    ]
  }, baseConfig);

}