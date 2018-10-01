import React from 'react';
import PropTypes from 'prop-types';
import ExpressionEditorPropTypes from './ExpressionEditorPropTypes'

class MenuItem extends React.Component {
  constructor(props) {
    super(props);

    // this.menuRef = React.createRef();
  }

  componentDidMount() {
    // console.log('did mount', this.menuRef.current);
    // this.props.registerMenuItem(this.menuRef);
  }

  componentWillUnmount() {
    // console.log('will unmount');
    // this.props.unregisterMenuItem(this.props.index);
  }

  componentDidUpdate(prevProps, prevState) {
      // this.menuRef = React.createRef();
      // this.props.updateMenuItem(this.menuRef, this,props.index);
  }

  onClick = () => {
    this.props.onClick(this.props.option);
  }

  onKeyDown = () => {
    this.props.onKeyDown(index);
  }

  focusedClass = () => (
    this.props.focused && {'color': 'red'} || {}
  )

  render() {
    // console.log('CLASS:',this.focusedClass());
    // console.log('menu ref: ',this.props.option.label, this.menuRef)
    return (
      <li ref={this.props.menuItemRef} style={this.focusedClass()}
        // onFocus={() => this.setState({ focused: true })} onBlur={() => this.setState({ focused: false })}
        onKeyDown={this.onKeyDown}  key={this.props.option.id} onClick={this.onClick}>{this.props.option.label}</li>
    )
  }
}

MenuItem.propTypes = {
  option: ExpressionEditorPropTypes.option,
  onClick: PropTypes.func.isRequired,
  index: PropTypes.number,
  registerMenuItem: PropTypes.func,
  unregisterMenuItem: PropTypes.func,
  focused: PropTypes.bool,
}

export default MenuItem;
