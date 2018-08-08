import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { RbacUserPreview } from '../../';
import RbacUserTagsList from '../../rbacUserTagsList';

class UserPreview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tags: [],
      tenant: '',
    };
  }

  componentDidMount() {
    const { user, selectUser } = this.props;
    selectUser(user);
    this.fetchTags(user.id);
  }

  componentDidUpdate(prevProps) {
    const { user, selectUser } = this.props;
    if (prevProps.user.id !== user.id) {
      selectUser(this.props.user);
      this.fetchTags(user.id);
    }
  }

  fetchTags = userId => this.props.getUserTags(userId)
    .then(({ tags, tenant }) => ({ tags: [...tags.sort((a, b) => a.name < b.name)], tenant }))
    .then(({ tags, tenant }) => this.setState({ tags, tenant }));

  render() {
    const { user } = this.props;
    const { tags, tenant } = this.state;
    return (
      <Fragment>
        <RbacUserPreview user={user} />
        <hr />
        <RbacUserTagsList tags={tags} tenant={tenant} />
      </Fragment>
    );
  }
}

UserPreview.propTypes = {
  user: PropTypes.object.isRequired,
  selectUser: PropTypes.func.isRequired,
  getUserTags: PropTypes.func.isRequired,
};

const mapStateToProps = ({ usersReducer: { rows } }, { match: { params } }) => ({
  user: rows.find(user => user.id === params.userId),
});

export default connect(mapStateToProps)(UserPreview);
