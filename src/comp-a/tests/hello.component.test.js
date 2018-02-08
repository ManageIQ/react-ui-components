import React from 'react';
import { HelloCmp } from '../some-cmp/hello.component';
import renderer from 'react-test-renderer';

test('Some dummy test', () => {
  const component = renderer.create(
    <HelloCmp></HelloCmp>,
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
