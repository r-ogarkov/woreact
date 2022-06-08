const webpack = require('webpack');
const config = require('../config');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const path = require('path');

const { server: { production } } = config;
const isDevelopment = !production;
const isServer = process.env.SWC_ENV === 'worker';

const common = {
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    alias: {
      images: path.resolve(__dirname, '../../src/shared/images'),
      client: path.resolve(__dirname, '../../src/client'),
      worker: path.resolve(__dirname, '../../src/worker'),
      shared: path.resolve(__dirname, '../../src/shared')
    }
  },
  devtool: isDevelopment ? 'source-map' : false,
  stats: {
    assets  : true,
    modules : false,
    hash    : false,
    children: false,
    warnings: false
  },
  mode: isDevelopment ? 'development' : 'production',
  module: {
    rules: [
      {
        test: /\.(ts|tsx|js|jsx)$/,
        exclude: /node_modules/,
        loader: 'swc-loader',
        options: {
          jsc: {
            parser: {
              syntax: 'typescript',
              tsx: true,
              dynamicImport: true
            },
            transform: {
              react: {
                runtime: 'automatic'
              }
            }
          }
        }
      },
      {
        test: /\.(scss|sass|css)$/,
        use: [
          ...(!isServer ? [MiniCssExtractPlugin.loader] : []),
          {
            loader: 'css-loader',
            options: {
              sourceMap: isDevelopment,
              modules: {
                auto: (resourcePath) => !resourcePath.endsWith('.css'),
                localIdentName: isDevelopment ? '[local]_[hash:base64:5]' : '[hash:base64:5]',
                exportOnlyLocals: isServer,
                exportLocalsConvention: 'camelCaseOnly'
              },
              importLoaders: 2
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: isDevelopment
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sassOptions: {
                outputStyle: 'compressed',
                includePaths: [path.resolve(__dirname, '../../src/shared/helpers/styles')]
              }
            }
          }
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              fallback: 'file-loader',
              limit: 8192,
              emitFile: !isServer,
              name: '[name].[hash:8].[ext]',
              outputPath: 'images'
            }
          }
        ]
      },
      { test: /\.handlebars$/, loader: 'handlebars-loader' }
    ]
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({ options: { failOnError: !isDevelopment } }),
    new ESLintPlugin()
  ]
};


module.exports = { common };
