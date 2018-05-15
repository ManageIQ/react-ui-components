import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup, HelpBlock, Col } from 'patternfly-react';
import Select from './select';
import { inputObjectProps, metaObjectProps } from './finalFormPropTypes';

const FinalFormSelect = ({
  input,
  meta,
  label,
  options,
  placeholder,
  ...rest
}) => (
  <FormGroup validationState={meta.error ? 'error' : null}>
    <Col xs={2} componentClass="label" className="control-label">
      {label}
    </Col>
    <Col xs={8}>
      <Select options={options} {...input} {...rest} hasError={!!meta.error} placeholder={placeholder} />
      {meta.error && <HelpBlock>{meta.error}</HelpBlock>}
    </Col>
  </FormGroup>
);

FinalFormSelect.propTypes = {
  input: inputObjectProps,
  meta: metaObjectProps,
  label: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.any.isRequired,
    label: PropTypes.string.isRequired,
  })).isRequired,
  placeholder: PropTypes.string,
};

FinalFormSelect.defaultProps = {
  placeholder: 'Select',
};

export default FinalFormSelect;
