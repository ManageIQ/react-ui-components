import React from 'react';

import { storiesOf } from '@storybook/react';

import '../styles.scss';

import { HelloCmp } from '../some-cmp/hello.component';

storiesOf('Hello', module)
  .add('Hello example', () => <HelloCmp />);
