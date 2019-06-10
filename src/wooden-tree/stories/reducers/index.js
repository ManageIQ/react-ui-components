import { combineReducers } from 'redux';
import { treeDataReducer as treeData } from '../../';

export const combinedReducers = combineReducers({ treeData });

export default combinedReducers;
