const path = require('path');

module.exports = {
  context: __dirname,
  entry: './lib/main.js',
  output: {
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2017']
        }
      }
    ]
  },
  resolve: {
    extensions: ['.js', '*']
  },
  devtool: 'source-map',
};
