import * as React from 'react';
import PropTypes from 'prop-types';
import { adjustColor } from './utility';

const ButtonIcon = (props) => {
  const {
    img_url: imgUrl, icon, color, enabled,
  } = props;

  if (icon) {
    return <i className={icon} style={{ color: adjustColor(color, enabled) }} />;
  }

  if (imgUrl && !icon) {
    return <img alt="Button icon" src={imgUrl} data-enabled={imgUrl} data-disabled={imgUrl} />;
  }

  return null;
};

ButtonIcon.propTypes = {
  img_url: PropTypes.string,
  icon: PropTypes.string,
  color: PropTypes.string,
  enabled: PropTypes.bool,
};

/* FIXME
 * ng-class="{active: props.selected, disabled: !props.enabled}"
 * ng-hide="props.hidden"
 * FIXME: where did this come from   style={props.enabled && props.hidden ? {} : { display: 'none !important' }}
 * ng-click="onItemClick({item: props, $event: $event})">
 */
export const ToolbarButton = props => (
  <button
    type="button"
    style={props.hidden ? { display: 'none !important' } : {}}
    id={props.id}
    name={props.name}
    title={props.title}
    className={`btn btn-default ${props.selected ? 'active' : ''} ${props.enabled ? '' : 'disabled'}`}

    data-explorer={props.explorer}
    data-confirm-tb={props.confirm}
    data-function={props.data && props.data.function}
    data-function-data={props.data && props.data['function-data']}
    data-click={props.id}
    data-url={props.url}
    data-url_parms={props.url_parms}
    data-send_checked={props.send_checked ? 'true' : ''}
    data-prompt={props.prompt}
    data-popup={props.popup}
  >
    { ButtonIcon(props) }
    { props.text }
  </button>
);

ToolbarButton.propTypes = {
  title: PropTypes.string,
  explorer: PropTypes.bool,
  confirm: PropTypes.string,
  id: PropTypes.string,
  name: PropTypes.string,
  url: PropTypes.string,
  url_parms: PropTypes.any,
  send_checked: PropTypes.bool,
  prompt: PropTypes.string,
  popup: PropTypes.string,
  text: PropTypes.string,
  data: PropTypes.any,
  selected: PropTypes.bool,
  enabled: PropTypes.bool,
  hidden: PropTypes.bool,
};
