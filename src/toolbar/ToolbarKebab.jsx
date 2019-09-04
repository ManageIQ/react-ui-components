import React from 'react';
import PropTypes from 'prop-types';
import { DropdownButton, MenuItem } from 'patternfly-react';
import HorizontalNavMenuItem from '../../node_modules/patternfly-react/dist/js/components/HorizontalNav/HorizontalNavMenuItem';
import { ToolbarClick } from './ToolbarClick';
import './styles.scss';

/*
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
      <MenuItem key={i.id} eventKey={i.id}>
        <ToolbarClick {...i} onClick={props.onClick} />
      </MenuItem>
    )) }
  </HorizontalNavMenuItem>
);

ToolbarSubmenu.propTypes = {
  items: PropTypes.arrayOf(PropTypes.any),
  id: PropTypes.string.isRequired,
  text: PropTypes.string,
  title: PropTypes.string.isRequired,
  icon: PropTypes.string,
  hidden: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
};

const KebabListItem = (item, onClick) => {
  if (item.type === 'separator') {
    return <MenuItem key={item.id} disabled={!item.enabled} eventKey={item.id} divider />;
  }

  if (item.type === 'buttonSelect') {
    return <ToolbarSubmenu key={item.id} {...item} onClick={onClick} />;
  }

  return (
    <MenuItem disabled={!item.enabled} eventKey={item.id} >
      <ToolbarClick key={item.id} {...item} />
    </MenuItem>
  );
};

export const ToolbarKebab = props => (
  <div className="kebab">
    <DropdownButton id="menu_kebab" title={<span className="fa fa-ellipsis-v" />}>
      {props.items.map(item => KebabListItem(item, props.onClick))}
    </DropdownButton>
  </div>
);

ToolbarKebab.propTypes = {
  items: PropTypes.arrayOf(PropTypes.any),
  onClick: PropTypes.func.isRequired,
};

export default ToolbarKebab;
