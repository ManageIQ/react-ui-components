import * as actionsConstants from '../actions/actions';
import { initialState, userInputMock } from './initialState'


export const expressions = (state = [[]], {type, selected, previous, expression}) => {
  switch (type) {
    case actionsConstants.ON_SUBMIT:
      console.log('REDUCER ON SUBMIT:', selected, previous, expression);
      return calculateSubmit(state, selected, previous, expression);
    case actionsConstants.ON_DELETE:
      console.log('REDUCER ON DELETE:', selected, expression);
      return calculateDelete(state, selected, expression);
    case actionsConstants.ON_CLICK:
      console.log('REDUCER ON CLICK:', selected, expression);
      return calculateClick(state, selected, expression);
    default:
      return state;
  }
};




export const onChange = (state = [], action) => {
  console.log('REDUCER ON CHANGE ', action, state);
  switch (action.type) {
    case actionsConstants.ON_CHANGE:
      return action.selected;
    default:
      return state;
  }
};

export const steps = (state = initialState.steps) => state;
export const next = (state = initialState.next, action) => {
  console.log("REDUCER NEXT", state, action);
  switch (action.type) {
    case actionsConstants.CALCULATE_NEXT:
      return (action.selected[action.selected.length-1] && action.selected[action.selected.length-1].next) || null;
    default:
      return state;
  }
}

export const options = (state = initialState.options ) => state;



const calculateSubmit = (state, selected, previous, expression) => {
  const expressionIndex = state.indexOf(expression);
  let filteredExpression = expression.filter((exp) => (exp.term.id !== userInputMock[0].id));
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
  return [...state];
}

const calculateDelete = (state, selected, expression) => {
  const expressionIndex = state.indexOf(expression);
  const filteredExpression = expression.filter((exp) => (exp.term.id !== selected.id));
  state.splice(expressionIndex, 1, filteredExpression);
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
  return [...state];
}
