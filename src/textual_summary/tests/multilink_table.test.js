import React from 'react';
import renderer from 'react-test-renderer';
import MultilinkTable from '../multilink_table';
import { multilinkTableData } from '../data/multilink_table';

describe('MultilinkTable', () => {
  it('renders just fine', () => {
    const component = renderer.create(
      <MultilinkTable
        title={multilinkTableData.title}
        items={multilinkTableData.items}
        onClick={e => null}
      />
    );
    const table = component.toJSON();
    expect(table).toMatchSnapshot();
  });
});
