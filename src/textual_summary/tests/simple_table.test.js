import React from 'react';
import renderer from 'react-test-renderer';
import SimpleTable from '../simple_table';
import { simpleTableData } from '../data/simple_table';

describe('Simple Table', () => {
  it('renders just fine...', () => {
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
      title={simpleTableData.title}
      labels={simpleTableData.labels}
      rows={simpleTableData.rows}
    />);
    const table = component.toJSON();
    expect(table).toMatchSnapshot();
  });
});
