const ExtractTextPlugin = require('extract-text-webpack-plugin');
const { ProvidePlugin, HotModuleReplacementPlugin } = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const extractTextPlugin = new ExtractTextPlugin('[name].css');

const providePlugin = new ProvidePlugin({
  react: 'react',
  '$': 'jquery',
  'jQuery': 'jquery',
  'window.jQuery': 'jquery',
  'react-dom': 'react-dom',
  '_': 'lodash'
});

const htmlPlugin = new HtmlWebpackPlugin({
  title: 'ManageIQ Common React Components',
  template: '../demo/index.ejs',
  inject: 'body'
});

const hotModuleReplacementPlugin = new HotModuleReplacementPlugin();

module.exports = env => {
  return Object.assign(
    { extractTextPlugin },
    env && env.build ? { providePlugin } : {},
    env && env.server ? { htmlPlugin, hotModuleReplacementPlugin } : {}
  )
};
