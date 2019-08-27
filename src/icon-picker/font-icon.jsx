import React, { memo } from 'react';
import PropTypes from 'prop-types';

const FontIcon = memo(({ type, icon }) => (
  <i className={`${type} ${icon} icon-list-item`} title={`.${type}.${icon}`} />
));

FontIcon.propTypes = { type: PropTypes.string, icon: PropTypes.string };

export default FontIcon;
