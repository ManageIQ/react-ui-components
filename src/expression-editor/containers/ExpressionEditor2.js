import { connect, Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import { onChange, calculateNext, onSubmit, onDelete, onClick, onFocus, onBlur, isLastElement,
  onInsert, onDeleteExpression, countParentheses, blurAllChips, setAlias, undo, redo, clearFlags } from '../actions';
import ExpressionEditor from '../components/ExpressionEditor2';
import { dataProvider } from './DataProvider';
import ExpressionEditorReducers from '../reducers/'

const mapStateToProps = ( { expressionEditor }) => {
  return {
  canUndo: !!(expressionEditor.expressions.past && expressionEditor.expressions.past.length > 0),
  canRedo: !!(expressionEditor.expressions.future && expressionEditor.expressions.future.length > 0),
  expressions: expressionEditor.expressions.present.expressions,
  isLastElement: expressionEditor.isLastElement,
  parenthesesCount:  expressionEditor.expressions.present.parenthesesCount
}};

const mapDispatchToProps = dispatch => ({

  onDelete: (selected, expressionIndex, chipIndex) => {
    dispatch(onBlur(selected, expressionIndex, chipIndex));
    dispatch(onDelete(selected, expressionIndex, chipIndex));
    dispatch(countParentheses());
  },

  onClick: (selected, expressionIndex, chipIndex) => {
    dispatch(onClick(selected, expressionIndex, chipIndex));
  },

  onFocus: (selected, expressionIndex, chipIndex) => {
    dispatch(onFocus(selected, expressionIndex, chipIndex));
  },

  onBlur: (selected, expressionIndex, chipIndex) => {
    dispatch(onBlur(selected, expressionIndex, chipIndex));
  },

  blurAllChips: () => {
    dispatch(blurAllChips());
  },

  onInsert: (previousExpressionIndex) => {
    dispatch(onInsert(previousExpressionIndex));
  },

  onDeleteExpression: (expressionIndex) => {
    dispatch(onDeleteExpression(expressionIndex));
  },

  onSubmit: (selected, previous, expressionIndex) => {
    dispatch(isLastElement(selected));
    dispatch(onSubmit(selected, previous, expressionIndex));
    dispatch(countParentheses());

  },

  setAlias: (alias, expressionIndex, chipIndex) => {
    dispatch(setAlias(alias, expressionIndex, chipIndex));
  },

  undo: (action) => {
    dispatch(undo());
    dispatch(clearFlags());
  },

  redo: (action) => {
    dispatch(redo());
    dispatch(clearFlags());
  },
});

const ExpressionEditorConnected2 = connect(
  mapStateToProps,
  mapDispatchToProps,
)(dataProvider()(ExpressionEditor));

const store = createStore(combineReducers({...ExpressionEditorReducers}));
const ExpressionEditorWithRedux = (props) => (<Provider store={store}><ExpressionEditorConnected2 {...props}/></Provider>)

export { ExpressionEditorConnected2, ExpressionEditorWithRedux };
