import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import { HelloCmp } from '../some-cmp/hello.component';

test('Some dummy test', () => {
  const component = renderer.create(<HelloCmp />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Method test example', () => {
  const component = shallow(<HelloCmp />);
  expect(component.instance().bla()).toBe('some text');
});
