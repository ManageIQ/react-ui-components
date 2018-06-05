const ExtractTextPlugin = require('mini-css-extract-plugin');
const { HotModuleReplacementPlugin } = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const extractTextPlugin = new ExtractTextPlugin({
  filename: '[name].css',
  chunkFilename: '[id].css',
});


const htmlPlugin = new HtmlWebpackPlugin({
  title: 'ManageIQ Common React Components',
  template: '../demo/index.ejs',
  inject: 'body',
});

const hotModuleReplacementPlugin = new HotModuleReplacementPlugin();

function serverPlugins(isServer) {
  return isServer ? { htmlPlugin, hotModuleReplacementPlugin } : {};
}

module.exports = (env) => {
  const isServer = env && env.server;
  return Object.assign(serverPlugins(isServer), { extractTextPlugin });
};
