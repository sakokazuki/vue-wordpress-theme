const webpack = require("webpack")
const path = require("path")
const VueLoaderPlugin = require('vue-loader/lib/plugin')


module.exports = {
  context: __dirname + '/app/',
  mode: 'development',
  entry: {
    'app': ['babel-polyfill','./js/app'],
  },
  output: {
    filename: '[name].js',
    path: __dirname + '/build/js',
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['es2015', "stage-3"]
          }
        }
      },
      {
        test: /\.pug$/,
        loader: 'pug-plain-loader'
      },
      {
        test: /\.styl(us)?$/,
        use: [
          'vue-style-loader',
          'css-loader',
          'stylus-loader'
        ]
      },
      {
       test: /\.(glsl|frag|vert)$/,
       use: 'shader-loader',
      },
      {
        test: /\.(svg)$/,
        use: 'html-loader',
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      ROOT_DIR: JSON.stringify("from gulp file"),
    }),
    new VueLoaderPlugin(),
    new webpack.LoaderOptionsPlugin({
      options: {
        stylus: {
          import: [path.resolve(__dirname, 'app/style/main.styl')]
        }
      }
    })
  ],
  performance: {
    hints: false
  },
  watch: true,
  resolve: {
    modules: [
      path.resolve(__dirname, "./app/js"),
      "node_modules"
    ]
  },
  devtool: 'inline-source-map'

};
