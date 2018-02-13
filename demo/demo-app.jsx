import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import TaggingConnected from '../src/tagging/containers/tagging';
import taggingApp from '../src/tagging/reducers';

export default function renderApp() {
  const store = createStore(taggingApp);

  ReactDOM.render(
    <Provider store={store}>
      <TaggingConnected />
    </Provider>,
    document.getElementById('demo-app'),
  );
}
