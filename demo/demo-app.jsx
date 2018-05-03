import * as ReactDOM from 'react-dom';
import * as React from 'react';
// import * as cmpA from '../src/comp-a';
import { VmSnapshotForm } from '../src/vm-snapshot-form';

export default function renderApp() {
  ReactDOM.render(<VmSnapshotForm
    onSubmit={values => console.log(JSON.stringify(values, 0, 2))}
    errorMessages={{
      name: 'Name is required',
      description: 'Description is required',
    }}
    onCancel={() => console.log('action canceled')}
    nameRequired
    descriptionRequired
    labels={{
      name: 'Name',
      description: 'Description',
      snapMemory: 'Snapshot VM memory',
      create: 'Create',
      cancel: 'Cancel',
    }}
  />, document.getElementById('demo-app'));
}
