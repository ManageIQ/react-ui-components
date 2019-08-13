import React from 'react';
import PropTypes from 'prop-types';
import { MenuItem } from 'patternfly-react';
import { ToolbarClick } from './ToolbarClick';

export const ToolbarListItem = props => (
  props.type === 'separator' ?
    <MenuItem key={props.id} disabled={!props.enabled} eventKey={props.id} divider /> :
    <MenuItem key={props.id} disabled={!props.enabled} eventKey={props.id} >
      <ToolbarClick {...props} />
    </MenuItem>
);

ToolbarListItem.propTypes = {
  id: PropTypes.string.isRequired,
  enabled: PropTypes.bool,
  type: PropTypes.string.isRequired,
};
