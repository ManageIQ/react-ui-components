import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import TaggingConnected from '../src/tagging/containers/tagging';
import taggingApp from '../src/tagging/reducers';

const tags = {
  Name: ['Pepa', 'Franta', 'Karel'],
  Number: ['1', '2', '3', '4', '5'],
  Animal: ['Duck', 'Pig', 'Dog', 'Unicorn'],
  Food: ['Steak', 'Duck', 'Knedlik', 'Parek'],
  Something: ['Steak', 'Duck', 'Veeeeery loooong teeeeeext heeeerreeee', 'Blabla'],
};

const setTags = [{ tagCategory: "Name", tagValue: "Pepa" }];
const defaultState = { tags: tags, setTags: setTags };

function a() { return { taggingApp: { setTags: { tagCategory: "Name", tagValue: "Pepa" }}}}
export default function renderApp() {

  const store = createStore(taggingApp, defaultState);
  ReactDOM.render(
    <Provider store={store}>
      <TaggingConnected />
    </Provider>,
    document.getElementById('demo-app'),
  );
}
