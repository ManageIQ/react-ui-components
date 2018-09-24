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
