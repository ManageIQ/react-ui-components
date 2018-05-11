import React, { Fragment } from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withInfo } from '@storybook/addon-info';
import { Form as FinalForm, Field } from 'react-final-form';
import { Form as PfForm, Col, Row, Button, Grid } from 'patternfly-react';
import { required } from 'redux-form-validators';
import PropTypes from 'prop-types';
import { dynamicForm } from '../';
import { renderFinalFormField } from '../../forms/';

storiesOf('Dynamic forms', module).add('Dynamic form decorator', withInfo()(() => {
  const FormFragment = () => (
    <Fragment>
      <Field
        name="partial"
        id="partial"
        validate={required({ msg: 'required message' })}
        render={({ input, meta }) => renderFinalFormField(input, meta, 'Conditional input')}
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
                render={({ input, meta }) => renderFinalFormField(input, meta, 'Type "a" to show input')}
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
        onSave={action((allValues, registeredValues, formApi) => console.log(
          'All values: ', allValues,
          'Visible values: ', registeredValues,
          'form API: ', formApi,
        ))}
      />
    </Grid>
  );
}));
