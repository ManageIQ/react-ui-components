import { combineReducers } from 'redux';
import { treeDataReducer as treeData } from './treeDataReducer';

export const combinedReducers = combineReducers({ treeData });

export default combinedReducers;
