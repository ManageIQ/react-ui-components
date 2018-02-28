import { SOME_ACTION, OTHER_ACTION } from './types';
import { someAction as typeAction, otherAction as textAction } from './actions';

export * from './types';

export const someAction = data => ({
  type: SOME_ACTION,
  data,
});

export const otherAction = data => ({
  type: OTHER_ACTION,
  data,
});

export const someActionToReducer = {
  [SOME_ACTION]: typeAction,
  // possible other reducers
};

export const otherActionToReducer = {
  [OTHER_ACTION]: textAction,
  // possible other reducers
};
