import React from 'react';
import toJson from 'enzyme-to-json';
import { mount, shallow } from 'enzyme';
import { Form } from 'react-final-form';
import Select from 'react-select';

import { RbacUserForm } from '../';

describe('RbacUserForm component', () => {
  const initialProps = {};
  const user = {
    name: 'User name',
    userid: 'User id',
    email: 'email@mail.com',
    groups: ['10000000000026', '10000000000016'],
  };

  beforeEach(() => {
    initialProps.groups = [
      { label: 'ckeller', value: '10000000000029' },
      { label: 'Cloud-Operators', value: '10000000000025' },
      { label: 'Cloud-Users', value: '10000000000026' },
      { label: 'EvmGroup-administrator', value: '10000000000005' },
      { label: 'EvmGroup-approver', value: '10000000000006' },
      { label: 'EvmGroup-auditor', value: '10000000000007' },
      { label: 'EvmGroup-consumption_administrator', value: '10000000000016' },
      { label: 'EvmGroup-container_administrator', value: '10000000000017' },
      { label: 'EvmGroup-container_operator', value: '10000000000018' },
      { label: 'EvmGroup-desktop', value: '10000000000011' },
      { label: 'EvmGroup-operator', value: '10000000000003' },
      { label: 'EvmGroup-reader', value: '10000000000036' },
      { label: 'EvmGroup-security', value: '10000000000010' },
      { label: 'EvmGroup-super_administrator', value: '10000000000002' },
      { label: 'EvmGroup-support', value: '10000000000008' },
      { label: 'EvmGroup-tenant_administrator', value: '10000000000014' },
      { label: 'EvmGroup-tenant_quota_administrator', value: '10000000000015' },
      { label: 'EvmGroup-user', value: '10000000000004' },
      { label: 'EvmGroup-user_limited_self_service', value: '10000000000013' },
      { label: 'EvmGroup-user_self_service', value: '10000000000012' },
      { label: 'EvmGroup-vm_user', value: '10000000000009' },
      { label: 'loic Group', value: '10000000000034' },
    ];
    initialProps.onSave = jest.fn();
    initialProps.onCancel = jest.fn();
  });

  it('Should render correctly', () => {
    const tree = shallow(<RbacUserForm {...initialProps} />);
    expect(toJson(tree)).toMatchSnapshot();
  });

  it('Should render editing version', () => {
    const tree = shallow(<RbacUserForm {...initialProps} initialValues={user} editEnabled />);
    expect(toJson(tree)).toMatchSnapshot();
  });

  it('Should not call submit function', () => {
    const onSave = jest.fn();
    const wrapper = mount(<RbacUserForm {...initialProps} onSave={onSave} newRecord />);
    wrapper.find('button#user-submit').simulate('click');
    expect(onSave).not.toHaveBeenCalled();
  });

  it('Should call submit function', () => {
    const onSave = jest.fn();
    const wrapper = mount(<RbacUserForm {...initialProps} onSave={onSave} newRecord />);
    const nameInput = wrapper.find('input#name');
    nameInput.instance().value = 'correctUsername';
    nameInput.simulate('change');

    const usernameInput = wrapper.find('input#userid');
    usernameInput.instance().value = 'userId';
    usernameInput.simulate('change');

    const passwordInput = wrapper.find('input#password');
    passwordInput.instance().value = '123456789';
    passwordInput.simulate('change');

    const verify = wrapper.find('input#password-verify');
    verify.instance().value = '123456789';
    verify.simulate('change');

    // simulate does not work on react-select form some reson
    const select = wrapper.find(Select);
    select.instance().value = [
      { label: 'ckeller', value: 10000000000029 },
      { label: 'Cloud-Operators', value: 10000000000025 },
      { label: 'Cloud-Users', value: 10000000000026 },
    ];
    select.simulate('keyDown', { keyCode: 55 });

    // simulate does not work on react-select form some reson, had to assign values manually
    const form = wrapper.find(Form);
    form.instance().form.change('groups', [
      { label: 'ckeller', value: 10000000000029 },
      { label: 'Cloud-Operators', value: 10000000000025 },
      { label: 'Cloud-Users', value: 10000000000026 },
    ]);

    wrapper.find('button#user-submit').simulate('click');
    expect(onSave).toHaveBeenCalled();
  });

  it('Should add input to change password and then hide', () => {
    const wrapper = mount(<RbacUserForm {...initialProps} initialValues={user} editEnabled />);
    const enabler = wrapper.find('#password-change-enabler');
    let verify = wrapper.find('#password-verify');
    expect(verify.length).toBe(0);
    enabler.simulate('click');
    verify = wrapper.find('#password-verify');
    expect(verify).toBeTruthy();
    const disabler = wrapper.find('#password-change-disabler');
    disabler.simulate('click');
    verify = wrapper.find('#password-verify');
    expect(verify.length).toBe(0);
  });
});
