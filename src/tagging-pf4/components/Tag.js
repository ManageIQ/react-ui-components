import * as React from 'react';
import PropTypes from 'prop-types';
import TaggingPropTypes from '../TaggingPropTypes';
import BadgeWithDelete from './BadgeWithDelete';

const Tag = ({
  onTagDeleteClick, tagValue, truncate,
}) => (
  <li key={tagValue.id} className="pf4-tag">
    <BadgeWithDelete
      onDeleteClick={onTagDeleteClick}
      description={tagValue.description}
      truncate={truncate}
    />
  </li>
);

Tag.propTypes = {
  onTagDeleteClick: PropTypes.func.isRequired,
  tagValue: TaggingPropTypes.value,
  truncate: PropTypes.func.isRequired,
};

export default Tag;
