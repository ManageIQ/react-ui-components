import * as actionsConstants from '../actions/actions';

export const expressions = (state = {expressions: [[]], parenthesesCount: {left: 0, right: 0}}, {type, target, next, selected, previous, expressionIndex, previousExpressionIndex, chipIndex, alias}) => {
  let newExpressions = [[]];
  switch (type) {
    case actionsConstants.ON_SUBMIT:
      newExpressions = calculateSubmit([...state.expressions], selected, previous, expressionIndex);
      return { ...state, expressions: [...newExpressions], lastSubmited: selected, lastSubmitedExpressionIndex: expressionIndex};
    case actionsConstants.ON_INSERT:
      newExpressions = calculateInsert([...state.expressions], previousExpressionIndex);
      return { ...state, expressions: [...newExpressions]};
    case actionsConstants.ON_DELETE_EXPRESSION:
      newExpressions = calculateExpressionDelete([...state.expressions], expressionIndex);
      return { ...state, expressions: [...newExpressions]};
    case actionsConstants.ON_DELETE:
      newExpressions = calculateDelete([...state.expressions], selected, expressionIndex, chipIndex);
      return { ...state, expressions: [...newExpressions]};
    case actionsConstants.ON_CLICK:
      newExpressions = calculateClick([...state.expressions], selected, expressionIndex, chipIndex);
      return { ...state, expressions: [...newExpressions]};
    case actionsConstants.ON_FOCUS:
      newExpressions = calculateFocus([...state.expressions], selected, expressionIndex, chipIndex);
      return { ...state, expressions: [...newExpressions]};
    case actionsConstants.ON_BLUR:
      newExpressions = calculateBlur([...state.expressions], selected, expressionIndex, chipIndex);
      return { ...state, expressions: [...newExpressions]};
    case actionsConstants.BLUR_ALL_CHIPS:
      newExpressions = blurAllChips([...state.expressions]);
      return { ...state, expressions: [...newExpressions]};
    case actionsConstants.SET_ALIAS:
      newExpressions = setAlias([...state.expressions], alias, expressionIndex, chipIndex);
      return { ...state, expressions: [...newExpressions]};
    case actionsConstants.CLEAR_FLAGS:
      newExpressions = clearFlags([...state.expressions]);
    case actionsConstants.COUNT_PARENTHESES:
      const newParenthesesCount = countParentheses({...state.parenthesesCount}, state.expressions);
      return {...state, parenthesesCount: newParenthesesCount};
    default:
      return state;
  }
};

export const setLoading = (state = false, action) => {
  return (action.type === actionsConstants.SET_LOADING
    ? action.isLoading
    : state);
}

export const isLastElement = (state = false, {selected, type}) => (
   type === actionsConstants.IS_LAST_ELEMENT
    ? selected.next.length === 0 && selected.type !== "operator"
    : state
)

const setAlias = (state, alias, expressionIndex, chipIndex) => {
  const expression = [...state[expressionIndex]];
  const selectedTerm = expression[chipIndex];
  expression.splice(chipIndex, 1, {term: selectedTerm.term, flags: {...selectedTerm.flags,  isEditing: false,
    isFocused: false, alias: alias}});
  state.splice(expressionIndex, 1, expression);

  return [...state];
}

const countParentheses = (state = {left: 0, right: 0}, expressions) => ({
    left: expressions.map(e => e.filter(t => t.term.type === "leftParenteze")).flat().length,
    right: expressions.map(e => e.filter(t => t.term.type === "rightParenteze")).flat().length
  })

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
  console.log('COPLETED', lastExpressionCompleted(state));
  console.log('SUBMIT', expression);
  if (selected.next.length === 0) {
    const a = state[expressionIndex+1];
    // edit
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

const blurAllChips = (state) => (
    state.map(e => e.map(t => {t.flags.isFocused = false; return t}))
)

const clearFlags = (state) => (
    state.map(e => e.map(t => ({ ...t, flags: {
        isFocused: false,
        isEditing: false
      }})))
)

const cleanLastExpression = (state, selected) => {
  if (selected.next.length === 0 && state[state.length-1].length === 0) {
    state.splice(state.length-1,1);
  }
}

const lastExpressionCompleted = (state) => {
  const lastExpression = state[state.length-1] || [];
  const lastTerm = lastExpression[lastExpression.length-1] || {term: {next: ["meaningless not empty value which is not ever displayed"]}};
  console.log(lastExpression, lastTerm);
  return lastTerm.term.next.length === 0;
}
