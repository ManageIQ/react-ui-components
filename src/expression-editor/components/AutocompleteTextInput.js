import React from 'react';
import PropTypes from 'prop-types';
import { Button, Dropdown, DropdownToggle, DropdownItem, DropdownSeparator, TextInput } from '@patternfly/react-core';

import ExpressionEditorPropTypes from './ExpressionEditorPropTypes';
import { keyCodes } from "../constants";

export default class AutocompleteTextInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      toDelete: {},
      index: -1,
      isFocused: true
    };
  }

  onMenuClick = (index) => {
    const selected = this.props.options[index];
    this.setState({ index: -1 });
    this.props.onSubmit(selected);
  }

  onBlur = () => {
    this.setState({isFocused: false});
    this.handleSubmit(this.props.value);
  }

  onFocus = () => {
    this.setState({isFocused: true});
  }

  handleKeyDown = (e) => {
    const { target: { value } } = e;
    let index = 0;
    let dropdown;
    let dropdownItem;
    let itemPossition;
    switch (e.keyCode)  {
      case keyCodes.enter:
        this.handleSubmit(value);
        break;
      case keyCodes.upArrow:
        index = this.state.index <= -1 ? this.state.index : this.state.index - 1;
        dropdown = document.getElementsByClassName("pf-c-dropdown__menu")[0];
        dropdownItem = document.getElementsByClassName("pf-c-dropdown__menu-item")[0];
        itemPossition = dropdownItem.getBoundingClientRect().height * index;
        dropdown.scrollTo(0, itemPossition);
        this.setState(prevState => ({ index }));
        break;
      case keyCodes.downArrow:
        index = this.state.index >= this.props.options.length - 1 ? this.props.options.length - 1 : this.state.index + 1;
        dropdown = document.getElementsByClassName("pf-c-dropdown__menu")[0];
        dropdownItem = document.getElementsByClassName("pf-c-dropdown__menu-item")[0];
        itemPossition = dropdownItem.getBoundingClientRect().height * index;
        dropdown.scrollTo(0, itemPossition);

        this.setState(prevState => ({ index }));
        break;
      case keyCodes.leftArrow:
        if (value === '') {
          this.props.onKeyDown(e);
        }
        break;
      case keyCodes.end:
        this.props.onKeyDown(e);
        break;
      case keyCodes.home:
        this.props.onKeyDown(e);
        break;
      default:
        this.setState({ index: -1 });
    }
  }


  eligibleForSubmit = (value) => {
    if (value === "" && this.state.index === -1) {
      return false;
    }
    else if (this.props.aliasMode) {
      return value;
    }
    let selected = {label: ""};
    if (this.state.index === -1) {
      selected = this.props.options.find(this.props.matchingFunction(value)) || {
        id: value, label: value, type: 'userinput', next: this.props.next,
      };
      if (this.props.denyUserInput && selected.type === "userinput") {
        return false;
      }
    } else {
      selected = this.props.options[this.state.index];
    }
    if (selected.label === "") {
      return false;
    }
    return selected;

  }


  handleSubmit = (value) => {
    const selected = this.eligibleForSubmit(value);
    if (selected) {
      this.props.onSubmit(selected);
    }
    this.setState({ index: -1 });
  }

  addButtonClick = () => {
    this.handleSubmit(this.props.value)
  }

  handleChange = ({ target: { value } }) => {
    this.props.onChange(value);
  }

  generateMenuClick = (i) => () => {
    this.onMenuClick(i);
  }

  render() {
    return (
      <span className="maxDropdownHeght">
          <Dropdown
            toggle={
              <input
                autoFocus
                className="pf-c-form-control autocompleteTextInput"
                input="true"
                type="text"
                ref={this.props.inputRef}
                onKeyDown={this.handleKeyDown}
                value={this.props.value}
                onBlur={this.onBlur}
                onFocus={this.onFocus}
                fullWidth
                onChange={this.handleChange}
              />
            }
            isOpen={this.state.isFocused}
          >
            {this.props.options.map((o, i) => (
              <DropdownItem
                component="button"
                className="dropdownFontSize"
                isHovered={this.state.index === i}
                onMouseDown={this.generateMenuClick(i)}
              >
                {o.label}
              </DropdownItem>))}
          </Dropdown>

          <Button
            className="inputButton"
            onClick={this.addButtonClick}
            id="expressionEditorInputButton"
            isDisabled={!this.eligibleForSubmit(this.props.value)}
          >
           Add
          </Button>
      </span>

    );
  }
}

AutocompleteTextInput.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  submitKeyCode: PropTypes.number,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onKeyDown: PropTypes.func.isRequired,
  deleteExpression: PropTypes.func,
  inputRef: PropTypes.object.isRequired,
  options: PropTypes.arrayOf(ExpressionEditorPropTypes.option).isRequired,
  next: PropTypes.arrayOf(ExpressionEditorPropTypes.term),
  matchingFunction: PropTypes.func,
  denyUserInput: PropTypes.bool,
};

AutocompleteTextInput.defaultProps = {
  value: '',
  matchingFunction: value => option => option.label.toLowerCase().includes(value.toLowerCase()),
};
