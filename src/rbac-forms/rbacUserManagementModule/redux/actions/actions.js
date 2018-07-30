import { push } from 'connected-react-router';
import {
  LOAD_DATA,
  SELECT_USERS,
  SAVE_USER,
  FETCH_DATA,
  FETCH_SUCESFULL,
  REQUEST_FAILED,
  DELETE_USER,
  LOAD_GROUPS,
  STORE_GROUPS,
  EDIT_USER,
} from './actionTypes';

const columns = [{
  property: 'name',
  label: 'Full Name',
}, {
  property: 'userid',
  label: 'Username',
}, {
  property: 'email',
  label: 'E-mail',
}, {
  property: 'current_group',
  label: 'Current Group',
}, {
  property: 'role',
  label: 'Role',
}, {
  property: 'lastlogon',
  label: 'Last Logon',
}, {
  property: 'lastlogoff',
  label: 'Last Logoff',
}];

export const navigate = where => (dispatch, getState) => {
  const { pathname } = getState().router.location;
  if (pathname !== where) {
    dispatch(push(where));
  }
};

export const loadUsersData = data => ({
  type: LOAD_DATA,
  data,
});

export const storeUserGroups = groups => ({
  type: STORE_GROUPS,
  groups,
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
    .then(data => data.resources.map(item => ({
      ...item,
      current_group: {
        label: item.current_group.description,
        onClick: () => console.log('current group click: ', item.current_group),
      },
      role: {
        label: item.current_group.miq_user_role.name,
        onClick: () => console.log('role click: ', item.current_group.miq_user_role),
      },
      groups: item.miq_groups.map(group => ({
        label: group.description,
        icon: 'group',
        groupId: group.id,
        value: group.id,
        onClick: () => console.log('one of many groups: ', group),
      })),
    })))
    .then(data => dispatch(loadUsersData({ rows: data, columns })))
    .then(() => dispatch(fetchSucesfull()));
};

export const saveUser = (user, callBackSave, callBackFind, callBackUpdateTree) => (dispatch) => {
  dispatch(fetchData(SAVE_USER));
  return callBackSave(user)
    .then(() => dispatch(requestUsers(callBackFind)))
    .then(() => dispatch(callBackUpdateTree))
    .then(() => dispatch(navigate('/')))
    .catch(() => dispatch(fetchFailed));
};

export const deleteUser = (userId, callBack, callBackFind, callBackUpdateTree) => (dispatch) => {
  dispatch(fetchData(DELETE_USER));
  return callBack(userId)
    .then(() => dispatch(requestUsers(callBackFind)))
    .then(() => dispatch(callBackUpdateTree))
    .catch(() => dispatch(fetchFailed));
};

export const editUser = (user, userId, callBackEdit, callBackFind, callBackUpdateTree) => (dispatch) => {
  dispatch(fetchData(EDIT_USER));
  return callBackEdit(user, userId)
    .then(() => dispatch(requestUsers(callBackFind)))
    .then(() => dispatch(callBackUpdateTree))
    .catch(() => dispatch(fetchFailed));
};

export const loadGroups = callBack => (dispatch) => {
  dispatch(fetchData(LOAD_GROUPS));
  return callBack()
    .then(data => data.resources)
    .then(groups => groups.map(group => ({
      label: group.description,
      value: group.id,
    })))
    .then(groups => dispatch(storeUserGroups(groups)))
    .then(() => dispatch(fetchSucesfull))
    .catch(() => dispatch(fetchFailed));
};
