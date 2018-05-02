import React from 'react';
import renderer from 'react-test-renderer';
import IconOrImage from '../icon_or_image';

describe('Icon or Image', () => {
  it('renders image with title and alt if image is passed in', () => {
    const component = renderer.create(<IconOrImage image="foo/bar.png" title="foo bar title" />);
    const image = component.toJSON();
    expect(image).toMatchSnapshot();
  });

  it('renders icon with title and alt if icon and no image are passed in', () => {
    const component = renderer.create(<IconOrImage icon="fa fa-foobar" title="foo bar title" />);
    const image = component.toJSON();
    expect(image).toMatchSnapshot();
  });

  it('renders nothing if no icon and no image are passed in', () => {
    const component = renderer.create(<IconOrImage icon="" title="foo bar title" />);
    const image = component.toJSON();
    expect(image).toMatchSnapshot();
  });
});
