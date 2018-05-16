import React from 'react';
import { FormGroup, HelpBlock, Col, FormControl, Checkbox } from 'patternfly-react';
import PropTypes from 'prop-types';
import { metaObjectProps, inputObjectProps } from './finalFormPropTypes';

export const FinalFormComponentWrapper = ({
  meta,
  label,
  children,
}) => (
  <FormGroup validationState={meta.error ? 'error' : null}>
    <Col xs={2} componentClass="label" className="control-label">
      {label}
    </Col>
    <Col xs={8}>
      {children}
      {meta.error && <HelpBlock>{meta.error}</HelpBlock>}
    </Col>
  </FormGroup>
);

FinalFormComponentWrapper.propTypes = {
  meta: metaObjectProps,
  label: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

const genericFielPropTypes = {
  input: inputObjectProps,
  meta: metaObjectProps,
  label: PropTypes.string.isRequired,
};

export const FinalFormField = ({
  input,
  meta,
  placeholder,
  label,
  type,
}) => (
  <FinalFormComponentWrapper meta={meta} label={label}>
    <FormControl type={type} {...input} placeholder={placeholder} />
  </FinalFormComponentWrapper>
);

FinalFormField.propTypes = {
  ...genericFielPropTypes,
  placeholder: PropTypes.string,
  type: PropTypes.string,
};

FinalFormField.defaultProps = {
  placeholder: '',
  type: 'text',
};

export const FinalFormCheckBox = ({
  meta,
  input,
  label,
  type,
}) => (
  <FinalFormComponentWrapper meta={meta} label={label}>
    <Checkbox type={type} {...input} />
  </FinalFormComponentWrapper>
);

FinalFormCheckBox.propTypes = {
  ...genericFielPropTypes,
  type: PropTypes.string,
};

FinalFormCheckBox.defaultProps = {
  type: 'checkbox',
};

export const FinalFormTextArea = ({
  meta,
  input,
  label,
  placeholder,
}) => (
  <FinalFormComponentWrapper meta={meta} label={label}>
    <FormControl componentClass="textarea" {...input} placeholder={placeholder} />
  </FinalFormComponentWrapper>
);

FinalFormTextArea.propTypes = {
  ...genericFielPropTypes,
  placeholder: PropTypes.string,
};

FinalFormTextArea.defaultProps = {
  placeholder: '',
};
