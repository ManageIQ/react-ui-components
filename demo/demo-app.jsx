import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { createStore } from 'redux';
import { TaggingWithButtonsConnected } from '../src/tagging/containers/tagging';
import taggingApp from '../src/tagging/reducers';
import { loadState } from '../src/tagging/actions';

const newTags = [
  {
    description: 'Name', id: 1, singleValue: true, values: [{ description: 'Pepa', id: 11 }, { description: 'Franta', id: 12 }],
  },
  { description: 'Number', id: 2, values: [{ description: '1', id: 21 }, { description: '2', id: 22 }] },
  { description: 'Animal', id: 3, values: [{ description: 'Duck', id: 31 }, { description: 'Cat', id: 32 }, { description: 'Dog', id: 33 }] },
  { description: 'Food', id: 4, values: [{ description: 'Steak', id: 41 }, { description: 'Duck', id: 42 }, { description: 'Salad', id: 43 }] },
  {
    description: 'Something',
    id: 5,
    values: [{ description: 'Knedlik', id: 51 },
      { description: 'Daenerys Stormborn of the House Targaryen, First of Her Name,...and Mother of Dragons', id: 52 }],
  },
];

const newAssignedTags = [{ tagCategory: { description: 'Name', id: 1 }, tagValues: [{ description: 'Pepa', id: 11 }] }];

const defaultState = { tags: newTags, assignedTags: newAssignedTags };

export default function renderApp() {
  const store = createStore(taggingApp);
  if (module.hot) {
    module.hot.accept('../src/tagging/reducers', () => {
      const nextRootReducer = taggingApp;
      store.replaceReducer(nextRootReducer);
    });
  }
  store.dispatch(loadState(defaultState));
  ReactDOM.render(
    <TaggingWithButtonsConnected store={store} />,
    document.getElementById('demo-app'),
  );
}
