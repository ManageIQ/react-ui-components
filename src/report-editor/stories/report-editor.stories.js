import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

import { ReportEditor } from '../';
import * as options from '../data';

storiesOf('Report editor', module).add('Report editor', withInfo()(() => (
  <div style={{ padding: 16 }}>
    <ReportEditor submit={values => console.log('Report data: ', values)} {...options} />
  </div>
)));
