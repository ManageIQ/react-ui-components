import React from 'react';
import PropTypes from 'prop-types';
import EditableChip from './EditableChip';

import ExpressionEditorPropTypes from './ExpressionEditorPropTypes';

class Expression extends React.Component {
  onClick = (chipIndex) => {
    console.log('expression onclick');
    this.props.onClick(this.props.index, chipIndex);
    // this.setState({isEditing: !selected.isEditing});
    // console.log(selected);
  }

  onDoubleClick = (selected, chipIndex) => {
    // console.log('EditableChip onDoubleClickclick');
    this.props.onDoubleClick(selected, this.props.index, chipIndex);
  }

  onSubmit = (selected, previous) => {
    // console.log('expression on submit', selected, previous, this.props);
    this.props.onSubmit(selected, previous, this.props.index);
  }

  onDelete = (selected, chipIndex) => {
    // console.log('ON DELETE', selected);
    this.props.onDelete(selected, this.props.index, chipIndex);
  }

  onFocus = (selected, chipIndex) => {
    // console.log('ON FOCUS', selected);
    this.props.onFocus(selected, this.props.index, chipIndex);
  }

  onBlur = (selected, chipIndex) => {
    // console.log('ON BLUR', selected);
    this.props.onBlur(selected, this.props.index, chipIndex);
  }

  onKeyDown = (key, index, selected) => {
    // console.log('EXRESSION ON KEY DOWN', index);
    this.props.onKeyDown(key, index, selected, this.props.index);
  }

  onInsertExpressionClick = () => {
    this.props.onInsertExpression(this.props.index);
  }

  onDeleteExpressionClick = () => {
    this.props.onDeleteExpression(this.props.index);
  }


  generateChip = ({ term, flags }, index) => {
    // console.log('AAAAAAAAA', term, flags, index, this.props.chipRefs);
    return (<li className="chip">
      <EditableChip
        key={term.id}
        label={flags.alias || term.label}
        isEditing={flags.isEditing}
        isFocused={flags.isFocused}
        onClick={this.onClick}
        onDoubleClick={this.onDoubleClick}
        onSubmit={this.onSubmit}
        onDelete={this.onDelete}
        onFocus={this.onFocus}
        onBlur={this.onBlur}
        setAlias={this.setAlias}
        blurAllChips={this.props.blurAllChips}
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
    </li>)
  }


  render() {
    // console.log('Expression options', this.props.next.parent.next);
    // const { this: { props: { expression } } } = this.props.expression;
    // const {this: {props: {expression: expression}}} = this;
    const expression = this.props.expression;
    const options = this.props.parenthesesCount.left > this.props.parenthesesCount.right ? this.props.next.parent.next : this.props.next.parent.next.filter(t => t.type !== "rightParenteze");
    // console.log('expression props', expression);
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
          deleteExpression={this.onDeleteExpressionClick}
          blurAllChips={this.props.blurAllChips}
         // registerInput={this.props.registerInput}
         // unregisterInput={this.props.unregisterInput}
          inputRef={(this.props.isLastExpression ? this.props.inputRef : {})}
          options={options}
          selected={this.props.next}
          item={this.props.next}
          index={this.props.expression.length}
          isLastElement={this.props.isLastExpression}
        />
      </li>);
    const isLastEditing = (expression[expression.length - 1] && expression[expression.length - 1].flags.isEditing);
    const endOfExpresion = this.props.next.parent.next.length === 0;
    // const isFocused = expression.map(t => t.flags.isFocused).reduce((a, b) => (a || b), false);
    // console.log('IS FOCUSED', this.props.isFocused);
    // console.log('Expression',endOfExpresion, this.props.next.parent);
    // console.log('expression props next', this.props.next, isLastEditing);

    return (
      <React.Fragment>
        <ul className="list-inline expression">
          {expression.map((term, index) => this.generateChip(term, index))}
          {/* {(isLastEditing || endOfExpresion || null) || newChip} */}
          {(endOfExpresion || isLastEditing || null) || ((this.props.isFocused || this.props.isLastExpression) && newChip)}
          {/* {newChip} */}
          <span className="buttons">
            <button onClick={this.onDeleteExpressionClick}> Delete Expression </button>
            <button onClick={this.onInsertExpressionClick}> Add Expression </button>
          </span>
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
  onInsertExpression: PropTypes.func.isRequired,
  onDeleteExpression: PropTypes.func.isRequired,
  expression: ExpressionEditorPropTypes.expression,
  next: ExpressionEditorPropTypes.term,
  index: PropTypes.number.isRequired,
  isFocused: PropTypes.bool.isRequired,
  chipRefs: PropTypes.arrayOf(PropTypes.object),
  inputRef: PropTypes.object,
};


export default Expression;
