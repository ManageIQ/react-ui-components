import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import MultilinkTable from '../multilink_table';
import { multilinkTableData } from '../data/multilink_table';

describe('MultilinkTable', () => {
  it('renders just fine', () => {
    const table = shallow(<MultilinkTable
      title={multilinkTableData.title}
      items={multilinkTableData.items}
      onClick={() => null}
    />);
    expect(toJson(table)).toMatchSnapshot();
  });
});
