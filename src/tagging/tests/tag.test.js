import React from 'react';
import Tag from '../components/tag';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';

const tagCategory = { description: 'animal', id: 1};
const tagValue = { description: 'duck', id: 1};
function onDelete(x) {
  return x;
}

describe('Tag Component', () => {
  it('match snapshot', () => {
    const component = renderer.create(<Tag tagCategory={tagCategory} tagValue={tagValue} onTagDeleteClick={onDelete} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
