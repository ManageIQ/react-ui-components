import React from 'react';
import PropTypes from 'prop-types';

import { adjustColor } from './utility';

const iconStyle = item => (
  item.text ?
    { color: adjustColor(item.color, item.enabled), marginRight: '5px' } :
    { color: adjustColor(item.color, item.enabled) }
);

export const ToolbarClick = props => (
  <span
    tabIndex={0}
    role="button"
    title={props.title}
    style={props.hidden ? { display: 'none !important' } : {}}
    name={props.id}
    id={props.id}
  >
    { props.icon && <i className={props.icon} style={iconStyle(props)} /> }
    { props.img_url && !props.icon &&
      <img
        alt={props.title}
        src={props.img_url}
      />
    }
    <span>{props.text}</span>
  </span>
);

ToolbarClick.propTypes = {
  title: PropTypes.string,
  text: PropTypes.string,
  id: PropTypes.string,
  hidden: PropTypes.bool,
  img_url: PropTypes.string,
  icon: PropTypes.string,
};
