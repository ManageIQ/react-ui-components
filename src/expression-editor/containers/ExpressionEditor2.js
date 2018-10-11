import { connect } from 'react-redux';
import { onChange, calculateNext, onSubmit, onDelete, onClick, onFocus, onBlur } from '../actions';
import ExpressionEditor from '../components/ExpressionEditor2';
import { dataProvider } from './DataProvider';

const mapStateToProps = (state) => {
  console.log('state: ', state.expressions);
  return {
  // actions which have been done since loeaded
  expressions: state.expressions.expressions,
  // data for next dropdown
  // next: expressionEditor.next,
  // selected: expressionEditor.selected,
  next: state.expressions.options
}};

const mapDispatchToProps = dispatch => ({

  onDelete: (selected, expression) => {
    dispatch(onBlur(selected, expression));
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
