import { push } from 'connected-react-router';
import {
  LOAD_DATA,
  SELECT_USERS,
  SAVE_USER,
  FETCH_DATA,
  FETCH_SUCESFULL,
  REQUEST_FAILED,
  DELETE_USER,
} from './actionTypes';

export const navigate = where => dispatch => dispatch(push(where));

export const loadUsersData = data => ({
  type: LOAD_DATA,
  data,
});

export const selectUsers = users => ({
  type: SELECT_USERS,
  selectedUsers: users,
});

const fetchData = type => ({
  type,
});

const fetchSucesfull = () => ({
  type: FETCH_SUCESFULL,
});

const fetchFailed = () => ({
  type: REQUEST_FAILED,
});

export const requestUsers = callBack => (dispatch) => {
  dispatch(fetchData(FETCH_DATA));
  return callBack()
    .then(data => dispatch(loadUsersData(data)))
    .then(() => dispatch(fetchSucesfull()));
};

export const saveUser = (user, callBack) => (dispatch) => {
  dispatch(fetchData(SAVE_USER));
  return callBack(user)
    .then(users => dispatch(loadUsersData(users)))
    .then(() => dispatch(fetchSucesfull))
    .then(() => dispatch(navigate('/')))
    .catch(() => dispatch(fetchFailed));
};

export const deleteUser = (userId, callBack) => (dispatch) => {
  dispatch(fetchData(DELETE_USER));
  return callBack(userId)
    .then(users => dispatch(loadUsersData(users)))
    .then(() => dispatch(fetchSucesfull))
    .then(() => dispatch(navigate('/')))
    .catch(() => dispatch(fetchFailed));
};
