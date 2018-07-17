import React from 'react';
import PropTypes from 'prop-types';
import ExpressionEditorPropTypes from './ExpressionEditorPropTypes'
import MenuItem from './MenuItem'

class Menu extends React.Component {

  renderOption = (option) => (
    <MenuItem key={option.id} option={option} onClick={this.props.onClick} />
  )

  render() {
    // console.log('menu', this.props.options);
    return (
      <ul>
        {this.props.options.map( (option => (this.renderOption(option)) ))}
      </ul>
    )
  }
}

Menu.propTypes = {
  options: PropTypes.arrayOf(ExpressionEditorPropTypes.option),
  onClick: PropTypes.func.isRequired,
}

export default Menu;
