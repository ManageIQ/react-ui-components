import React from 'react';
import PropTypes from 'prop-types';
import EditableChip from './EditableChip'

import Expression from './Expression'
import ExpressionEditorPropTypes from './ExpressionEditorPropTypes'
const userInputMock = [{ id: 666, label: '', type: 'userinput', next: [], flags: {}, parent: null }];

class ExpressionEditor2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {chipRefs: []};
  }

  registerChip = (chipRef) => {
    console.log('CHIP REF', chipRef);
    this.setState(prevState => ({chipRefs: [...prevState.chipRefs, chipRef]}));
  }

  unregisterChip = (index) => {
    this.state.chipRefs.splice(index, 1);
    this.setState({chipRefs: [...this.state.chipRefs]});
  }

  focusChip = (index) => {
    // console.log('AAAAAAAAAAAAAAAAAAAAAAAAa', this.state.chipRefs[index]);
    this.state.chipRefs[index].current.focus();
  }

  onKeyDown = (key, index) => {
    console.log('on key down', key, index);
    if(key.keyCode === 37) {
      this.state.chipRefs[index-1].current.focus();
    } else if(key.keyCode === 39) {
      this.state.chipRefs[index+1].current.focus();
    }
  }
  

  generateExpression = expression => (
    <Expression
      onClick={this.focusChip}
      onDoubleClick={this.props.onClick}
      onSubmit={this.props.onSubmit}
      onKeyDown={this.onKeyDown}
      onDelete={this.props.onDelete}
      onFocus={this.props.onFocus}
      onKeyDown={this.onKeyDown}
      expression={expression}
      registerChip={this.registerChip}
      unregisterChip={this.unregisterChip}
      next={{...userInputMock[0],
        parent: (expression[expression.length - 1] && expression[expression.length - 1].term ||
         this.props.next)}}
    />
  )

  render () {
      return (
        this.props.expressions.map(this.generateExpression)
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
  expressions: PropTypes.arrayOf(ExpressionEditorPropTypes.expression),
  next: ExpressionEditorPropTypes.term,

}

ExpressionEditor2.defaultProps = {

}

export default ExpressionEditor2;
