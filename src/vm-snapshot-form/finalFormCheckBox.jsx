import React from 'react';
import { FormGroup, HelpBlock, Checkbox, Col } from 'patternfly-react';
import PropTypes from 'prop-types';
import { inputObjectProps, metaObjectProps } from './finalFormPropTypes';

const FinalFormCheckBox = ({
  meta,
  input,
  label,
  type,
}) => (
  <FormGroup validationState={meta.error ? 'error' : null}>
    <Col xs={2} componentClass="label" className="control-label">
      {label}
    </Col>
    <Col xs={8}>
      <Checkbox type={type} {...input} />
      {meta.error && <HelpBlock>{meta.error}</HelpBlock>}
    </Col>
  </FormGroup>
);

FinalFormCheckBox.propTypes = {
  input: inputObjectProps,
  meta: metaObjectProps,
  label: PropTypes.string.isRequired,
  type: PropTypes.string,
};

FinalFormCheckBox.defaultProps = {
  type: 'checkbox',
};

export default FinalFormCheckBox;
