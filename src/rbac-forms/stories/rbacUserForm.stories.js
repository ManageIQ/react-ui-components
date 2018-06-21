import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withInfo } from '@storybook/addon-info';

import { RbacUserForm } from '../';

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

storiesOf('Rbac forms', module).add('Rbac add user form', withInfo()(() => (
  <RbacUserForm
    groups={groups}
    onSave={action('onSave')}
    onCancel={action('onCancel')}
  />
)));
