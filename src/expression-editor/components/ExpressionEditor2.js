import React from 'react';
import PropTypes from 'prop-types';
import EditableChip from './EditableChip'

import Expression from './Expression'
import ExpressionEditorPropTypes from './ExpressionEditorPropTypes'

const logicalOperatorsMock = [
  { id: 1000, label: 'AND', type: 'operator', next: [], parent: null },
  { id: 1001, label: 'OR', type: 'operator', next: [], parent: null }
];
const userInputMock = [{ id: 666, label: '', type: 'userinput', next: logicalOperatorsMock, parent: null }];
logicalOperatorsMock.map(a => a.parent = userInputMock[0]);

class ExpressionEditor2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chipRefs: props.expressions.map(ex => ex.map(() => React.createRef())),
      prevKeyPressed: undefined,
      inputRef: React.createRef(),
      focusedExpressionIndex: props.expressions.length - 1
    };
    console.log(React.createRef());
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.expressions.flat().length !== this.props.expressions.flat().length) {
      // console.log('CDU', prevProps.expressions, this.props.expressions);
      this.setState({ chipRefs: this.props.expressions.map(ex => ex.map(() => React.createRef()))});
    }
    let focusedExpressions = this.props.expressions.map(ex => ex.map(t => !!t.flags.isFocused).reduce((a, b) => (a || b), false));
    let focusedIndex = focusedExpressions.indexOf(true);
    if (focusedIndex > -1 && focusedIndex !== this.state.focusedExpressionIndex) {
      this.setState({focusedExpressionIndex: focusedIndex});
    }
    else if (focusedIndex < 0 && prevState.focusedExpressionIndex === this.state.focusedExpressionIndex && this.state.focusedExpressionIndex !== this.props.expressions.length - 1) {
      console.log('DEFAULT FOCUS', focusedIndex, this.state, this.props);
      // last expression which is not complete
      focusedIndex = this.props.expressions.map(ex => ex.map(t => t.term.next.length === 0).reduce((a, b) => (a || b), false)).indexOf(false);
      console.log(focusedIndex);
      focusedIndex = focusedIndex < 0 ? this.props.expressions.length - 1 : focusedIndex;
      if (focusedIndex !== this.state.focusedExpressionIndex) {
        this.setState({focusedExpressionIndex: focusedIndex});
      }
    }
    if (focusedIndex < 0) {
      this.focusInput();
    }
    // console.log(focusedExpressions);
  }

/*
  registerChip = (chipRef, index, expression) => {
    console.log('CHIP REF', chipRef, index, expression, this.state.chipRefs);
    index = this.localToGlobalIndex(index, expression);
    // this.state.chipRefs.splice(index, 0, chipRef);
    // this.setState({chipRefs: [...this.state.chipRefs]});
    // this.setState(prevState => ({chipRefs: [...prevState.chipRefs, chipRef]}));
    let chipRefs = [...this.state.chipRefs];
    const toDelete = this.state.chipRefs[index] === null ? 1 : 0;
    console.log(toDelete);
    chipRefs.splice(index, toDelete, chipRef);
    this.setState(prevState => ({chipRefs: chipRefs}));
  }

  unregisterChip = (index, expression) => {
    index = this.localToGlobalIndex(index, expression);
    console.log('unregister', index, expression);
    // this.state.chipRefs.splice(index, 1);
    // this.setState({chipRefs: [...this.state.chipRefs]});
    let chipRefs = [...this.state.chipRefs];
    chipRefs.splice(index, 1);
    this.setState(prevState => ({chipRefs: chipRefs}));
  }
*/
  focusChip = (index) => {
    const chipRefs = this.state.chipRefs.flat();
    // console.log('FOCUS INDEX', index);
    chipRefs[index].current.focus();
  }

  focusInput = () => {
    // console.log("FOCUS INPUT");
    this.state.inputRef.current.focus();
  }

  onKeyDown = (key, index, selected, expression) => {
    // console.log('local',index);
    index = this.localToGlobalIndex(index, expression);
    // console.log('global',index);
    // console.log(this.state.chipRefs);
    const chipRefs = this.state.chipRefs.flat();
    // console.log('on key down', key, index);
    if(key.keyCode === 37) {
      index = index <= 0 ? index : index - 1;
      // chipRefs[index].current.focus();
      this.focusChip(index);
    } else if(key.keyCode === 39) {
      if (index >= chipRefs.length - 1) {
        this.setState({focusedExpressionIndex: this.props.expressions.length - 1})
        this.focusInput();
      } else {
        // index = index >= 0 ? index : index + 1;
        this.focusChip(index + 1);
        // chipRefs[index + 1].current.focus();
      }
    }
    else if(key.keyCode === 13) {
      // console.log('on enter key down', selected, expression);
      this.props.onClick(selected, expression);
    } else if (key.keyCode === 8 || key.keyCode === 46) {
      this.onDelete(selected, expression)
    }

    this.setState({prevKeyPressed: key});
  }

  onSubmit = (selected, previous, expression) => {
    this.props.onSubmit(selected, previous, expression);
    this.focusInput();
  }

  onDelete = (selected, expression) => {
    // console.log('DDDDDDDDDDDDDDDDDDDDDDD');
    // console.log(this.state.focusedExpressionIndex,  this.props.expressions);
    // const focusedIndex = this.props.expressions[this.state.focusedExpressionIndex].findIndex(t => t.flags.isFocused === true);
    // let focusedElement = this.state.chipRefs[this.state.focusedExpressionIndex][focusedIndex];
    // console.log(focusedElement);
    // this.state.chipRefs.flat().map(e => e.current.blur());
    this.props.onDelete(selected, expression);
  }

  localToGlobalIndex = (index, expression) => {
    // console.log(this.props.expressions, expression);
    const indexOfExpression = this.props.expressions.indexOf(expression);
    // console.log(indexOfExpression, this.props.expressions);
    return this.props.expressions.slice(0, indexOfExpression).map(a => a.length).reduce((a,b) => (a+b), 0) + index;
  }

  generateExpression = (expression, index) => (
    <Expression
      key={index}
      onClick={this.focusChip}
      onDoubleClick={this.props.onClick}
      onSubmit={this.onSubmit}
      onKeyDown={this.onKeyDown}
      onDelete={this.onDelete}
      onFocus={this.props.onFocus}
      onBlur={this.props.onBlur}
      onKeyDown={this.onKeyDown}
      expression={expression}
      registerChip={this.registerChip}
      unregisterChip={this.unregisterChip}
      chipRefs={this.state.chipRefs[index]}
      isFocused={index === this.state.focusedExpressionIndex}
      // registerInput={this.registerInput}
      // unregisterInput={this.unregisterInput}
      inputRef={this.state.inputRef}
      next={{...userInputMock[0],
        parent: (expression[expression.length - 1] && expression[expression.length - 1].term ||
         this.props.next)}}
    />
  )

  render () {
    // console.log('ExpressionEditor2:', this.props);
    // console.log('STATE: ', this.state.focusedExpressionIndex);

      return (
        this.props.expressions.map( ((expression, index) => (this.generateExpression(expression, index))) )
      );
  }
}


ExpressionEditor2.propTypes = {
  // isEditing: PropTypes.arrayOf(),
  onClick: PropTypes.func,
  onDoubleClick: PropTypes.func,
  onSubmit: PropTypes.func,
  onDelete: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  expressions: PropTypes.arrayOf(ExpressionEditorPropTypes.expression),
  next: ExpressionEditorPropTypes.term,

}

ExpressionEditor2.defaultProps = {

}

export default ExpressionEditor2;
