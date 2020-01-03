const { resolve } = require('path');
const { fileEntries, buildExternals, FILE_NAMES } = require('./helper-functions');

const devMode = process.env.NODE_ENV !== 'production';
const plugins = require('./plugins');
const rules = require('./rules');

module.exports = (env) => {
  const isBuild = env && env.build;
  const appPlugins = plugins(env);
  const isServer = env && env.server;
  const entries = Object.assign(
    fileEntries(FILE_NAMES, !isBuild),
    isServer ? fileEntries(FILE_NAMES, false, 'demo') : {},
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
      umdNamedDefine: true,
    },
    plugins: Object.keys(appPlugins).map(pluginName => appPlugins[pluginName]),
    node: {
      fs: 'empty'
    },
    module: {
      rules,
    },
    resolve: {
      extensions: ['.js', '.jsx'],
    },
    externals: buildExternals(isBuild),
    devServer: {
      publicPath: '/',
      inline: true,
      noInfo: false,
      contentBase: './dist',
      hot: true,
      clientLogLevel: 'none',
    },
    mode: devMode ? 'development' : 'production',
  };
};
