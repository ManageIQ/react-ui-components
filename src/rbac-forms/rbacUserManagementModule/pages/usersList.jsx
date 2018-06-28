import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { GenericPreviewTable } from '../../../table';
import { navigate, selectUsers } from '../redux/actions/actions';

const UsersList = ({
  rows,
  columns,
  routerNavigate,
  storeSelectUsers,
}) => (
  <GenericPreviewTable
    rowClick={row => routerNavigate(`/preview/${row.id}`)}
    rowSelect={users => storeSelectUsers(users.length > 0 ? users : null)}
    showIcon
    showSelect
    icon={{
      type: 'pf',
      name: 'user',
    }}
    rows={rows.map(({ role, current_group, ...rest }) => ({ // eslint-disable-line camelcase
      role: role.label,
      current_group: current_group.label,
      ...rest,
    }))}
    columns={columns}
    rowKey="id"
  />
);

UsersList.propTypes = {
  rows: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired,
  routerNavigate: PropTypes.func.isRequired,
  storeSelectUsers: PropTypes.func.isRequired,
};

const mapStateToProps = ({ usersReducer: { rows, columns } }) => ({
  rows,
  columns,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  routerNavigate: navigate,
  storeSelectUsers: selectUsers,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(UsersList);
