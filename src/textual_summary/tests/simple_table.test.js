import React from 'react';
import toJson from 'enzyme-to-json';
import { shallow } from 'enzyme';
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
    const table = shallow(<SimpleTable
      title={simpleTableData.title}
      labels={simpleTableData.labels}
      rows={simpleTableData.rows}
      onClick={e => null}
    />);
    expect(toJson(table)).toMatchSnapshot();
  });
});
