import * as ReactDOM from 'react-dom';
import * as React from 'react';
import RbacUserForm from '../src/rbac-forms/rbacUserForm';

const onSubmit = values => console.log('onSubmit: ', values);
const onCancel = () => console.log('cancel');
const groups = [
  { label: 'ckeller', value: 10000000000029 },
  { label: 'Cloud-Operators', value: 10000000000025 },
  { label: 'Cloud-Users', value: 10000000000026 },
  { label: 'EvmGroup-administrator', value: 10000000000005 },
  { label: 'EvmGroup-approver', value: 10000000000006 },
  { label: 'EvmGroup-auditor', value: 10000000000007 },
  { label: 'EvmGroup-consumption_administrator', value: 10000000000016 },
  { label: 'EvmGroup-container_administrator', value: 10000000000017 },
  { label: 'EvmGroup-container_operator', value: 10000000000018 },
  { label: 'EvmGroup-desktop', value: 10000000000011 },
  { label: 'EvmGroup-operator', value: 10000000000003 },
  { label: 'EvmGroup-reader', value: 10000000000036 },
  { label: 'EvmGroup-security', value: 10000000000010 },
  { label: 'EvmGroup-super_administrator', value: 10000000000002 },
  { label: 'EvmGroup-support', value: 10000000000008 },
  { label: 'EvmGroup-tenant_administrator', value: 10000000000014 },
  { label: 'EvmGroup-tenant_quota_administrator', value: 10000000000015 },
  { label: 'EvmGroup-user', value: 10000000000004 },
  { label: 'EvmGroup-user_limited_self_service', value: 10000000000013 },
  { label: 'EvmGroup-user_self_service', value: 10000000000012 },
  { label: 'EvmGroup-vm_user', value: 10000000000009 },
  { label: 'loic Group', value: 10000000000034 },
];

export default function renderApp() {
  ReactDOM.render(
    <RbacUserForm onSave={onSubmit} groups={groups} onCancel={onCancel} />,
    document.getElementById('demo-app'),
  );
}
