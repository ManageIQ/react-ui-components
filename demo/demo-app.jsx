import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { Grid } from 'patternfly-react';
import { IconPicker } from '../src/icon-picker';

const IconTypes = [
  { type: 'pf', title: 'Patternfly' },
  { type: 'fa', title: 'Font Awesome' },
];

const wrapperComponent = () => (
  <Grid>
    <IconPicker iconTypes={IconTypes} />
  </Grid>
);

export default function renderApp() {
  ReactDOM.render(
    wrapperComponent(),
    document.getElementById('demo-app'),
  );
}
