import React from 'react';
import { mount } from 'enzyme';
import renderer from 'react-test-renderer';

import { FinalFormCheckBox } from '../';
import { fieldInputProp, fieldMetaProps } from './mocks';

describe('Final form checkbox component', () => {
  const initialProps = {};
  beforeEach(() => {
    initialProps.meta = { ...fieldMetaProps };
    initialProps.input = { ...fieldInputProp };
    initialProps.label = 'foo';
    initialProps.validateOnMount = true;
  });

  it('Should render correctly', () => {
    const tree = renderer.create(<FinalFormCheckBox {...initialProps} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Should render with error message', () => {
    const props = { ...initialProps, meta: { ...initialProps.meta, error: 'Error message' } };
    const tree = renderer.create(<FinalFormCheckBox {...props} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Should call onChange event', () => {
    const onChange = jest.fn();
    const props = { ...initialProps, input: { ...initialProps.input, onChange } };
    const wrapper = mount(<FinalFormCheckBox {...props} />);
    wrapper.find('input[type="checkbox"]').simulate('change');
    expect(onChange).toHaveBeenCalled();
  });
});
