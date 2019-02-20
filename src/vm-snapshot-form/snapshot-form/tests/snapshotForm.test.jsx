import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import { VmSnapshotForm } from '../../';

describe('Final form input component', () => {
  const initialProps = {};
  beforeEach(() => {
    initialProps.onSubmit = jest.fn();
    initialProps.onCancel = jest.fn();
    initialProps.validateOnMount = true;
  });

  it('Should render correctly', () => {
    const tree = shallow(<VmSnapshotForm {...initialProps} />);
    expect(toJson(tree)).toMatchSnapshot();
  });

  it('Should render with name required', () => {
    const tree = shallow(<VmSnapshotForm {...initialProps} nameRequired />);
    expect(toJson(tree)).toMatchSnapshot();
  });

  it('Should render with description required', () => {
    const tree = shallow(<VmSnapshotForm {...initialProps} descriptionRequired />);
    expect(toJson(tree)).toMatchSnapshot();
  });

  it('Submit button should be disabled', () => {
    const onSubmit = jest.fn();
    const wrapper = shallow(<VmSnapshotForm {...initialProps} nameRequired onSubmit={onSubmit} />);
    wrapper.find('button#snap-form-submit').simulate('click');
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it('Should call onCancel function', () => {
    const onCancel = jest.fn();
    const wrapper = shallow(<VmSnapshotForm {...initialProps} onCancel={onCancel} />);
    wrapper.find('button#snap-form-cancel').simulate('click');
    expect(onCancel).toHaveBeenCalled();
  });

  it('Submit should return correct values', () => {
    const onSubmit = jest.fn();
    const wrapper = shallow(<VmSnapshotForm {...initialProps} onSubmit={onSubmit} />);
    wrapper.find('button#snap-form-submit').simulate('click');
    expect(onSubmit).toHaveBeenCalled();
  });
});
