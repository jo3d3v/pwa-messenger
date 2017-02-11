const buildHelper = require('./utils/buildHelper');
const webpackMerge = require('webpack-merge'); 
const commonConfig = require('./webpack.common.js');

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const NormalModuleReplacementPlugin = require('webpack/lib/NormalModuleReplacementPlugin');
const UglifyJsPlugin = require('webpack/lib/optimize/UglifyJsPlugin');
const OptimizeJsPlugin = require('optimize-js-plugin');

module.exports = webpackMerge(commonConfig, {
    /** Developer tool to enhance debugging */
    devtool: 'source-map',
    output: {

        /** The output directory as absolute path (required). */
        path: buildHelper.addRoot('dist'),

        /** IMPORTANT: You must not specify an absolute path here! */
        filename: '[name].[chunkhash].bundle.js',

        /** The filename of the SourceMaps for the JavaScript files. */
        sourceMapFilename: '[name].[chunkhash].bundle.map',

        /** The filename of non-entry chunks as relative path */
        chunkFilename: '[id].[chunkhash].chunk.js'

    },

    module: {

        rules: [

            /* Extract CSS files from .src/styles directory to external CSS file */
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: 'css-loader'
                }),
                include: [buildHelper.addRoot('src', 'styles')]
            },

            /* Extract and compile SCSS files from .src/styles directory to external CSS file */
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: 'css-loader!sass-loader'
                }),
                include: [buildHelper.addRoot('src', 'styles')]
            },

        ]

    },

    /** Add additional plugins to the compiler. */
    plugins: [

        /** Webpack plugin to optimize a JavaScript file for faster initial load by wrapping eagerly-invoked functions. */
        new OptimizeJsPlugin({
            sourceMap: false
        }),

        /** Extracts imported CSS files into external stylesheet */
        new ExtractTextPlugin('[name].[contenthash].css'),

        /** Minimize all JavaScript output of chunks. */
        new UglifyJsPlugin({
            // beautify: true, //debug
            // mangle: false, //debug
            // dead_code: false, //debug
            // unused: false, //debug
            // deadCode: false, //debug
            // compress: {
            //   screw_ie8: true,
            //   keep_fnames: true,
            //   drop_debugger: false,
            //   dead_code: false,
            //   unused: false
            // }, // debug
            // comments: true, //debug

            beautify: false, //prod
            output: {
                comments: false
            }, //prod
            mangle: {
                screw_ie8: true
            }, //prod
            compress: {
                screw_ie8: true,
                warnings: false,
                conditionals: true,
                unused: true,
                comparisons: true,
                sequences: true,
                dead_code: true,
                evaluate: true,
                if_return: true,
                join_vars: true,
                negate_iife: false // we need this for lazy v8
            },
        }),

        // new NormalModuleReplacementPlugin(
        //     /zone\.js(\\|\/)dist(\\|\/)long-stack-trace-zone/,
        //     buildHelper.addRoot('config/empty.js')
        // ),

    ],

    node: {
        global: true,
        crypto: 'empty',
        process: false,
        module: false,
        clearImmediate: false,
        setImmediate: false
    }
});