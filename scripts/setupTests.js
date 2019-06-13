import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import 'babel-polyfill';
import { JSDOM } from 'jsdom';
import * as d3 from 'd3';

configure({ adapter: new Adapter() });

// mock browser document
const dom = new JSDOM();
global.document = dom.window.document;
global.d3 = d3;

// mock flat
if (!Array.prototype.flat) {
  Object.defineProperty(Array.prototype, 'flat', { // eslint-disable-line no-extend-native
    value(depth = 1) {
      return this.reduce((flat, toFlatten) =>
        flat.concat((Array.isArray(toFlatten) && (depth > 1)) ? toFlatten.flat(depth - 1) : toFlatten), []);
    },
  });
}
