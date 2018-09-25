import React from 'react';
import PropTypes from 'prop-types';
import EditableChip from './EditableChip'

import ExpressionEditorPropTypes from './ExpressionEditorPropTypes'

class Expression extends React.Component {

  generateChip = ({term, flags}) => (
    <EditableChip
      key={term.id}
      id={term.id}
      label={term.label}
      isEditing={flags.isEditing}
      onClick={this.onClick}
      onDoubleClick={this.onDoubleClick}
      onSubmit={this.onSubmit}
      onDelete={this.props.onDelete}
      options={term.parent.next}
      selected={term}
      item={term}
      onKeyDown={this.props.onKeyDown}
    />
  )

  onClick = (selected) => {
    console.log('expression onclick', selected);
    this.props.onClick(selected);
    // this.setState({isEditing: !selected.isEditing});
    // console.log(selected);
  }

  onDoubleClick = (selected) => {
    console.log('EditableChip onDoubleClickclick');
    this.props.onClick(selected)
  }

  onSubmit = (selected, previous) => {
    console.log('expression on submit', selected, previous);
    this.props.onSubmit(selected, previous);

  }


  render () {
    const expression = this.props.expression;
    console.log('expression props', expression);
    const newChip = (<EditableChip
     id={this.props.next.id}
     label={this.props.next.label}
     isEditing={this.props.next.isEditing}
     onClick={this.onClick}
     onDoubleClick={this.onDoubleClick}
     onSubmit={this.onSubmit}
     options={this.props.next.parent.next}
     selected={this.props.next}
     item={this.props.next}
    />);
    const isLastEditing = (expression[expression.length-1] && expression[expression.length-1].flags.isEditing);
    console.log('expression props next', this.props.next, isLastEditing);

    return (
      <React.Fragment>
        {expression.map(this.generateChip)}
        {(isLastEditing || null) || newChip}
      </React.Fragment>
    );
  }
}


Expression.propTypes = {
  // isEditing: PropTypes.arrayOf(),
  onClick: PropTypes.func,
  onDoubleClick: PropTypes.func,
  onSubmit: PropTypes.func,
  onKeyDown: PropTypes.func,
  onDelete: PropTypes.func,
  expression: ExpressionEditorPropTypes.expression,
  value: PropTypes.string,
  next: ExpressionEditorPropTypes.term,

}

Expression.defaultProps = {
  value: ''
}

export default Expression;
