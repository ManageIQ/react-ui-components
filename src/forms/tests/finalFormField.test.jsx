import React from 'react';
import { mount, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import { FinalFormField } from '../';
import { fieldInputProp, fieldMetaProps } from './mocks';

describe('Final form input component', () => {
  const initialProps = {};
  beforeEach(() => {
    initialProps.meta = { ...fieldMetaProps };
    initialProps.input = { ...fieldInputProp };
    initialProps.label = 'foo';
    initialProps.validateOnMount = true;
  });

  it('Should render correctly', () => {
    const tree = shallow(<FinalFormField {...initialProps} />).dive();
    expect(toJson(tree)).toMatchSnapshot();
  });

  it('Should render with error message', () => {
    const props = { ...initialProps, meta: { ...initialProps.meta, error: 'Error message' } };
    const tree = shallow(<FinalFormField {...props} />).dive();
    expect(toJson(tree)).toMatchSnapshot();
  });

  it('Should call onChange event', () => {
    const onChange = jest.fn();
    const props = { ...initialProps, input: { ...initialProps.input, onChange } };
    const wrapper = mount(<FinalFormField {...props} />);
    wrapper.find('input[type="text"]').simulate('change', { value: 'new value' });
    expect(onChange).toHaveBeenCalled();
  });

  it('Should spread extraProps attributes to input', () => {
    const props = {
      ...initialProps,
      extraProps: {
        'data-cat': 'cat',
        'data-dog': 'dog',
        foo: 'bar',
      },
    };
    const wrapper = mount(<FinalFormField {...props} />);
    const input = wrapper.find('input');
    expect(input.props()).toEqual(expect.objectContaining({
      'data-dog': 'dog',
      'data-cat': 'cat',
      foo: 'bar',
    }));
  });
});
