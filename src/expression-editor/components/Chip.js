import React from 'react';
import PropTypes from 'prop-types';
import { Label } from 'patternfly-react';
import { Dropdown, DropdownToggle, DropdownItem, DropdownSeparator } from '@patternfly/react-core';

export default class Chip extends React.Component {
  focusedClass = () => (
    (this.props.isFocused && 'focusedChip') || ''
  )


  hideMenu = () => {
    this.setState({isFocused: false});
  }

  onBlur = () => {
    this.props.onBlur();
  }

  render() {
    // console.log('focused: ', this.state.focused)
    // const { a, b, ...rest } = this.props;
    return (
      <Dropdown
        // onToggle={this.onToggle}
        onSelect={this.hideMenu}
        toggle={
          <span
            ref={this.props.chipRef}
            onKeyDown={this.props.onKeyDown}
            tabIndex="0"
            onBlur={this.props.onBlur}
            onFocus={this.props.onFocus}
            className={`${this.focusedClass()}`}
            // {...rest}
          >
            <Label
              onRemoveClick={this.props.onDelete}
              onClick={this.props.onClick}
              onDoubleClick={this.props.onDoubleClick}
              bsStyle="primary"
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
          onClick={this.props.onDelete}
        >
          Set Alias
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
