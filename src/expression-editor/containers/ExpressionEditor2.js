import { connect } from 'react-redux';
import { onChange, calculateNext, onSubmit, onDelete, onClick, onFocus, onBlur, isLastElement, onInsert, onDeleteExpression, countParentheses } from '../actions';
import ExpressionEditor from '../components/ExpressionEditor2';
import { dataProvider } from './DataProvider';

const mapStateToProps = (state) => {
  console.log('state: ', state);
  return {
  // actions which have been done since loeaded
  expressions: state.expressions.expressions,
  // data for next dropdown
  // next: expressionEditor.next,
  // selected: expressionEditor.selected,
  next: state.next,
  isLastElement: state.isLastElement,
  parenthesesCount:  state.expressions.parenthesesCount
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

  undo: (action) => {

  },

  redo: (action) => {

  },
});

const ExpressionEditorConnected2 = connect(
  mapStateToProps,
  mapDispatchToProps,
)(dataProvider({foo: 'foo'})(ExpressionEditor));
// console.log(dataProvider);

export { ExpressionEditorConnected2 };
