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
      focused={this.props.focusedIndex === index}
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
  menuItemRefs: PropTypes.arrayOf(PropTypes.object),
  onMouseEnter: PropTypes.func.isRequired,
  onMouseLeave: PropTypes.func.isRequired,
  focusedIndex: PropTypes.number,
};

export default Menu;
