import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Col, Icon } from 'patternfly-react';
import { Field } from 'react-final-form';
import { FinalFormSelect } from '../forms';
import { __ } from '../global-functions';

const isDateTime = columns => columns.find(({ type }) => type === 'datetime');

const TimelineTabWarning = ({ columnOptions, columns }) => (!isDateTime(columns) ? (
  <Fragment>
    <Col xs={12}>
      <h3>
        <Icon type="fa" name="clock-o" className="report-editor-icon" />
        {__('Timeline tab is not available until at least')} <strong>{__('1 time-field from Columns tab')}</strong> {__('has been selected.')}
      </h3>
    </Col>
    <Col xs={12}>
      <Field
        name="columns"
        label={__('Please, add time field')}
        placeholder={__('Select one or more searchable fields...')}
        component={FinalFormSelect}
        options={columnOptions.filter(({ type }) => type === 'datetime')}
        searchable
        multi
        simpleValue={false}
      />
    </Col>
  </Fragment>
) : __('Timeline component has been loaded.'));
TimelineTabWarning.propTypes = {
  columnOptions: PropTypes.array,
  columns: PropTypes.array,
};

export default TimelineTabWarning;
