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

const isButtonOrSelect = item => (
  item.type && (
    (isButtonSelect(item) && item.items && item.items.length !== 0)
    || isButton(item)
    || isButtonTwoState(item)
    || isKebabMenu(item)
  )
);

const toolbarGroupHasContent = group =>
  group &&
    group.filter(item => item &&
      (isButtonOrSelect(item))).length !== 0;

const buttonCase = (item, index, onClick) => {
  if (isButton(item)) {
    return <ToolbarButton key={index} {...item} onClick={onClick} />;
  } else if (isButtonTwoState(item) && (item.id.indexOf('view_') === -1)) {
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

const ToolbarGroup = props => (
  <span className="miq-toolbar-group form-group">
    {props.group.filter(i => !i.hidden).map((i, index) => buttonCase(i, index, props.onClick))}
  </span>
);

ToolbarGroup.propTypes = {
  group: PropTypes.arrayOf(PropTypes.any),
  onClick: PropTypes.func.isRequired,
};

/*
 * based on ~/Projects/ui-components/src/toolbar/components/toolbar-menu/toolbar-menu.html
 */

/* loop over groups
 *   in each group
 *   loop over items
 *     case over button type
 *     custom_html
 *   end loop
 * end loop
 *
 *
 *  <ToolbarView                 FIXME
 *    views={props.views}
 *    on-item-click="vm.onViewClick({item: item, $event: $event})"
 *    className="miq-view-list"
 */

export const Toolbar = props => (
  <CountContext.Provider value={props.count}>
    <div className="toolbar-pf-actions miq-toolbar-actions">
      { props.groups
        .filter(toolbarGroupHasContent)
        .map((group, index) =>
          <ToolbarGroup key={index} onClick={props.onClick} group={collapseCustomGroups(group)} />)
      }
      <ToolbarView onClick={props.onClick} views={props.views} />
    </div>
  </CountContext.Provider>
);

Toolbar.propTypes = {
  count: PropTypes.number.isRequired,
  groups: PropTypes.arrayOf(PropTypes.any), // array of arrays of buttons
  views: PropTypes.arrayOf(PropTypes.any), // array of view buttons
  onClick: PropTypes.func.isRequired,
};
