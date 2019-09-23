import React from 'react';
import ExpressionEditor from '../expression-editor'

import { storiesOf } from '@storybook/react';

storiesOf('Expression Editor', module)
  .add('Expression Editor', () =>
    (
      <ExpressionEditor/>
    ));
