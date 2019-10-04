import * as ReactDOM from 'react-dom';
import * as React from 'react';
// import { GTLView, TileView } from '../src/gtl';
import { GTLView } from '../src/gtl';

console.log('GTLView:', GTLView);

// const toolbarData = require('../src/toolbar/data/toolbar.json');
// const viewData = require('../src/toolbar/data/toolbar-view.json');
// const toolbarBigData = require('../src/toolbar/data/toolbar-big.json');
const gtlData = require('../src/toolbar/data/gtl-small.json');

const wrapperComponent = () => (
  <React.Fragment>
    <h1>TileView</h1>
    <div className="foobar">
      <GTLView settings={gtlData.settings} data={gtlData.data} />
    </div>
  </React.Fragment>
);

export default function renderApp() {
  ReactDOM.render(
    wrapperComponent(),
    document.getElementById('demo-app'),
  );
}
