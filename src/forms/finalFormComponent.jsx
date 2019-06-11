import React from 'react';
import { Field } from 'react-final-form';
import { FormGroup, HelpBlock, Col, FormControl, Checkbox, Radio, Switch } from 'patternfly-react';
import PropTypes from 'prop-types';

import { metaObjectProps, inputObjectProps } from './finalFormPropTypes';
import { validationError } from './finalFormFieldsHelper';
import PfSelect from './pf-select';
import './style.scss';

const componentTypes = ['radio', 'checkbox', 'textarea', 'select', 'textfield', 'switch'];
const switchComponents = ['radio', 'checkbox'];
const inputTypes = ['text', 'email', 'number', 'password'];

const componentSelect = (componentType, {
  input,
  meta,
  simpleValue,
  ...rest
}) => ({
  textfield: <FormControl type={rest.type || 'text'} {...input} placeholder={rest.placeholder} />,
  radio: <Radio {...input} >{rest.label}</Radio>,
  checkbox: <Checkbox {...input}>{rest.label}</Checkbox>,
  textarea: <FormControl componentClass="textarea" {...input} placeholder={rest.placeholder} cols={rest.cols} rows={rest.rows} />,
  select: <PfSelect input={input} meta={meta} simpleValue={simpleValue} {...rest} />,
  switch: <Switch {...input} value={!!input.value} onChange={(elem, state) => input.onChange(state)} {...rest} />,
})[componentType];

const isSwitchInput = componentType => switchComponents.includes(componentType);
const normalizeInputValues = values => (values.id ? values : { ...values, id: values.name });

const FinalFormComponent = ({
  meta,
  input,
  label,
  validateOnMount,
  inputColumnSize,
  labelColumnSize,
  options,
  clearable,
  componentType,
  placeholder,
  type,
  maxLength,
  disabled,
  children,
  id,
  simpleValue,
  ...rest
}) => {
  const invalid = validationError(meta, validateOnMount);
  const inputProps = {
    meta,
    id,
    input: { ...normalizeInputValues({ ...input, id }), disabled, maxLength },
    options: options || [],
    clearable,
    placeholder,
    label,
    type,
    simpleValue,
    ...rest,
  };
  if (isSwitchInput(componentType)) {
    return (
      <FormGroup className="field-group" validationState={invalid ? 'error' : null}>
        <Col>
          {componentSelect(componentType, inputProps)}
        </Col>
      </FormGroup>
    );
  }
  return (
    <FormGroup validationState={invalid ? 'error' : null}>
      <Col xs={labelColumnSize} componentClass="label" className="control-label">
        {label}
      </Col>
      <Col xs={inputColumnSize}>
        {componentSelect(componentType, inputProps)}
        {invalid && <HelpBlock>{meta.error}</HelpBlock>}
      </Col>
      {children}
    </FormGroup>
  );
};

const componentTypeProp = (props, propName, componentName) => {
  if (!componentTypes.includes(props[propName])) {
    return new Error(`Invalid value supplied to ${propName}. Please choose one of ${JSON.stringify(componentTypes)}. Validation failed`);
  }
  if (props.componentType === 'select' && !props.options) {
    return new Error(`Missing prop OPTIONS in select component ${componentName}. Validation failed`);
  }
  return undefined;
};

const inputTypeProp = (props, propName) => {
  /**
  * Check if type is not radio or checkbox when creating standard input
  */
  if (switchComponents.includes(props.componentType) && inputTypes.includes(props[propName])) {
    return new Error(`You are trying to create radiobutton or checkbox.
      Please use FinalFormRadio or FinalFormCheckBox instead of standard field.
      ValidationFailed`, props);
  }
  return undefined;
};

