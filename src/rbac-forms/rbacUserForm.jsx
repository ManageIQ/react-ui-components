import React, { Fragment, PureComponent } from 'react';
import { Form, Field } from 'react-final-form';
import PropTypes from 'prop-types';
import { required, email } from 'redux-form-validators';
import { Form as PfForm, Col, Row, Grid, Button, ButtonGroup } from 'patternfly-react';

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
}) => (
  <Form
    onSubmit={values => onSave({ ...values, chosen_group: values.chosen_group.length > 0 ? values.chosen_group : null })}
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
      pristine,
      handleSubmit,
      form: { change, reset },
    }) => (
      <PfForm horizontal>
        <Grid>
          <Row>
            <Col xs={12}>
              <Field
                name="name"
                validate={required({ msg: __('Required') })}
                component={FinalFormField}
                label={__('Full Name')}
                disabled={initialValues && editDisabled}
              />
            </Col>
            <Col xs={12}>
              <Field
                name="userid"
                validate={required({ msg: __('Required') })}
                component={FinalFormField}
                label={__('Username')}
                disabled={initialValues && editDisabled}
              />
            </Col>
            <PasswordFragment changeValue={change} isEditing={!!initialValues} />
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
                <Button
                  id="user-submit"
                  bsStyle="primary"
                  disabled={pristine || invalid}
                  type="button"
                  onClick={handleSubmit}
                >
                  {initialValues ? __('Save') : __('Add')}
                </Button>
                {initialValues && <Button disabled={pristine} onClick={reset} type="button">{__('Reset')}</Button>}
                <Button onClick={onCancel}>{__('Cancel')}</Button>
              </ButtonGroup>
            </Col>
          </Row>
        </Grid>
      </PfForm>
    )}
  />
);

class PasswordFragment extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      editEnabled: false,
    };
  }

  handleChangeEdit = () => this.setState(prevState => ({ editEnabled: !prevState.editEnabled }));

  render() {
    const { isEditing, changeValue } = this.props;
    const { editEnabled } = this.state;
    if (!isEditing || editEnabled) {
      return (
        <Fragment>
          <Col xs={12}>
            <Field
              name="password"
              type="password"
              validate={required({ msg: __('Required') })}
              component={FinalFormField}
              label={__('Password')}
            >
              {
                isEditing &&
                <Col md={2}>
                  <button
                    tabIndex="-1"
                    type="button"
                    className="button-link"
                    onClick={() => {
                      changeValue('password', null);
                      this.handleChangeEdit();
                    }}
                  >
                    {__('Cancel password change')}
                  </button>
                </Col>
              }
            </Field>
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
        </Fragment>
      );
    }
    return (
      <Col xs={12}>
        <Field
          name="password"
          type="password"
          component={FinalFormField}
          label={__('Password')}
          disabled
          placeholder="●●●●●●●●"
        >
          <Col md={2}>
            <button tabIndex="-1" type="button" className="button-link" onClick={this.handleChangeEdit}>
              {__('Change stored password')}
            </button>
          </Col>
        </Field>
      </Col>
    );
  }
}

PasswordFragment.propTypes = {
  isEditing: PropTypes.bool,
  changeValue: PropTypes.func.isRequired,
};

PasswordFragment.defaultProps = {
  isEditing: false,
};

RbacUserForm.propTypes = {
  onSave: PropTypes.func.isRequired,
  groups: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
  })),
  onCancel: PropTypes.func.isRequired,
  initialValues: PropTypes.shape({
    name: PropTypes.string.isRequired,
    userid: PropTypes.string.isRequired,
    chosen_group: PropTypes.arrayOf(PropTypes.number),
    email: (props, propsName, componentName) => emailPropType({
      props,
      propsName,
      componentName,
      isRequired: false,
    }),
  }),
  editDisabled: PropTypes.bool,
};

RbacUserForm.defaultProps = {
  editDisabled: false,
};

export default RbacUserForm;
