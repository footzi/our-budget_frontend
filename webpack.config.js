const AntdDayjsWebpackPlugin = require('antd-dayjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const path = require('path');
const Dotenv = require('dotenv-webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = (env) => {
  const isProduction = env.production;
  const publicPath = isProduction ? '.' : '/';

  return {
    entry: './src/index.tsx',
    mode: 'development',
    output: {
      path: path.resolve(__dirname, './dist'),
      filename: '[name].[contenthash].bundle.js',
      publicPath,
    },
    module: {
      rules: [
        // css-modules
        {
          test: /\.css$/i,
          use: [
            {
              loader: 'style-loader',
            },
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1,
                modules: {
                  localIdentName: '[path][name]__[local]--[hash:base64:5]',
                },
              },
            },
          ],
        },
        {
          test: /\.(js|mjs|jsx|ts|tsx)$/,
          use: {
            loader: 'babel-loader',
            options: {
              // babelrc: true,
              presets: ['@babel/preset-env'],
              plugins: ['@babel/transform-runtime'],
            },
          },
          exclude: /node_modules/,
        },
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
        {
          test: /\.less$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
            },
            {
              loader: 'css-loader', // translates CSS into CommonJS
            },
            {
              loader: 'less-loader',
              options: {
                lessOptions: {
                  modifyVars: {
                    'primary-color': '#F15A24',
                  },
                  javascriptEnabled: true,
                },
              },
            },
          ],
        },
      ],
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
    devServer: {
      static: {
        directory: path.join(__dirname, './'),
      },
      client: {
        overlay: false,
      },
      hot: true,
      port: 3000,
      historyApiFallback: true,
    },
    plugins: [
      new Dotenv(),
      new CleanWebpackPlugin(),
      new webpack.HotModuleReplacementPlugin(),
      new HtmlWebpackPlugin({ template: './src/index.html' }),
      new AntdDayjsWebpackPlugin(),
      new MiniCssExtractPlugin({
        filename: '[name].css',
        chunkFilename: '[id].css',
      }),
    ],
    devtool: 'source-map',
    optimization: {
      splitChunks: {
        chunks: 'all',
      },
    },
  };
};
