import React from 'react';
import renderer from 'react-test-renderer';
import TableListView from './table_list_view';

describe('TableListView', () => {
  it('renders just fine...', () => {
    const tableData = {
      title: 'Tables with the Most Rows',
      headers: ['Name', 'Rows'],
      values: [
        {title: 'vim_performance_states', gname: 'vim_performance_states', value: '676,150', explorer: true, link: 'miqTreeActivateNode(\'vmdb_tree\', \'tb-10000000000181\');'},
        {title: 'miq_report_result_details', gname: 'miq_report_result_details', value: '280,848', explorer: true, link: 'miqTreeActivateNode(\'vmdb_tree\', \'tb-10000000000197\');'}
      ],
      colOrder: ['name', 'value'],
    };

    const component = renderer.create(<TableListView
      title={tableData.title}
      headers={tableData.headers}
      values={tableData.values}
      colOrder={tableData.colOrder}
    />);

    const row = component.toJSON();
    expect(row).toMatchSnapshot();
  });
});
