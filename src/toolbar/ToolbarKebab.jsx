import React from 'react';
import PropTypes from 'prop-types';
import { DropdownButton, MenuItem } from 'patternfly-react';
import { ToolbarClick } from './ToolbarClick';
import { ToolbarListItem } from './ToolbarListItem';

// const classNames = require('classnames');

// const nestedItem = item => (
//   <li>
//     <ToolbarClick
//       item={item}
//       on-item-click="vm.onItemClick({item: item, $event: $event})"
//     />
//   </li>
// );

/*
  <ul uib-dropdown-menu>
    { item.items
      .filter(i => i.type !== 'separator')
      .map(subitem => nestedItem(subitem)) }
  </ul>
  */

const ToolbarSubmenu = props => (
  <ul className="dropdown-submenu">
    { props.items.filter(i => !i.hidden).map(item => <ToolbarListItem {...item} />) }
  </ul>
);

ToolbarSubmenu.propTypes = {
  items: PropTypes.arrayOf(PropTypes.any),
};

const KebabListItem = item => (
  item.type === 'separator' ?
    <MenuItem disabled={!item.enabled} eventKey={item.id} divider /> :
    <MenuItem disabled={!item.enabled} eventKey={item.id} >
      {item.type === 'buttonSelect' ?
        <ToolbarSubmenu {...item} /> : <ToolbarClick {...item} />
      }
    </MenuItem>
);

// const kebabItem = item => (
//   <li
//     role={item.isSeparator ? 'separator' : 'menuitem'}
//     className={classNames({
//       divider: item.isSeparator,
//       disabled: item.isDisabled,
//       'dropdown-submenu': item.type === 'buttonSelect',
//     })}
//   >
//     { item.type !== 'separator' &&
//       <ToolbarClick
//         ng-if="kebabItem.type !== 'separator'"
//         on-item-click="kebabItem.type !== 'buttonSelect' && vm.onItemClick({item: item, $event: $event})"
//         item={kebabItem}
//       />
//     }
//     { kebabItem.type === 'buttonSelect' &&
//       <ul uib-dropdown-menu>
//         { item.items
//           .filter(i => i.type !== 'separator')
//           .map(subitem => nestedItem(subitem)) }
//       </ul>
//     }
//   </li>
// );

// export const ToolbarKebab = props => (
//   <div uib-dropdown className="dropdown-kebab-pf">
//     <button uib-dropdown-toggle className="btn btn-link" type="button">
//       <span className="fa fa-ellipsis-v" />
//     </button>
//     <ul uib-dropdown-menu aria-labelledby="dropdownKebab">
//       {props.items.map(item => KebabListItem(item))}
//     </ul>
//   </div>
// );

export const ToolbarKebab = props => (
  <DropdownButton title={<span className="fa fa-ellipsis-v" />}>
    {props.items.map(item => KebabListItem(item))}
  </DropdownButton>
);

ToolbarKebab.propTypes = {
  items: PropTypes.arrayOf(PropTypes.any),
};

export default ToolbarKebab;
