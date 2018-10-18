import React from 'react';
import PropTypes from 'prop-types';
import EditableChip from './EditableChip';

import ExpressionEditorPropTypes from './ExpressionEditorPropTypes';

class Expression extends React.Component {
  onClick = (index) => {
    console.log('expression onclick');
    this.props.onClick(index);
    // this.setState({isEditing: !selected.isEditing});
    // console.log(selected);
  }

  onDoubleClick = (selected) => {
    // console.log('EditableChip onDoubleClickclick');
    this.props.onDoubleClick(selected, this.props.index);
  }

  onSubmit = (selected, previous) => {
    // console.log('expression on submit', selected, previous, this.props);
    this.props.onSubmit(selected, previous, this.props.index);
  }

  onDelete = (selected) => {
    // console.log('ON DELETE', selected);
    this.props.onDelete(selected, this.props.index);
  }

  onFocus = (selected) => {
    // console.log('ON FOCUS', selected);
    this.props.onFocus(selected, this.props.index);
  }

  onBlur = (selected) => {
    // console.log('ON BLUR', selected);
    this.props.onBlur(selected, this.props.index);
  }

  onKeyDown = (key, index, selected) => {
    // console.log('EXRESSION ON KEY DOWN', index);
    this.props.onKeyDown(key, index, selected, this.props.index);
  }

  generateChip = ({ term, flags }, index) => (
    <li className="chip">
      <EditableChip
        key={term.id}
        label={term.label}
        isEditing={flags.isEditing}
        isFocused={flags.isFocused}
        onClick={this.onClick}
        onDoubleClick={this.onDoubleClick}
        onSubmit={this.onSubmit}
        onDelete={this.onDelete}
        onFocus={this.onFocus}
        onBlur={this.onBlur}
        // onKeyDown={this.props.onKeyDown}
        chipRef={this.props.chipRefs[index]}
      // registerInput={this.props.registerInput}
      // unregisterInput={this.props.unregisterInput}
        options={term.parent.next}
        selected={term}
        item={term}
        index={index}
        onKeyDown={this.onKeyDown}
      />
    </li>
  )


  render() {
    // console.log('Expression options', this.props.next.parent.next);
    // const { this: { props: { expression } } } = this.props.expression;
    // const {this: {props: {expression: expression}}} = this;
    const expression = this.props.expression;
    // console.log('expression props', this.props);
    const newChip = (
      <li>
        <EditableChip
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
          inputRef={(this.props.isLastExpression ? this.props.inputRef : {})}
          options={this.props.next.parent.next}
          selected={this.props.next}
          item={this.props.next}
          index={this.props.expression.length}
          isLastElement={this.props.isLastExpression}
        />
      </li>);
    // const isLastEditing = (expression[expression.length - 1] && expression[expression.length - 1].flags.isEditing);
    const endOfExpresion = this.props.next.parent.next.length === 0;
    // const isFocused = expression.map(t => t.flags.isFocused).reduce((a, b) => (a || b), false);
    // console.log('IS FOCUSED', this.props.isFocused);
    // console.log('Expression',endOfExpresion, this.props.next.parent);
    // console.log('expression props next', this.props.next, isLastEditing);

    return (
      <React.Fragment>
        <ul className="list-inline">
          {expression.map((term, index) => this.generateChip(term, index))}
          {/* {(isLastEditing || endOfExpresion || null) || newChip} */}
          {(endOfExpresion || null) || ((this.props.isFocused || this.props.isLastExpression) && newChip)}
        </ul>
      </React.Fragment>
    );
  }
}


Expression.propTypes = {
  // isEditing: PropTypes.arrayOf(),
  onClick: PropTypes.func.isRequired,
  onDoubleClick: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onKeyDown: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onFocus: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  expression: ExpressionEditorPropTypes.expression,
  next: ExpressionEditorPropTypes.term,
  index: PropTypes.number.isRequired,
  isFocused: PropTypes.bool.isRequired,
  chipRefs: PropTypes.arrayOf(PropTypes.object),
  inputRef: PropTypes.object,
};


export default Expression;
