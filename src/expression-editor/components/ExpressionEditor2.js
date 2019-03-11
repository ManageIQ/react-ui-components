import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@patternfly/react-core';
import Expression from './Expression';
import ExpressionEditorPropTypes from './ExpressionEditorPropTypes';
import { logicalOperatorsMock, userInputMock } from "../constants"
import { keyCodes } from "../constants";

class ExpressionEditor2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chipRefs: props.expressions.map(ex => ex.map(() => React.createRef())),
      prevKeyPressed: undefined,
      inputRef: React.createRef(),
      focusedExpressionIndex: props.expressions.length - 1,
    };
  }

  static getDerivedStateFromProps(props, state) {
    const expressionLengths = props.expressions.map(e => e.length);
    const chipRefsLength = state.chipRefs.map(e => e.length);
    const updateChips = !chipRefsLength.map((e, i) => e === expressionLengths[i]).reduce((a, b) => (a && b), true);
    if (updateChips) {
      return { chipRefs: props.expressions.map(ex => ex.map(() => React.createRef())) };
    }
    return null;
  }

  componentDidUpdate(prevProps, prevState) {
    const a = prevProps.expressions.map(e => e.length);
    const b = this.props.expressions.map(e => e.length);
    const updateChips = !b.map((e, i) => e === a[i]).reduce((a, b) => (a && b), true);
    if (updateChips) {
      this.setState({ chipRefs: this.props.expressions.map(ex => ex.map(() => React.createRef())) });
    }

    const defaultIndex = this.props.expressions.map(ex => ex.map(t => t.term.next.length === 0).reduce((a, b) => (a || b), false)).indexOf(false);
    const focusedExpressions = this.props.expressions.map(ex => ex.map(t => !!t.flags.isFocused).reduce((a, b) => (a || b), false));
    let focusedIndex = focusedExpressions.indexOf(true);
    if (focusedIndex >= 0 && focusedIndex !== this.state.focusedExpressionIndex) {
      this.setState({ focusedExpressionIndex: focusedIndex });
    } else if (focusedIndex < 0 && prevState.focusedExpressionIndex === this.state.focusedExpressionIndex && this.state.focusedExpressionIndex !== defaultIndex) {
      focusedIndex = defaultIndex;
      focusedIndex = focusedIndex < 0 ? this.props.expressions.length - 1 : focusedIndex;
      if (focusedIndex !== this.state.focusedExpressionIndex) {
        if (focusedIndex !== defaultIndex) {
          let index = this.localToGlobalIndex(this.props.expressions[focusedIndex].length-1, focusedIndex);
          this.focusChip(index);
        }
        this.setState({ focusedExpressionIndex: focusedIndex });
      }
    }
  }

  onSubmit = (selected, previous, expressionIndex) => {
    this.props.onSubmit(selected, previous, expressionIndex);
  }

  onDelete = (selected, expressionIndex, chipIndex) => {
    this.props.onDelete(selected, expressionIndex, chipIndex);
    this.focusInput();
  }

  onKeyDown = (key, chipIndex, selected, expressionIndex) => {
    let index = this.localToGlobalIndex(chipIndex, expressionIndex);
    const chipRefs = this.state.chipRefs.flatMap(item => item);

    switch (key.keyCode) {
      case keyCodes.leftArrow:
        this.handleLeftArrow(chipIndex, expressionIndex, index, key.ctrlKey);
        break;
      case keyCodes.rightArrow:
        this.handleRightArrow(chipIndex, expressionIndex, index, key.ctrlKey);
        break;
      case keyCodes.enter:
        this.props.onClick(selected, expressionIndex, chipIndex);
        break;
      case keyCodes.backspace:
        this.onDelete(selected, expressionIndex, chipIndex);
        break;
      case keyCodes.delete:
        this.onDelete(selected, expressionIndex, chipIndex);
        break;
      case keyCodes.insert:
        this.props.onInsert(expressionIndex);
        break;
      case keyCodes.home:
        if (this.props.expressions.flatMap(item => item).length > 0) {
          this.focusChip(0);
        }
        break;
      case keyCodes.end:
        if (this.props.expressions.flatMap(item => item).length > 0) {
          if (this.state.inputRef.current) {
            this.focusInput()
          } else {
            this.focusChip(this.props.expressions.flatMap(item => item).length - 1);
          }
        }
        break;
      default:
    }

    this.setState({ prevKeyPressed: key });
  }

  focusChip = (index) => {
    const chipRefs = this.state.chipRefs.flatMap(item => item);
    chipRefs[index].current.focus();
  }

  focusInput = () => {
    this.state.inputRef.current.focus();
    this.props.blurAllChips();
  }

  localToGlobalIndex = (chipIndex, expressionIndex) => (
    this.props.expressions.slice(0, expressionIndex).map(a => a.length).reduce((a, b) => (a + b), 0) + chipIndex
  )

  setFocusChip = (expressionIndex, chipIndex) => {
    let index = this.localToGlobalIndex(chipIndex, expressionIndex);
    this.focusChip(index);
  }

  handleLeftArrow = (chipIndex, expressionIndex, index, ctrl) => {
    if (ctrl) {
      if (chipIndex == 0 && expressionIndex > 0) {
        index = this.localToGlobalIndex(0, expressionIndex - 1);
      } else {
        index = this.localToGlobalIndex(0, expressionIndex);
      }
    } else {
      index = index <= 0 ? index : index - 1;
    }
    if (this.props.expressions.flatMap(item => item).length > 0) {
      this.focusChip(index);
    }
  }

  handleRightArrow = (chipIndex, expressionIndex, index, ctrl) => {
    const lastElement = index >= this.state.chipRefs.flatMap(item => item).length - 1;
    if (ctrl) {
      const expressionLength = this.props.expressions[expressionIndex].length - 1;
      const lastElementOnRow = chipIndex >= expressionLength;
      if (lastElementOnRow) {
        const nextRowHasChips = this.props.expressions[expressionIndex+1].length > 0 && expressionIndex < this.props.expressions.length - 1;
        if (nextRowHasChips) {
          index = this.localToGlobalIndex(this.props.expressions[expressionIndex+1].length - 1, expressionIndex + 1);
          this.focusChip(index);
        } else {
          this.setState({ focusedExpressionIndex: this.props.expressions.length - 1 });
          this.focusInput();
        }
      } else {
        index = this.localToGlobalIndex(expressionLength, expressionIndex);
        this.focusChip(index);
      }
    } else {
      if (lastElement) {
        this.setState({ focusedExpressionIndex: this.props.expressions.length - 1 });
        this.focusInput();
      } else {
        this.focusChip(index + 1);
      }
    }
  }

  generateExpression = (expression, index) => (
    <Expression
      key={index}
      onClick={this.setFocusChip}
      onDoubleClick={this.props.onClick}
      onSubmit={this.onSubmit}
      onKeyDown={this.onKeyDown}
      onDelete={this.onDelete}
      onFocus={this.props.onFocus}
      onBlur={this.props.onBlur}
      blurAllChips={this.props.blurAllChips}
      setAlias={this.props.setAlias}
      onInsertExpression={this.props.onInsert}
      onDeleteExpression={this.props.onDeleteExpression}
      expression={expression}
      chipRefs={this.state.chipRefs[index]}
      isFocused={index === this.state.focusedExpressionIndex}
      index={index}
      isLastExpression={index===this.props.expressions.length-1}
      parenthesesCount={this.props.parenthesesCount}
      inputRef={this.state.inputRef}
      isLoading={this.props.isLoading}
      next={{
        ...userInputMock[0],

        parent: ((expression[expression.length - 1] && expression[expression.length - 1].term) ||
         this.props.next[index]),
}}
    />
  )

  render() {
    if (this.props.isLoading) {
      const preLastindex = this.props.expressions[this.props.expressions.length-1].length-1 < 0
        ? 0
        : this.props.expressions[this.props.expressions.length-1].length-1;

      return (
        <div className="expressionEditor">
          <h1 className="expressionEditorTitle">Expression Editor</h1>
          <div>
            <div className="undoRedoButtons">
              <Button className="button" isDisabled={!this.props.canUndo} onClick={this.props.undo}>Undo</Button>
              <Button className="button" isDisabled={!this.props.canRedo} onClick={this.props.redo}>Redo</Button>
            </div>
          </div>
          {this.props.expressions.map(((expression, index) => (this.generateExpression(expression.slice(0, preLastindex), index))))}
        </div>
      );
    }
    else {
      return (
        <div className="expressionEditor">
          <h1 className="expressionEditorTitle">Expression Editor</h1>
          <div>
            <div className="undoRedoButtons">
              <Button className="button" isDisabled={!this.props.canUndo} onClick={this.props.undo}>Undo</Button>
              <Button className="button" isDisabled={!this.props.canRedo} onClick={this.props.redo}>Redo</Button>
            </div>
          </div>
          {this.props.expressions.map(((expression, index) => (this.generateExpression(expression, index))))}
        </div>
      );
    }
  }
}


ExpressionEditor2.propTypes = {
  onClick: PropTypes.func,
  onSubmit: PropTypes.func,
  onDelete: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  setAlias: PropTypes.func,
  expressions: PropTypes.arrayOf(ExpressionEditorPropTypes.expression),
  parenthesesCount: PropTypes.shape({left: PropTypes.number, right: PropTypes.number}),
  next: ExpressionEditorPropTypes.term,
  lastSubmited: PropTypes.shape(ExpressionEditorPropTypes.term),
  lastSubmitedExpressionIndex: PropTypes.number
};

ExpressionEditor2.defaultProps = {
  isLoading: PropTypes.bool,
  lastSubmited: PropTypes.shape(ExpressionEditorPropTypes.term)
};


export default ExpressionEditor2;
