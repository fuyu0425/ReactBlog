var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var Path = require('path');
var config = require('./config');
module.exports = {
    entry : [
        './src/index.js'
    ],
    output : {
        path : __dirname,
        publicPath : '/',
        filename : 'bundle.js'
    },
    resolve : {
        root : [
            Path.resolve('.')
        ],
        extensions : [ '', '.js', '.jsx', ]
    },
    module : {
        loaders : [ {
            test : /\.(jsx|js)$/,
            exclude : /node_modules/,
            loaders : [ 'babel-loader' ],
            include : Path.join(__dirname, 'src/')
        }, {
            test : /\.sass$/,
            loader : "style!css!sass"
        }, {
            test : /\.css$/,
            loader : 'style!css'
        }, ]
    },

    plugins : [
        // new webpack.ProvidePlugin({
        //     jQuery : 'jquery',
        //     $ : 'jquery',
        //     jquery : 'jquery'
        // }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV' : JSON.stringify(process.env.NODE_ENV || 'development'),
        }),
        new HtmlWebpackPlugin({
            template : 'src/index.ejs',
            inject : true
        })
    ],
    devServer : {

        historyApiFallback : true,
        contentBase : './',
        hot : true,
        port : 4000,
        proxy : {
            '/api/*' : {
                target : config.apiServer,
                changeOrigin : true,
                secure : false
            }
        }
    }
};