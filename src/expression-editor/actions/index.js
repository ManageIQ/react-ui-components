import * as actions from './actions';

export const onSubmit = (selected, previous, expression) => ({
  type: actions.ON_SUBMIT,
  selected: selected,
  previous: previous,
  expression: expression,
});

export const onDelete = (selected, expression) => ({
  type: actions.ON_DELETE,
  selected: selected,
  expression: expression,
});

export const onClick = (selected, expression) => ({
  type: actions.ON_CLICK,
  selected: selected,
  expression: expression,
});

export const onChange = selected => ({
  type: actions.ON_CHANGE,
  selected: selected.selected,
});

export const calculateNext = selected => ({
  type: actions.CALCULATE_NEXT,
  selected: selected.selected,
});
