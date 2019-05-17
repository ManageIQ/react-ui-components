import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { Toolbar } from '../src/toolbar';

const toolbarData = require('../src/toolbar/data/toolbar.json');
const viewData = require('../src/toolbar/data/toolbar-view.json');
// const toolbarBigData = require('../src/toolbar/data/toolbar-big.json');
const toolbarBigData = require('../src/toolbar/data/toolbar-3.json');

// const onSubmit = values => console.log('onSubmit: ', values);

const wrapperComponent = () => (
  <React.Fragment>
    <div className="toolbar-pf row">
      <Toolbar
        groups={toolbarData}
        views={viewData}
      />
    </div>
    <div className="toolbar-pf row">
      <Toolbar
        groups={toolbarBigData}
        views={viewData}
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
