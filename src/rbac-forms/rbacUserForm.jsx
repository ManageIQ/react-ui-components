import React from 'react';
import { Form, Field } from 'react-final-form';
import PropTypes from 'prop-types';
import { required, email } from 'redux-form-validators';
import { Form as PfForm, Col, Row, Grid, Button, ButtonGroup } from 'patternfly-react';

import { FinalFormField, FinalFormSelect, composeValidators } from '../forms';
import { __ } from '../global-functions';

const mapMultiSelectValues = (values, keyName) => Array.from(values, item => item[keyName]);
const validateEmpty = values => (values.length === 0 ? __('A User must be assigned to a Group') : undefined);

const RbacUserForm = ({ onSave, groups, onCancel }) => (
  <Form
    onSubmit={values => onSave({ ...values, chosen_group: mapMultiSelectValues(values.chosen_group, 'value') })}
    validate={(values) => {
      const errors = {};
      if (values.password !== values.verify) {
        errors.verify = __('Password/Verify Password do not match');
      }
      return errors;
    }}
    render={({ invalid, handleSubmit }) => (
      <PfForm horizontal>
        <Grid>
          <Row>
            <Col xs={12}>
              <Field
                name="name"
                validate={required({ msg: __('Required') })}
                component={FinalFormField}
                label={__('Full Name')}
              />
            </Col>
            <Col xs={12}>
              <Field
                name="userid"
                validate={required({ msg: __('Required') })}
                component={FinalFormField}
                label={__('Username')}
              />
            </Col>
            <Col xs={12}>
              <Field
                name="password"
                type="password"
                validate={required({ msg: __('Required') })}
                component={FinalFormField}
                label={__('Password')}
              />
            </Col>
            <Col xs={12}>
              <Field
                name="verify"
                type="password"
                validate={required({ msg: __('Required') })}
                component={FinalFormField}
                label={__('Confirm password')}
              />
            </Col>
            <Col xs={12}>
              <Field
                name="email"
                type="email"
                validate={email({
                  msg: __('Email must be a valid email address'),
                  allowBlank: true,
                })}
                component={FinalFormField}
                label={__('Email Address')}
              />
            </Col>
            <Col xs={12}>
              <Field
                name="chosen_group"
                validate={composeValidators(required({ msg: __('A User must be assigned to a Group') }), validateEmpty)}
                component={FinalFormSelect}
                label={__('Available Groups')}
                options={groups}
                placeholder={__('Choose one or more Groups')}
                multi
              />
            </Col>
          </Row>
          <Row>
            <Col xs={10}>
              <ButtonGroup className="pull-right">
                <Button id="user-submit" bsStyle="primary" disabled={invalid} type="button" onClick={handleSubmit}>{__('Add')}</Button>
                <Button onClick={onCancel}>{__('Cancel')}</Button>
              </ButtonGroup>
            </Col>
          </Row>
        </Grid>
      </PfForm>
    )}
  />
);

RbacUserForm.propTypes = {
  onSave: PropTypes.func.isRequired,
  groups: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
  })),
  onCancel: PropTypes.func.isRequired,
};

export default RbacUserForm;
