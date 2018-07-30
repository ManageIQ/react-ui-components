import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { goBack } from 'connected-react-router';
import { Redirect } from 'react-router-dom';
import { Spinner } from 'patternfly-react';
import { RbacUserForm } from '../../';
import { parseUserValues } from './helpers';

class UserAdd extends PureComponent {
  componentDidMount() {
    if (!this.props.groups) {
      this.props.loadGroups();
    }
  }
  render() {
    const {
      groups,
      onSave,
      onCancel,
      userCopy,
      match: { params: { copy } },
    } = this.props;
    if (!groups || this.props.isFetching) {
      return <div><Spinner loading size="lg" /></div>;
    }
    if (copy && !userCopy) {
      return <Redirect to="/add" />;
    }
    return (
      <RbacUserForm
        groups={[...groups]}
        onSave={values => onSave(parseUserValues(values))}
        onCancel={onCancel}
        newRecord
        initialValues={userCopy ? { ...userCopy, groups: userCopy.groups.map(group => group.groupId) } : {}}
      />
    );
  }
}

UserAdd.propTypes = {
  groups: PropTypes.array,
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  loadGroups: PropTypes.func.isRequired,
  isFetching: PropTypes.bool,
  userCopy: PropTypes.object,
  match: PropTypes.object,
};

UserAdd.defaultProps = {
  isFetching: false,
};

const mapStateToProps = ({ usersReducer: { groups, isFetching, selectedUsers } }, { match: { params: { copy } } }) => ({
  groups,
  isFetching,
  userCopy: selectedUsers && copy ? {
    name: selectedUsers[0].name,
    email: selectedUsers[0].email,
    groups: selectedUsers[0].groups,
    miq_groups: selectedUsers[0].miq_groups,
  } : undefined,
});

const mapDispatchToProps = dispatch => ({
  onCancel: () => dispatch(goBack()),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserAdd);
