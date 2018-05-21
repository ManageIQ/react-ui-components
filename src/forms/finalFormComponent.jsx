import React from 'react';
import { Field } from 'react-final-form';
import { FormGroup, HelpBlock, Col, FormControl, Checkbox, Radio } from 'patternfly-react';
import PropTypes from 'prop-types';
import ReactSelect from 'react-select';
import { metaObjectProps, inputObjectProps } from './finalFormPropTypes';
import { validationError } from './finalFormFieldsHelper';
import './finalFormSelectStyle.scss';

const componentSwitch = (componentType, props) => ({
  textfield: <FormControl type={props.type} {...props.input} placeholder={props.placeholder} />,
  radio: <Radio {...props.input} />,
  checkbox: <Checkbox {...props.input} />,
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
  ...rest
}) => {
  const invalid = validationError(meta, validateOnMount);
  const inputProps = {
    meta,
    input,
    options,
    clearable,
    placeholder,
    ...rest,
  };
  return (
    <FormGroup validationState={invalid ? 'error' : null}>
      <Col xs={labelColumnSize} componentClass="label" className="control-label">
        {label}
      </Col>
      <Col xs={inputColumnSize}>
        {componentSwitch(componentType, inputProps)}
        {invalid && <HelpBlock>{meta.error}</HelpBlock>}
      </Col>
    </FormGroup>
  );
};

const componentTypes = ['radio', 'checkbox', 'textarea', 'select', 'textfield'];

const componentTypeProp = (props, propName, componentName) => {
  if (!componentTypes.includes(props[propName])) {
    return new Error(`Invalid value supplied to ${propName}. Please choose one of ${JSON.stringify(componentTypes)}. Validation failed`);
  }
  if (props.componentType === 'select' && !props.options) {
    return new Error(`Missing prop OPTIONS in select component ${componentName}. Validation failed`);
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
};

FinalFormComponent.defaultProps = {
  validateOnMount: false,
  inputColumnSize: 8,
  labelColumnSize: 2,
  placeholder: '',
  componentType: 'textfield',
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