const optionsPropType = (props, propName, componentName) => {
  if (props.componentType === 'select') {
    if (!Array.isArray(props.options)) {
      return new Error(`Expected options to be array, received ${typeof props.options}. Validation failed in ${componentName}!`);
    }

    // eslint-disable-next-line
    props.options.forEach((option, index) => {
      if (typeof option !== 'object') {
        return new Error(`Select option must be an object, ${typeof option} received at index ${index}. Validation failed in ${componentName}!`);
      }

      if (!option[props.valueKey]) {
        return new Error(`Option must have ${props.valueKey} attribute. Validation failed in ${componentName}!`);
      }

      if (!option[props.labelKey]) {
        return new Error(`Option must have ${props.valueKey} attribute. Validation failed in ${componentName}!`);
      }
    });
  }
  return undefined;
};

FinalFormComponent.propTypes = {
  meta: metaObjectProps,
  input: inputObjectProps,
  label: PropTypes.string.isRequired,
  validateOnMount: PropTypes.bool,
  inputColumnSize: PropTypes.number,
  labelColumnSize: PropTypes.number,
  options: optionsPropType,
  clearable: PropTypes.bool,
  componentType: componentTypeProp,
  placeholder: PropTypes.string,
  type: inputTypeProp,
  searchable: PropTypes.bool,
  multi: PropTypes.bool,
  labelKey: PropTypes.string,
  valueKey: PropTypes.string,
  maxLength: PropTypes.number,
  disabled: PropTypes.bool,
  id: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  simpleValue: PropTypes.bool,
};

FinalFormComponent.defaultProps = {
  validateOnMount: false,
  inputColumnSize: 8,
  labelColumnSize: 2,
  placeholder: '',
  componentType: 'textfield',
  clearable: false,
  searchable: false,
  multi: false,
  labelKey: 'label',
  valueKey: 'value',
  disabled: false,
  simpleValue: true,
};

export const FinalFormField = props => <FinalFormComponent componentType="textfield" {...props} />;

export const FinalFormCheckBox = props => <FinalFormComponent componentType="checkbox" {...props} />;

export const FinalFormTextArea = props => <FinalFormComponent componentType="textarea" {...props} />;

export const FinalFormSelect = props => <FinalFormComponent componentType="select" {...props} />;

export const FinalFormRadio = props => <FinalFormComponent componentType="radio" {...props} />;

export const FinalFormSwitch = props => <FinalFormComponent componentType="switch" {...props} />;

export const Condition = ({ when, is, children }) => (
  <Field name={when} subscription={{ value: true }}>
    {({ input: { value } }) => (value === is ? children : null)}
  </Field>
);

Condition.propTypes = {
  when: PropTypes.string.isRequired,
  is: PropTypes.any,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export const FieldGroup = ({
  label,
  children,
  labelSize,
  groupSize,
  name,
  validateOnMount,
}) => (
  <Col xs={12} className="field-group">
    <Col xs={labelSize} componentClass="label" className="control-label" >
      {label}
    </Col>
    <Col xs={groupSize}>
      {children}
    </Col>
    <Col xs={12 - labelSize} xsOffset={labelSize} className="has-error">
      <ErrorBlock name={name} validateOnMount={validateOnMount} />
    </Col>
  </Col>
);

FieldGroup.propTypes = {
  label: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  labelSize: PropTypes.number,
  groupSize: PropTypes.number,
  name: PropTypes.string.isRequired,
  validateOnMount: PropTypes.bool,
};

FieldGroup.defaultProps = {
  labelSize: 2,
  groupSize: 8,
  validateOnMount: false,
};

const ErrorBlock = ({ name, validateOnMount }) => (
  <Field
    name={name}
    subscription={{ touched: true, error: true }}
    render={({ meta }) => (validationError(meta, validateOnMount) && meta.error ? <HelpBlock>{meta.error}</HelpBlock> : null)
    }
  />
);

ErrorBlock.propTypes = {
  name: PropTypes.string.isRequired,
  validateOnMount: PropTypes.bool,
};

ErrorBlock.defaultProps = {
  validateOnMount: false,
};
