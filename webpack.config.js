const webpack = require('webpack');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const WebpackBundleAnalyzer = require('webpack-bundle-analyzer');

module.exports = (env, argv = {}) => {
  const ENV = process.env.NODE_ENV || 'development';
  const DEV = ENV === 'development';
  const PROD = ENV === 'production';
  const HOT = argv.hot || false;
  return {
    mode: ENV,
    entry: {
      app: path.join(__dirname, './src/index.js'),
    },
    output: {
      path: path.join(__dirname, 'dist'),
      filename: PROD ? '[chunkhash].js' : '[name].js',
      chunkFilename: PROD ? '[chunkhash].js' : '[name].chunk.js',
      publicPath: '/',
    },
    resolve: {
      modules: [path.join(__dirname, 'src'), 'node_modules'],
      extensions: ['.jsx', '.js'],
      alias: {
        'react-dom': '@hot-loader/react-dom',
      },
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
            },
          },
        },
        {
          test: /\.css$/,
          use: [
            HOT
              ? {
                  loader: 'style-loader',
                  options: {
                    sourceMap: true,
                  },
                }
              : MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                sourceMap: true,
              },
            },
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: true,
              },
            },
          ],
        },
        {
          test: /\.scss$/,
          use: [
            HOT
              ? {
                  loader: 'style-loader',
                  options: {
                    sourceMap: true,
                  },
                }
              : MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                sourceMap: true,
              },
            },
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: true,
              },
            },
            {
              loader: 'sass-loader',
              options: {
                includePaths: [path.join(__dirname, 'node_modules')],
                outputStyle: PROD ? 'compressed' : 'expanded',
                sourceMap: true,
              },
            },
          ],
        },
        {
          test: /\.(png|jpg|gif|swf|ttf|eot|svg|woff(2)?)(\S+)?$/,
          use: {
            loader: 'file-loader',
            options: {
              name: PROD ? '[hash].[ext]' : '[name].[ext]',
            },
          },
        },
        {
          test: /\.html$/,
          use: [
            {
              loader: 'html-loader',
              options: {
                interpolate: true,
                minimize: PROD,
              },
            },
          ],
        },
      ],
    },
    plugins: [
      new CleanWebpackPlugin(),
      new MiniCssExtractPlugin({
        filename: PROD ? '[contenthash].css' : '[name].css',
      }),
      new HtmlWebpackPlugin({
        template: path.join(__dirname, 'src/index.html'),
        minify: PROD,
      }),
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
      ...(DEV
        ? [
            new WebpackBundleAnalyzer.BundleAnalyzerPlugin({
              openAnalyzer: false,
            }),
          ]
        : []),
    ],
    optimization: {
      minimizer: [
        new TerserWebpackPlugin({
          terserOptions: {
            output: {
              comments: false,
            },
          },
          sourceMap: true,
        }),
      ],
    },
    node: {
      net: 'mock',
      dns: 'mock',
    },
    stats: {
      modules: false,
      children: false,
      entrypoints: false,
    },
    performance: {
      hints: false,
    },
    devtool: DEV ? '#cheap-eval-source-map' : false,
    devServer: {
      host: 'localhost',
      port: 3000,
      https: false,
      historyApiFallback: {
        disableDotRule: true,
      },
      clientLogLevel: 'none',
      compress: true,
      publicPath: '/',
      stats: {
        version: false,
        hash: false,
        timings: false,
        builtAt: false,
        modules: false,
        children: false,
        entrypoints: false,
      },
    },
  };
};
