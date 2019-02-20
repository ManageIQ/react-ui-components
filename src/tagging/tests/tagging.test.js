import React from 'react';
import Tagging from '../components/Tagging/Tagging';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

const tags = [
  {
    description: 'Name',
    id: 1,
    values: [{ description: 'Pepa', id: 11 }, { description: 'Franta', id: 12 }]
  },
  {
    description: 'Number',
    id: 2,
    values: [{ description: '1', id: 21 }, { description: '2', id: 22 }]
  },
  {
    description: 'Animal',
    id: 3,
    values: [
      { description: 'Duck', id: 31 },
      { description: 'Cat', id: 32 },
      { description: 'Dog', id: 33 }
    ]
  },
  {
    description: 'Food',
    id: 4,
    values: [
      { description: 'Steak', id: 41 },
      { description: 'Duck', id: 42 },
      { description: 'Salad', id: 43 }
    ]
  },
  {
    description: 'Something',
    id: 5,
    values: [
      { description: 'Knedlik', id: 51 },
      {
        description:
          'Daenerys Stormborn of the House Targaryen, First of Her Name,...and Mother of Dragons',
        id: 52
      }
    ]
  }
];

const selectedTagCategory = { description: 'animal', id: 1 };
const selectedTagValue = { description: 'duck', id: 1 };
const assignedTags = [
  {
    description: 'Name',
    id: 1,
    values: [{ description: 'Pepa', id: 11 }]
  }
];

const onChange = jest.fn();
const onDelete = jest.fn();

describe('Tagging component without redux mapping', () => {
  it('match snapshot', () => {
    const component = shallow(
      <Tagging
        tags={tags}
        assignedTags={assignedTags}
        onTagValueChange={onChange}
        onTagMultiValueChange={onChange}
        onTagCategoryChange={onChange}
        onTagDeleteClick={onDelete}
        selectedTagCategory={selectedTagCategory}
        selectedTagValue={selectedTagValue}
      />
    );
    const tree = toJson(component);
    expect(tree).toMatchSnapshot();
  });

  it('should call methods', () => {
    const onTagCategoryChange = jest.fn();
    const onTagValueChange = jest.fn();
    const onTagDeleteClick = jest.fn();
    const onTagMultiValueChange = jest.fn();
    const wrapper = shallow(
      <Tagging
        tags={tags}
        assignedTags={assignedTags}
        onTagValueChange={onTagValueChange}
        onTagMultiValueChange={onTagMultiValueChange}
        onTagCategoryChange={onTagCategoryChange}
        onTagDeleteClick={onTagDeleteClick}
        selectedTagCategory={selectedTagCategory}
        selectedTagValue={selectedTagValue}
      />
    );
    wrapper.instance().onTagCategoryChange('xaxa');
    expect(onTagCategoryChange.mock.calls).toHaveLength(1);
    wrapper.instance().onTagValueChange('wawa');
    expect(onTagCategoryChange.mock.calls).toHaveLength(1);
    wrapper.instance().onTagDeleteClick('wowo');
    expect(onTagCategoryChange.mock.calls).toHaveLength(1);
  });
});
