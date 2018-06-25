import React from 'react';
import { mount, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import { FinalFormTextArea } from '../';
import { fieldInputProp, fieldMetaProps } from './mocks';

describe('Final form textarea component', () => {
  const initialProps = {};
  beforeEach(() => {
    initialProps.meta = { ...fieldMetaProps };
    initialProps.input = { ...fieldInputProp };
    initialProps.label = 'foo';
    initialProps.validateOnMount = true;
  });

  it('Should render correctly', () => {
    const tree = shallow(<FinalFormTextArea {...initialProps} />).dive();
    expect(toJson(tree)).toMatchSnapshot();
  });

  it('Should render with error message', () => {
    const props = { ...initialProps, meta: { ...initialProps.meta, error: 'Error message' } };
    const tree = shallow(<FinalFormTextArea {...props} />).dive();
    expect(toJson(tree)).toMatchSnapshot();
  });

  it('Should call onChange event', () => {
    const onChange = jest.fn();
    const props = { ...initialProps, input: { ...initialProps.input, onChange } };
    const wrapper = mount(<FinalFormTextArea {...props} />);
    wrapper.find('textarea').simulate('change', { value: 'new value' });
    expect(onChange).toHaveBeenCalled();
  });
});
