const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
//const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

module.exports = {
  entry: './src/index.js',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      }
    ]
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: 'index.js'
  },
  optimization: {
    minimize: true,
    // minimizer: [
    //   new UglifyJsPlugin({
    //     extractComments: true,
    //     uglifyOptions: {
    //       toplevel: true,
    //       output: {
    //         comments: false
    //       },
    //       compress: {
    //         pure_getters: true,
    //         unsafe: false
    //       }
    //     }
    //   })
    // ]
  },
  plugins: [
    // new MiniCssExtractPlugin({
    //   filename: '[name].css',
    //   chunkFilename: '[id].css'
    // }),
    //new BundleAnalyzerPlugin()
  ],
  externals: {
    'react': 'React'
  }
}
