import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withInfo } from '@storybook/addon-info';
import { RbacUserForm, RbacUserPreview, RbacAssignCompanyTags } from '../';
import { GenericPreviewTable } from '../../table/';
import { groups, usersTableColumns, usersTableRows, tags } from './data';
import RbacUserTagsList from '../rbacUserTagsList';
import { users, categories } from './usersData';

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
    newRecord
  />
))).add('Rbac edit user form', withInfo()(() => (
  <RbacUserForm
    groups={groups}
    onSave={action('onSave')}
    onCancel={action('onCancel')}
    initialValues={{
      name: 'User name',
      userid: 'User id',
      email: 'email@mail.com',
      groups: ['2', '1', '5'],
    }}
  />
)))
  .add('Rbac user tags list', withInfo()(() => (
    <RbacUserTagsList tags={tags} tenant="My tenant" />
  )))
  .add('Rbac assign user tags', withInfo()(() => {
    const mockLoadCategoryEntry = () => new Promise(resolve => setTimeout(() => resolve([{
      value: 1,
      label: 'Label 1',
    }, {
      value: 2,
      label: 'Label 2',
    }, {
      value: 3,
      label: 'Label 3',
    }, {
      value: 10000000000092,
      label: 'lazy loaded',
    }]), 1500));
    const mockLoadMultipleEntries = () => new Promise(resolve => setTimeout(() => resolve({
      10000000000085: [{
        value: 10000000000092,
        label: 'lazy loaded',
      }],
    })), 1500);
    return (
      <RbacAssignCompanyTags
        users={users}
        columns={usersTableColumns}
        categories={categories.map(category => ({ ...category, label: category.description, value: category.id }))}
        loadCategoryEntry={mockLoadCategoryEntry}
        loadMultipleEntries={mockLoadMultipleEntries}
        handleCancel={action('Handle cancel')}
        handleSave={action('Handle save')}
      />
    );
  }))
  .add('Rbac user preview', withInfo()(() => (
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
  )));
