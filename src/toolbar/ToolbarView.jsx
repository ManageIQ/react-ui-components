import React from 'react';
import PropTypes from 'prop-types';
import { adjustColor } from './utility';

const classNames = require('classnames');

/* vm.onItemClick({view: view, $event: $event}) */
const onClick = () => console.log('placeholder');

const logit = (d) => {
  console.log('views: ');
  console.log(d);
  return d;
};

/* FIXME: implement onClick */
export const ToolbarView = props => (
  <span className="toolbar-pf-view-selector pull-right form-group">
    { logit(props.views).map(view => (
      <button
        id={view.id}
        name={view.name}
        title={view.title}
        className={classNames('btn btn-link', { active: view.selected })}
        data-url={view.url}
        data-url_parms={view.url_parms}
        data-send_checked={view.send_checked ? 'true' : ''}
        data-prompt={view.prompt}
        data-popup={view.popup}
        onClick={onClick}
      >
        <i className={view.icon} style={{ color: adjustColor(view.color, view.enabled) }} />
      </button>
      ))
    }
  </span>
);

ToolbarView.propTypes = {
  views: PropTypes.arrayOf(PropTypes.any),
};

