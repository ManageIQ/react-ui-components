import React from 'react';
import { mount } from 'enzyme';
import renderer from 'react-test-renderer';
import { SnapshotForm } from '../snapshotForm';

describe('Final form input component', () => {
  const initialProps = {};
  beforeEach(() => {
    initialProps.onSubmit = jest.fn();
    initialProps.onCancel = jest.fn();
    initialProps.labels = {
      name: 'Input name',
      description: 'Input description',
      snapMemory: 'Snap memory',
      create: 'Create',
      cancel: 'Cancel',
    };
    initialProps.errorMessages = {
      name: 'Name required',
      description: 'Description required',
    };
  });

  it('Should render correctly', () => {
    const tree = renderer.create(<SnapshotForm {...initialProps} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Should render with name required', () => {
    const tree = renderer.create(<SnapshotForm {...initialProps} nameRequired />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Should render with description required', () => {
    const tree = renderer.create(<SnapshotForm {...initialProps} descriptionRequired />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Submit button should be disabled', () => {
    const onSubmit = jest.fn();
    const wrapper = mount(<SnapshotForm {...initialProps} nameRequired onSubmit={onSubmit} />);
    wrapper.find('button#snap-form-submit').simulate('click');
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it('Should call onCancel function', () => {
    const onCancel = jest.fn();
    const wrapper = mount(<SnapshotForm {...initialProps} onCancel={onCancel} />);
    wrapper.find('button#snap-form-cancel').simulate('click');
    expect(onCancel).toHaveBeenCalled();
  });

  it('Submit should return correct values', () => {
    const onSubmit = jest.fn();
    const wrapper = mount(<SnapshotForm {...initialProps} onSubmit={onSubmit} />);
    wrapper.find('button#snap-form-submit').simulate('click');
    expect(onSubmit).toHaveBeenCalled();
  });
});
