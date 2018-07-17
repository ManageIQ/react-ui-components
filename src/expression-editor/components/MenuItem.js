import React from 'react';
import PropTypes from 'prop-types';
import ExpressionEditorPropTypes from './ExpressionEditorPropTypes'

class MenuItem extends React.Component {

  onClick = () => {
    this.props.onClick(this.props.option);
  }

  render() {
    // console.log('menu item', this.props.option);
    return (
      <li key={this.props.option.id} onClick={this.onClick}>{this.props.option.label}</li>
    )
  }
}

MenuItem.propTypes = {
  option: ExpressionEditorPropTypes.option,
  onClick: PropTypes.func.isRequired,
}

export default MenuItem;
