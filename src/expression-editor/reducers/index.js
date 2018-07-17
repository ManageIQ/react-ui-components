import { combineReducers } from 'redux';
import { onChange as selected, steps, next, options } from './reducers';

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

export default ExpressionEditorReducers;
