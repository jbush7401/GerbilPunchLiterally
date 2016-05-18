/**
 * Created by jbush_000 on 5/16/2016.
 */

var webpack = require('webpack');

module.exports = {
    entry: "./client/index.js",
    output: {
        path: __dirname + "/client",
        filename: "build.js"
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                query: {
                    presets: ["es2015"]
                }
            }

        ]
    },
    devtool: 'inline-source-map',
    debug: true
};