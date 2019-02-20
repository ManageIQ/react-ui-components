import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
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
    const tree = shallow(<FinalFormCheckBox {...initialProps} />).dive();
    expect(toJson(tree)).toMatchSnapshot();
  });

  it('Should render with error message', () => {
    const props = { ...initialProps, meta: { ...initialProps.meta, error: 'Error message' } };
    const tree = shallow(<FinalFormCheckBox {...props} />).dive();
    expect(toJson(tree)).toMatchSnapshot();
  });

  it('Should call onChange event', () => {
    const onChange = jest.fn();
    const props = { ...initialProps, input: { ...initialProps.input, onChange } };
    const wrapper = shallow(<FinalFormCheckBox {...props} />);
    wrapper.find('input[type="checkbox"]').simulate('change');
    expect(onChange).toHaveBeenCalled();
  });
});
