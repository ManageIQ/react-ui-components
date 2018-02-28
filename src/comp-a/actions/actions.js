export function someAction(state = {}, action) {
  return Object.assign(state, { someValue: action.data });
}

export function otherAction(state = {}, action) {
  return Object.assign(state, { otherValue: action.data });
}
