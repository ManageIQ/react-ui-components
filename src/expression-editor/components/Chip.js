import React from 'react';
import PropTypes from 'prop-types';
import { Label } from 'patternfly-react'

export default class Chip extends React.Component {

  render () {
    return (
      <div onKeyDown={this.props.onKeyDown}>
        <Label onRemoveClick={this.props.onDelete} onClick={this.props.onClick} onDoubleClick={this.props.onDoubleClick}>{this.props.label}</Label>
      </div>
    )
  }
}

Chip.propTypes = {
  onClick: PropTypes.func.isRequired,
  onDoubleClick: PropTypes.func.isRequired,
  onDelete: PropTypes.func,
  label: PropTypes.string.isRequired,
  onKeyDown: PropTypes.func,
}
