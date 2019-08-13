import React from 'react';
import PropTypes from 'prop-types';
import { DropdownButton, MenuItem } from 'patternfly-react';
import HorizontalNavMenuItem from '../../node_modules/patternfly-react/dist/js/components/HorizontalNav/HorizontalNavMenuItem';
import { ToolbarClick } from './ToolbarClick';
import './styles.scss';

/*
  <ul uib-dropdown-menu>
    { item.items
      .filter(i => i.type !== 'separator')
      .map(subitem => nestedItem(subitem)) }
  </ul>
  */

/*
 * missing tooltip (fixed by passing ToolbarClick as title)
 * .btn-group.open .dropdown-toggle {
 *    box-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.125);
 * }
 */
const ToolbarSubmenu = props => (
  <HorizontalNavMenuItem
    id={props.id}
    title={
      <ToolbarClick
        hidden={props.hidden}
        text={props.text}
        title={props.title}
        icon={props.icon}
      />
    }
    dropdown
    submenu
  >
    { props.items.filter(i => !i.hidden).map(i => (
      <MenuItem eventKey={i.id}>
        <ToolbarClick {...i} onClick={props.onClick} />
      </MenuItem>
    )) }
  </HorizontalNavMenuItem>
);

ToolbarSubmenu.propTypes = {
  items: PropTypes.arrayOf(PropTypes.any),
  id: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  icon: PropTypes.string,
  hidden: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
};

const KebabListItem = (item, onClick) => {
  if (item.type === 'separator') {
    return <MenuItem disabled={!item.enabled} eventKey={item.id} divider />;
  }

  if (item.type === 'buttonSelect') {
    return <ToolbarSubmenu {...item} onClick={onClick} />;
  }

  return (
    <MenuItem disabled={!item.enabled} eventKey={item.id} >
      <ToolbarClick {...item} />
    </MenuItem>
  );
};

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

export const ToolbarKebab = props => (
  <div className="kebab">
    <DropdownButton title={<span className="fa fa-ellipsis-v" />}>
      {props.items.map(item => KebabListItem(item, props.onClick))}
    </DropdownButton>
  </div>
);

ToolbarKebab.propTypes = {
  items: PropTypes.arrayOf(PropTypes.any),
  onClick: PropTypes.func.isRequired,
};

export default ToolbarKebab;
