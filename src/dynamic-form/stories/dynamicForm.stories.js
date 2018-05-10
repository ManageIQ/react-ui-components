import React, { Fragment } from 'react';
import { storiesOf } from '@storybook/react';
import { Form as FinalForm, Field } from 'react-final-form';
import { Form as PfForm, Col, Row, Button, Grid } from 'patternfly-react';
import { required } from 'redux-form-validators';
import PropTypes from 'prop-types';
import { dynamicForm } from '../';
import { FinalFormField } from '../../forms/';

const renderTextField = (input, meta, label) => (
  <FinalFormField input={input} meta={meta} label={label} />
);

storiesOf('Dynamic forms', module).add('Dynamic form decorator', () => {
  const FormFragment = () => (
    <Fragment>
      <Field
        name="partial"
        id="partial"
        validate={required({ msg: 'required message' })}
        render={({ input, meta }) => renderTextField(input, meta, 'Conditional input')}
      />
    </Fragment>
  );

  const FormComponent = ({ onSave }) => (
    <FinalForm
      onSubmit={onSave}
      render={({ handleSubmit, values }) => (
        <PfForm horizontal onSubmit={handleSubmit}>
          <Row>
            <Col xs={12}>
              <Field
                name="included"
                id="included"
                render={({ input, meta }) => renderTextField(input, meta, 'Type a to show input')}
              />
            </Col>
            <Col xs={12}>
              {values.included === 'a' && <FormFragment />}
            </Col>
          </Row>
          <Row>
            <Col xs={10}>
              <Button className="pull-right" type="submit" bsStyle="primary">Submit</Button>
            </Col>
          </Row>
        </PfForm>
      )}
    />
  );

  const DynamicFormComponent = dynamicForm(FormComponent);

  FormComponent.propTypes = {
    onSave: PropTypes.func.isRequired,
  };

  return (
    <Grid>
      <h1>Dynamic form</h1>
      <DynamicFormComponent
        onSave={(allValues, registeredValues, formApi) => {
          console.log('allValues: ', allValues, 'registered values: ', registeredValues, 'formApi: ', formApi);
        }}
      />
    </Grid>
  );
});
