const ExtractCssChunks = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const MinifyPlugin = require("babel-minify-webpack-plugin");

const CompressionPlugin = require('compression-webpack-plugin');

const buildMode = process.env.NODE_ENV;
console.log('RUNNING MODE:', buildMode, __dirname);
const isDev = (buildMode === 'development');

const webPackPlugins = [
  new ExtractCssChunks({
    filename: 'css/[name].css',
  }),
  new CopyPlugin([
    {
      from: './src/assets/images',
      to: ``
    }
  ]),
  new MinifyPlugin(),
  new CompressionPlugin()
];
// !isDev && webPackPlugins.push(new CompressionPlugin({
//     test: /\.(js|jsx)$|\.css$|\.html$/,
//   }))
module.exports = {
  // Tell webpack to run babel on every file it runs through
  module: {
    rules: [
      {
        test: /\.css$/i,
        exclude: /node_modules/,
        use: [
          ExtractCssChunks.loader,
          'css-loader',
          'postcss-loader',
        ],
      },
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: [
            '@babel/preset-react',
            ['@babel/env', { targets: { browsers: ['last 2 versions'] } }]
          ]
        }
      }
    ]
  },
  plugins: webPackPlugins,
};
