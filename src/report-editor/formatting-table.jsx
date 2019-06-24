import React, { memo } from 'react';
import { Table, FormControl, Col } from 'patternfly-react';
import { Field } from 'react-final-form';
import PropTypes from 'prop-types';
import PfSelect from '../forms/pf-select';
import { __ } from '../global-functions';
import { ReportEditorContext } from './report-editor';

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

const InlineSelect = ({ selectName, dataType }) => (
  <ReportEditorContext.Consumer>
    {({ tableSelectOptions }) => (
      <Field
        name={selectName}
        component={PfSelect}
        options={tableSelectOptions[dataType].options || []}
        searchable
      />
    )}
  </ReportEditorContext.Consumer>
);
InlineSelect.propTypes = {
  selectName: PropTypes.string.isRequired,
  dataType: PropTypes.oneOf(['string', 'datetime', 'number']),
};

InlineSelect.defaultProps = {
  dataType: 'string',
};

const headerFormat = value => <Table.Heading>{value}</Table.Heading>;
const cellFormat = (value, { rowData: { header } }) => <Table.Cell>{header}</Table.Cell>;
const tableInput = (value, { rowData: { inputName, header } }) =>
  <Table.Cell><InlineFinalField initialValue={header} inputName={inputName} /></Table.Cell>;
const tableSelect = (value, { rowData: { selectName, dataType } }) =>
  <Table.Cell style={{ width: '1%' }}><InlineSelect dataType={dataType} selectName={selectName} /></Table.Cell>;

const columns = [
  {
    property: 'columnName',
    header: {
      label: __('Column Name'),
      formatters: [headerFormat],
    },
    cell: {
      formatters: [cellFormat],
    },
  }, {
    property: 'header',
    header: {
      label: __('Header'),
      formatters: [headerFormat],
    },
    cell: {
      formatters: [tableInput],
    },
  }, {
    property: 'format',
    header: {
      label: __('Format'),
      formatters: [headerFormat],
    },
    cell: {
      formatters: [tableSelect],
    },
  },
];

const createRows = (rows = []) => rows.map(row => ({
  id: row.value,
  columnName: row.value,
  header: row.label,
  format: [],
  inputName: `format.${row.value}.header`,
  selectName: `format.${row.value}.format`,
  dataType: row.type,
}));

const FormattingTable = memo(({ values }) => { // eslint-disable-line
  const { PfProvider, Body, Header } = Table;
  return (
    <Col xs={12}>
      <h3>{__('Specify Column Headers and Formats')}</h3>
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
          rows={createRows(values.columns)}
        />
      </PfProvider>
    </Col>
  );
});
export default FormattingTable;
