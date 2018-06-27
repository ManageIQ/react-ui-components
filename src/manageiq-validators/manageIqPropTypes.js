import { emailPattern } from './';

export const emailPropType = ({
  props,
  propName,
  componentName,
  isRequired,
}) => {
  if (!props[propName] && !isRequired) {
    return undefined;
  }
  return emailPattern.test(props[propName])
    ? undefined
    : new Error(`Invalid prop  ${propName} supplied to ${componentName} Validation failed. Expected email address.`);
};
