import * as React from 'react';
import PropTypes from 'prop-types';

import './styles.scss';

import { ToolbarView } from './ToolbarView';
import { ToolbarButton } from './ToolbarButton';
import { ToolbarKebab } from './ToolbarKebab';
import { ToolbarList } from './ToolbarList';
import CountContext from './ToolbarContext';

export const ButtonType = {
  BUTTON: 'button',
  BUTTON_TWO_STATE: 'buttonTwoState',
  BUTTON_SELECT: 'buttonSelect',
  SEPARATOR: 'separator',
  KEBAB: 'kebab',
};

const isButton = item => (item.type === ButtonType.BUTTON);
const isButtonTwoState = item => (item.type === ButtonType.BUTTON_TWO_STATE);
const isButtonSelect = item => (item.type === ButtonType.BUTTON_SELECT);
const isKebabMenu = item => (item.type === ButtonType.KEBAB);

const isButtonSelectVisible = props => props.items.filter(i => !i.hidden).length !== 0;

const isVisibleButtonOrSelect = item => (
  item.type && (
    (isButtonSelect(item) && isButtonSelectVisible(item))
    || (isButton(item) && !item.hidden)
    || (isButtonTwoState(item) && !item.hidden)
    || (isKebabMenu(item) && !item.hidden)
  )
);

const toolbarGroupHasContent = group =>
  group &&
    group.filter(item => item &&
      isVisibleButtonOrSelect(item)).length !== 0;

const buttonCase = (item, index, onClick) => {
  if (isButton(item) || isButtonTwoState(item)) {
    return <ToolbarButton key={index} {...item} onClick={onClick} />;
  } else if (isButtonSelect(item) && (item.items.length > 0)) {
    return <ToolbarList key={index} {...item} onClick={onClick} />;
  } else if (isKebabMenu(item) && (item.items.length > 0)) {
    return <ToolbarKebab key={index} {...item} onClick={onClick} />;
  }
  return null;
};

/* custom buttons have ID's starting with this: */
const CUSTOM_ID = 'custom_';

const collapseCustomGroups = itemsGroup => (
  itemsGroup.length < 4
    ? itemsGroup
    : itemsGroup.reduce((acc, i) => {
      if (i.id.includes(CUSTOM_ID)) {
        acc[0].items.push(i);
      } else {
        acc.push(i);
      }
      return acc;
    }, [{ type: ButtonType.KEBAB, items: [] }])
);

export const ToolbarGroup = ({ group, onClick }) => {
  const visibleItems = group.filter(isVisibleButtonOrSelect);

  if (visibleItems.length === 0) {
    return null;
  }

  return (
    <span className="miq-toolbar-group form-group">
      {visibleItems.map((i, index) => buttonCase(i, index, onClick))}
    </span>
  );
};

ToolbarGroup.propTypes = {
  group: PropTypes.arrayOf(PropTypes.any),
  onClick: PropTypes.func.isRequired,
};

export const Toolbar = props => (
  <CountContext.Provider value={props.count}>
    <div className="toolbar-pf-actions miq-toolbar-actions">
      { props.groups
        .filter(toolbarGroupHasContent)
        .map((group, index) =>
          /* eslint react/no-array-index-key: "off" */
          <ToolbarGroup key={index} onClick={props.onClick} group={collapseCustomGroups(group)} />)
      }
      <ToolbarView onClick={props.onViewClick} views={props.views} />
    </div>
  </CountContext.Provider>
);

Toolbar.propTypes = {
  count: PropTypes.number.isRequired,
  groups: PropTypes.arrayOf(PropTypes.any), // array of arrays of buttons
  views: PropTypes.arrayOf(PropTypes.any), // array of view buttons
  onClick: PropTypes.func.isRequired,
  onViewClick: PropTypes.func.isRequired,
};
