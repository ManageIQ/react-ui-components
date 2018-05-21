import React from 'react';
import { Field } from 'react-final-form';
import { FormGroup, HelpBlock, Col, FormControl, Checkbox, Radio } from 'patternfly-react';
import PropTypes from 'prop-types';
import ReactSelect from 'react-select';
import { metaObjectProps, inputObjectProps } from './finalFormPropTypes';
import { validationError } from './finalFormFieldsHelper';
import './finalFormSelectStyle.scss';

const componentTypes = ['radio', 'checkbox', 'textarea', 'select', 'textfield'];
const switchComponents = ['radio', 'checkbox'];
const inputTypes = ['text', 'email', 'number', 'password'];

const componentSelect = (componentType, props) => ({
  textfield: <FormControl type={props.type || 'text'} {...props.input} placeholder={props.placeholder} />,
  radio: <Radio {...props.input} >{props.label}</Radio>,
  checkbox: <Checkbox {...props.input}>{props.label}</Checkbox>,
  textarea: <FormControl componentClass="textarea" {...props.input} placeholder={props.placeholder} />,
  select: <ReactSelect
    className={`${props.invalid ? 'has-error' : ''} final-form-select`}
    optionClassName="final-form-select-option"
    options={props.options}
    clearable={props.clearable}
    searchable={false}
    placeholder={props.placeholder}
    {...props.input}
    onChange={({ value }) => props.input.onChange(value)}
  />,
})[componentType];

const isSwitchInput = componentType => switchComponents.includes(componentType);

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
  ...rest
}) => {
  const invalid = validationError(meta, validateOnMount);
  const inputProps = {
    meta,
    input,
    options,
    clearable,
    placeholder,
    label,
    type,
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

FinalFormComponent.propTypes = {
  meta: metaObjectProps,
  input: inputObjectProps,
  label: PropTypes.string.isRequired,
  validateOnMount: PropTypes.bool,
  inputColumnSize: PropTypes.number,
  labelColumnSize: PropTypes.number,
  options: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.any.isRequired,
    label: PropTypes.string.isRequired,
  })),
  clearable: PropTypes.bool,
  componentType: componentTypeProp,
  placeholder: PropTypes.string,
  type: inputTypeProp,
};

FinalFormComponent.defaultProps = {
  validateOnMount: false,
  inputColumnSize: 8,
  labelColumnSize: 2,
  placeholder: '',
  componentType: 'textfield',
  clearable: false,
};

export const FinalFormField = props => <FinalFormComponent componentType="textfield" {...props} />;

export const FinalFormCheckBox = props => <FinalFormComponent componentType="checkbox" {...props} />;

export const FinalFormTextArea = props => <FinalFormComponent componentType="textarea" {...props} />;

export const FinalFormSelect = props => <FinalFormComponent componentType="select" {...props} />;

export const FinalFormRadio = props => <FinalFormComponent componentType="radio" {...props} />;

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
