import React, { Fragment } from 'react';
import { required } from 'redux-form-validators';
import { Col } from 'patternfly-react';
import { Field } from 'react-final-form';
import { __ } from '../global-functions';
import { FinalFormField } from '../forms';

const BasicReportInfo = () => (
  <Fragment>
    <Col xs={12}>
      <h3>{__('Basic Report Info')}</h3>
    </Col>
    <Col xs={12}>
      <Field
        name="name"
        validate={required({ msg: __('Menu Name is required') })}
        component={FinalFormField}
        type="text"
        label={__('Menu Name')}
        maxLength={40}
      />
    </Col>
    <Col xs={12}>
      <Field
        name="title"
        validate={required({ msg: __('Title is required') })}
        component={FinalFormField}
        type="text"
        label={__('Title')}
        maxLength={60}
      />
    </Col>
    <hr />
  </Fragment>
);

export default BasicReportInfo;
