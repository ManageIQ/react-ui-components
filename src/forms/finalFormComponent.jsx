import React from 'react';
import { FormGroup, HelpBlock, Col, FormControl, Checkbox, Radio } from 'patternfly-react';
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
  inputColumnSize,
  labelColumnSize,
}) => {
  const invalid = validationError(meta, validateOnMount);
  return (
    <FormGroup validationState={invalid ? 'error' : null}>
      <Col xs={labelColumnSize} componentClass="label" className="control-label">
        {label}
      </Col>
      <Col xs={inputColumnSize}>
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
  inputColumnSize: PropTypes.number,
  labelColumnSize: PropTypes.number,
};

FinalFormComponentWrapper.defaultProps = {
  validateOnMount: false,
  inputColumnSize: 8,
  labelColumnSize: 2,
};

const genericFieldPropTypes = {
  input: inputObjectProps,
  meta: metaObjectProps,
  label: PropTypes.string.isRequired,
  validateOnMount: PropTypes.bool,
  inputColumnSize: PropTypes.number,
  labelColumnSize: PropTypes.number,
};

export const FinalFormField = ({
  input,
  meta,
  placeholder,
  label,
  type,
  validateOnMount,
  inputColumnSize,
  labelColumnSize,
}) => (
  <FinalFormComponentWrapper
    meta={meta}
    label={label}
    validateOnMount={validateOnMount}
    inputColumnSize={inputColumnSize}
    labelColumnSize={labelColumnSize}
  >
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
  inputColumnSize,
  labelColumnSize,
}) => (
  <FinalFormComponentWrapper
    meta={meta}
    label={label}
    validateOnMount={validateOnMount}
    inputColumnSize={inputColumnSize}
    labelColumnSize={labelColumnSize}
  >
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
  inputColumnSize,
  labelColumnSize,
}) => (
  <FinalFormComponentWrapper
    meta={meta}
    label={label}
    validateOnMount={validateOnMount}
    inputColumnSize={inputColumnSize}
    labelColumnSize={labelColumnSize}
  >
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
  inputColumnSize,
  labelColumnSize,
  ...rest
}) => {
  const { onChange, ...inputProps } = input;
  const invalid = validationError(meta, validateOnMount);
  return (
    <FinalFormComponentWrapper
      meta={meta}
      label={label}
      validateOnMount={validateOnMount}
      inputColumnSize={inputColumnSize}
      labelColumnSize={labelColumnSize}
    >
      <ReactSelect
        className={`${invalid ? 'has-error' : ''} final-form-select`}
        optionClassName="final-form-select-option"
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

export const FinalFormRadio = ({
  meta,
  input,
  label,
  validateOnMount,
  inputColumnSize,
  labelColumnSize,
}) => (
  <FinalFormComponentWrapper
    meta={meta}
    label={label}
    validateOnMount={validateOnMount}
    inputColumnSize={inputColumnSize}
    labelColumnSize={labelColumnSize}
  >
    <Radio
      {...input}
    />
  </FinalFormComponentWrapper>
);

FinalFormRadio.propTypes = {
  ...genericFieldPropTypes,
};
