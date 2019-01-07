import React from 'react';
import PropTypes from 'prop-types';
import { Dropdown, DropdownToggle, DropdownItem, DropdownSeparator, Label } from '@patternfly/react-core';
import { keyCodes } from "../constants";

export default class Chip extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      enabledBlur: true,
      menuIndex: -1,
      menuItems: [{label: "Edit", onClick: props.onDoubleClick},
        {label: "Delete", onClick: props.onDelete},
        {label: "Set Alias", onClick: this.setAliasModeWrapper(true)},
        {label: "Remove Alias", onClick: this.setAliasWrapper(false)}
    ]
    };
  }

  focusedClass = () => (
    (this.props.isFocused && 'focusedChip') || ''
  )

  setAliasModeWrapper = (bool) => () => {
    this.props.onDoubleClick();
    this.props.setAliasMode(bool);
  }

  setAliasWrapper = (alias) => () => {
    this.props.setAlias(alias);
  }

  onKeyDown = (e) => {
    let index = this.state.menuIndex;
    switch (e.keyCode) {
      case keyCodes.upArrow:
        index = this.state.menuIndex <= -1 ? this.state.menuIndex : this.state.menuIndex - 1;
        this.setState(prevState => ({ menuIndex: index }));
        break;
      case keyCodes.downArrow:
        index = this.state.menuIndex >= this.state.menuItems.length - 1 ? this.state.menuItems.length - 1 : this.state.menuIndex + 1;
        this.setState(prevState => ({ menuIndex: index }));
        break;
      case keyCodes.enter:
        if (index > -1) {
          this.state.menuItems[index].onClick();
        } else {
          this.props.onDoubleClick();
        }
        break;
      default:
      this.props.onKeyDown(e);
    }
  }

  onBlur = () => {
    if (this.state.enabledBlur) {
      this.props.onBlur();
    }
  }

  blockBlur = () => {
    this.setState({enabledBlur: false});
  }

  render() {
    return (
      <Dropdown
        onBlur={this.onBlur}
        toggle={
          <span
            ref={this.props.chipRef}
            onKeyDown={this.onKeyDown}
            tabIndex="0"
            onFocus={this.props.onFocus}
            className={`${this.focusedClass()}`}
          >
            <Label
              onClick={this.props.onClick}
              onDoubleClick={this.props.onDoubleClick}
            >
              {this.props.label}
            </Label>
          </span>
        }
        // DISEAPEAR BEFORE CLICK
        isOpen={this.props.isFocused}
      >

        <div className="maxDropdownHeght">
          {this.state.menuItems.map((o, i) => (
            <DropdownItem
              component="button"
              className="dropdownFontSize"
              isHovered={this.state.menuIndex === i}
              onClick={o.onClick}
              onMouseDown={this.blockBlur}
            >
              {o.label}
            </DropdownItem>)
          )}
      </div>
      </Dropdown>
    );
  }
}

Chip.propTypes = {
  onDoubleClick: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onFocus: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  onKeyDown: PropTypes.func.isRequired,
  isFocused: PropTypes.bool.isRequired,
  chipRef: PropTypes.object.isRequired,
};
