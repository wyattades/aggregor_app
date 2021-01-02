require("dotenv").config();

if (!(process.env.NODE_ENV in { production: 0, development: 0 })) {
  throw new Error("Must set valid NODE_ENV environment variable");
}

const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");

const __DEV__ = process.env.NODE_ENV === "development";

const PATHS = {};
PATHS.rnvi_fonts = path.resolve(
  __dirname,
  "node_modules/react-native-vector-icons"
);
PATHS.dist = path.resolve(__dirname, "web");
PATHS.src = path.resolve(__dirname, "src");
PATHS.images = path.resolve(PATHS.src, "images");
PATHS.fonts = path.resolve(PATHS.src, "fonts");
PATHS.fontName = "fonts/[name].[ext]";
PATHS.imageName = "images/[name].[ext]";
PATHS.index = "./index";

const parsedDependencies = [
  // 'react-native-vector-icons',
  "react-native-drawer",
  "react-native-uncompiled",
];

const baseConfig = {
  mode: process.env.NODE_ENV,

  context: __dirname,

  resolve: {
    // Maps react-native imports for react-native-web
    alias: {
      "react-native$": "react-native-web", // Necessary for 'react-native-vector-icons'
      "react-native-vector-icons/FontAwesome":
        "react-native-vector-icons/dist/FontAwesome",
      "react-native-vector-icons/MaterialIcons":
        "react-native-vector-icons/dist/MaterialIcons",
      "history/createMemoryHistory": "history/createBrowserHistory",
      "react-router-native": "react-router-dom",
    },
    // Enable platform specific extensions
    extensions: [".web.js", ".js"],
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: "babel-loader",
            options: {
              babelrc: false,
              cacheDirectory: true,
              plugins: ["react-native-web"],
              presets: ["react-native"],
            },
          },
        ],
        include: [
          PATHS.src,
          ...parsedDependencies.map((name) =>
            path.resolve(__dirname, `node_modules/${name}`)
          ),
        ],
      },
      {
        test: /\.s?css$/,
        use: [
          __DEV__ ? "style-loader" : MiniCssExtractPlugin.loader,
          "css-loader",
          "sass-loader",
        ],
        include: PATHS.css,
      },
      {
        test: /\.(gif|jpe?g|png|svg)$/,
        loader: "url-loader",
        query: {
          name: PATHS.imageName,
          limit: 10000,
        },
      },
      {
        test: /\.ttf$/,
        loader: "url-loader",
        query: {
          name: PATHS.fontName,
          limit: 10000,
        },
        include: [PATHS.rnvi_fonts, PATHS.fonts],
      },
    ],
  },
};

const sharedPlugins = [
  new HtmlWebpackPlugin({
    title: "Aggregor",
    template: path.resolve(PATHS.src, "index.web.ejs"),
    favicon: path.resolve(PATHS.images, "favicon.ico"),
    inject: "body",
  }),

  new MiniCssExtractPlugin({
    filename: __DEV__ ? "[name].css" : "[name].[hash].css",
    allChunks: true,
  }),
];

if (!__DEV__) {
  module.exports = Object.assign(
    {
      // PRODUCTION CONFIG

      entry: PATHS.index,

      output: {
        path: PATHS.dist,
        filename: "[name].[chunkhash].js",
        publicPath: "/",
      },

      optimization: {
        splitChunks: {
          chunks: "all",
        },
      },

      plugins: [
        ...sharedPlugins,

        new webpack.optimize.OccurrenceOrderPlugin(),

        new UglifyJsPlugin({
          parallel: true,
        }),

        new OptimizeCssAssetsPlugin({
          cssProcessorOptions: { discardComments: { removeAll: true } },
        }),

        new webpack.DefinePlugin({
          "process.env": {
            API_URL: JSON.stringify(process.env.API_URL),
            API_KEY: JSON.stringify(process.env.API_KEY),
            NODE_ENV: JSON.stringify("production"),
          },
          __DEV__: false,
        }),
      ],
    },
    baseConfig
  );
} else {
  module.exports = Object.assign(
    {
      // DEVELOPMENT CONFIG

      devtool: "cheap-module-source-map",

      entry: [PATHS.index],

      output: {
        publicPath: "/",
      },

      devServer: {
        port: 8080,
        contentBase: PATHS.dist,
        hot: true,
        historyApiFallback: true,
      },

      plugins: [
        ...sharedPlugins,

        new webpack.NamedModulesPlugin(),

        new webpack.HotModuleReplacementPlugin(),

        new webpack.DefinePlugin({
          "process.env": {
            API_URL: JSON.stringify("http://localhost:3000"),
            API_KEY: JSON.stringify(process.env.API_KEY),
            NODE_ENV: JSON.stringify("development"),
          },
          __DEV__: true,
        }),
      ],
    },
    baseConfig
  );
}
