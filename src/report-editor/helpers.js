export const resetInput = (input, change, resetField, resetValue) => ({
  ...input,
  onChange: (...args) => {
    input.onChange(...args);
    if (Array.isArray(resetField)) {
      resetField.forEach(name => change(name, resetValue));
    } else {
      change(resetField, resetValue);
    }
  },
});
