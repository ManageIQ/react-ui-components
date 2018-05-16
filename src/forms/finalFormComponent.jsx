import React from 'react';
import { FormGroup, HelpBlock, Col, FormControl, Checkbox } from 'patternfly-react';
import PropTypes from 'prop-types';
import ReactSelect from 'react-select';
import { metaObjectProps, inputObjectProps } from './finalFormPropTypes';
import { validationError } from './finalFormFieldsHelper';
import './finalFormSelectStyle.scss';

export const FinalFormComponentWrapper = ({
  meta,
  label,
  children,
  validateOnMount,
}) => {
  const invalid = validationError(meta, validateOnMount);
  return (
    <FormGroup validationState={invalid ? 'error' : null}>
      <Col xs={2} componentClass="label" className="control-label">
        {label}
      </Col>
      <Col xs={8}>
        {children}
        {invalid && <HelpBlock>{meta.error}</HelpBlock>}
      </Col>
    </FormGroup>
  );
};

FinalFormComponentWrapper.propTypes = {
  meta: metaObjectProps,
  label: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  validateOnMount: PropTypes.bool,
};

FinalFormComponentWrapper.defaultProps = {
  validateOnMount: false,
};

const genericFieldPropTypes = {
  input: inputObjectProps,
  meta: metaObjectProps,
  label: PropTypes.string.isRequired,
  validateOnMount: PropTypes.bool,
};

export const FinalFormField = ({
  input,
  meta,
  placeholder,
  label,
  type,
  validateOnMount,
}) => (
  <FinalFormComponentWrapper meta={meta} label={label} validateOnMount={validateOnMount}>
    <FormControl type={type} {...input} placeholder={placeholder} />
  </FinalFormComponentWrapper>
);

FinalFormField.propTypes = {
  ...genericFieldPropTypes,
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
  validateOnMount,
}) => (
  <FinalFormComponentWrapper meta={meta} label={label} validateOnMount={validateOnMount}>
    <Checkbox type={type} {...input} />
  </FinalFormComponentWrapper>
);

FinalFormCheckBox.propTypes = {
  ...genericFieldPropTypes,
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
  validateOnMount,
}) => (
  <FinalFormComponentWrapper meta={meta} label={label} validateOnMount={validateOnMount}>
    <FormControl componentClass="textarea" {...input} placeholder={placeholder} />
  </FinalFormComponentWrapper>
);

FinalFormTextArea.propTypes = {
  ...genericFieldPropTypes,
  placeholder: PropTypes.string,
};

FinalFormTextArea.defaultProps = {
  placeholder: '',
};

export const FinalFormSelect = ({
  input,
  meta,
  label,
  options,
  placeholder,
  clearable,
  validateOnMount,
  ...rest
}) => {
  const { onChange, ...inputProps } = input;
  const invalid = validationError(meta, validateOnMount);
  return (
    <FinalFormComponentWrapper meta={meta} label={label} validateOnMount={validateOnMount}>
      <ReactSelect
        className={`${invalid ? 'has-error' : ''} final-form-select`}
        options={options}
        clearable={clearable}
        searchable={false}
        placeholder={placeholder}
        onChange={({ value }) => input.onChange(value)}
        {...inputProps}
        {...rest}
      />
    </FinalFormComponentWrapper>
  );
};

FinalFormSelect.propTypes = {
  ...genericFieldPropTypes,
  options: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.any.isRequired,
    label: PropTypes.string.isRequired,
  })).isRequired,
  placeholder: PropTypes.string,
  clearable: PropTypes.bool,
};

FinalFormSelect.defaultProps = {
  placeholder: 'Select',
  clearable: false,
};
