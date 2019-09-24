import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import { adjustColor, isEnabled } from './utility';
import CountContext from './ToolbarContext';

const classNames = require('classnames');

const ButtonIcon = ({
  img_url: imgUrl, icon, color, enabled,
}) => {
  if (icon) {
    return <i className={icon} style={{ color: adjustColor(color, enabled) }} />;
  }

  if (imgUrl && !icon) {
    return <img alt="Button icon" src={imgUrl} />;
  }

  return null;
};

ButtonIcon.propTypes = {
  img_url: PropTypes.string,
  icon: PropTypes.string,
  color: PropTypes.string,
  enabled: PropTypes.bool,
};

export const ToolbarButton = (props) => {
  const count = useContext(CountContext);
  const disabled = !props.enabled || !isEnabled(props.onwhen, count);

  return (
    <button
      type="button"
      id={props.id}
      name={props.name}
      title={props.title}
      disabled={disabled}
      className={classNames('btn btn-default', { active: props.selected, disabled })}
      onClick={() => props.onClick(props)}
    >
      { ButtonIcon(props) }
      { props.text }
    </button>
  );
};

ToolbarButton.propTypes = {
  title: PropTypes.string,
  id: PropTypes.string,
  name: PropTypes.string,
  text: PropTypes.string,
  selected: PropTypes.bool,
  enabled: PropTypes.bool,
  onwhen: PropTypes.string,
  onClick: PropTypes.func.isRequired,
};
