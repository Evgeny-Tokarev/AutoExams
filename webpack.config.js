const { VueLoaderPlugin } = require("vue-loader");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const FaviconsWebpackPlugin = require("favicons-webpack-plugin");
const ESLintPlugin = require("eslint-webpack-plugin");
const webpack = require("webpack");

const isDev = process.env.NODE_ENV === "development";

module.exports = {
  target: "web",
  mode: isDev ? "development" : "production",
  entry: {
    main: "./src/main.js",
    firestore: "./src/firestore.js",
  },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  devServer: {
    historyApiFallback: true,
    port: 8080,
    open: true,
    liveReload: true,
    hot: false,
  },
  watchOptions: {
    ignored: /node_modules/,
  },
  resolve: {
    extensions: ["*", ".js", ".vue"],
  },
  optimization: {
    runtimeChunk: "single",
    splitChunks: {
      chunks: "all",
    },
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: "vue-loader",
        options: {
          sourceMap: true,
        },
      },
      {
        test: /\.js$/,
        enforce: "pre",
        use: ["source-map-loader"],
      },
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.s?[ac]ss$/i,
        use: [
          isDev ? "vue-style-loader" : MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              sourceMap: true,
            },
          },
          {
            loader: "postcss-loader",
            options: {
              sourceMap: true,
            },
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: true,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      __VUE_OPTIONS_API__: true,
      __VUE_PROD_DEVTOOLS__: false,
    }),
    new CleanWebpackPlugin(),
    new VueLoaderPlugin(),
    new ESLintPlugin({
      extensions: ["js"],
    }),
    new FaviconsWebpackPlugin("./src/assets/student.png"),
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash].css",
    }),
    new HtmlWebpackPlugin({
      template: "index.html",
      inject: true,
    }),
  ],
};
