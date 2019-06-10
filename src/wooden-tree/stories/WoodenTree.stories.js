import React from 'react';
import { Provider } from 'react-redux';
import { storiesOf } from '@storybook/react';
import { store, WoodenTreeExample } from './WoodenTreeExample';

storiesOf('WoodenTree', module)
  .add('WoodenTreeExample', () => <Provider store={store}><WoodenTreeExample /></Provider>);
