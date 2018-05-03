import PropTypes from 'prop-types';

export const inputObjectProps = PropTypes.shape({
  name: PropTypes.string.isRequired,
  onBlur: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onFocus: PropTypes.func.isRequired,
  value: PropTypes.any,
});

export const metaObjectProps = PropTypes.shape({
  active: PropTypes.bool.isRequired,
  data: PropTypes.any,
  dirty: PropTypes.bool.isRequired,
  dirtySinceLastSubmit: PropTypes.bool.isRequired,
  error: PropTypes.string,
  invalid: PropTypes.bool.isRequired,
  pristine: PropTypes.bool.isRequired,
  submitFailed: PropTypes.bool.isRequired,
  submitSucceeded: PropTypes.bool.isRequired,
  touched: PropTypes.bool.isRequired,
  valid: PropTypes.bool.isRequired,
  visited: PropTypes.bool.isRequired,
});
