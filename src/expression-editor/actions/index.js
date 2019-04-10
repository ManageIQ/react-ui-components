import * as actions from './actions';

export const onSubmit = (selected, previous, expressionIndex) => ({
  type: actions.ON_SUBMIT,
  selected: selected,
  previous: previous,
  expressionIndex: expressionIndex,
});

export const onInsert = (previousExpressionIndex) => ({
  type: actions.ON_INSERT,
  previousExpressionIndex: previousExpressionIndex,
});

export const onDeleteExpression = (expressionIndex) => ({
  type: actions.ON_DELETE_EXPRESSION,
  expressionIndex: expressionIndex,
});


export const onDelete = (selected, expressionIndex, chipIndex) => ({
  chipIndex: chipIndex,
  type: actions.ON_DELETE,
  selected: selected,
  expressionIndex: expressionIndex,
});

export const onClick = (selected, expressionIndex, chipIndex) => ({
  chipIndex: chipIndex,
  type: actions.ON_CLICK,
  selected: selected,
  expressionIndex: expressionIndex,
});

export const onFocus = (selected, expressionIndex, chipIndex) => ({
  chipIndex: chipIndex,
  type: actions.ON_FOCUS,
  selected: selected,
  expressionIndex: expressionIndex,
});

export const onBlur = (selected, expressionIndex, chipIndex) => ({
  chipIndex: chipIndex,
  type: actions.ON_BLUR,
  selected: selected,
  expressionIndex: expressionIndex,
});

export const setAlias = (alias, expressionIndex, chipIndex) => ({
  type: actions.SET_ALIAS,
  chipIndex: chipIndex,
  alias: alias,
  expressionIndex: expressionIndex,
});

export const blurAllChips = (selected, expressionIndex, chipIndex) => ({
  type: actions.BLUR_ALL_CHIPS,
});


export const calculateNext = selected => ({
  type: actions.CALCULATE_NEXT,
  selected: selected,
});

export const isLastElement = selected => ({
  type: actions.IS_LAST_ELEMENT,
  selected: selected,
});

export const countParentheses = () => ({
  type: actions.COUNT_PARENTHESES,
})

export const setLoading = (isLoading) => ({
  isLoading: isLoading,
  type: actions.SET_LOADING,
})

export const undo = () => ({
  type: actions.UNDO,
});

export const redo = () => ({
  type: actions.REDO,
})

export const clearFlags = () => ({
  type: actions.CLEAR_FLAGS,
});

export const reset = () => ({
  type: actions.RESET,
});

export const loadExpression = (expressions) => ({
  type: actions.LOAD_EXPRESSION,
  expressions: expressions
});
