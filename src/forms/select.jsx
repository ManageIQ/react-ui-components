import React from 'react';
import PropTypes from 'prop-types';
import ReactSelect from 'react-select';
import './styles.scss';


const Select = (props) => {
  const {
    options,
    clearable,
    hasError,
    searchable,
    onChange,
    ...rest
  } = props;
  return (
    <ReactSelect
      className={`${hasError ? 'has-error' : ''} final-form-select`}
      options={options}
      clearable={clearable}
      searchable={searchable}
      onChange={({ value }) => onChange(value)}
      {...rest}
    />
  );
};

Select.propTypes = {
  options: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.any.isRequired,
    label: PropTypes.string.isRequired,
  })).isRequired,
  clearable: PropTypes.bool,
  hasError: PropTypes.bool,
  placehoder: PropTypes.string,
  searchable: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
};

Select.defaultProps = {
  clearable: false,
  hasError: false,
  searchable: false,
  placehoder: 'Select',
};

export default Select;
