import React from 'react';
import { FormGroup, HelpBlock, Checkbox, Col } from 'patternfly-react';
import PropTypes from 'prop-types';
import { inputObjectProps, metaObjectProps } from './finalFormPropTypes';
import { validationError } from './finalFormFieldsHelper';

export const FinalFormCheckBox = ({
  meta,
  input,
  label,
  type,
  validateOnMount,
}) => {
  const invalid = validationError(meta, validateOnMount);
  return (
    <FormGroup validationState={invalid ? 'error' : null}>
      <Col xs={2} componentClass="label" className="control-label">
        {label}
      </Col>
      <Col xs={8}>
        <Checkbox type={type} {...input} />
        {invalid && <HelpBlock>{meta.error}</HelpBlock>}
      </Col>
    </FormGroup>
  );
};

FinalFormCheckBox.propTypes = {
  input: inputObjectProps,
  meta: metaObjectProps,
  label: PropTypes.string.isRequired,
  type: PropTypes.string,
  validateOnMount: PropTypes.bool,
};

FinalFormCheckBox.defaultProps = {
  type: 'checkbox',
  validateOnMount: false,
};
