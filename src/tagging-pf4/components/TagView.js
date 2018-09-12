import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'patternfly-react';
import TagCategory from './TagCategory';

import TaggingPropTypes from '../TaggingPropTypes';

class TagView extends React.Component {
  generateTagCategories = tag => (
    <li key={tag.id}>
      <TagCategory
        key={tag.id}
        tagCategory={{ id: tag.id, description: tag.description }}
        values={tag.values}
        onTagDeleteClick={this.props.onTagDeleteClick}
      />
    </li>
  );

  render() {
    const assignedTags = [...this.props.assignedTags];
    return (
      <ul className="list-inline">
        {assignedTags
          .sort(this.sortingFunction)
          .map(this.generateTagCategories)}
      </ul>
    );
  }
}
TagView.propTypes = {
  assignedTags: TaggingPropTypes.tags,
  onTagDeleteClick: PropTypes.func,
  header: PropTypes.string,
  categoryTruncate: PropTypes.func,
  valueTruncate: PropTypes.func,
  sortingFunction: PropTypes.func,

};

TagView.defaultProps = {
  header: 'Assigned tags',
  categoryTruncate: str => (str.length > 18 ? `${str.substring(0, 18)}...` : str),
  valueTruncate: str => (str.length > 18 ? `${str.substring(0, 18)}...` : str),
  sortingFunction: (a, b) => (a.description < b.description ? -1 : 1)
};

export default TagView;
