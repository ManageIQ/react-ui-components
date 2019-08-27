import React from 'react';
import { shallow, mount } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import { Modal } from 'patternfly-react';

import IconPicker from '../icon-picker';
import FontIcon from '../font-icon';
import IconsList from '../icon-list';

describe('IconList test', () => {
  let intialProps;
  let styleTag;
  beforeEach(() => {
    intialProps = {
      iconTypes: [{ type: 'fa', title: 'Font Awesome' }, { type: 'pf', title: 'PatternFly' }],
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
      .pf-plus::before {
        content: "+";
      }
      .fa-foo {}
      .should-not-be-picked {}`;
    document.head.appendChild(styleTag);
  });

  afterAll(() => {
    document.removeChild(styleTag);
  });

  it('should render correctly', () => {
    const wrapper = shallow(<IconPicker {...intialProps} />);
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('should cancel correctly', () => {
    const wrapper = mount(<IconPicker
      {...intialProps}
    />);

    expect(wrapper.find(Modal).instance().props.show).toEqual(false);

    wrapper.find('button').at(1).simulate('click');
    const button = wrapper.find('button').last();
    expect(wrapper.find(Modal).instance().props.show).toEqual(true);
    button.simulate('click');
    expect(wrapper.find(Modal).instance().props.show).toEqual(false);
  });

  it('should close correctly', () => {
    const wrapper = mount(<IconPicker
      {...intialProps}
    />);

    expect(wrapper.find(Modal).instance().props.show).toEqual(false);

    wrapper.find('button').at(1).simulate('click');
    const button = wrapper.find('#close-icon-picker-modal');
    expect(wrapper.find(Modal).instance().props.show).toEqual(true);
    button.simulate('click');
    expect(wrapper.find(Modal).instance().props.show).toEqual(false);
  });

  it('should apply correctly', () => {
    const wrapper = mount(<IconPicker
      {...intialProps}
    />);

    expect(wrapper.find(Modal).instance().props.show).toEqual(false);
    const selectedIcon = wrapper.find('#selected-icon');
    expect(selectedIcon.props().className).toEqual('undefined undefined');

    wrapper.find('button').at(1).simulate('click');
    const applyButton = wrapper.find('#apply-icon-picker-icon').first();
    expect(applyButton.instance().props.disabled).toEqual(true);
    wrapper.find(FontIcon).first().simulate('click');
    expect(applyButton.instance().props.disabled).toEqual(false);
    applyButton.simulate('click');
    expect(wrapper.find(Modal).instance().props.show).toEqual(false);
    wrapper.update();
    expect(wrapper.find('#selected-icon').props().className).toEqual('fa fa-crosshairs');
  });

  it('should render tabs correctly', () => {
    const wrapper = mount(<IconPicker
      {...intialProps}
    />);

    expect(wrapper.find(Modal).instance().props.show).toEqual(false);

    wrapper.find('button').at(1).simulate('click');
    expect(wrapper.find(IconsList).at(1).instance().state.icons).toEqual(undefined);
    expect(wrapper.find(IconsList).at(0).instance().state.icons).toEqual([['fa-crosshairs', 'fa-foo']]);
    wrapper.find('a').at(1).simulate('click');
    expect(wrapper.find(IconsList).at(1).instance().state.icons).toEqual([['pf-plus']]);
    wrapper.update();
    expect(wrapper.find(Modal).find('i').props().className).toEqual('pf pf-plus icon-list-item');
  });
});
