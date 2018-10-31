import React from 'react';
import PropTypes from 'prop-types';
import { Label } from 'patternfly-react';
import { Dropdown, DropdownToggle, DropdownItem, DropdownSeparator } from '@patternfly/react-core';

export default class Chip extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isFocused: false
    };
  }

  focusedClass = () => (
    (this.props.isFocused && 'focusedChip') || ''
  )

  hideMenu = () => {
    // console.log('ON MENU BLUR');
    this.props.onBlur()
  }

  onBlur = () => {
    // this.setState({isFocused: false});
    setTimeout(() => this.props.onBlur(), 50);
  }

  onFocus = () => {
    this.setState({isFocused: true});
    // this.props.onBlur();
  }

  chipStyle = (type) => {
    switch (type) {
      case "logicalOperator":
        return "primary"
      case "operator":
        return "info"
      case "category":
        return "info"
      case "userinput":
        return "info"
      default:
        return "info"

    }
  }

  setAliasModeWrapper = (bool) => () => {
    this.props.onDoubleClick();
    this.props.setAliasMode(bool);
  }

  setAliasWrapper = (alias) => () => {
    // this.props.onDoubleClick();
    this.props.setAlias(alias);
  }

  render() {
    // console.log('focused: ', this.state.focused)
    // const { a, b, ...rest } = this.props;
    return (
      <Dropdown
        // onToggle={this.onToggle}
        // onSelect={this.hideMenu}
        // onFocus={this.onFocus}
        // onBlur={this.onBlur}
        toggle={
          <span
            ref={this.props.chipRef}
            onKeyDown={this.props.onKeyDown}
            tabIndex="0"
            // onBlur={this.onBlur}
            onFocus={this.props.onFocus}
            className={`${this.focusedClass()}`}
            // {...rest}
          >
            <Label
              // onRemoveClick={this.props.onDelete}
              onClick={this.props.onClick}
              onDoubleClick={this.props.onDoubleClick}
              bsStyle={this.chipStyle(this.props.type)}
            >
              {this.props.label}
            </Label>
          </span>
        }
        // DISEAPEAR BEFORE CLICK
        isOpen={this.props.isFocused}
      >
        <DropdownItem
          component="button"
          // isHovered={this.state.index === i}
          onClick={this.props.onDoubleClick}
        >
          Edit
        </DropdownItem>
        <DropdownItem
          component="button"
          // isHovered={this.state.index === i}
          onClick={this.props.onDelete}
        >
          Delete
        </DropdownItem>
          <DropdownItem
            component="button"
            // isHovered={this.state.index === i}
            onClick={this.setAliasModeWrapper(true)}
          >
            Set Alias
          </DropdownItem> 
          <DropdownItem
            component="button"
            // isHovered={this.state.index === i}
            onClick={this.setAliasWrapper(false)}
          >
            Remove Alias
          </DropdownItem>
      </Dropdown>
    );
  }
}

Chip.propTypes = {
  // onClick: PropTypes.func.isRequired,
  onDoubleClick: PropTypes.func.isRequired,
  onDelete: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  label: PropTypes.string.isRequired,
  onKeyDown: PropTypes.func,
  isFocused: PropTypes.bool.isRequired,
  chipRef: PropTypes.object.isRequired,
};

Chip.defaultProps = {
  onFocus: () => {},
  onBlur: () => {},

};
