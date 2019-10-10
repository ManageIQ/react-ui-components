import * as ReactDOM from 'react-dom';
import * as React from 'react';
// import { GTLView, TileView } from '../src/gtl';
import { StaticGTLView } from '../src/gtl/StaticGTLView';

console.log('StaticGTLView:', StaticGTLView);

const gtlData = require('../src/gtl/data/gtl-small.json');

const wrapperComponent = () => (
  <React.Fragment>
    <h1>TileView</h1>
    <div className="foobar">
      <StaticGTLView
        gtlType="list"
        settings={gtlData.settings}
        head={gtlData.data.head}
        rows={gtlData.data.rows}
        onItemSelect={arg => console.log('onItemSelect: ', arg)}
      />
    </div>
  </React.Fragment>
);

export default function renderApp() {
  ReactDOM.render(
    wrapperComponent(),
    document.getElementById('demo-app'),
  );
}
