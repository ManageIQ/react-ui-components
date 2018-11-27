import React from 'react';
import PropTypes from 'prop-types';
import { Button, Dropdown, DropdownToggle, DropdownItem, DropdownSeparator, TextInput } from '@patternfly/react-core';

import ExpressionEditorPropTypes from './ExpressionEditorPropTypes';
import Menu from './Menu';


export default class AutocompleteTextInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menuItemRefs: props.options.map(() => React.createRef()),
      toDelete: {},
      index: -1,
      isFocused: true
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.options.length !== this.props.options.length) {
      this.setState({ menuItemRefs: this.props.options.map(() => React.createRef()) });
    }
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
    // this.props.blurAllChips();
    this.setState({isFocused: true});
  }

  handleKeyDown = (e) => {
    // console.log(value);
    const { target: { value } } = e;
    if (e.keyCode === this.props.submitKeyCode) {
      this.handleSubmit(value);
    } else if (e.keyCode === 38) {
      // console.log(this.state.index);
      const index = this.state.index <= -1 ? this.state.index : this.state.index - 1;
      // this.focusMenuItem(index);
      this.setState(prevState => ({ index }));
    } else if (e.keyCode === 40) {
      // console.log('AAAA',this.state.index, this.state.menuItemRefs.length);
      const index = this.state.index >= this.state.menuItemRefs.length - 1 ? this.state.menuItemRefs.length - 1 : this.state.index + 1;
      // this.focusMenuItem(index);
      this.setState(prevState => ({ index }));
    } else if (e.keyCode === 37) {
      if (value === '') {
        this.props.onKeyDown(e);
      }
    } else if ([35, 36].includes(e.keyCode)) {
      this.props.onKeyDown(e);
    } else {
      this.setState({ index: -1 });
    }
  }


  eligibleForSubmit = (value) => {
    if (value === "" && this.state.index === -1) {
      return false;
    }
    else if (this.props.aliasMode) {
      return value;
    } else {
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

  hideMenu = () => {
    this.setState({isFocused: false});
  }

  handleChange = ({ target: { value } }) => {
    // console.log('handle change:', value);
    // this.setState({ value: value });
    this.props.onChange(value);
  }

  generateMenuClick = (i) => () => {
    this.onMenuClick(i);
  }

  render() {
    // console.log('AutocompleteTextInput', this.props, this.state);
    return (
      <span>
          {/* <input ref={this.props.inputRef}
            autoFocus
            value={this.props.value}
            onKeyDown={this.handleKeyDown}
            onBlur={this.onBlur}
            onChange={this.handleChange}
            fullWidth />
          <Menu
            options={this.props.options.filter(o => o.type !== "userinput")}
            registerMenuItem={this.registerMenuItem}
            unregisterMenuItem={this.unregisterMenuItem}
            focusedIndex={this.state.index}
            menuItemRefs={this.state.menuItemRefs}
            onClick={this.onMenuClick}
            onMouseEnter={this.onMouseEnter}
            onMouseLeave={this.onMouseLeave}
          /> */}
          <Dropdown
            // onToggle={this.onToggle}
            onSelect={this.hideMenu}
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
          <Button className="inputButton" onClick={this.addButtonClick} isDisabled={!this.eligibleForSubmit(this.props.value)}>Add</Button>
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
  submitKeyCode: 13,
  value: '',
  matchingFunction: value => option => option.label.toLowerCase().includes(value.toLowerCase()),
};
