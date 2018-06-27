import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withInfo } from '@storybook/addon-info';
import { RbacUserForm, RbacUserPreview } from '../';
import { GenericPreviewTable } from '../../table/';
import { groups, usersTableColumns, usersTableRows, user, editedUser } from './data';

storiesOf('Rbac forms', module).add('Rbac add user form', withInfo()(() => (
  <RbacUserForm
    groups={groups}
    onSave={action('onSave')}
    onCancel={action('onCancel')}
  />
))).add('Rbac edit user form', withInfo()(() => (
  <RbacUserForm
    groups={groups}
    onSave={action('onSave')}
    onCancel={action('onCancel')}
    initialValues={editedUser}
    editDisabled={false}
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
