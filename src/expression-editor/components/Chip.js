import React from 'react';
import PropTypes from 'prop-types';
import { Label } from 'patternfly-react'

export default class Chip extends React.Component {

  render () {
    return (
      <Label onClick={this.props.onClick} onDoubleClick={this.props.onDoubleClick}>{this.props.label}</Label>
    )
  }
}

Chip.propTypes = {
  onClick: PropTypes.func.isRequired,
  onDoubleClick: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
}
