import React from 'react';
import { storiesOf } from '@storybook/react';
import { Toolbar } from '..';

const toolbarData = require('../data/toolbar.json');

storiesOf('Toolbar', module)
  .add('Toolbar', () => (
    <React.Fragment>
      <Toolbar group={toolbarData} />
    </React.Fragment>));
