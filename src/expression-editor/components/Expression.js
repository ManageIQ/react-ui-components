import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@patternfly/react-core';
import EditableChip from './EditableChip';

import ExpressionEditorPropTypes from './ExpressionEditorPropTypes';

class Expression extends React.Component {
  onClick = (chipIndex) => {
    this.props.onClick(this.props.index, chipIndex);
  }

  onDoubleClick = (selected, chipIndex) => {
    this.props.onDoubleClick(selected, this.props.index, chipIndex);
  }

  onSubmit = (selected, previous) => {
    this.props.onSubmit(selected, previous, this.props.index);
  }

  onDelete = (selected, chipIndex) => {
    this.props.onDelete(selected, this.props.index, chipIndex);
  }

  onFocus = (selected, chipIndex) => {
    this.props.onFocus(selected, this.props.index, chipIndex);
  }

  onBlur = (selected, chipIndex) => {
    this.props.onBlur(selected, this.props.index, chipIndex);
  }

  onKeyDown = (key, index, selected) => {
    this.props.onKeyDown(key, index, selected, this.props.index);
  }

  onInsertExpressionClick = () => {
    this.props.onInsertExpression(this.props.index);
  }

  onDeleteExpressionClick = () => {
    this.props.onDeleteExpression(this.props.index);
  }

  setAlias = (alias, chipIndex) => {
    this.props.setAlias(alias, this.props.index, chipIndex);
  }

  expressionStyle = () => (
    this.props.index % 2 == 0 ? "expressionEven" : "expressionOdd"
  )



  generateChip = ({ term, flags }, index) => {
    return (<li className="chip">
      <EditableChip
        key={term.id}
        label={flags.alias || term.label}
        isAliasSet={!!flags.alias}
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
        chipRef={this.props.chipRefs[index]}
        options={term.parent.next.filter(o => o.type !== "userinput")}
        selected={term}
        item={term}
        index={index}
        onKeyDown={this.onKeyDown}
      />
    </li>)
  }


  render() {
    const expression = this.props.expression;
    const options = this.props.parenthesesCount.left > this.props.parenthesesCount.right ? this.props.next.parent.next : this.props.next.parent.next.filter(t => t.type !== "rightParenteze");
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
          inputRef={(this.props.isLastExpression ? this.props.inputRef : {})}
          options={options.filter(o => o.type !== "userinput")}
          selected={this.props.next}
          item={this.props.next}
          index={this.props.expression.length}
          isLastElement={this.props.isLastExpression}
        />
      </li>);
    const isLastEditing = (expression[expression.length - 1] && expression[expression.length - 1].flags.isEditing);
    const endOfExpresion = this.props.next.parent.next.length === 0;

    return (
      <div className={`expressionRow ${this.expressionStyle()}`}>
        <ul className="list-inline expression">
          {expression.map((term, index) => this.generateChip(term, index))}
          {(endOfExpresion || isLastEditing || null) || ((this.props.isFocused || this.props.isLastExpression) && newChip)}
        </ul>
        <ul className="list-inline expressionButtons">
        <li>
        <div className="buttons .pf-c-form-control">
          <Button className="button" variant="danger" onClick={this.onDeleteExpressionClick}> Delete Expression </Button>
          <Button className="button" onClick={this.onInsertExpressionClick}> Insert Expression </Button>
        </div>
        </li>
      </ul>
    </div>
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
  setAlias: PropTypes.func,
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
