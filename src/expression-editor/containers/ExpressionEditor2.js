import { connect } from 'react-redux';
import { onChange, calculateNext, onSubmit, onDelete, onClick, onFocus, onBlur } from '../actions';
import ExpressionEditor from '../components/ExpressionEditor2';
import { dataProvider } from './DataProvider';

const mapStateToProps = ({ expressionEditor }) => ({
  // actions which have been done since loeaded
  expressions: expressionEditor.expressions,
  // data for next dropdown
  // next: expressionEditor.next,
  // selected: expressionEditor.selected,
  next: expressionEditor.options
});

const mapDispatchToProps = dispatch => ({

  onDelete: (selected, expression) => {
    dispatch(onDelete(selected, expression));
  },

  onClick: (selected, expression) => {
    dispatch(onClick(selected, expression));
  },

  onFocus: (selected, expression) => {
    dispatch(onFocus(selected, expression));
  },

  onBlur: (selected, expression) => {
    dispatch(onBlur(selected, expression));
  },

  onSubmit: (selected, previous, expression) => {
    dispatch(onSubmit(selected, previous, expression));
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
