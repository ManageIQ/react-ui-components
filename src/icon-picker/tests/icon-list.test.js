import React, { cloneElement } from 'react';
import { shallow, mount } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import IconList from '../icon-list';

describe('IconList test', () => {
  let intialProps;
  let styleTag;

  const TableWrapper = ({ children, ...props }) => (
    <table>
      <tbody>
        {cloneElement(children, { ...props })}
      </tbody>
    </table>
  );

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
    const wrapper = shallow(<TableWrapper><IconList {...intialProps} isVisible /></TableWrapper>).find(IconList).dive();
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('should render correctly', () => {
    const wrapper = shallow(<TableWrapper><IconList {...intialProps} /></TableWrapper>).find(IconList).dive();
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('should update state after isVisible change', () => {
    const wrapper = mount(<TableWrapper><IconList {...intialProps} /></TableWrapper>);
    expect(wrapper.find(IconList).state()).toEqual({ icons: undefined });
    wrapper.setProps({ isVisible: true });
    expect(wrapper.find(IconList).state()).toEqual({ icons: [['fa-crosshairs', 'fa-foo']] });
  });

  it('should call onClick correctly', () => {
    const iconChanged = jest.fn();
    const wrapper = mount(<TableWrapper><IconList {...intialProps} isVisible iconChanged={iconChanged} /></TableWrapper>);
    wrapper.find('td').first().simulate('click');

    expect(iconChanged).toHaveBeenCalledWith('fa-crosshairs');
  });
});
