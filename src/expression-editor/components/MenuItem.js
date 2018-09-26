import React from 'react';
import PropTypes from 'prop-types';
import ExpressionEditorPropTypes from './ExpressionEditorPropTypes'

class MenuItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      focused: false,
    }
    this.menuRef = React.createRef();
  }

  componentDidMount() {
    console.log('menu item', this.props);
    
    this.props.registerMenuItem(this.menuRef);

  }

  onClick = () => {
    this.props.onClick(this.props.option);
  }

  onKeyDown = () => {
    this.props.onKeyDown(index);
  }

  render() {
    return (
      <li ref={this.menuRef} onKeyDown={this.onKeyDown}  key={this.props.option.id} onClick={this.onClick}>{this.props.option.label}</li>
    )
  }
}

MenuItem.propTypes = {
  option: ExpressionEditorPropTypes.option,
  onClick: PropTypes.func.isRequired,
  index: PropTypes.number,
  registerMenuItem: PropTypes.func,
  unregisterMenuItem: PropTypes.func,
}

export default MenuItem;
