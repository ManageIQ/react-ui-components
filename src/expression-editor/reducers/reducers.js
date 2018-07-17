import * as actionsConstants from '../actions/actions';
import initialState from './initialState'

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
export const options = (state = null ) => state;
