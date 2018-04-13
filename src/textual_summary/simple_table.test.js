import React from 'react';
import renderer from 'react-test-renderer';
import SimpleTable from './simple_table';

describe('Simple Table', () => {
  it('renders just fine...', () => {
    const tableData = {
      labels: ['Network Protocol', 'Host Protocol', 'Direction', 'Port', 'End Port', 'Source'],
      rows: [
        [null, '-1', 'outbound', 0, 0, '0.0.0.0/0'],
        [null, 'TCP', 'inbound', 22, 22, '0.0.0.0/0'],
        [null, 'TCP', 'inbound', 80, 80, '0.0.0.0/0'],
      ],
      title: 'Firewall Rules',
    };

    /*
     * label:
     *   a) simple
     *   b) object {sortable: true} TODO
     * rows
     *   value:
     *     a) simple
     *     b) object {expandable: true} TODO
     */
    const component = renderer.create(<SimpleTable
      title={tableData.title}
      labels={tableData.labels}
      rows={tableData.rows}
    />);
    const table = component.toJSON();
    expect(table).toMatchSnapshot();
  });
});
