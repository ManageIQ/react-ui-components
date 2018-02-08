const { resolve, join} = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const { fileEntries, buildExternals, FILE_NAMES } = require('./helper-functions');

const plugins = require('./plugins');

module.exports = env => {
  const isBuild = env && env.build;
  const appPlugins = plugins(env);
  const isServer = env && env.server;
  const entries = Object.assign(
    fileEntries(FILE_NAMES, !isBuild),
    isServer ? fileEntries(FILE_NAMES, false, 'demo') : {}
  );

  return {
    context: __dirname,
    entry: entries,
    devtool: isServer && 'source-map',
    output: {
      path: resolve(__dirname, '../dist'),
      filename: '[name].js',
      library: '[name]',
      libraryTarget: 'umd',
      umdNamedDefine: true
    },
    plugins: Object.keys(appPlugins).map(pluginName => appPlugins[pluginName]),
    module: {
      rules: [
        {
          enforce: "pre",
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          loader: "eslint-loader"
        },
        {
          test: /\.(js|jsx)$/,
          loader: 'babel-loader',
          exclude: /node_modules/,
        },
        {
          test: /\.(ts|tsx)$/,
          loader: 'awesome-typescript-loader'
        },
        {
          test: /\.scss$/,
          exclude: /node_modules/,
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [
              'css-loader',
              {
                loader: 'sass-loader'
              }
            ]
          })
        },
      ]
    },
    resolve: {extensions: ['.js','.jsx']},
    externals: buildExternals(isBuild),
    devServer: {
      publicPath: "/",
      inline: true,
      noInfo: false,
      contentBase: "./dist",
      hot: true,
      clientLogLevel: 'none'
    },
  }
};
