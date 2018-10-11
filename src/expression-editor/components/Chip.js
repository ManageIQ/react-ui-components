import React from 'react';
import PropTypes from 'prop-types';
import { Label } from 'patternfly-react';

export default class Chip extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      focused: false,
    };
    // this.chipRef = React.createRef();
  }

  componentDidMount() {
    // this.props.registerChip(this.chipRef, this.props.index);
  }

  componentWillUnmount() {
    // this.props.unregisterChip(this.props.index);
  }

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
  onClick: PropTypes.func.isRequired,
  onDoubleClick: PropTypes.func.isRequired,
  onDelete: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  label: PropTypes.string.isRequired,
  index: PropTypes.number,
  onKeyDown: PropTypes.func,
  registerChip: PropTypes.func,
  unregisterChip: PropTypes.func,
};

Chip.defaultProps = {
  onFocus: () => {},
  onBlur: () =>  {}
}
