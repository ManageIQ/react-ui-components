import { duplicateArray } from '../utils';

describe('Duplicate array utility function', () => {
  let demoArray;
  beforeEach(() => {
    demoArray = [{
      id: 1,
      value: 'foo 1',
    }, {
      id: 2,
      value: 'foo 2',
    }, {
      id: 3,
      value: 'foo 3',
    }, {
      id: 4,
      value: 'foo 4',
    }, {
      id: 5,
      value: 'foo 5',
    }, {
      id: 6,
      value: 'foo 6',
    }];
  });

  it('should duplicate array without any modification', () => {
    const expectedResult = JSON.stringify(demoArray);
    expect(JSON.stringify(duplicateArray(demoArray))).toEqual(expectedResult);
  });

  it('should duplicate array and modify all its items', () => {
    const expectedResult = JSON.stringify(demoArray.map(item => ({
      ...item,
      newValue: item.value.trim(),
    })));
    expect(JSON.stringify(duplicateArray(demoArray, item => ({ ...item, newValue: item.value.trim() })))).toEqual(expectedResult);
  });
});
