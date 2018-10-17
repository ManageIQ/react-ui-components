import React from 'react';
import PropTypes from 'prop-types';
import { Label } from 'patternfly-react';

export default class Chip extends React.Component {
  focusedClass = () => (
    (this.props.isFocused && 'focusedChip') || ''
  )

  render() {
    // console.log('focused: ', this.state.focused)
    // const { a, b, ...rest } = this.props;
    return (
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
          // onClick={this.props.onClick}
          onDoubleClick={this.props.onDoubleClick}
          bsStyle="primary"
        >
          {this.props.label}
        </Label>
      </span>
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
