// you can use this file to add your custom webpack plugins, loaders and anything you like.
// This is just the basic way to add additional webpack configurations.
// For more information refer the docs: https://storybook.js.org/configurations/custom-webpack-config

// IMPORTANT
// When you add this file, we won't add the default configurations which is similar
// to "React Create App". This only has babel loader to load JavaScript.
const plugins = require('../plugins');
const rules = require('../rules');

module.exports = {
  plugins: [
    plugins().extractTextPlugin,
  ],
  node: {
    fs: 'empty'
  },
  module: {
    rules: [
      ...rules,
      {
        test: /\.stories\.js$/,
        loaders: [
          {
            loader: require.resolve('@storybook/addon-storysource/loader'),
            options: {
              prettierConfig: {
                parser: 'babylon',
              },
            },
          },
        ],
        enforce: 'pre',
      },
      {
        test: /\.stories\.(js|jsx)$/,
        loaders: [require.resolve('@storybook/addon-storysource/loader')],
        enforce: 'pre',
      },
    ],
  },
  resolve: { extensions: ['.js', '.jsx'] },
};
