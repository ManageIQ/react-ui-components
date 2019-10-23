import React from 'react';
import PropTypes from 'prop-types';
import { MenuItem } from 'patternfly-react';
import { ToolbarClick } from './ToolbarClick';

export const ToolbarListItem = props => (
  props.type === 'separator' ?
    <MenuItem key={props.id} disabled={!props.enabled} eventKey={props.id} divider /> :
    <MenuItem
      key={props.id}
      disabled={!props.enabled}
      eventKey={props.id}
      onClick={props.onClick && props.enabled ? (() => props.onClick(props)) : null}
      onSelect={props.onSelect}
      onKeyDown={props.onKeyDown}
    >
      <ToolbarClick {...props} />
    </MenuItem>
);

ToolbarListItem.propTypes = {
  id: PropTypes.string.isRequired,
  enabled: PropTypes.bool,
  type: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  onSelect: PropTypes.func,
  onKeyDown: PropTypes.func,
};

ToolbarListItem.defaultProps = {
  onSelect: null,
  onKeyDown: null,
};
