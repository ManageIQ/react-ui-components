import * as actions from './actions';

export const onChange = selected => ({
  type: actions.ON_CHANGE,
  selected: selected.selected,
});

export const calculateNext = selected => ({
  type: actions.CALCULATE_NEXT,
  selected: selected.selected,
});
