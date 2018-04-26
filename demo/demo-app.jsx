import * as ReactDOM from 'react-dom';
import * as React from 'react';
// import * as cmpA from '../src/comp-a';
import { SnapshotForm } from '../src/vm-snapshot-form';

export default function renderApp() {
  ReactDOM.render(<SnapshotForm
    onSubmit={values => window.alert(JSON.stringify(values, 0, 2))}
    errorMessages={{
      name: 'Name is required',
      description: 'Description is required',
    }}
    onCancel={() => window.alert('action canceled')}
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
