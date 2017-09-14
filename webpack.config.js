var webpack = require("webpack");
var path =  require("path");

var DIST_DIR = path.resolve(__dirname, "dist");
var SRC_DIR = path.resolve(__dirname, "src");

var config = {
  entry: SRC_DIR + "/app/index.js",
  output: {
    path: DIST_DIR + "/app",
    filename: "bundle.js",
    publicPath: "/app/"
  },
  module: {
      loaders: [
        {
          test: /\.jsx?$/,
          include: SRC_DIR,
          exclude: /node_modules/,
          loader: 'babel-loader',
          query:{
            presets: ['react','es2015','stage-2']
          }
        },
        {
          test: /\.scss$/,
          include: SRC_DIR,
          loaders: ["style-loader", "css-loader", "sass-loader"]
        },
        {
          test: /\.css$/,
          loader: 'style-loader!css-loader?modules',
          include: /flexboxgrid/
          },
        { test: /\.json$/, loader: 'json-loader' }
      ]
  },
  plugins: [
    new webpack.ProvidePlugin({
       $: 'jquery',
       jQuery: 'jquery',
       'window.jQuery': 'jquery'
     })
  ],
  resolve: {
    extensions: [ '.js', '.jsx' ],
    alias: {
      config: path.join(__dirname, 'config', process.env.NODE_ENV || 'production')
    }
  },
  devServer: {
    historyApiFallback: true
  },
  node: {
    console: true,
    net: 'empty',
    tls: 'empty',
    dns: 'empty'
   }
}

module.exports = config;
