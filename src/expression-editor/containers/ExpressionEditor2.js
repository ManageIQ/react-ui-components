import { connect } from 'react-redux';
import { onChange, calculateNext, onSubmit, onDelete, onClick } from '../actions';
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
  onChange: (selected) => {
    console.log('onchagne map dispatch');
    dispatch(onChange(selected));
    dispatch(calculateNext(selected));
  },

  onDelete: (selected, expression) => {
    dispatch(onDelete(selected, expression));
  },

  onClick: (selected, expression) => {
    dispatch(onClick(selected, expression));
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
console.log(dataProvider);

export { ExpressionEditorConnected2 };
