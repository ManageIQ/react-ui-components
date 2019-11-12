import { Tree, ActionTypes } from 'react-wooden-tree';

const nodeCheckedWithDirty = (propNode, value) => {
  let node = { ...propNode };
  if (!node.state.disabled) {
    if (!Object.hasOwnProperty.call(node.state, 'defaultChecked')) {
      node = {
        ...node,
        state: {
          ...node.state,
          defaultChecked: node.state.checked,
        },
      };
    }
    node = {
      ...Tree.nodeChecked(node, value),
      classes: value !== node.state.defaultChecked ? 'dirty' : undefined,
    };
  }
  return node;
};

const actionMapper = {
  [ActionTypes.EXPANDED]: (state, value, node) => Tree.nodeUpdater(state, Tree.nodeExpanded(node, value)),
  [ActionTypes.DISABLED]: (state, value, node) => Tree.nodeUpdater(state, Tree.nodeDisabled(node, value)),
  [ActionTypes.SELECTED]: (state, value, node) => Tree.nodeUpdater(state, Tree.nodeSelected(node, value)),
  [ActionTypes.CHILD_NODES]: (state, value, node) => Tree.nodeUpdater(state, Tree.nodeChildren(node, value)),
  [ActionTypes.LOADING]: (state, value, node) => Tree.nodeUpdater(state, Tree.nodeLoading(node, value)),
  [ActionTypes.CHECKED]: (state, value, node) => Tree.nodeUpdater(state, nodeCheckedWithDirty(node, value)),
  [ActionTypes.ADD_NODES]: (state, value) => Tree.addNodes(state, value),
};

export default (state = {}, action) => {
  let node;
  if (action.nodeId) {
    node = Tree.nodeSelector(state, action.nodeId);
  }

  return Object.hasOwnProperty.call(actionMapper, action.type) ?
    actionMapper[action.type](state, action.value, node) :
    state;
};
