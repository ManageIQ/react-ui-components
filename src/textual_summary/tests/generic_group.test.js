import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import GenericGroup from '../generic_group';
import GenericTableRow from '../generic_table_row';

describe('GenericGroup', () => {
  it('renders title and rows', () => {
    const groupData = {
      title: 'Foo Bar',
      items: [{hoverClass: 'bar'}],
    };

    const wrapper = shallow(<GenericGroup items={groupData.items} title={groupData.title} onClick={e => null} />);
    expect(wrapper.html()).toContain(groupData.title);
    expect(wrapper.find(GenericTableRow).length).toEqual(1);
  });
});
