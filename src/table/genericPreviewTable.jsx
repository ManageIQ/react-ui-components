import React, { Component } from 'react';
import { Table, Checkbox, Icon } from 'patternfly-react';
import PropTypes from 'prop-types';
import './styles.scss';

class GenericPreviewTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sortableColumnPropery: null,
      sortOrderAsc: true,
      rows: props.rows,
      columns: this.createColumns(props.showIcon, props.showSelect, props.columns),
    };
  }

  componentDidUpdate({ rows }) {
    if (this.props.rows.length !== rows.length) {
      this.setState((prevState) => { // eslint-disable-line
        const { sortOrderAsc, sortableColumnPropery } = prevState;
        return {
          rows: this.state.sortableColumnPropery ?
            this.props.rows.sort((a, b) =>
              (sortOrderAsc ? a[sortableColumnPropery] > b[sortableColumnPropery] : a[sortableColumnPropery] < b[sortableColumnPropery])) :
            this.props.rows,
        };
      });
    }
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
  celliconFormat = () => <Table.Cell className="cell-middle clickable"><Icon type={this.props.icon.type} name={this.props.icon.name} /></Table.Cell>;


  createColumns = (showIcon, showSelect, columns) => {
    let result = [];
    if (showIcon) {
      result = [{
        propery: 'icon',
        header: {
          label: '',
          formatters: [this.headerFormat],
        },
        cell: {
          formatters: [this.celliconFormat],
        },
      },
      ...result];
    }
    if (showSelect) {
      result = [
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
        },
        ...result,
      ];
    }
    result = [
      ...result,
      ...columns.map(({ property, label }) => ({
        property,
        header: {
          label,
          formatters: [(value, columnProps) => this.sortableHeaderFormater(value, columnProps)],
        },
        cell: {
          formatters: [this.cellFormat],
        },
      })),
    ];
    return result;
  };

  sortableHeaderFormater = (value, columnProps) => this.sortableHeaderFormat(
    this.sortColumn,
    columnProps,
    this.state.sortOrderAsc,
    this.state.sortableColumnPropery === columnProps.column.property,
  );

  handleSelected = row => this.setState((prevState) => {
    let currentRow;
    const rows = prevState.rows.map((item) => {
      if (item[this.props.rowKey] !== row[this.props.rowKey]) {
        return item;
      }
      currentRow = { ...item, selected: !item.selected };
      return { ...currentRow };
    });
    this.props.rowSelect(rows.filter(item => item.selected), currentRow);
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
    const { rowKey } = this.props;
    return (
      <PfProvider
        striped
        bordered
        columns={columns}
        dataTable
        hover
        className="generic-preview-table"
      >
        <Header />
        <Body
          rows={[...rows]}
          rowKey={rowKey}
          onRow={row => ({ onClick: () => this.props.rowClick(row) })}
        />
      </PfProvider>
    );
  }
}

const tableIconProp = (props, propName, componentName) => {
  if (!props.showIcon) {
    return undefined;
  }

  if (!props[propName]) {
    return new Error(`Prop validation failed in component ${componentName}. Prop ${propName} is required`);
  }

  if (typeof props[propName] !== 'object') {
    return new Error(`Prop validation failed in component ${componentName}. Expected ${propName} to be object, ${typeof props[propName]} given.`);
  }

  if (!props[propName].type) {
    return new Error(`Prop validation failed in component ${componentName}. Attribute 'type' in ${propName} is required`);
  }

  if (!props[propName].name) {
    return new Error(`Prop validation failed in component ${componentName}. Attribute 'name' in ${propName} is required`);
  }
  return undefined;
};

const rowSelectProp = (props, propName, componentName) => {
  if (props.showSelect && !props[propName]) {
    return new Error(`Prop validation failed in component ${componentName}. Prop ${propName} is required when user selecting is enabled`);
  }

  if (typeof props[propName] !== 'function') {
    return new Error(`Prop validation failed in component ${componentName}. Expected ${propName} to be function, ${typeof props[propName]} given.`);
  }

  return undefined;
};

GenericPreviewTable.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.shape({
    property: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  })).isRequired,
  rows: PropTypes.array.isRequired,
  rowClick: PropTypes.func.isRequired,
  rowSelect: rowSelectProp,
  showSelect: PropTypes.bool,
  showIcon: PropTypes.bool,
  icon: tableIconProp,
  rowKey: PropTypes.string,
};

GenericPreviewTable.defaultProps = {
  showSelect: false,
  showIcon: false,
  rowKey: 'id',
};

export default GenericPreviewTable;
