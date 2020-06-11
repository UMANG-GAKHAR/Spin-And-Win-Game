const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: path.resolve(__dirname, 'app.js'),
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'client.js',
    },
    devServer: {
        contentBase: './build',
    },
    resolve: {
        extensions: ['.js'],
        alias: {
            components: path.resolve(__dirname),
        },
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.(scss|css)$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
            },
            {
                test: /\.(ttf|eot|otf|svg|png)$/,
                loader: 'file-loader',
            },
            {
                test: /\.(woff|woff2)$/,
                loader: 'url-loader',
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'index.html'),
        }),
        new MiniCssExtractPlugin({
            filename: 'my-css-build.css',
            chunkFilename: 'chunk-css-build.css',
        }),
    ],
};