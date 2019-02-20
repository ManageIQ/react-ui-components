import React from 'react';
import toJson from 'enzyme-to-json';
import { shallow } from 'enzyme';
import TableListView from '../table_list_view';
import { tableListViewData } from '../data/table_list_view';

describe('TableListView', () => {
  it('renders just fine...', () => {
    const row = shallow(<TableListView
      title={tableListViewData.title}
      headers={tableListViewData.headers}
      values={tableListViewData.values}
      colOrder={tableListViewData.colOrder}
      rowLabel="View the table"
      onClick={() => null}
    />);
    expect(toJson(row)).toMatchSnapshot();
  });
});
