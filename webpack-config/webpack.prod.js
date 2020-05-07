const merge = require('webpack-merge');
const common = require('../webpack.common.js');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const Dotenv = require('dotenv-webpack');

const paths = require('./paths');

const config = {
  output: {
    path: paths.appBuild,
    chunkFilename: 'static/js/[name].[hash].chunk.js',
    filename: 'static/js/[name].[hash].bundle.js', // format name của bundle
    publicPath: '/'
  },
  //devtool: "cheap-module-eval-source-map",
  mode: 'production',
  optimization: {
    splitChunks: {
      maxInitialRequests: Infinity,
      minSize: 0,
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        }
      }
    },
    removeEmptyChunks: true,
    runtimeChunk: {
      name: entrypoint => `runtime~${entrypoint.name}`
    },
    minimize: true,
    namedModules: true,
    mergeDuplicateChunks: true,
    nodeEnv: 'production',
    minimizer: [
      // new UglifyJsPlugin({
      //   exclude: /node_modules/,
      //   uglifyOptions: {
      //     warnings: false,
      //     parse: {},
      //     compress: {},
      //     mangle: true, // Note `mangle.properties` is `false` by default.
      //     output: null,
      //     toplevel: false,
      //     nameCache: null,
      //     ie8: false,
      //     keep_fnames: false
      //   }
      // }),
      new TerserPlugin()
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      minify: {
        collapseWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        useShortDoctype: true
      },
      template: 'public/index.html',
      filename: 'index.html'
    }),
    new LodashModuleReplacementPlugin({
      collections: true,
      paths: true,
      shorthands: '_',
      currying: true
    }),
    new CompressionPlugin({
      cache: true,
      filename: '[path].gz[query]',
      algorithm: 'gzip',
      test: /\.js$|\.css$|\.html$/,
      threshold: 10240,
      minRatio: 0
    }),
    new Dotenv(),
    new CopyPlugin([
      {
        from: paths.appPublic,
        to: paths.appBuild,
        ignore: ['index.html']
      }
    ]),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"'
    }),
    new webpack.IgnorePlugin({
      resourceRegExp: /^\.\/locale$/,
      contextRegExp: /moment$/
    }),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: 'static/css/[name].[hash].css',
      chunkFilename: 'static/css/[id].[hash].css'
    })
  ]
};

module.exports = merge(common, config);
