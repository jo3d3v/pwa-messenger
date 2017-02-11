const buildHelper = require('./utils/buildHelper');
const webpackMerge = require('webpack-merge');
const webpackMergeDll = webpackMerge.strategy({
    plugins: 'replace'
});
const commonConfig = require('./webpack.common.js');

const DefinePlugin = require('webpack/lib/DefinePlugin');
const NamedModulesPlugin = require('webpack/lib/NamedModulesPlugin');
const LoaderOptionsPlugin = require('webpack/lib/LoaderOptionsPlugin');
const DllBundlesPlugin = require('webpack-dll-bundles-plugin').DllBundlesPlugin;
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');

const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || '3000';

module.exports = webpackMerge(commonConfig, {

    devtool: 'cheap-module-source-map',

    output: {
        path: buildHelper.addRoot('dist'),
        filename: '[name].bundle.js',
        sourceMapFilename: '[file].map',
        chunkFilename: '[id].chunk.js',
        library: 'ac_[name]',
        libraryTarget: 'var',
    },

    module: {

        rules: [
            // {
            //     test: /\.ts$/,
            //     use: [{
            //         loader: 'tslint-loader',
            //         options: {
            //             configFile: 'tslint.json'
            //         }
            //     }],
            //     exclude: [/\.(spec|e2e)\.ts$/]
            // },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
                include: [buildHelper.addRoot('src', 'styles')]
            },
            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader'],
                include: [buildHelper.addRoot('src', 'styles')]
            },
        ]
    },

    plugins: [

        new DllBundlesPlugin({
            bundles: {
                polyfills: [
                    'core-js',
                    {
                        name: 'zone.js',
                        path: 'zone.js/dist/zone.js'
                    },
                    {
                        name: 'zone.js',
                        path: 'zone.js/dist/long-stack-trace-zone.js'
                    },
                ],
                vendor: [
                    '@angular/platform-browser',
                    '@angular/platform-browser-dynamic',
                    '@angular/core',
                    '@angular/common',
                    '@angular/forms',
                    '@angular/http',
                    '@angular/router',
                    'rxjs',
                ]
            },
            dllDir: buildHelper.addRoot('dll'),
            webpackConfig: webpackMergeDll(commonConfig, {
                devtool: 'cheap-module-source-map',
                plugins: []
            })
        }),

        new AddAssetHtmlPlugin([{
                filepath: buildHelper.addRoot(`dll/${DllBundlesPlugin.resolveFile('polyfills')}`)
            },
            {
                filepath: buildHelper.addRoot(`dll/${DllBundlesPlugin.resolveFile('vendor')}`)
            }
        ]),
    ],

    /** Webpack Development Server configuration */
    devServer: {
        port: PORT,
        host: HOST,
        historyApiFallback: true,
        watchOptions: {
            aggregateTimeout: 300,
            poll: 1000
        }
    },

    node: {
        global: true,
        crypto: 'empty',
        process: true,
        module: false,
        clearImmediate: false,
        setImmediate: false
    }
});