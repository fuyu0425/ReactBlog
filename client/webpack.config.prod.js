const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const Path = require('path');
const config = require('./config');

module.exports = {
  entry: {
    bundle: ['./src/index.jsx',],
    vendor: [
      'react',
      'react-dom',
      'react-redux',
      'react-router',
      'react-router-redux',
      'react-bootstrap',
      'react-router-bootstrap',
      'redux',
      'sweetalert',
      'axios'
    ]
  },
  output: {
    path: `${__dirname}/dist`,
    publicPath: '/',
    filename: '[name].[chunkhash].js',
  },
  resolve: {
    root: [
      Path.resolve('.'),
    ],
    extensions: ['', '.js', '.jsx'],
  },
  module: {
//    preLoaders: [
//      { test: /\.(jsx|js)$/, loader: 'eslint-loader', exclude: /node_modules/ },
//    ],
    loaders: [
      {
        test: /\.(jsx|js)$/,
        exclude: /node_modules/,
        loaders: ['babel-loader'],
        include: Path.join(__dirname, 'src/'),
      },
      {
        test: /\.json$/,
        loader: 'json',
      },
      {
        test: /\.sass$/,
//        loader: 'style!css!sass',
        loader: ExtractTextPlugin.extract("style-loader", "css-loader!sass-loader"),
      },
      {
        test: /\.css$/,
//        loader: 'style!css',
        loader: ExtractTextPlugin.extract("style-loader", "css-loader"),
      },

      { test: /bootstrap\/js\//, loader: 'imports?jQuery=jquery' },
      {
        test: /\.woff/,
        loader: 'url?limit=10000&mimetype=application/font-woff'
      },
      {
        test: /\.ttf$/,
        loader: 'url?limit=10000&mimetype=application/octet-stream',
      },
      { test: /\.eot$/, loader: 'file', },
      {
        test: /\.svg$/,
        loader: "url?limit=10000&mimetype=image/svg+xml",
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/,
        loader: 'file',
        exclude: /node_modules/,
      },

    ],

  },

  plugins: [
    new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.[chunkhash].js'),
    new ExtractTextPlugin("styles.[chunkhash].css"),
    new webpack.optimize.DedupePlugin(),
    new webpack.ProvidePlugin({
      jQuery: 'jquery',
      $: 'jquery',
      jquery: 'jquery',
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        properties: true,
        sequences: true,
        dead_code: true,
        drop_console: true,
        conditionals: true,
        comparisons: true,
        evaluate: true,
        booleans: true,
        unused: true,
        loops: true,
        hoist_funs: true,
        cascade: true,
        if_return: true,
        join_vars: true,
        drop_debugger: true,
        unsafe: true,
        hoist_vars: true,
        negate_iife: true,
      },
      comments: false,
      mangle: true,
      minimize: true,
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.AggressiveMergingPlugin(), new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        properties: true,
        sequences: true,
        dead_code: true,
        drop_console: true,
        conditionals: true,
        comparisons: true,
        evaluate: true,
        booleans: true,
        unused: true,
        loops: true,
        hoist_funs: true,
        cascade: true,
        if_return: true,
        join_vars: true,
        drop_debugger: true,
        unsafe: true,
        hoist_vars: true,
        negate_iife: true,
      },
      comments: false,
      mangle: true,
      minimize: true,
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.AggressiveMergingPlugin(),
    new HtmlWebpackPlugin({
      template: 'src/index.ejs',
      inject: true,
    }),
  ],
};

