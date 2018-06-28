import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { goBack } from 'connected-react-router';
import { RbacUserForm } from '../../';
import { saveUser } from '../redux/actions/actions';

const UserEdit = ({
  user,
  groups,
  onSave,
  onCancel,
}) => (
  <RbacUserForm
    groups={groups}
    onSave={values => onSave(values)}
    onCancel={onCancel}
    initialValues={user}
    editDisabled={user.userid === 'admin'}
  />
);

UserEdit.propTypes = {
  user: PropTypes.object.isRequired,
  groups: PropTypes.array.isRequired,
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

const mapStateToProps = ({ usersReducer: { rows, groups } }, { match: { params } }) => ({
  user: rows.find(row => row.id === Number.parseInt(params.userId, 10)),
  groups,
});

const mapDispatchToProps = (dispatch, initialProps) => ({
  onCancel: () => dispatch(goBack()),
  onSave: values => dispatch(saveUser(values, initialProps.onSave)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserEdit);
