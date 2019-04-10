import { combineReducers } from 'redux';
import { onChange as selected, expressions, steps, next, options, isLastElement, countParentheses, setLoading } from './reducers';
import * as actionsConstants from '../actions/actions';

const undoableActions = [actionsConstants.ON_SUBMIT, actionsConstants.ON_INSERT,
  actionsConstants.ON_DELETE, actionsConstants.ON_DELETE_EXPRESSION, actionsConstants.SET_ALIAS]

function undoable(reducer) {
  // Call the reducer with empty action to populate the initial state
  const initialState = {
    past: [],
    present: reducer({expressions: [[]], parenthesesCount: {left: 0, right: 0}}, {}),
    future: []
  }
  // Return a reducer that handles undo and redo
  return function(state = initialState, action) {
    const { past, present, future } = state
    switch (action.type) {
      case actionsConstants.UNDO:
        const previous = past[past.length - 1]
        const newPast = past.slice(0, past.length - 1)
        return {
          past: newPast,
          present: previous,
          future: [present, ...future]
        }
      case actionsConstants.REDO:
        const next = future[0]
        const newFuture = future.slice(1)
        return {
          past: [...past, present],
          present: next,
          future: newFuture
        }
      case actionsConstants.RESET:
      const defaultState = past[0] || present;
      return {
        past: [...past, present],
        present: defaultState,
        future: []
      }
      case actionsConstants.LOAD_EXPRESSION:
      // TODO test that this works!!!!!
      return {
        past: [...past],
        present: action.expressions,
        future: []
      }
      default:
        // Delegate handling the action to the passed reducer
        const newPresent = reducer(present, action)
        if (present === newPresent) {
          return state
        }
        if (undoableActions.includes(action.type)) {
          return {
            past: [...past, present],
            present: newPresent,
            future: []
          }
        } else {
          return {
            past: [...past],
            present: newPresent,
            future: [...future]
          }
        }
    }
  }
}
const combinedReducers = combineReducers({
  expressions: undoable(expressions),
  isLastElement,
  isLoading: setLoading,
});

export default { expressionEditor:  combinedReducers };
