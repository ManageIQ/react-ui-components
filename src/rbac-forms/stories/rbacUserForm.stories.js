import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withInfo } from '@storybook/addon-info';
import { RbacUserForm, RbacUserPreview } from '../';
import { GenericPreviewTable } from '../../table/';
import { groups, usersTableColumns, usersTableRows, user, editedUser } from './data';
import RbacUserManagementModule from '../rbacUserManagementModule';

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
)))
  .add('Rbac users table', withInfo()(() => (
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
  )))
  .add('Rbac complex demo', withInfo()(() => (
    <div style={{ margin: 15 }}>
      <div>
        <p>This is a demo of several component that should replace current UI in user management in ManageIQ-ui-classic.</p>
        <p>
          Main feture of this is to show Redux based front-end routing.
          That will add routing to user management, without breaking any server routes.
        </p>
        <p>
          The to button toolbar and the left list, are not part of React router, but they act as Link components.
          They are connected to calling redux actions, manipulating the URL and invoking re-rendering.
        </p>
      </div>
      <RbacUserManagementModule />
    </div>
  )));
