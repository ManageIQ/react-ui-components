import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { DropdownButton, MenuItem, HorizontalNavMenuItem } from 'patternfly-react';
import { ToolbarClick } from './ToolbarClick';
import './styles.scss';

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
    onMouseEnter={() => props.setIsOpenId(props.id)}
    onItemClick={() => props.setIsOpenId(props.id)}
    onToggle={() => null}
    open={props.openId === props.id}
    onSelect={props.onSelect}
    onKeyDown={props.onKeyDown}
  >
    { props.items.filter(i => !i.hidden).map(i => (
      <MenuItem
        key={i.id}
        eventKey={i.id}
        onClick={props.onClick && i.enabled ? (() => props.onClick(i)) : null}
      >
        <ToolbarClick {...i} />
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
  openId: PropTypes.string,
  setIsOpenId: PropTypes.func.isRequired,
  onSelect: PropTypes.func,
  onKeyDown: PropTypes.func,
};

ToolbarSubmenu.defaultProps = {
  onSelect: null,
  onKeyDown: null,
};


const KebabListItem = (item, props, openId, setIsOpenId) => {
  if (item.type === 'separator') {
    return <MenuItem key={item.id} disabled={!item.enabled} eventKey={item.id} divider />;
  }

  if (item.type === 'buttonSelect') {
    // eslint-disable-next-line react/prop-types
    return <ToolbarSubmenu key={item.id} {...item} onClick={props.onClick} openId={openId} setIsOpenId={setIsOpenId} />;
  }

  return (
    <MenuItem
      disabled={!item.enabled}
      eventKey={item.id}
    >
      <ToolbarClick key={item.id} {...item} />
    </MenuItem>
  );
};

export const ToolbarKebab = (props) => {
  const [openId, setIsOpenId] = useState(undefined);

  return (
    <div className="kebab">
      <DropdownButton onClick={() => setIsOpenId(undefined)} id="menu_kebab" title={<span className="fa fa-ellipsis-v" />}>
        {props.items.map(item => KebabListItem(item, props, openId, setIsOpenId))}
      </DropdownButton>
    </div>
  );
};

ToolbarKebab.propTypes = {
  items: PropTypes.arrayOf(PropTypes.any),
  // eslint-disable-next-line react/no-unused-prop-types
  onClick: PropTypes.func.isRequired, // this really IS required
};

export default ToolbarKebab;
