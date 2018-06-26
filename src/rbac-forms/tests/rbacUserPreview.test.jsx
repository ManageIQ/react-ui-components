import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';

import RbacUserPreview from '../rbacUserPreview';

describe('RbacUserPreview component', () => {
  const user = {
    name: 'Administrator',
    userid: 'Admin',
    email: 'mail@mail.com',
    current_group: {
      label: 'EvmGroup-super_administrator',
      onClick: () => console.log('Current group clicked'),
    },
    groups: [{
      label: 'Cloud-Operators',
      icon: 'group',
      groupId: 1,
      onClick: () => console.log('Group click'),
    }, {
      label: 'Cloud-Users',
      icon: 'group',
      groupId: 2,
      onClick: () => console.log('Group click'),
    }],
    role: {
      label: 'Cloud-Users',
      onClick: () => console.log('Current role click'),
    },
  };

  it('Should render correctly', () => {
    const tree = mount(<RbacUserPreview user={user} />);
    expect(toJson(tree)).toMatchSnapshot();
  });
});
