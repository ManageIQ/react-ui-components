import React from 'react';
import { FormGroup, HelpBlock, Col, FormControl } from 'patternfly-react';
import PropTypes from 'prop-types';
import { inputObjectProps, metaObjectProps } from './finalFormPropTypes';

const FinalFormTextArea = ({
  meta,
  input,
  label,
}) => (
  <FormGroup validationState={meta.error ? 'error' : null}>
    <Col xs={2} componentClass="label" className="control-label">
      {label}
    </Col>
    <Col xs={8}>
      <FormControl componentClass="textarea" {...input} />
      {meta.error && <HelpBlock>{meta.error}</HelpBlock>}
    </Col>
  </FormGroup>
);

FinalFormTextArea.propTypes = {
  input: inputObjectProps,
  meta: metaObjectProps,
  label: PropTypes.string.isRequired,
};

export default FinalFormTextArea;
