export const validationError = (meta, validateOnMount) => {
  if (validateOnMount) {
    return meta.error;
  }
  return meta.touched && meta.error;
};

export const composeValidators = (...validators) => value =>
  validators.reduce((error, validator) => error || validator(value), undefined);
