import React from 'react';
import { FinalFormField, FinalFormTextArea, FinalFormCheckBox } from './';

export const renderFinalFormField = (input, meta, label, type) => (
  <FinalFormField input={input} meta={meta} label={label} type={type} />
);

export const renderFinalFormTextArea = (input, meta, label) => (
  <FinalFormTextArea input={input} meta={meta} label={label} />
);

export const renderFinalFormCheckBox = (input, meta, label) => (
  <FinalFormCheckBox input={input} meta={meta} label={label} />
);
