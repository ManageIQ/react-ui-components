import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import { RbacUserTagsList } from '../';
import { tags } from '../stories/data';

describe('Rbac user tags list component', () => {
  it('should render conrrectly with tags', () => {
    const wrapper = mount(<RbacUserTagsList tags={tags} tenant="Foo" />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should render conrrectly without tags', () => {
    const wrapper = mount(<RbacUserTagsList tenant="Foo" />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
