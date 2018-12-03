import * as actionsConstants from '../actions/actions';

export const expressions = (state = {expressions: [[]], parenthesesCount: {left: 0, right: 0}}, {type, selected, previous, expressionIndex, previousExpressionIndex, chipIndex, alias}) => {
  let newExpressions = [[]];
  switch (type) {
    case actionsConstants.ON_SUBMIT:
      console.log('REDUCER ON SUBMIT:', state.expressions, selected, previous, expressionIndex);
      newExpressions = calculateSubmit([...state.expressions], selected, previous, expressionIndex);
      return { ...state, expressions: [...newExpressions]};
    case actionsConstants.ON_INSERT:
      console.log('REDUCER ON INSERT:', previousExpressionIndex);
      newExpressions = calculateInsert([...state.expressions], previousExpressionIndex);
      return { ...state, expressions: [...newExpressions]};
    case actionsConstants.ON_DELETE_EXPRESSION:
      console.log('REDUCER ON DELETE EXPRESSION:', expressionIndex);
      newExpressions = calculateExpressionDelete([...state.expressions], expressionIndex);
      return { ...state, expressions: [...newExpressions]};
    case actionsConstants.ON_DELETE:
      console.log('REDUCER ON DELETE:', selected, expressionIndex, chipIndex);
      newExpressions = calculateDelete([...state.expressions], selected, expressionIndex, chipIndex);
      return { ...state, expressions: [...newExpressions]};
    case actionsConstants.ON_CLICK:
      console.log('REDUCER ON CLICK:', selected, expressionIndex, chipIndex);
      newExpressions = calculateClick([...state.expressions], selected, expressionIndex, chipIndex);
      return { ...state, expressions: [...newExpressions]};
    case actionsConstants.ON_FOCUS:
      console.log('REDUCER ON FOCUS:', selected, expressionIndex);
      newExpressions = calculateFocus([...state.expressions], selected, expressionIndex, chipIndex);
      return { ...state, expressions: [...newExpressions]};
    case actionsConstants.ON_BLUR:
      console.log('REDUCER ON BLUR:', selected, expressionIndex);
      newExpressions = calculateBlur([...state.expressions], selected, expressionIndex, chipIndex);
      return { ...state, expressions: [...newExpressions]};
    case actionsConstants.BLUR_ALL_CHIPS:
      console.log('REDUCER ON BLUR ALL CHIPS:');
      newExpressions = blurAllChips([...state.expressions]);
      return { ...state, expressions: [...newExpressions]};
    case actionsConstants.SET_ALIAS:
      console.log('REDUCER ON SET ALIAS:');
      newExpressions = setAlias([...state.expressions], alias, expressionIndex, chipIndex);
      return { ...state, expressions: [...newExpressions]};
    case actionsConstants.CLEAR_FLAGS:
      console.log('REDUCER ON SET CLEAR_FLAGS:');
      newExpressions = clearFlags([...state.expressions]);
      return { ...state, expressions: [...newExpressions]};
    case actionsConstants.COUNT_PARENTHESES:
    console.log('REDUCER ON COUNT:');
      const newParenthesesCount = countParentheses({...state.parenthesesCount}, state.expressions);
      return {...state, parenthesesCount: newParenthesesCount};
    default:
      return state;
  }
};

export const isLastElement = (state = false, {selected, type}) => {
  switch (type) {
    case actionsConstants.IS_LAST_ELEMENT:
    return selected.next.length === 0 && selected.type !== "operator";
    default:
    return state;
  }
}

const setAlias = (state, alias, expressionIndex, chipIndex) => {
  const expression = [...state[expressionIndex]];
  const selectedTerm = expression[chipIndex];
  expression.splice(chipIndex, 1, {term: selectedTerm.term, flags: {...selectedTerm.flags,  isEditing: false,
    isFocused: false, alias: alias}});
  state.splice(expressionIndex, 1, expression);

  return [...state];
}

const countParentheses = (state = {left: 0, right: 0}, expressions) => {
  const newCount = {
    left: expressions.map(e => e.filter(t => t.term.type === "leftParenteze")).flat().length,
    right: expressions.map(e => e.filter(t => t.term.type === "rightParenteze")).flat().length
  }
  return newCount;
}

