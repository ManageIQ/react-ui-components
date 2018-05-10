import React from 'react';
import { FormGroup, HelpBlock, Col, FormControl } from 'patternfly-react';
import PropTypes from 'prop-types';
import { inputObjectProps, metaObjectProps } from './finalFormPropTypes';

export const FinalFormField = ({
  input,
  meta,
  placeholder,
  label,
  type,
}) => (
  <FormGroup validationState={meta.error ? 'error' : null}>
    <Col xs={2} componentClass="label" className="control-label">
      {label}
    </Col>
    <Col xs={8}>
      <FormControl type={type} {...input} placeholder={placeholder} />
      {meta.error && <HelpBlock>{meta.error}</HelpBlock>}
    </Col>
  </FormGroup>
);

FinalFormField.propTypes = {
  input: inputObjectProps,
  meta: metaObjectProps,
  placeholder: PropTypes.string,
  label: PropTypes.string.isRequired,
  type: PropTypes.string,
};

FinalFormField.defaultProps = {
  placeholder: '',
  type: 'text',
};
