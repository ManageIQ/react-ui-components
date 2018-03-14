import React from 'react';
import { createStore } from 'redux';
import PropTypes from 'prop-types';
import ExampleConnected from '../redux/example';
import exampleApp from '../reducers';

const store = createStore(exampleApp);

if (module.hot) {
  module.hot.accept('../reducers', () => {
    const nextRootReducer = exampleApp;
    store.replaceReducer(nextRootReducer);
  });
}

export default function Provider({ story }) {
  return (
    <ExampleConnected store={store}>
      {story}
    </ExampleConnected>
  );
}

Provider.propTypes = {
  story: PropTypes.any,
};

Provider.defaultProps = {
  story: '',
};
