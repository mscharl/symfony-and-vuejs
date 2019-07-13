const { resolve } = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const entries = {
    web: ['./assets/scss/main.scss', './assets/typescript/main.ts'],
};

module.exports = (env, argv) => {
    process.env.BABEL_ENV = argv.mode;

    const isProduction = argv.mode === 'production';
    const useTypecheck = argv.typecheck !== false;
    const useSourcemap = argv.sourcemap !== false && !isProduction;

    return {
        entry: entries,
        output: {
            path: resolve('public', 'assets'),
            filename: '[name].[chunkhash].js',
        },
        devtool: useSourcemap ? 'source-map' : false,
        plugins: [
            new MiniCssExtractPlugin({
                filename: '[name].[chunkhash].css',
            }),
            new CopyWebpackPlugin([
                {
                    from: 'assets/images/**/*',
                    to: 'images/[name].[hash].[ext]',
                    toType: 'template',
                },
            ]),

        ],
        module: {
            rules: [
                {
                    test: /\.(scss)$/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        {
                            loader: 'css-loader?sourcemap=true',
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
                                emitFile: true,
                                outputPath: 'images',
                                name: '[name].[hash].[ext]',
                            },
                        },
                    ],
                },
                {
                    test: /\.ts?$/,
                    exclude: /node_modules/,
                    loader: 'ts-loader',
                },
            ],
        },
        resolve: {
            extensions: ['.ts', '.js', '.json'],
        },
    }
};
