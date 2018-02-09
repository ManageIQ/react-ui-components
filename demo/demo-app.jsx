import * as ReactDOM from 'react-dom';
import * as React from 'react';
import * as cmpA from '../src/comp-a';

export default function renderApp() {
  ReactDOM.render(<cmpA.HelloCmp />, document.getElementById('demo-app'));
}
