import React from 'react';
import { shallow } from 'enzyme';
import { Form as FinalForm, Field } from 'react-final-form';
import PropTypes from 'prop-types';
import { FinalFormField } from '../../forms/';

import { dynamicForm } from '../';

describe('Dynamic form decorator', () => {
  const FormComponent = ({ onSave, initialValues }) => (
    <FinalForm
      initialValues={initialValues}
      onSubmit={onSave}
      render={({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <Field
            name="testField"
            id="testField"
            render={({ input, meta }) => <FinalFormField input={input} meta={meta} label="test field" />}
          />
          <button type="submit" id="formSubmit">Submit</button>
        </form>
      )}
    />
  );
  FormComponent.propTypes = {
    onSave: PropTypes.func.isRequired,
    initialValues: PropTypes.shape({
      testField: PropTypes.string,
    }),
  };

  it('Should provide onSave function', () => {
    const DynamicFormComponent = dynamicForm(FormComponent);
    const wrapper = shallow(<DynamicFormComponent onSave={jest.fn()} />);
    expect(wrapper.props().onSave).toBeDefined();
  });

  it('Should send correct data on submit', () => {
    const onSave = jest.fn();
    const DynamicFormComponent = dynamicForm(FormComponent);
    const wrapper = shallow(<DynamicFormComponent
      onSave={onSave}
      initialValues={{ testField: 'test value', hiddenField: 'hidden value' }}
    />);
    wrapper.find('#formSubmit').simulate('submit');
    expect(onSave).toHaveBeenCalledWith(
      { testField: 'test value', hiddenField: 'hidden value' },
      { testField: 'test value' },
      expect.any(Object),
    );
  });
});
