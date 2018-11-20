import React from 'react';
import PropTypes from 'prop-types';
import { ButtonGroup, Button } from 'patternfly-react';
import Expression from './Expression';
import ExpressionEditorPropTypes from './ExpressionEditorPropTypes';
import { logicalOperatorsMock, userInputMock } from "../constants"
import jsep from "jsep";

class ExpressionEditor2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chipRefs: props.expressions.map(ex => ex.map(() => React.createRef())),
      prevKeyPressed: undefined,
      inputRef: React.createRef(),
      focusedExpressionIndex: props.expressions.length - 1,
    };
    console.log("JSEP", jsep("exp1 && exp2"));
  }

  static getDerivedStateFromProps(props, state) {
    const a = props.expressions.map(e => e.length);
    const b = state.chipRefs.map(e => e.length);
    const updateChips = !b.map((e, i) => e === a[i]).reduce((a, b) => (a && b), true);
    if (updateChips) {
      return { chipRefs: props.expressions.map(ex => ex.map(() => React.createRef())) };
    }
    return null;
  }

  componentDidUpdate(prevProps, prevState) {
    const a = prevProps.expressions.map(e => e.length);
    const b = this.props.expressions.map(e => e.length);
    const updateChips = !b.map((e, i) => e === a[i]).reduce((a, b) => (a && b), true);
    // console.log('CDU', a, b, updateChips, prevProps.expressions, this.props.expressions);
    if (updateChips) {
      this.setState({ chipRefs: this.props.expressions.map(ex => ex.map(() => React.createRef())) });
    }
    const defaultIndex = (this.props.expressions.map(ex => ex.map(t => (t.flags.isEditing)).indexOf(true)) ||
      this.props.expressions.map(ex => ex.map(t => t.term.next.length === 0).reduce((a, b) => (a || b), false)).indexOf(false));
    const focusedExpressions = this.props.expressions.map(ex => ex.map(t => !!t.flags.isFocused).reduce((a, b) => (a || b), false));
    let focusedIndex = focusedExpressions.indexOf(true);
    if (focusedIndex > -1 && focusedIndex !== this.state.focusedExpressionIndex) {
      this.setState({ focusedExpressionIndex: focusedIndex });
    } else if (focusedIndex < 0 && prevState.focusedExpressionIndex === this.state.focusedExpressionIndex && this.state.focusedExpressionIndex !== defaultIndex) {
      // console.log('DEFAULT FOCUS', focusedIndex, this.state, this.props);
      // last expression which is not complete
      focusedIndex = defaultIndex;
      // console.log(focusedIndex);
      focusedIndex = focusedIndex < 0 ? this.props.expressions.length - 1 : focusedIndex;
      if (focusedIndex !== this.state.focusedExpressionIndex) {
        if (focusedIndex !== defaultIndex) {
          console.log("XXXXXXXXXXXXXXXXXXXXXXXXXX", this.props.expressions, defaultIndex, focusedIndex);
          let index = this.localToGlobalIndex(this.props.expressions[focusedIndex].length-1, focusedIndex);
          // set focus when editing and it should not
          this.focusChip(index);
        }
        this.setState({ focusedExpressionIndex: focusedIndex });

      }
    }
    if (focusedIndex < 0) {
      // this.focusInput();
    }
    // console.log(focusedExpressions);
  }

  onSubmit = (selected, previous, expressionIndex) => {
    this.props.onSubmit(selected, previous, expressionIndex);
    // const termIndex = this.props.expressions[expressionIndex].findIndex((exp) => (exp.term.id === selected.id));

    // this.focusChip(this.localToGlobalIndex(termIndex, expressionIndex));
  }

  onDelete = (selected, expressionIndex, chipIndex) => {
    this.props.onDelete(selected, expressionIndex, chipIndex);
    this.focusInput();
  }

  onKeyDown = (key, chipIndex, selected, expressionIndex) => {
    // console.log('local',index);
    let index = this.localToGlobalIndex(chipIndex, expressionIndex);
    // console.log('global',index);
    // console.log(this.state.chipRefs);
    const chipRefs = this.state.chipRefs.flat();
    // console.log('on key down', key, index, selected);
    if (key.keyCode === 37) {
      index = index <= 0 ? index : index - 1;
      // chipRefs[index].current.focus();
      this.focusChip(index);
    } else if (key.keyCode === 39) {
      if (index >= chipRefs.length - 1) {
        this.setState({ focusedExpressionIndex: this.props.expressions.length - 1 });
        this.focusInput();
      } else {
        // index = index >= 0 ? index : index + 1;
        this.focusChip(index + 1);
        // chipRefs[index + 1].current.focus();
      }
    } else if (key.keyCode === 13) {
      // console.log('on enter key down', selected, expression);
      this.props.onClick(selected, expressionIndex, chipIndex);
    } else if (key.keyCode === 8 || key.keyCode === 46) {
      this.onDelete(selected, expressionIndex, chipIndex);
    } else if (key.keyCode === 45) {
      this.props.onInsert(expressionIndex);
    }

    this.setState({ prevKeyPressed: key });
  }

  focusChip = (index) => {
    const chipRefs = this.state.chipRefs.flat();
    console.log('FOCUS INDEX', index, chipRefs);
    chipRefs[index].current.focus();
  }

  focusInput = () => {
    // console.log("FOCUS INPUT");
    this.state.inputRef.current.focus();
    this.props.blurAllChips();
  }

  localToGlobalIndex = (chipIndex, expressionIndex) => (
    // console.log(this.props.expressions, expression);
    // const indexOfExpression = this.props.expressions.indexOf(expression);
    // console.log(indexOfExpression, this.props.expressions);
    this.props.expressions.slice(0, expressionIndex).map(a => a.length).reduce((a, b) => (a + b), 0) + chipIndex
  )

  setFocusChip = (expressionIndex, chipIndex) => {
    let index = this.localToGlobalIndex(chipIndex, expressionIndex);
    this.focusChip(index);
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
      // registerInput={this.registerInput}
      // unregisterInput={this.unregisterInput}
      inputRef={this.state.inputRef}

      next={{
...userInputMock[0],
        parent: ((expression[expression.length - 1] && expression[expression.length - 1].term) ||
         this.props.next[index]),
}}
    />
  )

  render() {
    console.log('ExpressionEditor2:', this.props);

    // console.log('STATE: ', this.state.focusedExpressionIndex);

    return (
      <div className="expressionEditor">
        <h1 className="expressionEditorTitle">Expression Editor</h1>
        <div>
          <ButtonGroup className="undoRedoButtons">
            <Button className="button" disabled={!this.props.canUndo} onClick={this.props.undo}>Undo</Button>
            <Button className="button" disabled={!this.props.canRedo} onClick={this.props.redo}>Redo</Button>
          </ButtonGroup>
        </div>
        {this.props.expressions.map(((expression, index) => (this.generateExpression(expression, index))))}
      </div>
    );
  }
}


ExpressionEditor2.propTypes = {
  // isEditing: PropTypes.arrayOf(),
  onClick: PropTypes.func,
  onSubmit: PropTypes.func,
  onDelete: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  setAlias: PropTypes.func,
  expressions: PropTypes.arrayOf(ExpressionEditorPropTypes.expression),
  parenthesesCount: PropTypes.shape({left: PropTypes.number, right: PropTypes.number}),
  next: ExpressionEditorPropTypes.term,

};

ExpressionEditor2.defaultProps = {

};

export default ExpressionEditor2;
