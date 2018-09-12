const ExtractTextPlugin = require('mini-css-extract-plugin');

const rules = [
  {
    enforce: 'pre',
    test: /\.(js|jsx)$/,
    exclude: [
      /node_modules/,
      /\/data\//,
      /\/stories\//,
      /vendor.js/,
    ],
  },
  {
    test: /\.(js|jsx)$/,
    loader: 'babel-loader',
    exclude: /node_modules/,
  },
  {
    test: /\.(ts|tsx)$/,
    loader: 'awesome-typescript-loader',
  },
  {
    test: /\.(png|jpg|gif|svg|woff|ttf|eot)/,
    loader: 'url-loader?limit=20480&name=static/[name].[ext]',
  },
  {
    test: /\.(sa|sc|c)ss$/,
    exclude: /node_modules/,
    use: [
      ExtractTextPlugin.loader,
      {
        loader: 'css-loader',
      },
      {
        loader: 'resolve-url-loader',
      },
      {
        loader: 'sass-loader',
      },
    ],
  },
];

module.exports = rules;
