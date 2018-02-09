const ExtractTextPlugin = require('extract-text-webpack-plugin');
const { ProvidePlugin, HotModuleReplacementPlugin } = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const extractTextPlugin = new ExtractTextPlugin('[name].css');

const providePlugin = new ProvidePlugin({
  react: 'react',
  $: 'jquery',
  jQuery: 'jquery',
  'window.jQuery': 'jquery',
  'react-dom': 'react-dom',
  _: 'lodash',
});

const htmlPlugin = new HtmlWebpackPlugin({
  title: 'ManageIQ Common React Components',
  template: '../demo/index.ejs',
  inject: 'body',
});

const hotModuleReplacementPlugin = new HotModuleReplacementPlugin();

function buildPlugins(isBuild) {
  return isBuild ? { providePlugin } : {};
}

function serverPlugins(isServer) {
  return isServer ? { htmlPlugin, hotModuleReplacementPlugin } : {};
}

module.exports = (env) => {
  const isBuild = env && env.build;
  const isServer = env && env.server;
  console.log(Object.assign({ extractTextPlugin }, buildPlugins(isBuild), serverPlugins(isServer)));
  return Object.assign({ extractTextPlugin }, buildPlugins(isBuild), serverPlugins(isServer));
};
