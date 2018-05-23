import React from 'react';
import { storiesOf } from '@storybook/react';
import MultilinkTable from '../multilink_table';
import { multilinkTableData } from '../data/multilink_table';

storiesOf('TextualSummary', module)
  .add('MultilinkTable', () => {
    return (
      <MultilinkTable
        title={multilinkTableData.title}
        items={multilinkTableData.items}
        onClick={e => null}
      />
    );
  })
;
