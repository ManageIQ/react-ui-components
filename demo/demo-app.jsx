import * as ReactDOM from 'react-dom';
import * as React from 'react';
import Form from '../src/dynamic-form';

const wrapperComponent = () => (
  <div>
    <h1>Dynamic form</h1>
    <Form onSave={registeredValues => console.log('registered values: ', registeredValues)} />
  </div>
);

export default function renderApp() {
  ReactDOM.render(
    wrapperComponent(),
    document.getElementById('demo-app'),
  );
}
