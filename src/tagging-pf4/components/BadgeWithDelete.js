import * as React from 'react';
import PropTypes from 'prop-types';
import { Badge } from '@patternfly/react-core'
import { TimesIcon } from '@patternfly/react-icons';
import TaggingPropTypes from '../TaggingPropTypes';

const BadgeWithDelete = ({
  onDeleteClick, description, truncate, className,
}) => (
  <Badge className='pf4-tag-badge' title={description}>
    {truncate(description)}
    {( onDeleteClick && <a
      href="#"
      onClick={e => {
        e.preventDefault();
        onDeleteClick && onDeleteClick();
      }}
      className="pf4-remove-button"
    >
      <TimesIcon />
    </a>)}
  </Badge>
);

BadgeWithDelete.propTypes = {
  onDeleteClick: PropTypes.func.isRequired,
  description: TaggingPropTypes.string,
  truncate: PropTypes.func,
  className: PropTypes.string
};

BadgeWithDelete.defaultProps = {
  truncate: () => {},
  className: ''
}

export default BadgeWithDelete;
