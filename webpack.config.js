var path = require('path');
var webpack = require('webpack');

module.exports = {
    devtool: '#eval-source-map',
    entry: {
        app: './src/parser',
        deps: ['pegjs']
    },
    output: {
        path: path.join(__dirname, 'build'),
        filename: '[name].js'
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: 'deps'
        })
    ],
    resolve: {
        extensions: ['', '.js', '.jsx'],
    },
    module: {
        loaders: [{
            test: /\.jsx?$/,
            loaders: ['babel-loader'],
            include: path.join(__dirname, 'src')
        }, {
            test: /\.json$/,
            loaders: ['json-loader'],
        }],
    },
};
