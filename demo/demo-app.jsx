import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { createStore } from 'redux';
import ExampleConnected from '../src/comp-a/reducers/example';
import exampleApp from '../src/comp-a/reducers';

const store = createStore((state, action) => exampleApp(state, action));
console.log(store);
if (module.hot) {
  // Enable Webpack hot module replacement for reducers
  module.hot.accept('../src/comp-a/reducers', () => {
    const nextRootReducer = exampleApp;
    store.replaceReducer(nextRootReducer);
  });
}

export default function renderApp() {
  ReactDOM.render(
    <ExampleConnected store={store} />,
    document.getElementById('demo-app'),
  );
}
