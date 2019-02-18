import * as React from 'react';
import PropTypes from 'prop-types';
// import some from 'lodash/some';
import find from 'lodash/find';

import './styles.scss';

import { ToolbarView } from './ToolbarView';
import { ToolbarButton } from './ToolbarButton';
import { ToolbarKebab } from './ToolbarKebab';
import { ToolbarList } from './ToolbarList';

const classNames = require('classnames');

export const ButtonType = {
  BUTTON: 'button',
  BUTTON_TWO_STATE: 'buttonTwoState',
  BUTTON_SELECT: 'buttonSelect',
  CUSTOM: 'custom',
  SEPARATOR: 'separator',
  KEBAB: 'kebab',
};

const isButton = item => (item.type === ButtonType.BUTTON);
const isButtonTwoState = item => (item.type === ButtonType.BUTTON_TWO_STATE);
const isButtonSelect = item => (item.type === ButtonType.BUTTON_SELECT);
const isKebabMenu = item => (item.type === ButtonType.KEBAB);
const isCustom = item => (item.name && item.name === ButtonType.CUSTOM);

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
      (isButtonOrSelect(item) || isCustom(item))).length !== 0;

const onClick = () => console.log('FIXME: onClick');

const buttonCase = (item) => {
  console.log('item: ');
  console.log(item);
  if (isButton(item)) {
    console.log('NORMAL');
    return <ToolbarButton {...item} onClick={onClick} />;
  } else if (isButtonTwoState(item) && (item.id.indexOf('view_') === -1)) {
    console.log('TWOSTATE');
    return <ToolbarButton {...item} onClick={onClick} />;
  } else if (isButtonSelect(item) && (item.items.length > 0)) {
    console.log('SELECT');
    return <ToolbarList {...item} onClick={onClick} />;
  } else if (isKebabMenu(item) && (item.items.length > 0)) {
    console.log('KEBAB');
    return <ToolbarKebab kebab={item} onClick={onClick} />;
  } else if (isCustom(item) && item.args && item.args.html) {
    console.log('CUSTOM');
    return (
      // ng-bind-html="vm.trustAsHtml(item.args.html)"
      <div
        fixme
        className="miq-custom-html"
      />
    );
  }
  return null;
};

// const isCustomButton = item => item && item.id && item.id.includes('custom_');
// const hasCustomButtons = itemGroup => some(itemGroup, isCustomButton);
const toolbarHasCustom = group => find(group, { name: 'custom' });

const ToolbarGroup = props => (
  <span
    className={classNames('miq-toolbar-group', { 'form-group': !toolbarHasCustom(props.group) })}
  >
    {props.group.map(item => buttonCase(item))}
  </span>
);

ToolbarGroup.propTypes = {
  group: PropTypes.arrayOf(PropTypes.any),
};

/*
 * podle ./components/toolbar-menu/toolbar-menu.html
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
  <div className="toolbar-pf-actions miq-toolbar-actions">
    { props.groups.filter(toolbarGroupHasContent).map(group => <ToolbarGroup group={group} />) }
    <ToolbarView views={props.views} />
  </div>
);

Toolbar.propTypes = {
  groups: PropTypes.arrayOf(PropTypes.any), // array of arrays of buttons
  views: PropTypes.arrayOf(PropTypes.any), // array of view buttons
};
