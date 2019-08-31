import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import FontIcon from '../font-icon';

describe('FontIcon test', () => {
  let intialProps;
  beforeEach(() => {
    intialProps = {
      type: 'fa',
      icon: 'crosshairs',
    };
  });
  it('should render correctly in active state', () => {
    const wrapper = shallow(<FontIcon {...intialProps} isActive />);
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('should render correctly', () => {
    const wrapper = shallow(<FontIcon {...intialProps} />);
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
