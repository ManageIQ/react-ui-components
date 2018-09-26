import React from 'react';
import PropTypes from 'prop-types';
import ExpressionEditorPropTypes from './ExpressionEditorPropTypes'
import MenuItem from './MenuItem'

class Menu extends React.Component {

  renderOption = (option, index) => (
    <MenuItem key={option.id} option={option} index={index} onClick={this.props.onClick} onKeyDown={this.props.onKeyDown}
      registerMenuItem={this.props.registerMenuItem}
      unregisterMenuItem={this.props.unregisterMenuItem}
    />
  )


  render() {
    // console.log('menu', this.props.options);
    return (
      <ul>
        {this.props.options.map( ((option, index) => (this.renderOption(option, index)) ))}
      </ul>
    )
  }
}

Menu.propTypes = {
  options: PropTypes.arrayOf(ExpressionEditorPropTypes.option),
  onClick: PropTypes.func.isRequired,
  registerMenuItem: PropTypes.func,
  unregisterMenuItem: PropTypes.func,
}

export default Menu;
