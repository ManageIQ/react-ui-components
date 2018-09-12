import React from 'react';
import PropTypes from 'prop-types';
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
          .sort(this.props.sortingFunction)
          .map(this.generateTagCategories)}
      </ul>
    );
  }
}
TagView.propTypes = {
  assignedTags: TaggingPropTypes.tags,
  onTagDeleteClick: PropTypes.func,
  sortingFunction: PropTypes.func,

};

TagView.defaultProps = {
  sortingFunction: (a, b) => (a.description < b.description ? -1 : 1),
};

export default TagView;
