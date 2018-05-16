import React from 'react';
import { FinalFormField, FinalFormTextArea, FinalFormCheckBox } from './';

export const renderFinalFormField = (input, meta, label, validateOnMount, type) => (
  <FinalFormField input={input} meta={meta} label={label} type={type} validateOnMount={validateOnMount} />
);

export const renderFinalFormTextArea = (input, meta, label, validateOnMount) => (
  <FinalFormTextArea input={input} meta={meta} label={label} validateOnMount={validateOnMount} />
);

export const renderFinalFormCheckBox = (input, meta, label, validateOnMount) => (
  <FinalFormCheckBox input={input} meta={meta} label={label} validateOnMount={validateOnMount} />
);
