const webpack = require('webpack');
const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');

const hotReloadScript = 'webpack-hot-middleware/client';

module.exports = {
  entry: {
    index: ['./client/index.js', hotReloadScript],
    vendor: ['react', 'react-dom', 'react-router', 'redux', 'react-redux'],
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'build'),
  },
  resolve: {
    extensions: ['.js', '.less'],
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.js$/, // js
        use: [{
          loader: 'babel-loader',
          options: {
            presets: ['es2015'],
          },
        }],
        exclude: /node_modules/,
      }, {
        test: /\.less$/, // less
        use: [
          {
            loader: 'style-loader',
          }, {
            loader: 'css-loader',
            options: {
              minimize: false,
            },
          }, {
            loader: 'less-loader',
          },
        ],
        exclude: /node_modules/,
      }, {
        test: /\.css$/, // css
        use: [
          {
            loader: 'style-loader',
          }, {
            loader: 'css-loader',
            options: {
              minimize: false,
            },
          },
        ],
        exclude: /node_modules/,
      }, {
        test: /\.(png|jpg|gif)$/, // 图片
        use: [
          {
            loader: 'url-loader?limit=20000&name=images/[hash:8].[name].[ext]',
          },
        ],
        exclude: /node_modules/,
      }, {
        test: /\.(woff|svg|eot|ttf)$/, // 字体
        use: [
          {
            loader: 'url-loader?name=font/[hash:8].[name].[ext]',
          },
        ],
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({ template: './index.temp.html' }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    // new webpack.optimize.CommonsChunkPlugin({
    //   name: 'vendor',
    //   filename: './vendor.js',
    // }),
    // new webpack.optimize.UglifyJsPlugin({
    //   compress: {
    //     warnings: false,
    //   },
    // })
  ],
  optimization: {
    splitChunks: {
      name: 'vendor',
      filename: './vendor.js',
    },
  },
  mode: 'development',
};
