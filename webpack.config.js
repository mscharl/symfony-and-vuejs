const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { resolve } = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const ManifestPlugin = require('webpack-manifest-plugin');

module.exports = (env, argv) => {
    const isProduction = argv.mode === 'production';

    return {
        entry: ['./assets/scss/main.scss', './assets/typescript/main.ts'],
        output: {
            path: resolve('public'),
            filename: 'assets/[name].[chunkhash].js',
        },
        devtool: isProduction ? false : 'source-map',
        mode: isProduction ? 'production' : argv.mode,
        plugins: [
            new MiniCssExtractPlugin({
                filename: 'assets/[name].[chunkhash].css',
            }),
            new CopyWebpackPlugin([
                {
                    from: 'assets/images/**/*',
                    to: '[path][name].[hash].[ext]',
                    toType: 'template',
                },
            ]),
            new VueLoaderPlugin(),
            new ManifestPlugin({
                fileName: 'assets/manifest.json',
            }),

        ],
        module: {
            rules: [
                {
                    test: /\.(scss)$/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        {
                            loader: 'css-loader',
                            options: {
                                sourceMap: true,
                            },
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                sourceMap: true,
                            },
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                sourceMap: true,
                            },
                        },
                    ],
                },
                {
                    test: /\.(jpg|gif|png|svg)$/,
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
                                emitFile: false,
                                context: 'assets',
                                name: '[path][name].[hash].[ext]',
                            },
                        },
                    ],
                },
                {
                    test: /\.ts?$/,
                    loader: 'ts-loader',
                    options: {
                        appendTsSuffixTo: [/\.vue$/],
                    },
                },
                {
                    test: /\.vue?$/,
                    loader: 'vue-loader',
                },
            ],
        },
        resolve: {
            extensions: ['.vue', '.ts', '.js', '.json'],
            alias: {
                'vue$': 'vue/dist/vue.esm.js',
            },
        },
    }
};
