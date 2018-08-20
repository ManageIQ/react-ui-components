import React, { PureComponent, Fragment } from 'react';
import { Field } from 'react-final-form';
import { Col } from 'patternfly-react';
import PropTypes from 'prop-types';
import { FinalFormField, composeValidators } from '../forms';
import { __ } from '../global-functions';

export default class PasswordFragment extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      editEnabled: false,
    };
  }

  handleChangeEdit = () => this.setState(prevState => ({ editEnabled: !prevState.editEnabled }));

  render() {
    const { isEditing, changeValue, passwordValidators } = this.props;
    const { editEnabled } = this.state;
    if (!isEditing || editEnabled) {
      return (
        <Fragment>
          <Col xs={12}>
            <Field
              id="password"
              name="password"
              type="password"
              validate={composeValidators(...passwordValidators)}
              component={FinalFormField}
              label={__('Password')}
            >
              {
                isEditing &&
                <Col md={2}>
                  <button
                    id="password-change-disabler"
                    type="button"
                    className="button-link"
                    onClick={() => {
                      changeValue('password', null);
                      changeValue('verify', null);
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
              id="password-verify"
              name="verify"
              type="password"
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
            <button id="password-change-enabler" tabIndex="-1" type="button" className="button-link" onClick={this.handleChangeEdit}>
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
  passwordValidators: PropTypes.arrayOf(PropTypes.func),
};

PasswordFragment.defaultProps = {
  isEditing: false,
  passwordValidators: [],
};
