import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { RbacUserPreview } from '../../';


const UserPreview = ({ user }) => <RbacUserPreview user={user} />;

UserPreview.propTypes = {
  user: PropTypes.object.isRequired,
};

const mapStateToProps = ({ usersReducer: { rows } }, { match: { params } }) => ({
  user: rows.find(user => user.id === params.userId),
});

export default connect(mapStateToProps)(UserPreview);
