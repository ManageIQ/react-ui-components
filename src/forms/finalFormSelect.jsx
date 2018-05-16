import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup, HelpBlock, Col } from 'patternfly-react';
import ReactSelect from 'react-select';
import { inputObjectProps, metaObjectProps } from './finalFormPropTypes';
import './finalFormSelectStyle.scss';

const FinalFormSelect = ({
  input,
  meta,
  label,
  options,
  placeholder,
  clearable,
  ...rest
}) => {
  const { onChange, ...inputProps } = input;
  return (
    <FormGroup validationState={meta.error ? 'error' : null}>
      <Col xs={2} componentClass="label" className="control-label">
        {label}
      </Col>
      <Col xs={8}>
        <ReactSelect
          className={`${meta.error ? 'has-error' : ''} final-form-select`}
          options={options}
          clearable={clearable}
          searchable={false}
          placeholder={placeholder}
          onChange={({ value }) => input.onChange(value)}
          {...inputProps}
          {...rest}
        />
        {meta.error && <HelpBlock>{meta.error}</HelpBlock>}
      </Col>
    </FormGroup>
  );
};

FinalFormSelect.propTypes = {
  input: inputObjectProps,
  meta: metaObjectProps,
  label: PropTypes.string.isRequired,
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

export default FinalFormSelect;
