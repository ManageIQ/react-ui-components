import { emailPropType } from '../manageIqPropTypes';

describe('Proptypes validators', () => {
  describe('Email prop type', () => {
    let propName;
    let props;
    let componentName;
    let isRequired;

    beforeEach(() => {
      propName = 'email';
      props = {
        [propName]: 'mail@mail.com',
      };
      componentName = 'foo';
      isRequired = true;
    });

    it('Shoudl fail required validation', () => {
      const expectedMessage = `Invalid prop  ${propName} supplied to ${componentName} Validation failed. Expected email address got undefined.`;
      const error = emailPropType({
        props: {},
        propName,
        componentName,
        isRequired: true,
      });
      expect(error.message).toEqual(expectedMessage);
    });

    it('Should fail regex validation', () => {
      const expectedMessage = `Invalid prop  ${propName} supplied to ${componentName} Validation failed. Expected email address.`;
      const error = emailPropType({
        props: {
          email: 'foo',
        },
        propName,
        componentName,
        isRequired,
      });
      expect(error.message).toEqual(expectedMessage);
    });

    it('Should pass empty email if not required', () => {
      const error = emailPropType({
        props: {},
        propName,
        componentName,
        isRequired: false,
      });
      expect(error).toBeUndefined();
    });

    it('Should pass propTypes validation', () => {
      const error = emailPropType({
        props,
        propName,
        componentName,
        isRequired,
      });
      expect(error).toBeUndefined();
    });
  });
});
