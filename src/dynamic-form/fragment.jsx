import React, { Fragment } from 'react';
import { Field } from 'react-final-form';
import { required } from 'redux-form-validators';
import FinalFormField from '../vm-snapshot-form/finalFormField';

const renderTextField = (input, meta, label) => (
  <FinalFormField input={input} meta={meta} label={label} />
);

export default () => (
  <Fragment>
    <Field
      name="partial"
      id="partial"
      validate={required({ msg: 'required message' })}
      render={({ input, meta }) => renderTextField(input, meta, 'partial')}
    />
  </Fragment>
);
