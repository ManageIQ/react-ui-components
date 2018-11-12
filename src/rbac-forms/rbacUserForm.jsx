import React from 'react';
import { Form, Field } from 'react-final-form';
import PropTypes from 'prop-types';
import { required, email } from 'redux-form-validators';
import { Form as PfForm, Col, Row, Grid, Button, ButtonGroup } from 'patternfly-react';
import PasswordFragment from './formPasswordFragment';
import { FinalFormField, FinalFormSelect, composeValidators } from '../forms';
import { __ } from '../global-functions';
import { emailPropType } from '../manageiq-validators';
import './styles.scss';

const validateEmpty = values => (values.length === 0 ? __('A User must be assigned to a Group') : undefined);

const RbacUserForm = ({
  onSave,
  groups,
  onCancel,
  initialValues,
  editDisabled,
  newRecord,
}) => (
  <Form
    onSubmit={values => onSave({ ...values, groups: values.groups.length > 0 ? values.groups : null })}
    validate={(values) => {
      const errors = {};
      if (values.password && values.password !== values.verify) {
        errors.verify = __('Password/Verify Password do not match');
      }
      return errors;
    }}
    initialValues={initialValues}
    render={({
      invalid,
      handleSubmit,
      values,
      form: { change, reset },
    }) => {
      const pristine = JSON.stringify(initialValues) === JSON.stringify(values);
      return (
        <PfForm horizontal>
          <Grid fluid>
            <Row>
              <Col xs={12}>
                <Field
                  name="name"
                  validate={required({ msg: __('Required') })}
                  component={FinalFormField}
                  label={__('Full Name')}
                  disabled={!newRecord && editDisabled}
                />
              </Col>
              <Col xs={12}>
                <Field
                  name="userid"
                  validate={required({ msg: __('Required') })}
                  component={FinalFormField}
                  label={__('Username')}
                  disabled={!newRecord && editDisabled}
                />
              </Col>
              <PasswordFragment
                changeValue={change}
                isEditing={!newRecord}
                passwordValidators={[required({ msg: __('Required') })]}
              />
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
                  name="groups"
                  validate={composeValidators(required({ msg: __('A User must be assigned to a Group') }), validateEmpty)}
                  component={FinalFormSelect}
                  label={__('Available Groups')}
                  options={groups}
                  placeholder={__('Choose one or more Groups')}
                  multi
                  searchable
                  clearable
                />
              </Col>
            </Row>
            <Row>
              <Col xs={10}>
                <ButtonGroup className="pull-right">
                  <Button
                    id="user-submit"
                    bsStyle="primary"
                    disabled={pristine || invalid}
                    type="button"
                    onClick={handleSubmit}
                  >
                    {newRecord ? __('Add') : __('Save')}
                  </Button>
                  {!newRecord && (
                  <Button
                    disabled={pristine}
                    onClick={reset}
                    type="button"
                  >
                    {__('Reset')}
                  </Button>
                )}
                  <Button onClick={onCancel}>{__('Cancel')}</Button>
                </ButtonGroup>
              </Col>
            </Row>
          </Grid>
        </PfForm>
    );
}}
  />
);

RbacUserForm.propTypes = {
  onSave: PropTypes.func.isRequired,
  groups: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
  })),
  onCancel: PropTypes.func.isRequired,
  initialValues: PropTypes.shape({
    name: PropTypes.string,
    userid: PropTypes.string,
    chosen_group: PropTypes.arrayOf(PropTypes.string),
    email: (props, propsName, componentName) => emailPropType({
      props,
      propsName,
      componentName,
      isRequired: false,
    }),
  }),
  editDisabled: PropTypes.bool,
  newRecord: PropTypes.bool,
};

RbacUserForm.defaultProps = {
  editDisabled: false,
  newRecord: false,
};

export default RbacUserForm;
