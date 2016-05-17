/**
 * Created by jbush_000 on 5/16/2016.
 */

var webpack = require('webpack');

module.exports = {
    entry: "./client/src/index.js",
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
    debug: true
};