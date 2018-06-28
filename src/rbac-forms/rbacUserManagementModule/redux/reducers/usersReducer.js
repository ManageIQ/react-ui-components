import {
  LOAD_DATA,
  SELECT_USERS,
  FETCH_DATA,
  FETCH_SUCESFULL,
  REQUEST_FAILED,
} from '../actions/actionTypes';

const usersReducer = (state = { isLoaded: false, isFetching: false, isValid: true }, action) => {
  switch (action.type) {
    case FETCH_SUCESFULL:
      return { ...state, isFetching: false, isValid: true };
    case REQUEST_FAILED:
      return { ...state, isFetching: false, isValid: false };
    case FETCH_DATA:
      return { ...state, isFetching: true };
    case LOAD_DATA:
      return {
        ...action.data,
        isLoaded: true,
        isFetching: false,
        isValid: true,
      };
    case SELECT_USERS:
      return { ...state, selectedUsers: action.selectedUsers };
    default:
      return { ...state };
  }
};

export default usersReducer;
