import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'patternfly-react';
import { __, sprintf } from '../global-functions';

const renderTags = tags => tags.map(({ name, value }) => <Fragment key={name}><Icon type="fa" name="tag" /> {`${name}: ${value}`}<br /></Fragment>);

const RbacUserTagsList = ({ tags, tenant }) => (
  <div>
    <h3>{__('Smart Management')}</h3>
    <div className="form-horizontal static">
      <div className="form-group">
        <label className="col-md-2 control-label"> { /* eslint-disable-line */ }
          {sprintf(__('%s Tags'), tenant)}
        </label>
        <div className="col-md-8">
          {tags && tags.length > 0 ?
            renderTags(tags) : <span><Icon type="fa" name="tag" /> {sprintf(__('No %s Tags have been assigned'), tenant)}</span>}
        </div>
      </div>
    </div>
  </div>
);

RbacUserTagsList.propTypes = {
  tags: PropTypes.array,
  tenant: PropTypes.string,
};

RbacUserTagsList.defaultProps = {
  tenant: '',
  tags: [],
};

export default RbacUserTagsList;
