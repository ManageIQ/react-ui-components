import React, { memo } from 'react';
import PropTypes from 'prop-types';

const FontIcon = memo(({ type, icon, isActive }) => (
  <i className={`${type} ${icon} iconlist-item ${isActive ? 'active' : ''}`} title={`.${type}.${icon}`} />
));

FontIcon.propTypes = { type: PropTypes.string, icon: PropTypes.string, isActive: PropTypes.bool };

export default FontIcon;
