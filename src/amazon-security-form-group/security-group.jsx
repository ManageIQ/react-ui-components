import React, { Fragment } from 'react';
import { Field } from 'react-final-form';
import { Col } from 'patternfly-react';
import PropTypes from 'prop-types';
import { required } from 'redux-form-validators';

import { FinalFormField, composeValidators } from '../forms/';

const validateNetworkMask = value =>
  (value.match(/^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])?\/?[0-9]+$/)
    ? undefined : __('Not a valid network mask'));


const SecurityGroup = ({ groupNumber, label }) => (
  <Fragment>
    {label && <h3>{label}</h3>}
    <Col xs={12}>
      <Field
        name={`proto-${groupNumber}`}
        component={FinalFormField}
        label={__('Proto')}
        validate={required({ msg: __('Proto required') })}
      />
    </Col>
    <Col xs={12}>
      <Field
        name={`from_port-${groupNumber}`}
        component={FinalFormField}
        label={__('From port')}
        validate={required({ msg: __('From port required') })}
        type="number"
      />
    </Col>
    <Col xs={12}>
      <Field
        name={`to_port-${groupNumber}`}
        component={FinalFormField}
        label={__('To port')}
        validate={required({ msg: __('To port required') })}
        type="number"
      />
    </Col>
    <Col xs={12}>
      <Field
        name={`cidr_ip-${groupNumber}`}
        component={FinalFormField}
        label={__('Cird ip')}
        validate={composeValidators(required({ msg: __('Cird ip required') }), validateNetworkMask)}
      />
    </Col>
  </Fragment>
);

SecurityGroup.propTypes = {
  groupNumber: PropTypes.number,
  label: PropTypes.string,
};

SecurityGroup.defaultProps = {
  groupNumber: 0,
};

export default SecurityGroup;
