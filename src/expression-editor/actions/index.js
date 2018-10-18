import * as actions from './actions';

export const onSubmit = (selected, previous, expressionIndex) => ({
  type: actions.ON_SUBMIT,
  selected: selected,
  previous: previous,
  expressionIndex: expressionIndex,
});

export const onDelete = (selected, expressionIndex) => ({
  type: actions.ON_DELETE,
  selected: selected,
  expressionIndex: expressionIndex,
});

export const onClick = (selected, expressionIndex) => ({
  type: actions.ON_CLICK,
  selected: selected,
  expressionIndex: expressionIndex,
});

export const onFocus = (selected, expressionIndex) => ({
  type: actions.ON_FOCUS,
  selected: selected,
  expressionIndex: expressionIndex,
});

export const onBlur = (selected, expressionIndex) => ({
  type: actions.ON_BLUR,
  selected: selected,
  expressionIndex: expressionIndex,
});

export const calculateNext = selected => ({
  type: actions.CALCULATE_NEXT,
  selected: selected,
});

export const isLastElement = selected => ({
  type: actions.IS_LAST_ELEMENT,
  selected: selected,
});




export const onChange = selected => ({
  type: actions.ON_CHANGE,
  selected: selected.selected,
});
