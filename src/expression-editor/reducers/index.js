import { combineReducers } from 'redux';
import { onChange as selected, expressions, steps, next, options } from './reducers';
/*
old code
const combinedReducers = combineReducers({
  steps,
  selected,
  next,
  options
});

function ExpressionEditorReducers(state = {}, action) {
  const appState = {...state.expressionEditor}
  console.log('combineReducers', appState, action);
  return { expressionEditor: combinedReducers(appState, action)};
}
*/
const combinedReducers = combineReducers({
  expressions,
  options
});

function ExpressionEditorReducers(state = {}, action) {
  const appState = {...state.expressionEditor}
  // console.log('combineReducers', appState, action);
  return { expressionEditor: combinedReducers(appState, action)};
}

export default combineReducers({
  expressions,
  options
});
