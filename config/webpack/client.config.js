const path = require('path');
const fs = require('fs');
const { merge } = require('webpack-merge');
const { common } = require('./common.config');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');

const config = require('../config');
const { server: { production } } = config;
const isDevelopment = !production;
const outputDir = path.resolve(__dirname, '../../public/dist');

if(fs.existsSync(outputDir)) {
  fs.rmSync(outputDir, { recursive: true });
}

module.exports = merge(common, {
  context: path.resolve(__dirname, '../../src/client'),
  entry: {
    bundle: './index.tsx'
  },
  output: {
    path: path.resolve(__dirname, '../../public/dist'),
    filename: isDevelopment ? '[name].js' : '[name].[fullhash].js',
    chunkFilename: isDevelopment ? '[name].js' : '[name].[chunkhash].js',
    publicPath: '/'
  },
  optimization: {
    splitChunks: !isDevelopment ? {
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          reuseExistingChunk: true
        },
        common: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      },
      chunks: 'all',
      maxInitialRequests: 30,
      maxAsyncRequests: 30,
      maxSize: 250000
    } : false
  },
  plugins: [
    new StyleLintPlugin({
      customSyntax: 'postcss-scss',
      context: path.resolve(__dirname, '../../src'),
      failOnError: !isDevelopment
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[name].css'
    }),
  ]
});
