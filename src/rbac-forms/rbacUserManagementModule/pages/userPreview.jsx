import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { RbacUserPreview } from '../../';

class UserPreview extends Component {
  componentDidMount() {
    this.props.selectUser(this.props.user);
  }

  componentDidUpdate(prevProps) {
    const { user, selectUser } = this.props;
    if (prevProps.user.id !== user.id) {
      selectUser(this.props.user);
    }
  }

  render() {
    const { user } = this.props;
    return <RbacUserPreview user={user} />;
  }
}

UserPreview.propTypes = {
  user: PropTypes.object.isRequired,
  selectUser: PropTypes.func.isRequired,
};

const mapStateToProps = ({ usersReducer: { rows } }, { match: { params } }) => ({
  user: rows.find(user => user.id === params.userId),
});

export default connect(mapStateToProps)(UserPreview);
