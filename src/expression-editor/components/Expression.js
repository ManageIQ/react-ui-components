import React from 'react';
import PropTypes from 'prop-types';
import EditableChip from './EditableChip'

import ExpressionEditorPropTypes from './ExpressionEditorPropTypes'

class Expression extends React.Component {

  generateChip = ({term, flags}, index) => (
    <EditableChip
      key={term.id}
      label={term.label}
      isEditing={flags.isEditing}
      onClick={this.onClick}
      onDoubleClick={this.onDoubleClick}
      onSubmit={this.onSubmit}
      onDelete={this.onDelete}
      onFocus={this.onFocus}
      onBlur={this.onBlur}
      onKeyDown={this.props.onKeyDown}
      registerChip={this.props.registerChip}
      unregisterChip={this.props.unregisterChip}
      // registerInput={this.props.registerInput}
      // unregisterInput={this.props.unregisterInput}
      options={term.parent.next}
      selected={term}
      item={term}
      index={index}
      onKeyDown={this.onKeyDown}
    />
  )

  onClick = (index) => {
    // console.log('expression onclick', selected, this.props.expression);
    this.props.onClick(index);
    // this.setState({isEditing: !selected.isEditing});
    // console.log(selected);
  }

  onDoubleClick = (selected) => {
    // console.log('EditableChip onDoubleClickclick');
    this.props.onDoubleClick(selected, this.props.expression);
  }

  onSubmit = (selected, previous) => {
    // console.log('expression on submit', selected, previous);
    this.props.onSubmit(selected, previous, this.props.expression);
  }

  onDelete = selected => {
    console.log('ON DELETE', selected);
    this.props.onDelete(selected, this.props.expression);
  }

  onFocus = selected => {
    console.log('ON FOCUS', selected);
    this.props.onFocus(selected, this.props.expression);
  }

  onBlur = selected => {
    console.log('ON BLUR', selected);
    this.props.onBlur(selected, this.props.expression);
  }

  onKeyDown = (key, index, selected) => {
    // console.log('EXRESSION ON KEY DOWN', this.props.expression);
    this.props.onKeyDown(key, index, selected, this.props.expression);
  }


  render () {
    const expression = this.props.expression;
    // console.log('expression props', this.props);
    const newChip = (<EditableChip
     label={this.props.next.label}
     isEditing={this.props.next.isEditing}
     onClick={this.onClick}
     onDoubleClick={this.onDoubleClick}
     onSubmit={this.onSubmit}
     onFocus={this.onFocus}
     onBlur={this.onBlur}
     onKeyDown={this.onKeyDown}
     // registerInput={this.props.registerInput}
     // unregisterInput={this.props.unregisterInput}
     inputRef={this.props.inputRef}
     options={this.props.next.parent.next}
     selected={this.props.next}
     item={this.props.next}
     index={this.props.expression.length}
    />);
    const isLastEditing = (expression[expression.length-1] && expression[expression.length-1].flags.isEditing);
    // console.log('expression props next', this.props.next, isLastEditing);

    return (
      <React.Fragment>
        {expression.map((expression, index) => this.generateChip(expression, index))}
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
  onFocus: PropTypes.func,
  registerChip: PropTypes.func,
  unregisterChip: PropTypes.func,
  registerInput: PropTypes.func,
  unregisterInput: PropTypes.func,
  expression: ExpressionEditorPropTypes.expression,
  value: PropTypes.string,
  next: ExpressionEditorPropTypes.term,

}

Expression.defaultProps = {
  value: ''
}

export default Expression;
