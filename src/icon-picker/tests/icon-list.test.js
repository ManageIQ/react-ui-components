import React from 'react';
import { shallow, mount } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import IconList from '../icon-list';

describe('IconList test', () => {
  let intialProps;
  let styleTag;
  beforeEach(() => {
    intialProps = {
      activeIcon: 'crosshairs',
      type: 'fa',
      iconChanged: jest.fn(),
    };
  });


  beforeAll(() => {
    styleTag = document.createElement('style');
    styleTag.innerHTML = `
      .fa-crosshairs::before {
        content: "+";
      }
      .fa-foo::before {
        content: "+";
      }
      .fa-foo {}
      .should-not-be-picked {}`;
    document.head.appendChild(styleTag);
  });

  afterAll(() => {
    document.removeChild(styleTag);
  });
  it('should render correctly in visible state', () => {
    const wrapper = shallow(<IconList {...intialProps} isVisible />);
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('should render correctly', () => {
    const wrapper = shallow(<IconList {...intialProps} />);
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('should update state after isVisible change', () => {
    const wrapper = mount(<IconList {...intialProps} />);
    expect(wrapper.state()).toEqual({ icons: undefined });
    wrapper.setProps({ isVisible: true });
    expect(wrapper.state()).toEqual({ icons: [['fa-crosshairs', 'fa-foo']] });
  });

  it('should call onClick correctly', () => {
    const iconChanged = jest.fn();
    const wrapper = mount(<IconList {...intialProps} isVisible iconChanged={iconChanged} />);
    wrapper.find('td').first().simulate('click');

    expect(iconChanged).toHaveBeenCalledWith('fa-crosshairs');
  });
});
