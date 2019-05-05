import React, { Fragment } from 'react';
import { Col } from 'patternfly-react';
import { Field } from 'react-final-form';
import { FinalFormSelect } from '../forms';
import { __ } from '../global-functions';
import { ReportEditorContext } from './report-editor';

const ReportCreationTimeout = () => (
  <ReportEditorContext.Consumer>
    {({ creationTimeoutOptions }) => (
      <Fragment>
        <Col xs={12}>
          <h3>{__('Report Creation Timeout')}</h3>
        </Col>
        <Col xs={12}>
          <Field
            name="chosen_queue_timeout"
            placeholder={__('System default (about 1 hour)')}
            label={__('Cancel after')}
            component={FinalFormSelect}
            options={creationTimeoutOptions}
          />
        </Col>
      </Fragment>
    )}
  </ReportEditorContext.Consumer>
);

export default ReportCreationTimeout;
