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

export const ToolbarClick = ({ item }) => (
  <a
    title={item.title}
    style={item.hidden ? { display: 'none !important' } : {}}
    href=""
    data-explorer={item.explorer}
    data-confirm-tb={item.confirm}
    data-function={item.data && item.data.function}
    data-function-data={item.data && item.data['function-data']}
    data-target={item.data && item.data.target}
    data-toggle={item.data && item.data.toggle}
    data-click={item.id}
    name={item.id}
    id={item.id}
    data-url_parms={item.url_parms}
    data-send_checked={item.send_checked ? 'true' : ''}
    data-prompt={item.prompt}
    data-popup={item.popup}
    data-url={item.url}
    ng-click="onItemClick({item: item, $event: $event})"
  >
    { item.icon && <i className={item.icon} style={iconStyle(item)} /> }
    { item.img_url && !item.icon &&
      <img
        alt={item.title}
        src={item.img_url}
        data-enabled={item.img_url}
        data-disabled={item.img_url}
      />
    }
    <span>{item.text}</span>
  </a>
);

ToolbarClick.propTypes = {
  // text: PropTypes.text, FIXME
  item: PropTypes.any.isRequired,
};
