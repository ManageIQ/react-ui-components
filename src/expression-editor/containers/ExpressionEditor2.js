import { connect } from 'react-redux';
import { onChange, calculateNext, onSubmit, onDelete, onClick, onFocus, onBlur } from '../actions';
import ExpressionEditor from '../components/ExpressionEditor2';
import { dataProvider } from './DataProvider';

const mapStateToProps = (state) => {
  // console.log('state: ', state.expressions);
  return {
  // actions which have been done since loeaded
  expressions: state.expressions.expressions,
  // data for next dropdown
  // next: expressionEditor.next,
  // selected: expressionEditor.selected,
  next: state.expressions.options
}};

const mapDispatchToProps = dispatch => ({

  onDelete: (selected, expressionIndex) => {
    dispatch(onBlur(selected, expressionIndex));
    dispatch(onDelete(selected, expressionIndex));
  },

  onClick: (selected, expressionIndex) => {
    dispatch(onClick(selected, expressionIndex));
  },

  onFocus: (selected, expressionIndex) => {
    dispatch(onFocus(selected, expressionIndex));
  },

  onBlur: (selected, expressionIndex) => {
    dispatch(onBlur(selected, expressionIndex));
  },

  onSubmit: (selected, previous, expressionIndex) => {
    dispatch(onBlur(selected, expressionIndex));
    dispatch(onSubmit(selected, previous, expressionIndex));

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
