import React from 'react';
import PropTypes from 'prop-types';
import ReactSelect from 'react-select';

const EnhancedComponent = ({
  value,
  selectedLabelName,
  searchable,
  ...remainingProps
}) => (
  <ReactSelect
    value={value ? { value: value.value, label: value[selectedLabelName] } : value}
    {...remainingProps}
  />
);

EnhancedComponent.propTypes = {
  selectedLabelName: PropTypes.string,
  value: PropTypes.object,
  searchable: PropTypes.bool,
};

EnhancedComponent.defaultProps = {
  selectedLabelName: 'selectedTitle',
  searchable: false,
};

export default EnhancedComponent;
