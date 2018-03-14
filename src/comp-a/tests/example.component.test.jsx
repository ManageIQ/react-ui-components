import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import { ExampleCmp } from '../index';

test('ExampleCmp should be defined', () => {
  expect(ExampleCmp).toBeDefined();
});

test('Example test', () => {
  const component = renderer.create(<ExampleCmp />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Exmaple method test', () => {
  const component = shallow(<ExampleCmp />);
  expect(component.instance().bla()).toBe('some text');
});
