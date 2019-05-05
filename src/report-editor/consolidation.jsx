import React, { Fragment } from 'react';
import { Col } from 'patternfly-react';
import { Field } from 'react-final-form';
import PropTypes from 'prop-types';
import { FinalFormSelect } from '../forms';
import { __ } from '../global-functions';
import ConsolidationTable from './consolidation-table';
import { ReportEditorContext } from './report-editor';

const originalValueChange = (value = [], onChange) => value.length <= 3 && onChange(value);

const GroupRecordsBy = ({ columns }) => (
  <ReportEditorContext.Consumer>
    {() => (
      <Fragment>
        <Col xs={12}>
          <h3>{__('Group Records by up to 3 Columns')}</h3>
          <Field
            name="consolidation"
            initialValue={[]}
            label={__('Columns')}
            simpleValue={false}
            placeholder={__('Select max 3 columns')}
            render={({ input, ...rest }) => (<FinalFormSelect
              input={{
            ...input,
            onChange: value => originalValueChange(value, input.onChange),
          }}
              {...rest}
            />)}
            options={columns}
            multi
          />
          <strong>{__('Note:')}</strong> {__('Consolidating records will not show detail records in the report.')}
        </Col>
        <Field name="consolidation">
          {({ input: { value } }) => {
        if (!value || value.length === 0) {
          return null;
        }
        const rows = columns.filter(({ type }) => type === 'number');
        return rows.length > 0 ? <ConsolidationTable values={rows} consolidation={value} /> : null;
      }}
        </Field>
      </Fragment>
)}
  </ReportEditorContext.Consumer>
);

GroupRecordsBy.propTypes = {
  columns: PropTypes.array,
};


export default GroupRecordsBy;
