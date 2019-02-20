import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import { RbacUserTagsList } from '../';
import { tags } from '../stories/data';

describe('Rbac user tags list component', () => {
  it('should render conrrectly with tags', () => {
    const wrapper = shallow(<RbacUserTagsList tags={tags} tenant="Foo" />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should render conrrectly without tags', () => {
    const wrapper = shallow(<RbacUserTagsList tenant="Foo" />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
