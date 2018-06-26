import React, { Component } from 'react';
import { Table, Checkbox, Icon } from 'patternfly-react';
import PropTypes from 'prop-types';
import './styles.scss';

const headerFormat = value => <Table.Heading>{value}</Table.Heading>;
const sortableHeaderFormat = (onSort, { column: { header: { label }, property } }, sortOrderAsc, isSorted) => (
  <Table.Heading
    onClick={() => onSort(property)}
    sort={isSorted}
    sortDirection={sortOrderAsc ? 'asc' : 'desc'}
    style={{ cursor: 'pointer' }}
  >
    {label}
  </Table.Heading>);
const cellFormat = value => <Table.Cell>{value}</Table.Cell>;
const celliconFormat = () => <Table.Cell style={{ textAlign: 'center' }}><Icon type="pf" name="user" /></Table.Cell>;
const checkboxStyle = {
  margin: 0,
};

class RbacUsersTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sortableColumnPropery: null,
      sortOrderAsc: true,
      rows: props.rows,
      columns: this.createColumns(props.columns),
    };
  }

  createColumns = columns => [
    {
      propery: 'select',
      header: {
        label: '',
        formatters: [headerFormat],
      },
      cell: {
        formatters: [
          (value, { rowData }) => (
            <Table.Cell style={{ textAlign: 'center' }} onClick={event => event.stopPropagation()}>
              <Checkbox
                style={checkboxStyle}
                checked={!!rowData.selected}
                onChange={() => this.handleSelected(rowData)}
              />
            </Table.Cell>
          ),
        ],
      },
    }, {
      propery: 'icon',
      header: {
        label: '',
        formatters: [headerFormat],
      },
      cell: {
        formatters: [celliconFormat],
      },
    },
    ...columns.map(({ property, label }) => ({
      property,
      header: {
        label,
        formatters: [(value, columnProps) => this.sortableHeaderFormater(value, columnProps)],
      },
      cell: {
        formatters: [cellFormat],
      },
    }))];

  sortableHeaderFormater = (value, columnProps) => sortableHeaderFormat(
    this.sortColumn,
    columnProps,
    this.state.sortOrderAsc,
    this.state.sortableColumnPropery === columnProps.column.property,
  );

  handleSelected = ({ id }) => this.setState((prevState) => {
    const rows = prevState.rows.map((item) => {
      if (item.id !== id) {
        return item;
      }
      return {
        ...item,
        selected: !item.selected,
      };
    });
    this.props.userSelect(rows.filter(item => item.selected));
    return { rows };
  })

  sortColumn = property => this.setState((prevState) => {
    const asc = prevState.sortableColumnPropery === property ? !prevState.sortOrderAsc : true;
    return {
      sortableColumnPropery: property,
      sortOrderAsc: asc,
      rows: prevState.rows.sort((a, b) => (asc ? a[property] > b[property] : a[property] < b[property])),
    };
  })

  render() {
    const { PfProvider, Body, Header } = Table;
    const { rows, columns } = this.state;
    return (
      <div>
        <h1>Table</h1>
        <PfProvider
          striped
          bordered
          columns={columns}
          dataTable
          hover
        >
          <Header />
          <Body
            rows={rows.map(row => row)}
            rowKey="id"
            onRow={row => ({ onClick: () => this.props.rowClick(row) })}
          />
        </PfProvider>
      </div>
    );
  }
}

RbacUsersTable.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.shape({
    property: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  })).isRequired,
  rows: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    fullname: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    email: PropTypes.string,
    currentgroup: PropTypes.string,
    role: PropTypes.string,
    lastlogon: PropTypes.string,
    lastlogoff: PropTypes.string,
  })).isRequired,
  rowClick: PropTypes.func.isRequired,
  userSelect: PropTypes.func.isRequired,
};

export default RbacUsersTable;
