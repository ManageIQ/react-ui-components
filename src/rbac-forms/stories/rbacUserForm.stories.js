import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withInfo } from '@storybook/addon-info';
import { RbacUserForm, RbacUserPreview } from '../';
import { GenericPreviewTable } from '../../table/';
import { groups, usersTableColumns, usersTableRows } from './data';

const user = {
  name: 'Administrator',
  userid: 'Admin',
  email: 'mail@mail.com',
  current_group: {
    label: 'EvmGroup-super_administrator',
    onClick: () => action('Current group clicked'),
  },
  groups: [{
    label: 'Cloud-Operators',
    icon: 'group',
    groupId: '1',
    onClick: () => action('Group click'),
  }, {
    label: 'Cloud-Users',
    icon: 'group',
    groupId: '2',
    onClick: () => action('Group click'),
  }],
  role: {
    label: 'Cloud-Users',
    onClick: () => action('Current role click'),
  },
};

storiesOf('Rbac forms', module).add('Rbac add user form', withInfo()(() => (
  <RbacUserForm
    groups={groups}
    onSave={action('onSave')}
    onCancel={action('onCancel')}
  />
))).add('Rbac user preview', withInfo()(() => (
  <RbacUserPreview user={user} />
))).add('Rbac users table', withInfo()(() => (
  <GenericPreviewTable
    rows={usersTableRows}
    columns={usersTableColumns}
    rowClick={action('Row clicked')}
    rowSelect={action('User selected')}
    showIcon
    showSelect
    icon={{
      type: 'pf',
      name: 'user',
    }}
  />
)));
