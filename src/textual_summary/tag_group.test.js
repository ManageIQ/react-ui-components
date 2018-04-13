import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import TagGroup from './tag_group';
import IconOrImage from './icon_or_image';

describe('TagGroup', () => {
  /*
   *  has rows
   *    a) simple row
   *      has icon
   *      has value
   *    b) array row (multivalue)
   *      has icon
   *      values joined with "<b>&nbsp;|..."
   */
  it('renders just fine', () => {
    const tagData = {
      items: [
        {
          label: 'Managed by Zone',
          icon: 'pficon pficon-zone',
          value: 'default',
          hoverClass: 'no-hover',
        },
        {
          label: 'My Company X Tags',
          value: [
            { icon: 'fa fa-tag', label: 'Dan Test', value: ['Test 1'] },
            { icon: 'fa fa-tag', label: 'Demo bla', value: ['Policy', '2'] },
          ],
          hoverClass: 'no-hover',
        },
      ],
      title: 'Smart Management',
    };

    const component = renderer.create(<TagGroup items={tagData.items} title={tagData.title} />);
    const image = component.toJSON();
    expect(image).toMatchSnapshot();
  });

  it('rendered array row with icon and values joined with "<b>&nbsp;|&nbsp;</b>")', () => {
    const tagData = {
      items: [
        {
          label: 'My Company X Tags',
          value: [
            { icon: 'fa fa-tag', label: 'Dan Test', value: ['Test 1'] },
            { icon: 'fa fa-tag', label: 'Demo bla', value: ['Policy', '2'] },
          ],
          hoverClass: 'no-hover',
        },
      ],
      title: 'Smart Management',
    };

    const wrapper = mount(<TagGroup items={tagData.items} title={tagData.title} />);
    expect(wrapper.html()).toContain('Policy<b>&nbsp;|&nbsp;</b>2');
    expect(wrapper.containsMatchingElement(<IconOrImage icon="fa fa-tag" />)).toEqual(true);
  });
});
