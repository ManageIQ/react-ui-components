import React from 'react';
import PropTypes from 'prop-types';

import { adjustColor } from './utility';

/*
 * from ~/Projects/ui-components/src/toolbar/components/toolbar-menu/toolbar-item-click.html
 */

const iconStyle = item => (
  item.text ?
    { color: adjustColor(item.color, item.enabled), marginRight: '5px' } :
    { color: adjustColor(item.color, item.enabled) }
); /* FIXME: test null, or classNames */

/*    ng-hide="item.hidden" */

export const ToolbarClick = props => (
  <span
    tabIndex={0}
    role="button"
    title={props.title}
    style={props.hidden ? { display: 'none !important' } : {}}
    data-explorer={props.explorer}
    data-confirm-tb={props.confirm}
    data-function={props.data && props.data.function}
    data-function-data={props.data && props.data['function-data']}
    data-target={props.data && props.data.target}
    data-toggle={props.data && props.data.toggle}
    data-click={props.id}
    name={props.id}
    id={props.id}
    data-url_parms={props.url_parms}
    data-send_checked={props.send_checked ? 'true' : ''}
    data-prompt={props.prompt}
    data-popup={props.popup}
    data-url={props.url}
    onClick={props.onClick && (() => props.onClick(props))}
  >
    { props.icon && <i className={props.icon} style={iconStyle(props)} /> }
    { props.img_url && !props.icon &&
      <img
        alt={props.title}
        src={props.img_url}
        data-enabled={props.img_url}
        data-disabled={props.img_url}
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
  explorer: PropTypes.bool,
  send_checked: PropTypes.bool,
  prompt: PropTypes.string,
  confirm: PropTypes.string,
  popup: PropTypes.bool,
  img_url: PropTypes.string,
  url: PropTypes.string,
  url_parms: PropTypes.string,
  icon: PropTypes.string,
  data: PropTypes.shape({
    function: PropTypes.string,
    'function-data': PropTypes.string,
    target: PropTypes.string,
    toggle: PropTypes.string,
  }),
  onClick: PropTypes.func,
};
