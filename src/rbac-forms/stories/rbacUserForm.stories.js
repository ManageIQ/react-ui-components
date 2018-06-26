import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withInfo } from '@storybook/addon-info';

import { RbacUserForm, RbacUserPreview } from '../';

const groups = [
  {
    value: 1,
    label: 'Hope',
  },
  {
    value: 2,
    label: 'Christa',
  },
  {
    value: 3,
    label: 'Tania',
  },
  {
    value: 4,
    label: 'Mcintyre',
  },
  {
    value: 5,
    label: 'Tonya',
  },
  {
    value: 6,
    label: 'Marcie',
  },
  {
    value: 7,
    label: 'Cara',
  },
  {
    value: 8,
    label: 'Becker',
  },
  {
    value: 9,
    label: 'Foley',
  },
  {
    value: 10,
    label: 'Perkins',
  },
];
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
storiesOf('Rbac forms', module).add('Rbac add user form', withInfo()(() => (
  <RbacUserForm
    groups={groups}
    onSave={action('onSave')}
    onCancel={action('onCancel')}
  />
))).add('Rbac user preview', withInfo()(() => (
  <RbacUserPreview user={user} />
)));
