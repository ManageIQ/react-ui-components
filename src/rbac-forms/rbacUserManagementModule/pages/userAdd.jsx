import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { goBack } from 'connected-react-router';
import { RbacUserForm } from '../../';
import { saveUser } from '../redux/actions/actions';

const UserAdd = ({
  groups,
  onSave,
  onCancel,
}) => (
  <RbacUserForm
    groups={groups}
    onSave={values => onSave(values)}
    onCancel={onCancel}
  />
);

UserAdd.propTypes = {
  groups: PropTypes.array.isRequired,
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

const mapStateToProps = ({ usersReducer: { groups } }) => ({
  groups,
});

const mapDispatchToProps = (dispatch, initialProps) => ({
  onCancel: () => dispatch(goBack()),
  onSave: values => dispatch(saveUser(values, initialProps.onSave)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserAdd);
