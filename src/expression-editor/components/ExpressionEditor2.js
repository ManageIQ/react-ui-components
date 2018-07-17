import React from 'react';
import PropTypes from 'prop-types';
import EditableChip from './EditableChip'

import ExpressionEditorPropTypes from './ExpressionEditorPropTypes'

class ExpressionEditor2 extends React.Component {

  render () {
      return null;
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
