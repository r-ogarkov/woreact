const path = require('path');
const { merge } = require('webpack-merge');
const { common } = require('./common.config');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');


module.exports = merge(common, {
  context: path.resolve(__dirname, '../../src/worker'),
  entry: './request-handler.tsx',
  optimization: {
    splitChunks: false
  },
  externals: [nodeExternals({
    allowlist: ['react/jsx-dev-runtime']
  })],
  output: {
    path: path.resolve(__dirname, '../../public/dist'),
    filename: 'worker.js',
    libraryTarget: 'commonjs2',
    publicPath: '/'
  },
  plugins: [
    new webpack.optimize.LimitChunkCountPlugin({ maxChunks: 1 })
  ]
});


