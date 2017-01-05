import path from 'path';
import webpack from 'webpack';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import PackageJSONPlugin from '.';

export default {
  target: 'node',
  entry: path.resolve(__dirname, 'index.js'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'plugin.js',
    libraryTarget: 'commonjs2'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
    ]
  },
  plugins: [
    new PackageJSONPlugin(),
    new CopyWebpackPlugin([
      { from: 'README.md', to: 'README.md' }
    ]),
    new webpack.optimize.UglifyJsPlugin(),
  ]
};
