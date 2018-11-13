export const componentMap = {
  DialogFieldTextBox: 'text-field',
  DialogFieldRadioButton: 'radio-field',
  DialogFieldCheckBox: 'checkbox-field',
  DialogFieldTextAreaBox: 'textarea-field',
  DialogFieldDropDownList: 'select-field',
  DialogFieldDateControl: 'datepicker',
  DialogFieldDateTimeControl: 'timepicker',
  DialogFieldTagControl: 'tagcontrol',
};

export const neededAttributes = [
  'name',
  'label',
  ['label', 'title'],
  ['data_type', 'dataType'],
  ['required', 'isRequired'],
  ['visible', 'isVisible'],
  ['read_only', 'isReadOnly'],
  ['description', 'helperText'],
];
