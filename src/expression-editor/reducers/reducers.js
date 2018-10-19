import * as actionsConstants from '../actions/actions';
// import { initialState, userInputMock } from './initialState'


export const expressions = (state = {expressions: [[]]}, {type, selected, previous, expressionIndex, previousExpressionIndex}) => {
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
    case actionsConstants.ON_DELETE:
      console.log('REDUCER ON DELETE:', selected, expressionIndex);
      newExpressions = calculateDelete([...state.expressions], selected, expressionIndex);
      return { ...state, expressions: [...newExpressions]};
    case actionsConstants.ON_CLICK:
      console.log('REDUCER ON CLICK:', selected, expressionIndex);
      newExpressions = calculateClick([...state.expressions], selected, expressionIndex);
      return { ...state, expressions: [...newExpressions]};
    case actionsConstants.ON_FOCUS:
      console.log('REDUCER ON FOCUS:', selected, expressionIndex);
      newExpressions = calculateFocus([...state.expressions], selected, expressionIndex);
      return { ...state, expressions: [...newExpressions]};
    case actionsConstants.ON_BLUR:
      console.log('REDUCER ON BLUR:', selected, expressionIndex);
      newExpressions = calculateBlur([...state.expressions], selected, expressionIndex);
      return { ...state, expressions: [...newExpressions]};
    default:
      return state;
  }
};

export const next = (state = null) => (state)

export const isLastElement = (state = false, {selected, type}) => {
  switch (type) {
    case actionsConstants.IS_LAST_ELEMENT:
    return selected.next.length === 0 && selected.type !== "operator";
    default:
    return state;
  }
}



const calculateSubmit = (state, selected, previous, expressionIndex) => {
  let newState = [...state];
  // const expressionIndex = state.indexOf(expression);
  let expression = [...state[expressionIndex]];
  // avoid double submit, should be handled elsewhere
  // if (selected.id === (expression[expression.length-1] && expression[expression.length-1].term && expression[expression.length-1].term.id)) {
    // console.log('AAAAAAAA', expression);
    // return state;
  // }

  // let filteredExpression = [...expression.filter((exp) => (exp.term.id !== userInputMock[0].id))];
  // find flags
  const selectedTerm = expression.find((exp) => (exp.term.id === selected.id));
  const termIndex = expression.findIndex((exp) => (exp.term.id === selected.id));
  const selectedFlags = selectedTerm && selectedTerm.flags;
  // let index = expression.map(e => e.term.id).indexOf(selected.id);
  // console.log('CALC SUBMIT', index);
  // same selection as before
  if (selected.id === previous.id) {
    // expression = expression.slice(0, index);
    console.log('SUBMIT', expression, selected, selectedTerm);
    expression.splice(termIndex, 1, {term: selectedTerm.term, flags: {...selectedFlags, isEditing: false, isFocused: false}})
  } else {
    const indexOfPrevious = expression.map(e => e.term.id).indexOf(previous.id);
    if (indexOfPrevious >= 0) {
      expression = expression.slice(0, indexOfPrevious);
    }
    expression.push({term: selected, flags: { ...selectedFlags, isEditing: false }});
  }
  // const flags = { ...selectedFlags, isEditing: false };
  // expression.push({term: selected, flags: flags});
  //this.setState({expression: [...expression, selected, {...userInputMock[0], next: selected.next, parent: selected}]});
  state.splice(expressionIndex, 1, expression);
  // console.log(state);
  if (selected.next.length === 0) {
    state.splice(expressionIndex + 1, 0, []);
    // console.log('AAAA', state);
    // state = [...state, []]
  }

  return state;
}

const calculateInsert = (state, previousExpressionIndex) => {
  state.splice(previousExpressionIndex, 0, []);
  return [...state];

}

const calculateDelete = (state, selected, expressionIndex) => {
  // const expressionIndex = state.indexOf(expression);
  const expression = [...state[expressionIndex]];
  const filteredExpression = expression.filter((exp) => (exp.term.id !== selected.id));
  if (filteredExpression.length === 0) {
    state.splice(expressionIndex, 1, filteredExpression);
  } else {
    state.splice(expressionIndex, 1, filteredExpression);
  }
  cleanLastExpression(state, selected);
  return [...state];
}

const calculateClick = (state, selected, expressionIndex) => {
  // const selectedExp = this.state.expression.find((exp) => (exp.term.id === selected.id));
  // const expressionIndex = state.indexOf(expression);
  const expression = [...state[expressionIndex]];
  const selectedTerm = expression.find((exp) => (exp.term.id === selected.id));
  const termIndex = expression.findIndex((exp) => (exp.term.id === selected.id));
  expression.splice(termIndex, 1, {term: selectedTerm.term, flags: {...selectedTerm.flags, isEditing: !selectedTerm.flags.isEditing}});

  //const expression = this.state.expression.filter((exp) => (exp.id !== selected.id));
  // console.log('mock onclick', selected, expression, this.state.expression);
  state.splice(expressionIndex, 1, expression);
  // console.log('CLICK', selected, state);
  cleanLastExpression(state, selected);
  return [...state];
}

const calculateFocus = (state, selected, expressionIndex) => {
  // const selectedExp = this.state.expression.find((exp) => (exp.term.id === selected.id));
  // const expressionIndex = state.indexOf(expression);
  // expression.map(e => e.flags = {...e.flags, isFocused: false})
  const expression = [...state[expressionIndex]];

  const selectedTerm = expression.find((exp) => (exp.term.id === selected.id));
  const termIndex = expression.findIndex((exp) => (exp.term.id === selected.id));
  expression.splice(termIndex, 1, {term: selectedTerm.term, flags: {...selectedTerm.flags, isFocused: true}});
  state.splice(expressionIndex, 1, expression);
  // selectedTerm.flags.isFocused = true;
  //const expression = this.state.expression.filter((exp) => (exp.id !== selected.id));
  // console.log('mock onclick', selected, expression, this.state.expression);
  // state.splice(expressionIndex, 1, expression);
  // console.log(state);
  return [...state];
}

const calculateBlur = (state, selected, expressionIndex) => {
  // const expressionIndex = state.indexOf(expression);
  const expression = [...state[expressionIndex]];
  const selectedTerm = expression.find((exp) => (exp.term.id === selected.id));
  // console.log(state, expression, selectedTerm);
  if (selectedTerm === undefined) {
    return [...state];
  } else {
    const termIndex = expression.findIndex((exp) => (exp.term.id === selected.id));
    expression.splice(termIndex, 1, {term: selectedTerm.term, flags: {...selectedTerm.flags, isFocused: false}});
    // selectedTerm.flags.isFocused = false;
    state.splice(expressionIndex, 1, expression);
    return [...state];
  }
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
