import * as actionsConstants from '../actions/actions';
import { initialState, userInputMock } from './initialState'


export const expressions = (state = {expressions: [[]]}, {type, selected, previous, expression}) => {
  let newExpressions = [[]];
  switch (type) {
    case actionsConstants.ON_SUBMIT:
      console.log('REDUCER ON SUBMIT:', state.expressions, selected, previous, expression);
      newExpressions = calculateSubmit([...state.expressions], selected, previous, expression);
      return { ...state, expressions: [...newExpressions]};
    case actionsConstants.ON_DELETE:
      console.log('REDUCER ON DELETE:', selected, expression);
      newExpressions = calculateDelete([...state.expressions], selected, expression);
      return { ...state, expressions: [...newExpressions]};
    case actionsConstants.ON_CLICK:
      console.log('REDUCER ON CLICK:', selected, expression);
      newExpressions = calculateClick([...state.expressions], selected, expression);
      return { ...state, expressions: [...newExpressions]};
    case actionsConstants.ON_FOCUS:
      console.log('REDUCER ON FOCUS:', selected, expression);
      newExpressions = calculateFocus([...state.expressions], selected, expression);
      return { ...state, expressions: [...newExpressions]};
    case actionsConstants.ON_BLUR:
      console.log('REDUCER ON BLUR:', selected, expression);
      newExpressions = calculateBlur([...state.expressions], selected, expression);
      return { ...state, expressions: [...newExpressions]};
    default:
      return state;
  }
};




export const onChange = (state = [], action) => {
  // console.log('REDUCER ON CHANGE ', action, state);
  switch (action.type) {
    case actionsConstants.ON_CHANGE:
      return action.selected;
    default:
      return state;
  }
};

export const steps = (state = initialState.steps) => state;
export const next = (state = initialState.next, action) => {
  // console.log("REDUCER NEXT", state, action);
  switch (action.type) {
    case actionsConstants.CALCULATE_NEXT:
      return (action.selected[action.selected.length-1] && action.selected[action.selected.length-1].next) || null;
    default:
      return state;
  }
}

export const options = (state = null ) => state;



const calculateSubmit = (state, selected, previous, expression) => {
  let newState = [...state];
  const expressionIndex = state.indexOf(expression);
  let filteredExpression = [...expression.filter((exp) => (exp.term.id !== userInputMock[0].id))];
  // find flags
  const selectedTerm = filteredExpression.find((exp) => (exp.term === selected));
  const selectedFlags = selectedTerm && selectedTerm.flags;
  let index = filteredExpression.map(e => e.term.id).indexOf(selected.id);
  if (index >= 0) {
    filteredExpression = filteredExpression.slice(0, index);
  } else {
    index = filteredExpression.map(e => e.term.id).indexOf(previous.id);
    if (index >= 0) {
      filteredExpression = filteredExpression.slice(0, index);
    }
  }
  const flags = { ...selectedFlags, isEditing: false };
  filteredExpression.push({term: selected, flags: flags});
  //this.setState({expression: [...expression, selected, {...userInputMock[0], next: selected.next, parent: selected}]});
  state.splice(expressionIndex, 1, filteredExpression);
  const lastExpression = state[state.length-1] || [];
  // console.log(lastExpression);
  const lastTerm = lastExpression[lastExpression.length-1] || {term: {next: ["meaningless not empty value"]}};
  // console.log(lastTerm);
  const lastExpressionIsCompleted = (lastTerm.term.next.length === 0);
  // console.log("SUBMIT", selected);
  if (selected.next.length === 0 && lastExpressionIsCompleted) {
    state = [...state, []]
  }
  return state;
}

const calculateDelete = (state, selected, expression) => {
  const expressionIndex = state.indexOf(expression);
  const filteredExpression = expression.filter((exp) => (exp.term.id !== selected.id));
  if (filteredExpression.length === 0) {
    state.splice(expressionIndex, 1, filteredExpression);
  } else {
    state.splice(expressionIndex, 1, filteredExpression);
  }
  cleanLastExpression(state, selected);
  return [...state];
}

const calculateClick = (state, selected, expression) => {
  // const selectedExp = this.state.expression.find((exp) => (exp.term.id === selected.id));
  const expressionIndex = state.indexOf(expression);
  const selectedTerm = expression.find((exp) => (exp.term === selected));

  selectedTerm.flags.isEditing = !selectedTerm.flags.isEditing;;
  //const expression = this.state.expression.filter((exp) => (exp.id !== selected.id));
  // console.log('mock onclick', selected, expression, this.state.expression);
  state.splice(expressionIndex, 1, expression);
  // console.log('CLICK', selected, state);
  cleanLastExpression(state, selected);
  return [...state];
}

const calculateFocus = (state, selected, expression) => {
  // const selectedExp = this.state.expression.find((exp) => (exp.term.id === selected.id));
  const expressionIndex = state.indexOf(expression);
  const selectedTerm = expression.find((exp) => (exp.term === selected));

  selectedTerm.flags.isFocused = true;
  //const expression = this.state.expression.filter((exp) => (exp.id !== selected.id));
  // console.log('mock onclick', selected, expression, this.state.expression);
  // state.splice(expressionIndex, 1, expression);
  // console.log(state);
  return [...state];
}

const calculateBlur = (state, selected, expression) => {
  const expressionIndex = state.indexOf(expression);
  const selectedTerm = expression.find((exp) => (exp.term === selected));
  // console.log(state, expression, selectedTerm);
  if (selectedTerm === undefined) {
    return [...state];
  } else {
    selectedTerm.flags.isFocused = false;
    state.splice(expressionIndex, 1, expression);
    return [...state];
  }
}

const cleanLastExpression = (state, selected) => {
  if (selected.next.length === 0 && state[state.length-1].length === 0) {
    state.splice(state.length-1,1);
  }
}
