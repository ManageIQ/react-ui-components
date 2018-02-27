import { configure } from '@storybook/react';
import { setOptions } from '@storybook/addon-options';
import '../../dist/vendor';
import '../../dist/vendor.css';

// automatically import all files ending in *.stories.js
const req = require.context('../../src', true, /stories\/.*stories\.js$/);
function loadStories() {
  req.keys().forEach(filename => req(filename));
}

setOptions({
  /**
   * name to display in the top left corner
   * default: Storybook
   * @type {String}
   */
  name: 'ManageIq React ui-components',
  /**
   * sorts stories
   * default: false
   * @type {Boolean}
   */
  sortStoriesByKind: true,
});

configure(loadStories, module);
