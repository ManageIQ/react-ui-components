import React from 'react';
import renderer from 'react-test-renderer';
import GenericTableRow from './generic_table_row';

describe('Simple Table', () => {
  it('renders just fine...', () => {
    /*
     *  row has
     *    1) label
     *    2) icon
     *    3) value
     *  item.value
     *    a) simple
     *    b) array    TODO
     *  linkClick handler TODO
     */
    const item = {
      label: 'Network Manager',
      value: 'Amazon East Network Manager',
      icon: null,
      image: 'http://localhost:3000/assets/svg/vendor-ec2_network-04c432db85be0fd670cd6da83b8685dab51e1b7a63258b70cccbdf8d7f72c988.svg',
      link: '/ems_network/10000000000045',
      title: 'Show Network Manager \'Amazon East Network Manager\'',
      hoverClass: '',
    };

    const component = renderer.create(<GenericTableRow item={item} />);
    const row = component.toJSON();
    expect(row).toMatchSnapshot();
  });
});

