const { VueLoaderPlugin } = require("vue-loader");
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// const webpack = require('webpack');
// const CopyPlugin = require('copy-webpack-plugin');
// const TerserPlugin = require('terser-webpack-plugin');
// const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const webpack = require('webpack');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development';

module.exports = {
  target: 'web',
  mode: "production",
  entry: './src/main.js',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist')
},
devServer: {
    historyApiFallback: true,
    port: 8080,
    open: true,
    liveReload: true,
    hot: false
},
watchOptions: {
    ignored: /node_modules/
},
  resolve: {
    extensions: ["*", ".js", ".vue"]
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: "vue-loader",
        options: {
            hotReload: true
          }
      },
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: /node_modules/
      },
      {
        test: /\.s?[ac]ss$/i,
        use: [
          isDev ? 'vue-style-loader' : MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new VueLoaderPlugin(),
    new ESLintPlugin({
        extensions: ['js'],
      }),
    // new FaviconsWebpackPlugin('./img/favicon.jpg'),
    new MiniCssExtractPlugin({
        filename: '[name].[contenthash].css',
      }),
    new HtmlWebpackPlugin({
        template: 'index.html',
        inject: true
    })
    ]
};
