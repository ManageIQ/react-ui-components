import React from 'react';
import PropTypes from 'prop-types';
import { getRegisteredValues } from './formFragmentHelper';

export const dynamicForm = (Component) => {
  const C = (props) => {
    const { wrappedComponentRef, onSave, ...remainingProps } = props;
    return (
      <Component
        onSave={(values, formApi) => onSave.apply(this, Object.values(getRegisteredValues(values, formApi)))}
        {...remainingProps}
        ref={wrappedComponentRef}
      />
    );
  };

  C.propTypes = {
    wrappedComponentRef: PropTypes.func,
    onSave: PropTypes.func,
  };

  return C;
};
