import React from 'react';
import { storiesOf } from '@storybook/react';
import SimpleTable from '../simple_table';
import { simpleTableData } from '../data/simple_table';

storiesOf('TextualSummary', module)
  .add('SimpleTable', () => {
    return (<SimpleTable
      title={simpleTableData.title}
      labels={simpleTableData.labels}
      rows={simpleTableData.rows}
    />);
  })
;

