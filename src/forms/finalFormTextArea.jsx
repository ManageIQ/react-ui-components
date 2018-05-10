import React from 'react';
import { FormGroup, HelpBlock, Col, FormControl } from 'patternfly-react';
import PropTypes from 'prop-types';
import { inputObjectProps, metaObjectProps } from './finalFormPropTypes';
import { validationError } from './finalFormFieldsHelper';

export const FinalFormTextArea = ({
  meta,
  input,
  label,
  validateOnMount,
}) => {
  const invalid = validationError(meta, validateOnMount);
  return (
    <FormGroup validationState={invalid ? 'error' : null}>
      <Col xs={2} componentClass="label" className="control-label">
        {label}
      </Col>
      <Col xs={8}>
        <FormControl componentClass="textarea" {...input} />
        {invalid && <HelpBlock>{meta.error}</HelpBlock>}
      </Col>
    </FormGroup>
  );
};

FinalFormTextArea.propTypes = {
  input: inputObjectProps,
  meta: metaObjectProps,
  label: PropTypes.string.isRequired,
  validateOnMount: PropTypes.bool,
};

FinalFormTextArea.defaultProps = {
  validateOnMount: false,
};
