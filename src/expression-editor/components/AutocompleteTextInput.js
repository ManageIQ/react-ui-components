import React from 'react';
import PropTypes from 'prop-types';
import { Dropdown, DropdownToggle, DropdownItem, DropdownSeparator } from '@patternfly/react-core';

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

    if (this.props.value === "") {
      // console.log('DELETEEEEEEEEE', this.props);
      // this.props.deleteExpression();
      return;
    }
    const selected = this.props.options.find(this.props.matchingFunction(this.props.value)) || {
      id: this.props.value, label: this.props.value, type: 'userinput', next: this.props.next,
    };
    console.log('XXXXXXXXXXXXXX', selected);
    this.props.onSubmit(selected);
  }

  onFocus = () => {
    this.setState({isFocused: true});
  }

  handleKeyDown = (e) => {
    // console.log(value);
    const { target: { value } } = e;
    if (e.keyCode === this.props.submitKeyCode) {
      let selected = {label: ""};
      if (this.state.index === -1) {
        selected = this.props.options.find(this.props.matchingFunction(value)) || {
          id: value, label: value, type: 'userinput', next: this.props.next,
        };
      } else {
        selected = this.props.options[this.state.index];
      }
      if (selected.label === "") {
        return;
      }

      this.props.onSubmit(selected);
      this.setState({ index: -1 });
    } else if (e.keyCode === 38) {
      console.log(this.state.index);
      const index = this.state.index <= 0 ? this.state.index : this.state.index - 1;
      // this.focusMenuItem(index);
      this.setState(prevState => ({ index }));
    } else if (e.keyCode === 40) {
      console.log('AAAA',this.state.index, this.state.menuItemRefs.length);
      const index = this.state.index >= this.state.menuItemRefs.length - 1 ? this.state.menuItemRefs.length - 1 : this.state.index + 1;
      // this.focusMenuItem(index);
      this.setState(prevState => ({ index }));
    } else if (e.keyCode === 37) {
      if (value === '') {
        this.props.onKeyDown(e);
      }
    } else {
      this.setState({ index: -1 });
    }
  }

  hideMenu = () => {
    this.setState({isFocused: false});
  }
/*
  registerMenuItem = (ref) => {
    // console.log('register:', ref);
    this.setState(prevState => ({ menuItemRefs: [...prevState.menuItemRefs, ref] }));
  }

  unregisterMenuItem = (index) => {
    this.setState(prevState => ({ toDelete: { ...prevState.toDelete, [index]: true } }));
  }

  focusMenuItem = (index) => {
    // console.log('focus', index);
    // this.state.menuItemRefs[index].current.focus();
  }

  onMouseEnter = (index) => {
    this.setState({ index });
  }

  onMouseLeave = (a) => {
    console.log('MOUSE LEAVE', a);
  }*/

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
        <div>
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
          {this.props.options.filter(o => o.type !== "userinput").map((o, i) => (
            <DropdownItem
              component="button"
              isHovered={this.state.index === i}
              onClick={(this.generateMenuClick(i))}
            >
              {o.label}
            </DropdownItem>))}
          </Dropdown>
        </div>
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
};

AutocompleteTextInput.defaultProps = {
  submitKeyCode: 13,
  value: '',
  matchingFunction: value => option => option.label.toLowerCase().includes(value.toLowerCase()),
};
