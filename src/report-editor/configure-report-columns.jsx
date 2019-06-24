import React, { Fragment } from 'react';
import { Col } from 'patternfly-react';
import { Field } from 'react-final-form';
import PropTypes from 'prop-types';
import { FinalFormSelect } from '../forms';
import { __ } from '../global-functions';
import { ReportEditorContext } from './report-editor';
import { resetInput } from './helpers';

const ConfigureReportColumns = ({ change }) => (
  <ReportEditorContext.Consumer>
    {({ columnOptions, baseTheReportOptions }) => (
      <Fragment>
        <Col xs={12}>
          <h3>{__('Configure Report Columns')}</h3>
        </Col>
        <Col xs={12}>
          <Field
            name="chosen_model"
            label={__('Base the report on')}
            placeholder={__('Search selection...')}
            render={({ input, ...rest }) => (<FinalFormSelect
              input={resetInput(input, change, 'columns', [])}
              {...rest}
            />)}
            options={baseTheReportOptions}
            searchable
          />
        </Col>
        <Field name="chosen_model">
          {({ input: { value } }) => (value ? (
            <Fragment>
              <Col xs={12} >
                <Field
                  name="columns"
                  label={__('Available Fields')}
                  placeholder={__('Select one or more searchable fields...')}
                  component={FinalFormSelect}
                  options={columnOptions}
                  searchable
                  multi
                  simpleValue={false}
                />
              </Col>
              <h4>{__('Selected Fields')}</h4>
              <Col xs={12}>
                <Field name="columns">
                  {({ input: { value = [] } }) => value.map(column => (
                    <h5 key={column.value}>{column.label}</h5>
                  ))}
                </Field>
              </Col>
            </Fragment>
            ) : null) }
        </Field>
        <hr />
      </Fragment>
      )}
  </ReportEditorContext.Consumer>
);

ConfigureReportColumns.propTypes = {
  change: PropTypes.func.isRequired,
};

export default ConfigureReportColumns;
