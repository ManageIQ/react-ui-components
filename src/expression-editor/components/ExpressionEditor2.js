import React from 'react';
import PropTypes from 'prop-types';
import EditableChip from './EditableChip'

import ExpressionEditorPropTypes from './ExpressionEditorPropTypes'

class ExpressionEditor2 extends React.Component {

  generateExpression = expression => (
    <Expression
      onClick={this.onClick}
      onDoubleClick={this.onClick}
      onSubmit={this.onSubmit}
      onKeyDown={this.onKeyDown}
      onDelete={this.onDelete}
      expression={expression}
      next={{...userInputMock[0],
        parent: (expression[this.state.expression.length - 1] && expression[this.state.expression.length - 1].term ||
         this.state.options)}}
    />
  )

  render () {
      return (
        this.props.expressions.map(generateExpression);
      );
  }
}


ExpressionEditor2.propTypes = {
  // isEditing: PropTypes.arrayOf(),
  onClick: PropTypes.func,
  onDoubleClick: PropTypes.func,
  onSubmit: PropTypes.func,
  expressions: PropTypes.arrayOf(ExpressionEditorPropTypes.expression),

}

ExpressionEditor2.defaultProps = {

}

export default ExpressionEditor2;
