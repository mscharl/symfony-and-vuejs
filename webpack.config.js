const { resolve } = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const entries = {
    web: ['./assets/scss/main.scss'],
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

            ],
        },
    }
};
