const webpack = require('webpack');
const path = require('path');
const fs = require('fs');

function getExternals() {
  return fs.readdirSync(path.resolve(__dirname, './node_modules'))
    .filter(filename => !filename.includes('.bin'))
    .reduce((externals, filename) => {
      externals[filename] = `commonjs ${filename}`;

      return externals;
    }, {});
}

const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const commonModule = {
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
};

const clientConf = {
  entry: {
    index: './client/index.js',
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
    path: path.resolve(__dirname, 'build/client'),
    filename: '[name].[chunkhash:8].js',
    chunkFilename: 'chunk.[name].[chunkhash:8].js',
    publicPath: '/',
  },
  resolve: {
    extensions: ['.js', '.less'],
  },
  module: commonModule,
  plugins: [
    new HtmlWebpackPlugin({ template: './template/index.prod.html' }),
    new webpack.optimize.OccurrenceOrderPlugin(),
  ],
  optimization: {
    // splitChunks 初始设置会根据引用顺序自动分包
    splitChunks: {
      chunks: 'all',
    },
    // production 模式下自动压缩，如果需要自定义配置则引入 UglifyJsPlugin
    // minimizer: [
    //   new UglifyJsPlugin(),
    // ],
  },
  mode: 'production',
};

const serverConf = {
  entry: {
    server: './server/server.prod.js',
  },
  output: {
    path: path.resolve(__dirname, 'build/server'),
    filename: '[name].js',
    chunkFilename: 'chunk.[name].js',
  },
  resolve: {
    extensions: ['.js', '.json'],
  },
  // 将依赖变为运行时引入
  externals: getExternals(),
  target: 'node',
  node: {
    __filename: true,
    __dirname: true,
  },
  module: commonModule,
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.DefinePlugin({ 'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV) }),
  ],
  optimization: {
    // 注意： server 代码分包后会报错
    // splitChunks: {
    //   chunks: 'all',
    // },
  },
  mode: 'production',
};

module.exports = [clientConf, serverConf];
