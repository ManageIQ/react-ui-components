export const getRegisteredValues = (values, formApi) => {
  const registeredValues = {};
  formApi.getRegisteredFields().forEach((field) => {
    registeredValues[field] = values[field];
  });
  return {
    values,
    registeredValues,
    formApi,
  };
};
