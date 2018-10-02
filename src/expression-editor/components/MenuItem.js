import React from 'react';
import PropTypes from 'prop-types';
import ExpressionEditorPropTypes from './ExpressionEditorPropTypes';

class MenuItem extends React.Component {
  onClick = () => {
    this.props.onClick(this.props.option);
  }

  // onKeyDown = (key) => {
  //   this.props.onKeyDown(key);
  // }

  focusedClass = () => (
    (this.props.focused && { color: 'red' }) || {}
  )

  render() {
    // console.log('CLASS:',this.focusedClass());
    // console.log('menu ref: ',this.props.option.label, this.menuRef)
    return (
      <li
        ref={this.props.menuItemRef}
        style={this.focusedClass()}
        // onFocus={() => this.setState({ focused: true })} onBlur={() => this.setState({ focused: false })}
        // onKeyDown={this.onKeyDown}
        key={this.props.option.id}
        onClick={this.onClick}
      >{this.props.option.label}
      </li>
    );
  }
}

MenuItem.propTypes = {
  option: ExpressionEditorPropTypes.option,
  onClick: PropTypes.func.isRequired,
  // index: PropTypes.number,
  // registerMenuItem: PropTypes.func,
  // unregisterMenuItem: PropTypes.func,
  focused: PropTypes.bool,
  // onKeyDown: PropTypes.func,
  menuItemRef: PropTypes.object,
};

export default MenuItem;
