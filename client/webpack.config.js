const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Path = require('path');
const config = require('./config');

module.exports = {
  entry: [
    './src/index.jsx',
  ],
  output: {
    path: __dirname,
    publicPath: '/',
    filename: 'bundle.js',
  },
  resolve: {
    root: [
      Path.resolve('.'),
    ],
    extensions: ['', '.js', '.jsx'],
  },
  module: {
    preLoaders: [
      { test: /\.(jsx|js)$/, loader: 'eslint-loader', exclude: /node_modules/ },
    ],
    loaders: [
      {
        test: /\.(jsx|js)$/,
        exclude: /node_modules/,
        loaders: ['babel-loader'],
        include: Path.join(__dirname, 'src/'),
      },
      {
        test: /\.sass$/,
        loader: 'style!css!sass',
      },
      {
        test: /\.css$/,
        loader: 'style!css',
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
    new webpack.ProvidePlugin({
      jQuery: 'jquery',
      $: 'jquery',
      jquery: 'jquery',
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
    }),
    new webpack.NoErrorsPlugin(),
    new HtmlWebpackPlugin({
      template: 'src/index.ejs',
      inject: true,
    }),
  ],
  devServer: {

    historyApiFallback: true,
    contentBase: './',
    hot: true,
    port: 4000,
    proxy: {
      '/api/*': {
        target: config.apiServer,
        changeOrigin: true,
        secure: false,
      },
    },
  },
};

