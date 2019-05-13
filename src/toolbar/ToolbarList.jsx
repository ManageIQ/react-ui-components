// import React, { useState } from 'react';
import React from 'react';
import PropTypes from 'prop-types';
import some from 'lodash/some';
import { DropdownButton, MenuItem } from 'patternfly-react';
import { ToolbarClick } from './ToolbarClick';

// const classNames = require('classnames');

/* FIXME ?
public $onChanges(changesObj: any) {
  if (changesObj.toolbarList) {
    this.isEmpty = this.isToolbarEmpty();
  }
} */

const isToolbarNonEmpty = props =>
  props &&
  props.items &&
  some(props.items, item => !item.hidden);

// const isToolbarEnabled = props =>
//   props.toolbarList &&
//   props.toolbarList.enabled &&
//   props.toolbarList.items &&
//   some(props.items, item => item.enabled);

const ToolbarSeparator = props => (
  <span
    style={props.hidden ? { display: 'none !important' } : {}}
    className="divider"
    role="presentation"
  />
);

ToolbarSeparator.propTypes = {
  hidden: PropTypes.bool,
};

/*
 * on-item-click="vm.onItemClick({item: item, $event: $event})"
 */

// const ToolbarListItem = item => (
//   <li className={classNames({ disabled: !item.enabled })}>
//     { item.type === 'separator' ?
//       <ToolbarSeparator hidden={item.hidden} /> :
//       <ToolbarClick item={item} />
//     }
//   </li>
// );

// <MenuItem divider />

const ToolbarListItem = item => (
  item.type === 'separator' ?
    <MenuItem eventKey={item.id} divider /> :
    <MenuItem eventKey={item.id} >
      <ToolbarClick {...item} />
    </MenuItem>
);

/*
 * useState ... expanded
 *
 * uib-dropdown-menu, uib-dropdown-toggle we do not have
 * also seems we need to remove the (default? display-none on dropdown-menu)
 */

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
  if (!isToolbarNonEmpty(props)) {
    return null;
  }

  // return (
  //   <span className={classNames('btn-group', props.dropdownClass)} uib-dropdown>
  //     <button
  //       type="button"
  //       className={classNames('btn btn-default dropdown-toggle', { disabled: !isToolbarEnabled(props) })}
  //       title={props.title}
  //       onClick={() => setExpanded(!expanded)}
  //     >
  //       { props.icon && <i className={props.icon} style={{ color: props.color }} /> }
  //       { props.text }
  //       <span className="caret" />
  //     </button>
  //     { expanded ?
  //       <ul className="dropdown-menu" role="menu" style={{ display: 'initial' }}>
  //         { props.items.map(item => ToolbarListItem(item)) }
  //       </ul> :
  //       null
  //       }
  //   </span>
  // );

  return (
    <DropdownButton title={toolbarListTitle(props)}>
      { props.items.filter(i => !i.hidden).map(item => ToolbarListItem(item)) }
    </DropdownButton>
  );
};

ToolbarList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.any),
  // dropdownClass: PropTypes.string,
  // title: PropTypes.string,
  // icon: PropTypes.string,
  // color: PropTypes.string,
  // text: PropTypes.string,
  // onItemClick: (args: {item: any}) => void;
};

/**
 * @memberof miqStaticAssets
 * @ngdoc component
 * @name miqToolbarList
 * @description
 *    Component which will generate list in toolbar with toolbarItems as dropdown menu.
 *
 * @attr {Expression} onItemClick
 *    Method which will be executed when clicked on view. See
 *    {@link miqStaticAssets.ToolbarListController#onItemClick} which arguments are
 *    needed.
 * @attr {Array} toolbarItems
 *    List of all items which are used in toolbar. Since we use typescript this attribute has specific type of:
 *    `Array<Array<IToolbarItem>>` See {@link IToolbarItem} for entities of toolbarItems.
 * @example
 * <miq-toolbar-list toolbar-list="ctrl.toolbarItems"
 *                   on-item-click="ctrl.onClick(item)">
 * </miq-toolbar-list>
 */
