import React from 'react';
import { storiesOf } from '@storybook/react';
import TableListView from '../table_list_view';
import { tableListViewData } from '../data/table_list_view';

storiesOf('TextualSummary', module)
  .add('TableListView', () => {
    return (
      <TableListView
        title={tableListViewData.title}
        headers={tableListViewData.headers}
        values={tableListViewData.values}
        colOrder={tableListViewData.colOrder}
        rowLabel='View the table'
        onClick={(e) => null}
      />
    );
  })
;

