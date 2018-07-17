import { connect } from 'react-redux';
import { onChange, calculateNext } from '../actions';
import ExpressionEditor from '../components/ExpressionEditor';
import { dataProvider } from './DataProvider';

const mapStateToProps = ({ expressionEditor }) => ({
  // actions which have been done since loeaded
  steps: expressionEditor.steps,
  // data for next dropdown
  next: expressionEditor.next,
  selected: expressionEditor.selected,
  options: expressionEditor.options
});


const mapDispatchToProps = dispatch => ({
  onChange: (selected) => {
    console.log('onchagne map dispatch');
    dispatch(onChange(selected));
    dispatch(calculateNext(selected));
  },

  undo: (action) => {

  },

  redo: (action) => {

  },
  /*onTagDeleteClick: (tag) => {
    dispatch(deleteAssignedTag(tag));
  },
  onTagCategoryChange: (cat) => {
    dispatch(toggleTagCategoryChange(cat));
  },
  onTagValueChange: (val) => {
    dispatch(toggleTagValueChange(val));
    dispatch(changeAssignedTag(val));
  },

  onTagMultiValueChange: (val) => {
    dispatch(toggleTagValueChange(val));
    dispatch(addAssignedTag(val));
  },

  onLoadState: (state) => {
    dispatch(loadState(state));
  },*/
});

/*const ExpressionEditorConnected = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ExpressionEditor);*/

console.log(
connect(
  mapStateToProps,
  mapDispatchToProps,
)(ExpressionEditor));

const ExpressionEditorConnected = connect(
  mapStateToProps,
  mapDispatchToProps,
)(dataProvider({foo: 'foo'})(ExpressionEditor));
console.log(dataProvider);

// const ExpressionEditorConnected = dataProvider(ExpressionEditor);
/*
const ExpressionEditorConnected = (props) => {
  return (Component) => <Component {...props}/>
}
export default dataProvider(connect(mapStateToProps, mapDispatchToProps)(Foo));
*/

export { ExpressionEditorConnected };