const calculateSubmit = (state, selected, previous, expressionIndex) => {
  let newState = [...state];
  let expression = [...state[expressionIndex]];
  const selectedTerm = expression.find((exp) => (exp.term.id === selected.id));
  const termIndex = expression.findIndex((exp) => (exp.term.id === selected.id));
  const selectedFlags = selectedTerm && selectedTerm.flags;
  if (selected.id === previous.id) {
    expression.splice(termIndex, 1, {term: selectedTerm.term, flags: {...selectedFlags, isEditing: false, isFocused: false}})
  } else {
    const indexOfPrevious = expression.map(e => e.term.id).indexOf(previous.id);
    if (indexOfPrevious >= 0) {
      expression = expression.slice(0, indexOfPrevious);
    }
    expression.push({term: selected, flags: { ...selectedFlags, isEditing: false }});
  }
  state.splice(expressionIndex, 1, expression);
  if (selected.next.length === 0) {
    const a = state[expressionIndex+1];
    if (a && a[0] && a[0].term.type === expression[0].term.type) {
      state.splice(expressionIndex + 1, 0, []);
    } else if (lastExpressionCompleted(state)) {
    state = [...state, []]
    }
  }

  return state;
}

const calculateInsert = (state, previousExpressionIndex) => {
  state.splice(previousExpressionIndex + 1, 0, []);
  return [...state];

}

const calculateExpressionDelete = (state, expressionIndex) => {
  state.splice(expressionIndex, 1);
  if (state.length === 0) {
    state = [[]];
  }
  return [...state];

}

const calculateDelete = (state, selected, expressionIndex, chipIndex) => {
  let filteredExpression = [...state[expressionIndex]];
  filteredExpression = filteredExpression.slice(0, chipIndex);
  state.splice(expressionIndex, 1, filteredExpression);
  cleanLastExpression(state, selected);
  state = state.filter(e => e.length !== 0)
  if (state.length === 0) {
    state = [[]];
  }
  return [...state];
}

const calculateClick = (state, selected, expressionIndex, chipIndex) => {
  const expression = [...state[expressionIndex]];
  const selectedTerm = expression[chipIndex];
  expression.splice(chipIndex, 1, {term: selectedTerm.term, flags: {...selectedTerm.flags, isEditing: !selectedTerm.flags.isEditing}});

  state.splice(expressionIndex, 1, expression);
  cleanLastExpression(state, selected);
  return [...state];
}

const calculateFocus = (state, selected, expressionIndex, chipIndex) => {
  const newState = state.map(e => e.map(t => {t.flags.isFocused = false; return t}));
  const expression = [...newState[expressionIndex]];

  const selectedTerm = expression[chipIndex];
  expression.splice(chipIndex, 1, {term: selectedTerm.term, flags: {...selectedTerm.flags, isFocused: true}});
  state.splice(expressionIndex, 1, expression);
  return [...state];
}

const calculateBlur = (state, selected, expressionIndex, chipIndex) => {
  const expression = [...state[expressionIndex]];
  const selectedTerm = expression[chipIndex];

  if (selectedTerm === undefined) {
    return [...state];
  } else {
    expression.splice(chipIndex, 1, {term: selectedTerm.term, flags: {...selectedTerm.flags, isFocused: false}});
    state.splice(expressionIndex, 1, expression);
    return [...state];
  }
}

const blurAllChips = (state) => {
    return [...state].map(e => e.map(t => {t.flags.isFocused = false; return t}));
}

const clearFlags = (state) => {
    return [...state].map(e => e.map(t => {t.flags.isFocused = false; t.flags.isEditing = false; return t}));
}

const cleanLastExpression = (state, selected) => {
  if (selected.next.length === 0 && state[state.length-1].length === 0) {
    state.splice(state.length-1,1);
  }
}

const lastExpressionCompleted = (state) => {
  const lastExpression = state[state.length-1] || [];
  const lastTerm = lastExpression[lastExpression.length-1] || {term: {next: ["meaningless not empty value"]}};
  return lastTerm.term.next.length === 0;
}
