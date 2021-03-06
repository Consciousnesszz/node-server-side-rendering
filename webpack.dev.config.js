const webpack = require('webpack');
const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    index: [
      'react-hot-loader/patch',
      'webpack-hot-middleware/client',
      'babel-polyfill',
      './client/index.js',
    ],
    vendor: [
      'react',
      'react-dom',
      'react-router-dom',
      'redux',
      'react-redux',
      'redux-actions',
      'redux-promise',
    ],
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'build'),
  },
  resolve: {
    extensions: ['.js', '.less'],
  },
  module: {
    rules: [
      {
        test: /\.js$/, // js
        use: [{
          loader: 'babel-loader',
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
    new HtmlWebpackPlugin({ template: './template/index.html' }),
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
  devtool: 'source-map',
  mode: 'development',
  devServer: {
    // Enable webpack's Hot Module Replacement feature, tell the dev-server we're using HMR
    hot: true,
  },
};
