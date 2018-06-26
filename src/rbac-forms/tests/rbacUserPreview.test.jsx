import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';

import RbacUserPreview from '../rbacUserPreview';

describe('RbacUserPreview component', () => {
  const user = {
    name: 'Administrator',
    userid: 'Admin',
    email: 'mail@mail.com',
    current_group: 'EvmGroup-super_administrator',
    groups: [{
      label: 'Cloud-Operators',
      icon: 'group',
      groupId: 1,
      onClick: () => jest.fn(),
    }, {
      label: 'Cloud-Users',
      icon: 'group',
      groupId: 2,
      onClick: () => jest.fn(),
    }],
    role: 'Cloud-Users',
  };

  it('Should render correctly', () => {
    const tree = mount(<RbacUserPreview user={user} />);
    expect(toJson(tree)).toMatchSnapshot();
  });
});
