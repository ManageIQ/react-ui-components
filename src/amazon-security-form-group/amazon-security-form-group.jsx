import React from 'react';
import { Form, Field } from 'react-final-form';
import { Form as PfForm, Grid, Button, Col, Row } from 'patternfly-react';
import PropTypes from 'prop-types';
import { required } from 'redux-form-validators';

import { FinalFormField, FinalFormTextArea, composeValidators } from '../forms/';

const validateNetworkMask = value =>
  (value.match(/^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])?\/?[0-9]+$/)
    ? undefined : 'Not a valid network mask');

const parseValues = ({
  vpc_id, // eslint-disable-line camelcase
  security_group_name, // eslint-disable-line camelcase
  security_group_description, // eslint-disable-line camelcase
  ...rest
}) => ({
  vpc_id,
  security_group_name,
  security_group_description,
  security_group_rules: rest,
});

const AmazonSecurityFormGroup = ({
  onSubmit,
  onCancel,
}) => (
  <Form
    onSubmit={values => onSubmit(parseValues(values))}
    render={({ handleSubmit }) => (
      <PfForm horizontal>
        <Grid>
          <Row>
            <Col xs={12}>
              <Field
                name="vpc_id"
                component={FinalFormField}
                label="Vpc ID"
                validate={required({ msg: 'Id required' })}
              />
            </Col>
            <Col xs={12}>
              <Field
                name="security_group_name"
                component={FinalFormField}
                label="Security group name"
                validate={required({ msg: 'Group mame required' })}
              />
            </Col>
            <Col xs={12}>
              <Field
                name="security_group_description"
                component={FinalFormTextArea}
                label="Security group description"
                validate={required({ msg: 'Description required' })}
              />
            </Col>
            <hr />
          </Row>
          <Row>
            <h2>Security group rules</h2>
            <Col xs={12}>
              <Field
                name="proto"
                component={FinalFormField}
                label="Proto"
                validate={required({ msg: 'Proto required' })}
              />
            </Col>
            <Col xs={12}>
              <Field
                name="from_port"
                component={FinalFormField}
                label="From port"
                validate={required({ msg: 'From port required' })}
                type="number"
              />
            </Col>
            <Col xs={12}>
              <Field
                name="to_port"
                component={FinalFormField}
                label="To port"
                validate={required({ msg: 'To port required' })}
                type="number"
              />
            </Col>
            <Col xs={12}>
              <Field
                name="cidr_ip"
                component={FinalFormField}
                label="Cird ip"
                validate={composeValidators(required({ msg: 'Cird ip required' }), validateNetworkMask)}
              />
            </Col>
            <Col xs={12}>
              <Field
                name="security_group_rules_egress"
                component={FinalFormTextArea}
                label="Security group rules egress"
              />
            </Col>
            <Col className="pull-right">
              <Button bsStyle="primary" onClick={handleSubmit}>Submit</Button>
              <Button onClick={onCancel}>Cancel</Button>
            </Col>
          </Row>
        </Grid>
      </PfForm>
    )}
  />
);

AmazonSecurityFormGroup.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default AmazonSecurityFormGroup;
