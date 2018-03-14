import * as ExpActions from '../actions';

test('Example actions should be defined', () => {
  expect(ExpActions.someAction).toBeDefined();
  expect(ExpActions.otherAction).toBeDefined();
  expect(ExpActions.SOME_ACTION).toBeDefined();
  expect(ExpActions.OTHER_ACTION).toBeDefined();
  expect(ExpActions.someActionToReducer).toBeDefined();
  expect(ExpActions.otherActionToReducer).toBeDefined();
});

test('Example actions should have correct values', () => {
  expect(ExpActions.SOME_ACTION).toBe('UI-COMPONENTS_SOME_ACTION');
  expect(ExpActions.OTHER_ACTION).toBe('UI-COMPONENTS_OTHER_ACTION');
});

test('Example actions should have correct maping', () => {
  expect(ExpActions.someActionToReducer[ExpActions.SOME_ACTION]).toBeDefined();
});

test('Example actions should have correct maping', () => {
  expect(ExpActions.otherActionToReducer[ExpActions.OTHER_ACTION]).toBeDefined();
});

describe('Example actions should call correct reducers', () => {
  test('someAction', () => {
    expect(ExpActions.someAction('some value')).toEqual({
      type: ExpActions.SOME_ACTION,
      data: 'some value',
    });
  });

  test('otherAction', () => {
    expect(ExpActions.otherAction('some value')).toEqual({
      type: ExpActions.OTHER_ACTION,
      data: 'some value',
    });
  });
});

describe('Action function should return correct data', () => {
  test('someAction', () => {
    const differentState = ExpActions.someActionToReducer[ExpActions.SOME_ACTION]({}, { data: 'some data' });
    expect(differentState).toEqual({ someValue: 'some data' });
  });

  test('otherAction', () => {
    const differentState = ExpActions.otherActionToReducer[ExpActions.OTHER_ACTION]({}, { data: 'some data' });
    expect(differentState).toEqual({ otherValue: 'some data' });
  });
});
