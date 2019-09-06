import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { DropdownButton } from 'patternfly-react';
import { ToolbarListItem } from './ToolbarListItem';
import { isEnabled } from './utility';

import CountContext from './ToolbarContext';

// const classNames = require('classnames');

const toolbarListTitle = props => (
  <React.Fragment>
    { props.icon && <i className={props.icon} style={{ color: props.color }} /> }
    { props.text }
  </React.Fragment>
);

toolbarListTitle.propTypes = {
  icon: PropTypes.string,
  color: PropTypes.string,
  text: PropTypes.string,
};

export const ToolbarList = (props) => {
  const count = useContext(CountContext);

  // Filter out invisible items.
  const visibleItems = props.items.filter(i => !i.hidden);

  // Do not render at all if no child is visible.
  if (visibleItems.length === 0) {
    return null;
  }

  // Calculate item's enable state based on item's initial enable state, onwhen and count.
  // Toolbar is disabled if no item is enabled.
  let isToolbarEnabled = false;
  const enabledItems = visibleItems.map((i) => {
    const enabled = i.enabled && isEnabled(i.onwhen, count);
    isToolbarEnabled = isToolbarEnabled || enabled;

    return {
      ...i,
      enabled,
    };
  });

  return (
    <DropdownButton id={props.id} disabled={!isToolbarEnabled} title={toolbarListTitle(props)}>
      { enabledItems.map(item => <ToolbarListItem key={item.id} {...item} onClick={props.onClick} />) }
    </DropdownButton>
  );
};

ToolbarList.propTypes = {
  id: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(PropTypes.any),
  onClick: PropTypes.func.isRequired,
  // dropdownClass: PropTypes.string,
  // title: PropTypes.string,
  // icon: PropTypes.string,
  // color: PropTypes.string,
  // text: PropTypes.string,
};
