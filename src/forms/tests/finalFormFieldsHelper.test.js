import { validationError } from '../finalFormFieldsHelper';

describe('Final form fields helper function', () => {
  const meta = {};
  beforeEach(() => {
    meta.error = 'Required';
    meta.touched = false;
  });

  it('Should return invalid state', () => {
    expect(validationError(meta, true)).toBeTruthy();
  });

  it('Should not return invalid state if not touched', () => {
    expect(validationError(meta, false)).toBeFalsy();
  });

  it('Should return invalid state after touched', () => {
    meta.touched = true;
    expect(validationError(meta, false)).toBeTruthy();
  });

  it('Should not return invalid state if no error is present', () => {
    meta.error = null;
    expect(validationError(meta, false)).toBeFalsy();
  });
});
