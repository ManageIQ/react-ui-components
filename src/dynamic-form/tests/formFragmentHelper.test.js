import { getRegisteredValues } from '../';

describe('Get registered input values', () => {
  let formValues = {};
  let formApi = {};
  const getRegisteredFields = jest.fn();
  beforeEach(() => {
    formValues = {
      visibleInput: 'visible value',
      hiddenInput: 'hidden values',
      visibleInput2: 'visible value 2',
    };

    getRegisteredFields.mockReturnValue(['visibleInput', 'visibleInput2']);
    formApi = {
      getRegisteredFields,
    };
  });

  it('Should return object property with only visible values', () => {
    const expectedValues = {
      values: formValues,
      registeredValues: {
        visibleInput: 'visible value',
        visibleInput2: 'visible value 2',
      },
      formApi,
    };

    expect(getRegisteredValues(formValues, formApi)).toEqual(expectedValues);
  });
});
