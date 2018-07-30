import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { GenericPreviewTable } from '../../../table';
import { __ } from '../../../global-functions';

const UsersList = ({
  rows,
  columns,
  handleSelectUser,
  handleRowClick,
}) => (
  <Fragment>
    <h1>{__('Access Control EVM Users')}</h1>
    <GenericPreviewTable
      rowClick={row => handleRowClick(row)}
      rowSelect={(users, row) => handleSelectUser(users.length > 0 ? users : undefined, row)}
      showIcon
      showSelect
      icon={{
        type: 'pf',
        name: 'user',
      }}
      rows={[...rows.map(({ role, current_group, ...rest }) => ({ // eslint-disable-line camelcase
        role: role.label,
        current_group: current_group.label,
        ...rest,
      }))]}
      columns={columns}
      rowKey="id"
    />
  </Fragment>
);

UsersList.propTypes = {
  rows: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired,
  handleSelectUser: PropTypes.func.isRequired,
  handleRowClick: PropTypes.func.isRequired,
};

const mapStateToProps = ({ usersReducer: { rows, columns } }) => ({
  rows,
  columns,
});

export default connect(mapStateToProps)(UsersList);
