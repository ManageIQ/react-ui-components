import React, { Component } from 'react';
import { Table, Checkbox, Icon } from 'patternfly-react';
import PropTypes from 'prop-types';
import './styles.scss';

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
  headerFormat = value => <Table.Heading>{value}</Table.Heading>;
  sortableHeaderFormat = (onSort, { column: { header: { label }, property } }, sortOrderAsc, isSorted) => (
    <Table.Heading
      onClick={() => onSort(property)}
      sort={isSorted}
      sortDirection={sortOrderAsc ? 'asc' : 'desc'}
      className="clickable"
    >
      {label}
    </Table.Heading>);
  cellFormat = value => <Table.Cell className="clickable">{value}</Table.Cell>;
  celliconFormat = () => <Table.Cell className="cell-middle clickable"><Icon type="pf" name="user" /></Table.Cell>;


  createColumns = columns => [
    {
      propery: 'select',
      header: {
        label: '',
        formatters: [this.headerFormat],
      },
      cell: {
        formatters: [
          (value, { rowData }) => (
            <Table.Cell
              onClick={(event) => {
                event.stopPropagation();
                this.handleSelected(rowData);
              }}
              className="clickable"
            >
              <Checkbox
                className="cell-middle"
                checked={!!rowData.selected}
                onClick={event => event.stopPropagation()}
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
        formatters: [this.headerFormat],
      },
      cell: {
        formatters: [this.celliconFormat],
      },
    },
    ...columns.map(({ property, label }) => ({
      property,
      header: {
        label,
        formatters: [(value, columnProps) => this.sortableHeaderFormater(value, columnProps)],
      },
      cell: {
        formatters: [this.cellFormat],
      },
    }))];

  sortableHeaderFormater = (value, columnProps) => this.sortableHeaderFormat(
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
      <PfProvider
        striped
        bordered
        columns={columns}
        dataTable
        hover
        className="rbac-table"
      >
        <Header />
        <Body
          rows={[...rows]}
          rowKey="id"
          onRow={row => ({ onClick: () => this.props.rowClick(row) })}
        />
      </PfProvider>
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
