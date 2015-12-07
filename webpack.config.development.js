const pkg = require('./package');
const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const cssnext = require("postcss-cssnext");
const postcssImport = require("postcss-import");
const ExtractTextPlugin = require('extract-text-webpack-plugin');

//{
//        test: /(\.css)$/,
//        loader: ExtractTextPlugin.extract('style', 'css?sourceMap&modules&importLoaders=1&localIdentName=[name]__[local]--[hash:base64:5]!postcss')
//      },

module.exports = {
  context: __dirname,
  devtool: 'inline-source-map',
  entry: [
    'webpack-hot-middleware/client',
    './spec/index.jsx'
  ],
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'spec.js',
    publicPath: '/build/'
  },
  resolve: {
    extensions: ['', '.jsx', '.scss', '.js', '.json']
  },
  module: {
    loaders: [
      {
        test: /(\.js|\.jsx)$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader'
      }, {
        test: /(\.scss)$/,
        loader: ExtractTextPlugin.extract('style', 'css?sourceMap&modules&importLoaders=1&localIdentName=[name]__[local]--[hash:base64:5]!sass?sourceMap')
      },
      {
        test: /\.css$/,
        loader: 'style!css?sourceMap&modules&importLoaders=1&localIdentName=[local]___[hash:base64:5]!postcss' }
    ]
  },
  postcss: function (webpack) {
    return [
      postcssImport({
        addDependencyTo: webpack
      }),
      cssnext,
      autoprefixer
    ];
  },
  plugins: [
    new ExtractTextPlugin('spec.css', { allChunks: true }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
      VERSION: JSON.stringify(pkg.version)
    })
  ]
};
