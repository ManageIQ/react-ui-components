import React, { memo } from 'react';
import { Table, FormControl, Col } from 'patternfly-react';
import { Field } from 'react-final-form';
import PropTypes from 'prop-types';
import { __ } from '../global-functions';
import { ReportEditorContext } from './report-editor';
import PfSelect from '../forms/pf-select';

const InlineFinalField = ({ inputName, initialValue }) => (
  <Field
    name={inputName}
    initialValue={initialValue}
    render={({ input }) => <FormControl {...input} />}
  />
);
InlineFinalField.propTypes = {
  inputName: PropTypes.string.isRequired,
  initialValue: PropTypes.string,
};

export const InlineSelect = ({ selectName }) => (
  <ReportEditorContext.Consumer>
    {({ calculationValues }) => (
      <Field
        name={selectName}
        component={PfSelect}
        options={calculationValues}
        searchable
        multi
      />
    )}
  </ReportEditorContext.Consumer>
);
InlineSelect.propTypes = {
  selectName: PropTypes.string.isRequired,
};

const headerFormat = value => <Table.Heading>{value}</Table.Heading>;
const cellFormat = (value, { rowData: { header } }) => <Table.Cell>{header}</Table.Cell>;
const tableSelect = (value, { rowData: { selectName, dataType } }) =>
  <Table.Cell style={{ width: '1%' }}><InlineSelect dataType={dataType} selectName={selectName} /></Table.Cell>;

const columns = [
  {
    property: 'columnName',
    header: {
      label: 'Column Name',
      formatters: [headerFormat],
    },
    cell: {
      formatters: [cellFormat],
    },
  }, {
    property: 'format',
    header: {
      label: 'Calculation',
      formatters: [headerFormat],
    },
    cell: {
      formatters: [tableSelect],
    },
  },
];

const createRows = (rows = [], groupColumns = []) =>
  rows.filter(row => !groupColumns.find(column => column.value === row.value))
    .map(row => ({
      id: row.value,
      columnName: row.value,
      header: row.label,
      format: [],
      selectName: `calculation.${row.value}`,
      dataType: row.type,
    }));

const ConsolidationTable = memo(({ values, consolidation }) => { // eslint-disable-line
  const { PfProvider, Body, Header } = Table;
  return (
    <Col xs={12}>
      <h3>{__('Specify Calculations for Summary Rows')}</h3>
      <PfProvider
        striped
        bordered
        columns={columns}
        dataTable
        hover
      >
        <Header />
        <Body
          rowKey="id"
          rows={createRows(values, consolidation)}
        />
      </PfProvider>
    </Col>
  );
});
export default ConsolidationTable;
