import React from 'react';
import { Form as FinalForm, Field } from 'react-final-form';
import { Form as PfForm, Col, Row } from 'patternfly-react';
import PropTypes from 'prop-types';
import FinalFormField from '../vm-snapshot-form/finalFormField';
import Fragment from './fragment';
import dynamicForm from './dynamicForm';

const renderTextField = (input, meta, label) => (
  <FinalFormField input={input} meta={meta} label={label} />
);

const Form = ({ onSave }) => (
  <FinalForm
    onSubmit={onSave}
    render={({ handleSubmit, values }) => (
      <PfForm horizontal onSubmit={handleSubmit}>
        <Row>
          <Col xs={12}>
            <Field
              name="included"
              id="included"
              render={({ input, meta }) => renderTextField(input, meta, 'included')}
            />
          </Col>
          <Col xs={12}>
            {values.included === 'a' && <Fragment />}
          </Col>
        </Row>
        <button type="submit">Submit</button>
      </PfForm>
    )}
  />
);

Form.propTypes = {
  onSave: PropTypes.func.isRequired,
};

export default dynamicForm(Form);
