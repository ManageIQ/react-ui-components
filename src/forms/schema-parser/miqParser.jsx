const miqParser = (inputSchema, neededFieldAttributes, componentMap) => {
  const title = inputSchema.label;
  const tabs = inputSchema.content[0].dialog_tabs;
  const formTabs = [];
  const defaultValues = {};
  const { description } = inputSchema;

  tabs.forEach((tab) => {
    const groups = [];
    tab.dialog_groups.forEach((group) => {
      const fieldsArray = [];
      group.dialog_fields.forEach((field) => {
        const newField = {};

        neededFieldAttributes.forEach((info) => {
          const attribute = Array.isArray(info) ? info[0] : info;
          const convertedAttribute = Array.isArray(info) ? info[1] : info;
          newField[convertedAttribute] = field[attribute];
        });

        newField.autofocus = false;

        if (field.validator_type) {
          newField.validate = [{
            type: 'pattern-validator',
            pattern: field.validator_rule,
          }];
        }

        newField.component = componentMap[field.type];

        if (field.default_value) {
          if (newField.component === 'checkbox-field') {
            defaultValues[field.name] = 'true';
          } else {
            defaultValues[field.name] = field.default_value;
          }
        }

        newField.options = [];
        if (Array.isArray(field.values)) {
          field.values.forEach((option) => {
            const optionObject = { label: option[1], value: option[0] };
            if (option[0] === null && field.required) {
              optionObject.disabled = true;
            }
            newField.options.push(optionObject);
          });
        }

        fieldsArray.push(newField);
      });
      groups.push({
        title: group.label,
        key: group.id,
        fields: fieldsArray,
        component: 'sub-form',
      });
    });
    formTabs.push({
      title: tab.label,
      description: tab.description,
      fields: groups,
      component: 'tabs',
    });
  });

  const schema = {
    title,
    description,
    fields: formTabs,
    component: 'tabs',
  };
  return {
    schema,
    defaultValues,
  };
};

export default miqParser;
