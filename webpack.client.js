const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base');
const CompressionPlugin = require('compression-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
console.log('********************PATH', path);
const buildMode = process.env.NODE_ENV;
console.log('RUNNING MODE:', buildMode, __dirname);
const isDev = (buildMode === 'development');

const webPackPlugins = [
  new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      defaultSizes: 'gzip',
      reportFilename: '../../admin/assets/client-report.html',
      openAnalyzer: false,
  }),
  new UglifyJsPlugin({
    parallel: true,
    cache: true,
    uglifyOptions: {
        output: {
            beautify: false,
        },
    },
    extractComments: true,
    sourceMap: true,
  }),
  // new webpack.optimize.CommonsChunkPlugin({
  //     name: 'vendor',
  //     filename: 'vendor.js',
  //     minChunks: function minChunks(module) {
  //         //   this assumes your vendor imports exist in the node_modules directory
  //         return module.context && module.context.indexOf('node_modules') !== -1;
  //     },
  // }),
];
!isDev && webPackPlugins.push(new CompressionPlugin({
  test: /\.(js|jsx)$|\.css$|\.html$/,
}))
const config = {
  target: 'web',
  // Tell webpack to root file of our server app
  entry: './src/client.js',
  // Tell webpack where to put output file
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  plugins: webPackPlugins,
  devtool: 'inline-source-map',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public'),
    publicPath: '/',
  },
};

module.exports = merge(baseConfig, config);
