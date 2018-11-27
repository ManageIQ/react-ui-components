import React from 'react';
import PropTypes from 'prop-types';
// import { Label } from 'patternfly-react';
import { Dropdown, DropdownToggle, DropdownItem, DropdownSeparator, Label } from '@patternfly/react-core';

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

  onKeyDown = (e) => {
    let index = this.state.menuIndex;
    console.log(e.ctrlKey);
    switch (e.keyCode) {
      case 38:
        index = this.state.menuIndex <= -1 ? this.state.menuIndex : this.state.menuIndex - 1;
        this.setState(prevState => ({ menuIndex: index }));
        break;
      case 40:
        index = this.state.menuIndex >= this.state.menuItems.length - 1 ? this.state.menuItems.length - 1 : this.state.menuIndex + 1;
        this.setState(prevState => ({ menuIndex: index }));
        break;
      case 13:
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
    // console.log('focused: ', this.state.focused)
    // const { a, b, ...rest } = this.props;
    return (
      <Dropdown
        // onToggle={this.onToggle}
        // onSelect={this.hideMenu}
        // onFocus={this.onFocus}
        onBlur={this.onBlur}
        toggle={
          <span
            ref={this.props.chipRef}
            onKeyDown={this.onKeyDown}
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
