const webpack = require('webpack');
const buildHelper = require('./utils/buildHelper');
const isProd = (process.env.ENV === 'production');

const DefinePlugin = require('webpack/lib/DefinePlugin');
const AssetsPlugin = require('assets-webpack-plugin');
const NormalModuleReplacementPlugin = require('webpack/lib/NormalModuleReplacementPlugin');
const ContextReplacementPlugin = require('webpack/lib/ContextReplacementPlugin');
const CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CheckerPlugin = require('awesome-typescript-loader').CheckerPlugin;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ngcWebpack = require('ngc-webpack');

module.exports = {

    entry: {
        polyfills: './src/polyfills.ts',
        main: buildHelper.isAot ? './src/main.aot.ts' : './src/main.ts'
    },

    resolve: {
        extensions: ['.ts', '.js', '.json'],
        modules: [buildHelper.addRoot('src'), buildHelper.addRoot('node_modules')],
    },

    module: {

        rules: [

            /*
             * Typescript loader support for .ts
             *
             * Component Template/Style integration using `angular2-template-loader`
             * Angular 2 lazy loading (async routes) via `ng-router-loader`
             *
             * `ng-router-loader` expects vanilla JavaScript code, not TypeScript code. This is why the
             * order of the loader matter.
             *
             * See: https://github.com/s-panferov/awesome-typescript-loader
             * See: https://github.com/TheLarkInn/angular2-template-loader
             * See: https://github.com/shlomiassaf/ng-router-loader
             */
            {
                test: /\.ts$/,
                use: [{ // MAKE SURE TO CHAIN VANILLA JS CODE, I.E. TS COMPILATION OUTPUT.
                        loader: 'ng-router-loader',
                        options: {
                            loader: 'async-import',
                            genDir: 'compiled',
                            aot: buildHelper.isAot
                        }
                    },
                    {
                        loader: 'awesome-typescript-loader',
                        options: {
                            configFileName: buildHelper.isAot ? 'tsconfig.webpack.aot.json' : 'tsconfig.webpack.jit.json'
                        }
                    },
                    {
                        loader: 'angular2-template-loader'
                    }
                ],
                exclude: [/\.(spec|e2e)\.ts$/]
            },
            {
                test: /\.json$/,
                use: 'json-loader'
            },
            {
                test: /\.css$/,
                use: ['to-string-loader', 'css-loader?url=false'],
                exclude: [buildHelper.addRoot('src', 'styles')]
            },
            {
                test: /\.scss$/,
                use: ['to-string-loader', 'css-loader?url=false', 'sass-loader'],
                exclude: [buildHelper.addRoot('src', 'styles')]
            },
            {
                test: /\.html$/,
                use: 'raw-loader',
                exclude: [buildHelper.addRoot('src/index.html')]
            },
            {
                test: /\.(jpg|png|gif)$/,
                use: 'file-loader'
            },
            {
                test: /\.(eot|woff2?|svg|ttf)([\?]?.*)$/,
                use: 'file-loader'
            }
        ],

    },

    plugins: [
        new DefinePlugin({
            'PRODUCTION': JSON.stringify(isProd)
        }),

        new AssetsPlugin({
            path: buildHelper.addRoot('dist'),
            filename: 'webpack-assets.json',
            prettyPrint: true
        }),

        /* Do type checking in a separate process, so webpack don't need to wait. */
        new CheckerPlugin(),

        /* Description: Shares common code between the pages. */
        new CommonsChunkPlugin({
            name: 'polyfills',
            chunks: ['polyfills']
        }),
        // This enables tree shaking of the vendor modules
        new CommonsChunkPlugin({
            name: 'vendor',
            chunks: ['main'],
            minChunks: module => /node_modules/.test(module.resource)
        }),
        // Specify the correct order the scripts will be injected in
        new CommonsChunkPlugin({
            name: ['polyfills', 'vendor'].reverse()
        }),

        /** Provides context to Angular's use of System.import */
        new ContextReplacementPlugin(
            // The (\\|\/) piece accounts for path separators in *nix and Windows
            /angular(\\|\/)core(\\|\/)src(\\|\/)linker/,
            buildHelper.addRoot('src'), // location of your src
            {
                // your Angular Async Route paths relative to this root directory
            }
        ),

        new CopyWebpackPlugin([{
            from: 'src/assets',
            to: 'assets'
        },{
            from: 'src/favicon.ico',
            to: 'favicon.ico'
        }, {
            from: 'src/manifest.json',
            to: 'manifest.json'
        }, {
            from: 'src/sw.js',
            to: 'sw.js'
        }]),

        new HtmlWebpackPlugin({
            template: 'src/index.html',
            chunksSortMode: 'dependency',
            metadata: {
                isDevServer: buildHelper.isWatch
            },
            inject: 'body'
        }),

        // Fix Angular 2
        new NormalModuleReplacementPlugin(
            /facade(\\|\/)async/,
            buildHelper.addRoot('node_modules/@angular/core/src/facade/async.js')
        ),
        new NormalModuleReplacementPlugin(
            /facade(\\|\/)collection/,
            buildHelper.addRoot('node_modules/@angular/core/src/facade/collection.js')
        ),
        new NormalModuleReplacementPlugin(
            /facade(\\|\/)errors/,
            buildHelper.addRoot('node_modules/@angular/core/src/facade/errors.js')
        ),
        new NormalModuleReplacementPlugin(
            /facade(\\|\/)lang/,
            buildHelper.addRoot('node_modules/@angular/core/src/facade/lang.js')
        ),
        new NormalModuleReplacementPlugin(
            /facade(\\|\/)math/,
            buildHelper.addRoot('node_modules/@angular/core/src/facade/math.js')
        ),

        new ngcWebpack.NgcWebpackPlugin({
            disabled: !buildHelper.isAot,
            tsConfig: buildHelper.addRoot('tsconfig.webpack.aot.json'),
            // TODO sass-loader doesn't support empty files
            //resourceOverride: buildHelper.addRoot('utils', 'resource-override.js')
        })

    ],

    node: {
        global: true,
        crypto: 'empty',
        process: true,
        module: false,
        clearImmediate: false,
        setImmediate: false
    }
};