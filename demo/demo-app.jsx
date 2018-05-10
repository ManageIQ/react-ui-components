import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { VmSnapshotForm } from '../src/vm-snapshot-form/';

const wrapperComponent = () => (
  <div>
    <h1>Dynamic form</h1>
    <VmSnapshotForm
      onSubmit={values => console.log('form values: ', values)}
      onCancel={() => console.log('form canceled')}
      nameRequired
      labels={{
        name: 'Name',
        description: 'Description',
        snapMemory: 'Vm snap memory',
        create: 'Create',
        cancel: 'Cancel',
      }}
      errorMessages={{
        name: 'Name required',
      }}
    />
  </div>
);

export default function renderApp() {
  ReactDOM.render(
    wrapperComponent(),
    document.getElementById('demo-app'),
  );
}
