import React from 'react';
import { mount } from 'enzyme';
import renderer from 'react-test-renderer';
import { FinalFormTextArea } from '../finalFormTextArea';

describe('Final form textarea component', () => {
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
    const tree = renderer.create(<FinalFormTextArea {...initialProps} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Should render with error message', () => {
    const props = { ...initialProps, meta: { ...initialProps.meta, error: 'Error message' } };
    const tree = renderer.create(<FinalFormTextArea {...props} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Should call onChange event', () => {
    const onChange = jest.fn();
    const props = { ...initialProps, input: { ...initialProps.input, onChange } };
    const wrapper = mount(<FinalFormTextArea {...props} />);
    wrapper.find('textarea').simulate('change', { value: 'new value' });
    expect(onChange).toHaveBeenCalled();
  });
});
