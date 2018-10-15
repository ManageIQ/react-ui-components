import React from 'react';
import PropTypes from 'prop-types';
import ExpressionEditorPropTypes from './ExpressionEditorPropTypes';
import MenuItem from './MenuItem';

class Menu extends React.Component {
  renderOption = (option, index) => (
    <MenuItem
      key={option.id}
      option={option}
      index={index}
      onClick={this.props.onClick}
      // onKeyDown={this.props.onKeyDown}
      focused={this.props.focusedIndex === index}
      // registerMenuItem={this.props.registerMenuItem}
      // unregisterMenuItem={this.props.unregisterMenuItem}
      menuItemRef={this.props.menuItemRefs[index]}
      onMouseEnter={this.props.onMouseEnter}
      onMouseLeave={this.props.onMouseLeave}
    />
  )


  render() {
    return (
      <ul>
        {this.props.options.map(((option, index) => (this.renderOption(option, index))))}
      </ul>
    );
  }
}

Menu.propTypes = {
  options: PropTypes.arrayOf(ExpressionEditorPropTypes.option),
  onClick: PropTypes.func.isRequired,
  // onKeyDown: PropTypes.func.isRequired,
  menuItemRefs: PropTypes.arrayOf(PropTypes.object),
  // registerMenuItem: PropTypes.func,
  // unregisterMenuItem: PropTypes.func,
  focusedIndex: PropTypes.number,
};

export default Menu;
