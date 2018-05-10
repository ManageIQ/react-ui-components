import React from 'react';
import { mount } from 'enzyme';
import renderer from 'react-test-renderer';
import { FinalFormField } from '../finalFormField';

describe('Final form input component', () => {
  const initialProps = {};
  beforeEach(() => {
    initialProps.meta = {
      active: false,
      dirty: false,
      dirtySinceLastSubmit: false,
      invalid: false,
      pristine: true,
      submitFailed: false,
      submitSucceeded: false,
      touched: false,
      valid: true,
      visited: false,
    };
    initialProps.input = {
      name: 'testInput',
      onBlur: jest.fn(),
      onChange: jest.fn(),
      onFocus: jest.fn(),
    };
    initialProps.label = 'foo';
  });

  it('Should render correctly', () => {
    const tree = renderer.create(<FinalFormField {...initialProps} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Should render with error message', () => {
    const props = { ...initialProps, meta: { ...initialProps.meta, error: 'Error message' } };
    const tree = renderer.create(<FinalFormField {...props} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Should call onChange event', () => {
    const onChange = jest.fn();
    const props = { ...initialProps, input: { ...initialProps.input, onChange } };
    const wrapper = mount(<FinalFormField {...props} />);
    wrapper.find('input[type="text"]').simulate('change', { value: 'new value' });
    expect(onChange).toHaveBeenCalled();
  });
});
