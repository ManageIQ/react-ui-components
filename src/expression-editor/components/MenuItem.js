import React from 'react';
import PropTypes from 'prop-types';
import ExpressionEditorPropTypes from './ExpressionEditorPropTypes';

class MenuItem extends React.Component {
  onClick = () => {
    this.props.onClick(this.props.option);
  }

  onMouseEnter = () => {
    this.props.onMouseEnter(this.props.index);
  }

  onMouseLeave = () => {
    this.props.onMouseLeave(this.props.index);
  }

  focusedClass = () => (
    (this.props.focused && 'focusedMenuItem') || ''
  )


  render() {
    // console.log('CLASS:',this.focusedClass());
    // console.log('menu ref: ',this.props.option.label, this.menuRef)
    return (
      <li
        ref={this.props.menuItemRef}
        // style={this.focusedClass()}
        className={`${this.focusedClass()}`}
        // onFocus={() => this.setState({ focused: true })} onBlur={() => this.setState({ focused: false })}
        // onKeyDown={this.onKeyDown}
        key={this.props.option.id}
        onClick={this.onClick}
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}
      >{this.props.option.label}
      </li>
    );
  }
}

MenuItem.propTypes = {
  option: ExpressionEditorPropTypes.option,
  onClick: PropTypes.func.isRequired,
  onMouseEnter: PropTypes.func.isRequired,
  onMouseLeave: PropTypes.func.isRequired,
  index: PropTypes.number,
  // registerMenuItem: PropTypes.func,
  // unregisterMenuItem: PropTypes.func,
  focused: PropTypes.bool.isRequired,
  // onKeyDown: PropTypes.func,
  menuItemRef: PropTypes.object.isRequired,
};

export default MenuItem;
