import {
  LOAD_DATA,
  SELECT_USERS,
  FETCH_DATA,
  FETCH_SUCESFULL,
  REQUEST_FAILED,
  SAVE_USER,
  STORE_GROUPS,
} from '../actions/actionTypes';

const usersReducer = (state = { isLoaded: false, isFetching: false, isValid: true }, action) => {
  let newState = {};
  switch (action.type) {
    case FETCH_SUCESFULL:
      return { ...state, isFetching: false, isValid: true };
    case REQUEST_FAILED:
      return { ...state, isFetching: false, isValid: false };
    case FETCH_DATA:
    case SAVE_USER:
      return { ...state, isFetching: true };
    case LOAD_DATA:
      newState = {
        ...state,
        rows: [...action.data.rows],
        columns: action.data.columns || { ...state.columns },
        isLoaded: true,
        isFetching: false,
        isValid: true,
      };
      return { ...newState };
    case SELECT_USERS:
      return { ...state, selectedUsers: action.selectedUsers };
    case STORE_GROUPS:
      return { ...state, groups: action.groups };
    default:
      return { ...state };
  }
};

export default usersReducer;
