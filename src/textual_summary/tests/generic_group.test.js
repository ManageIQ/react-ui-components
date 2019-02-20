import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import GenericGroup from '../generic_group';
import GenericTableRow from '../generic_table_row';
import { genericGroupData } from '../data/generic_group';

describe('GenericGroup', () => {
  it('renders title and rows', () => {
    const wrapper = shallow(<GenericGroup
      items={genericGroupData.items}
      title={genericGroupData.title}
      onClick={() => null}
    />);
    expect(wrapper.html()).toContain(genericGroupData.title);
    expect(wrapper.find(GenericTableRow)).toHaveLength(2);
  });

  it('renders just fine', () => {
    const group = shallow(<GenericGroup
      items={genericGroupData.items}
      title={genericGroupData.title}
      onClick={() => null}
    />);
    expect(toJson(group)).toMatchSnapshot();
  });
});
