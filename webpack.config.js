const path = require('path');

module.exports = {
  context: __dirname,
  entry: './lib/main.js',
  output: {
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['.js', '*']
  },
  devtool: 'source-map',
};
