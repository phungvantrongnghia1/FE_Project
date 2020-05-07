const merge = require('webpack-merge');
const common = require('../webpack.common.js');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const ErrorOverlayPlugin = require('error-overlay-webpack-plugin');
const WatchMissingNodeModulesPlugin = require('react-dev-utils/WatchMissingNodeModulesPlugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const paths = require('./paths');

const devServer = {
  port: 3100,
  https: true,
  open: true,
  hot: true,
  contentBase: '/',
  compress: true,
  historyApiFallback: true,
  overlay: {
    errors: true,
    warnings: true
  },
  watchOptions: {
    ignored: /node_modules/
  }
};

const config = {
  output: {
    path: paths.appBuild,
    chunkFilename: '[name].[hash].chunk.js',
    filename: '[name].[hash].bundle.js', // format name của bundle
    publicPath: '/'
  },
  devtool: 'cheap-module-source-map',
  mode: 'development',
  plugins: [
    new LodashModuleReplacementPlugin({
      collections: true,
      paths: true,
      shorthands: '_',
      currying: true
    }),
    new ErrorOverlayPlugin(),
    new HtmlWebpackPlugin({
      template: 'public/index.html',
      filename: './index.html'
    }),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"development"',
      'process.env.DEBUG': JSON.stringify(process.env.DEBUG)
    }),
    new CopyPlugin([
      {
        from: paths.appPublic,
        to: paths.appBuild,
        ignore: ['index.html']
      }
    ]),
    new Dotenv(),
    new WatchMissingNodeModulesPlugin(paths.appNodeModules),
    new webpack.HotModuleReplacementPlugin(),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: '[name].css',
      chunkFilename: '[id].chunk.css'
    })
  ],
  devServer
};

module.exports = merge(common, config);
