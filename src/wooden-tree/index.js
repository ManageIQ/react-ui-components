import { Tree } from 'react-wooden-tree';
import './index.scss';

export { default as defaultStore } from './defaultStore';
export { ActionTypes, callBack, Node, treeDataReducer } from 'react-wooden-tree';

class WoodenTreeView extends Tree {}
export default WoodenTreeView;
