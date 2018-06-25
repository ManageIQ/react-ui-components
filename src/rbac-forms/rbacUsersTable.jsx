import React, { Component } from 'react';
import { Table, Checkbox, Icon } from 'patternfly-react';
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
      rows: [
        {
          id: 100,
          fullname: 'John Doe',
          username: 'Admin',
          email: 'email@neco.com',
          currentgroup: 'Some group',
          role: 'Admin role',
          lastlogon: '06/25/18 06:58:14 UTC',
          lastlogoff: '06/30/18 06:58:14 UTC',
        },
        {
          id: 101,
          fullname: 'Pepa Jandak',
          username: 'Killer',
          email: 'email@jandak.com',
          currentgroup: 'Shit group',
          role: 'Shot role',
          lastlogon: '01/25/18 06:58:14 UTC',
          lastlogoff: '06/30/18 06:58:14 UTC',
        },
      ],
      columns: [
        {
          propery: 'select',
          header: {
            label: '',
            formatters: [headerFormat],
          },
          cell: {
            formatters: [
              (value, { rowData }) => (
                <Table.Cell style={{ textAlign: 'center' }}>
                  <Checkbox style={checkboxStyle} checked={rowData.selected} onClick={() => this.handleSelected(rowData)} />
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
        }, {
          property: 'fullname',
          props: {
            sort: true,
            index: 0,
          },
          header: {
            label: 'Full Name',
            formatters: [(value, columnProps) => this.sortableHeaderFormater(value, columnProps)],
          },
          cell: {
            formatters: [cellFormat],
          },
        }, {
          property: 'username',
          header: {
            label: 'Username',
            formatters: [(value, columnProps) => this.sortableHeaderFormater(value, columnProps)],
          },
          cell: {
            formatters: [cellFormat],
          },
        }, {
          property: 'email',
          header: {
            label: 'E-mail',
            formatters: [(value, columnProps) => this.sortableHeaderFormater(value, columnProps)],
          },
          cell: {
            formatters: [cellFormat],
          },
        }, {
          property: 'currentgroup',
          header: {
            label: 'Current Group',
            formatters: [(value, columnProps) => this.sortableHeaderFormater(value, columnProps)],
          },
          cell: {
            formatters: [cellFormat],
          },
        }, {
          property: 'role',
          header: {
            label: 'Role',
            formatters: [(value, columnProps) => this.sortableHeaderFormater(value, columnProps)],
          },
          cell: {
            formatters: [cellFormat],
          },
        }, {
          property: 'lastlogon',
          header: {
            label: 'Last Logon',
            formatters: [(value, columnProps) => this.sortableHeaderFormater(value, columnProps)],
          },
          cell: {
            formatters: [cellFormat],
          },
        }, {
          property: 'lastlogoff',
          header: {
            label: 'Last Logoff',
            formatters: [(value, columnProps) => this.sortableHeaderFormater(value, columnProps)],
          },
          cell: {
            formatters: [cellFormat],
          },
        },
      ],
    };
  }

  sortableHeaderFormater = (value, columnProps) => sortableHeaderFormat(
    this.sortColumn,
    columnProps,
    this.state.sortOrderAsc,
    this.state.sortableColumnPropery === columnProps.column.property,
  );

  handleSelected = ({ id }) => this.setState(prevState => ({
    rows: prevState.rows.map((item) => {
      if (item.id !== id) {
        return item;
      }
      return {
        ...item,
        selected: !item.selected,
      };
    }),
  }))

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
            onRow={row => ({ onClick: () => console.log('row: ', row) })}
          />
        </PfProvider>
      </div>
    );
  }
}


export default RbacUsersTable;
