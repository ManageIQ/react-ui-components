import { connect } from 'react-redux';
import { onChange, calculateNext, onSubmit, onDelete, onClick, onFocus, onBlur, isLastElement,
  onInsert, onDeleteExpression, countParentheses, blurAllChips, setAlias, undo, redo, clearFlags } from '../actions';
import ExpressionEditor from '../components/ExpressionEditor2';
import { dataProvider } from './DataProvider';

const mapStateToProps = (state) => {
  console.log('state: ', state, state.expressions.past );
  return {
  // actions which have been done since loeaded
  canUndo: !!(state.expressions.past && state.expressions.past.length > 0),
  canRedo: !!(state.expressions.future && state.expressions.future.length > 0),
  expressions: state.expressions.present.expressions,
  // data for next dropdown
  // next: expressionEditor.next,
  // selected: expressionEditor.selected,
  next: state.next,
  isLastElement: state.isLastElement,
  parenthesesCount:  state.expressions.present.parenthesesCount
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
    // dispatch(onBlur(selected, expressionIndex));
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
)(dataProvider({foo: 'foo'})(ExpressionEditor));
// console.log(dataProvider);

export { ExpressionEditorConnected2 };
