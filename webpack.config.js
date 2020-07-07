var path = require('path');
var webpack = require('webpack');

var compression = require('compression');
const CompressionPlugin = require('compression-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const isProd = process.env.NODE_ENV === 'production';

//async
require("babel-polyfill");

module.exports = {
  entry: ["babel-polyfill", "./src/main.js"],
  //'./src/main.js',
  // output: {
  //   path: path.resolve(__dirname, './dist'),
  //   publicPath: '/dist/',
  //   filename: 'build.js'
  // },
  watchOptions: {
      ignored: /node_modules/
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, './dist'),
    publicPath: '/dist/'
  },
  node: {
    child_process: 'empty',
    fs: 'empty',
    crypto: 'empty',
    net: 'empty',
    tls: 'empty'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader'
        ],
      },      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
          }
          // other vue-loader options go here
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          // name: '[name].[ext]?[hash]'
          name: function(file){
            return '/images/[name].[ext]?[hash]';
          }
        }
      }
    ]
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    },
    extensions: ['*', '.js', '.vue', '.json']
  },
  devServer: {
    disableHostCheck: true,
    historyApiFallback: true,
    noInfo: true,
    overlay: true,
    compress: true,
    before(app) {
        app.use(compression({}));
    },
  },
  performance: {
    hints: false
  },
  devtool: isProd ? '' : '#eval-source-map',
}

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map'
  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      optimization:
       {
        splitChunks: {
            cacheGroups: {
              vendor: {
                chunks: 'all',
                // chunks: "initial",
                // test: path.resolve(process.cwd(), "node_modules"),
                test: /[\\/]node_modules[\\/]/,
                name: "vendor",
                enforce: true
              }
            }
          },
          runtimeChunk: {
            name: 'manifest'
          }
        }
    }),
    new UglifyJSPlugin({
          uglifyOptions: {
            sourceMap: true,
            compress: {
              drop_console: true,
              conditionals: true,
              unused: true,
              comparisons: true,
              dead_code: true,
              if_return: true,
              join_vars: true,
              warnings: false
            },
            output: {
              comments: false
            }
          }
        }),
        new CompressionPlugin({
          asset: '[path].gz[query]',
          algorithm: 'gzip',
          test: /\.js$|\.css$|\.html$/,
          threshold: 10240,
          minRatio: 0.8
        }),
  ])
}
