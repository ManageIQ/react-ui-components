// you can use this file to add your custom webpack plugins, loaders and anything you like.
// This is just the basic way to add additional webpack configurations.
// For more information refer the docs: https://storybook.js.org/configurations/custom-webpack-config

// IMPORTANT
// When you add this file, we won't add the default configurations which is similar
// to "React Create App". This only has babel loader to load JavaScript.
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const plugins = require('../plugins');

module.exports = {
  plugins: [
    plugins().extractTextPlugin,
  ],
  module: {
    rules: [
      {
        test: /\.(scss|css)$/,
        exclude: /node_modules/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            'css-loader',
            'resolve-url-loader',
            {
              loader: 'sass-loader',
            },
          ],
        }),
      },
      {
        test: /\.(png|jpg|gif|svg|woff|ttf|eot)/,
        loader: 'url-loader?limit=20480&name=static/[name].[ext]',
      },
      {
        test: /\.stories\.(js|jsx)$/,
        loaders: [require.resolve('@storybook/addon-storysource/loader')],
        enforce: 'pre',
      },
    ],
  },
};
