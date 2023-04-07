const AntdDayjsWebpackPlugin = require('antd-dayjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const path = require('path');
const Dotenv = require('dotenv-webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const antModifyVars = require('./src/styles/ant-modify-vars');
const createManifest = require('./manifest');

module.exports = (env) => {
  const isProduction = env.production;
  const publicPath = isProduction ? '/app/' : '/';
  const pwaManifest = createManifest(publicPath);

  return {
    entry: './src/index.tsx',
    mode: 'development',
    output: {
      path: path.resolve(__dirname, './dist'),
      filename: '[name].[contenthash].js',
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
                  modifyVars: antModifyVars,
                  javascriptEnabled: true,
                },
              },
            },
          ],
        },
        {
          test: /\.(woff2?|ttf|otf|eot|svg)$/,
          exclude: /node_modules/,
          loader: 'file-loader',
          options: {
            outputPath: './fonts/',
            publicPath: '/fonts',
            name: '[name].[ext]',
          },
        },
      ],
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js', '.less'],
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
    devServer: {
      static: {
        directory: path.join(__dirname, './public'),
      },
      client: {
        overlay: false,
      },
      port: 3000,
      historyApiFallback: true,
    },
    optimization: {
      splitChunks: {
        chunks: 'all',
      },
      minimize: true,
      minimizer: ['...', new CssMinimizerPlugin()],
    },
    plugins: [
      new Dotenv(),
      new CleanWebpackPlugin(),
      new webpack.HotModuleReplacementPlugin(),
      new HtmlWebpackPlugin({ template: './src/index.html' }),
      new AntdDayjsWebpackPlugin(),
      new MiniCssExtractPlugin({
        filename: '[fullhash].[name].css',
        chunkFilename: '[fullhash].css',
      }),
      new CopyPlugin({
        patterns: [{ from: './public', to: './' }],
      }),
      new webpack.DefinePlugin({
        IS_PRODUCTION: JSON.stringify(isProduction),
      }),
      new WebpackPwaManifest(pwaManifest),
    ],
    devtool: 'source-map',
  };
};
