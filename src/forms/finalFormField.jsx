import React from 'react';
import { FormGroup, HelpBlock, Col, FormControl } from 'patternfly-react';
import PropTypes from 'prop-types';
import { inputObjectProps, metaObjectProps } from './finalFormPropTypes';
import { validationError } from './finalFormFieldsHelper';

export const FinalFormField = ({
  input,
  meta,
  placeholder,
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
        <FormControl type={type} {...input} placeholder={placeholder} />
        {invalid && <HelpBlock>{meta.error}</HelpBlock>}
      </Col>
    </FormGroup>
  );
};

FinalFormField.propTypes = {
  input: inputObjectProps,
  meta: metaObjectProps,
  placeholder: PropTypes.string,
  label: PropTypes.string.isRequired,
  type: PropTypes.string,
  validateOnMount: PropTypes.bool,
};

FinalFormField.defaultProps = {
  placeholder: '',
  type: 'text',
  validateOnMount: false,
};
