/**
 * Created by yeanzhi on 17/2/25.
 */
'use strict';
const {
    resolve
} = require('path');
const webpack = require('webpack');
var node_modules = resolve(__dirname, 'node_modules');
var pathToReact = resolve(node_modules, 'react/dist/react.min.js');

module.exports = {
    entry: {
        'nx-loading': [
            './src/index.js'
        ]
    },
    output: {
        filename: '[name].js',
        sourceMapFilename: '[file].map',
        path: resolve(__dirname, 'dist'),
        publicPath: '/dist',
        library: 'nx-loading',
        libraryTarget: 'umd'
    },
    devtool: 'cheap-module-source-map',

    performance: {
        hints: false
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use:[{
                    loader: 'babel-loader',
                    options: {
                        'presets': [
                            ['es2015', {
                                'modules': false
                            }], 'stage-0', 'react'
                        ],
                        'env': {},
                        'ignore': [
                            'node_modules/**',
                            'dist'
                        ],
                        'plugins': [
                            'transform-decorators-legacy'
                        ]
                    }
                }],
                exclude: /node_modules/
            },
            {
                test:/\.css$/,
                use: ['style-loader','css-loader','postcss-loader']
            },
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'postcss-loader',
                    'sass-loader'
                ]
            }, {
                test: /\.(png|jpg|jpeg|gif|woff|svg|eot|ttf|woff2)$/i,
                use: ['url-loader']
            }
        ]
    },
    externals: [
        {
            react: {
                root: 'React',
                commonjs2: 'react',
                commonjs: 'react',
                amd: 'react'
            },
            'react-dom':{
                root: 'ReactDOM',
                commonjs2: 'react-dom',
                commonjs: 'react-dom',
                amd: 'react-dom'
            }
        }
    ],
    plugins: [
        new webpack.NamedModulesPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            }
        }),
    ]
};
