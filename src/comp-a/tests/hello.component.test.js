import React from 'react';
import { HelloCmp } from '../some-cmp/hello.component';
import renderer from 'react-test-renderer';
import {shallow} from 'enzyme';

test('Some dummy test', () => {
  const component = renderer.create(
    <HelloCmp></HelloCmp>,
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('bla bla', () => {
  const component = shallow(<HelloCmp/>);
  console.log(component.instance());
  expect(component.instance().bla()).toBe('some text');
});
