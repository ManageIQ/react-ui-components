import React from 'react';
import { mount } from 'enzyme';
import renderer from 'react-test-renderer';

import { FinalFormRadio } from '../';
import { fieldInputProp, fieldMetaProps } from './mocks';

describe('Final form radio component', () => {
  const initialProps = {};
  beforeEach(() => {
    initialProps.meta = { ...fieldMetaProps };
    initialProps.input = { ...fieldInputProp };
    initialProps.label = 'foo';
    initialProps.validateOnMount = true;
  });

  it('Should render correctly', () => {
    const tree = renderer.create(<FinalFormRadio {...initialProps} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Should render with error message', () => {
    const props = { ...initialProps, meta: { ...initialProps.meta, error: 'Error message' } };
    const tree = renderer.create(<FinalFormRadio {...props} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Should call onChange event', () => {
    const onChange = jest.fn();
    const props = { ...initialProps, input: { ...initialProps.input, onChange } };
    const wrapper = mount(<FinalFormRadio {...props} />);
    wrapper.find('input[type="radio"]').simulate('change');
    expect(onChange).toHaveBeenCalled();
  });
});
