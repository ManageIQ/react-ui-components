import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { goBack } from 'connected-react-router';
import { Spinner } from 'patternfly-react';
import { RbacUserForm } from '../../';
import { parseUserValues } from './helpers';

class UserEdit extends PureComponent {
  componentDidMount() {
    if (!this.props.groups) {
      this.props.loadGroups();
    }
  }

  render() {
    const {
      user,
      groups,
      onSave,
      onCancel,
    } = this.props;

    if (!groups || this.props.isFetching) {
      return <div><Spinner loading size="lg" /></div>;
    }

    return (
      <RbacUserForm
        groups={groups}
        onSave={values => onSave(parseUserValues(values), values.id)}
        onCancel={onCancel}
        initialValues={{ ...user, groups: user.groups.map(group => group.groupId) }}
        editDisabled={user.userid === 'admin'}
      />
    );
  }
}

UserEdit.propTypes = {
  user: PropTypes.object.isRequired,
  groups: PropTypes.array,
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  loadGroups: PropTypes.func.isRequired,
  isFetching: PropTypes.bool,
};

UserEdit.defaultProps = {
  isFetching: false,
};


const mapStateToProps = ({ usersReducer: { rows, groups, isFetching } }, { match: { params } }) => ({
  user: rows.find(row => row.id === params.userId),
  groups,
  isFetching,
});

const mapDispatchToProps = dispatch => ({
  onCancel: () => dispatch(goBack()),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserEdit);
