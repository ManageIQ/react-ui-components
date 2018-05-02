import React from 'react';
import renderer from 'react-test-renderer';
import TableListView from '../table_list_view';
import { tableListViewData } from '../data/table_list_view';

describe('TableListView', () => {
  it('renders just fine...', () => {
    const component = renderer.create(<TableListView
      title={tableListViewData.title}
      headers={tableListViewData.headers}
      values={tableListViewData.values}
      colOrder={tableListViewData.colOrder}
      rowLabel='View the table'
      onClick={(e) => null}
    />);

    const row = component.toJSON();
    expect(row).toMatchSnapshot();
  });
});
