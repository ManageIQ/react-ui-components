import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { Form, Field } from 'react-final-form';
import { Form as PfForm, Col, Row, Button, Grid } from 'patternfly-react';
import { required } from 'redux-form-validators';
import { FinalFormRadio, FieldGroup, FinalFormField, FinalFormCheckBox } from '../src/forms';

const onSubmit = values => console.log('onSubmit: ', values);

const wrapperComponent = () => (
  <Grid>
    <h1>Select</h1>
    <Form
      onSubmit={onSubmit}
      render={({ handleSubmit }) => (
        <PfForm
          horizontal
          onSubmit={handleSubmit}
        >
          <Row>
            <FieldGroup label="Field group" name="radioGroup" validateOnMount>
              <Field
                name="radioGroup"
                id="selectOne1"
                type="radio"
                value="First radio"
                validate={required({ msg: 'Please select one option' })}
                render={({ input, meta, ...rest }) => <FinalFormRadio input={input} label="Radio button 1" meta={meta} {...rest} />}
              />
              <Field
                name="radioGroup"
                id="selectOne2"
                type="radio"
                value="Second radio"
                validate={required({ msg: 'Please select one option' })}
                render={({ input, meta, ...rest }) => <FinalFormRadio input={input} label="Radio button 2" meta={meta} {...rest} />}
              />
            </FieldGroup>
            <Col xs={12}>
              <Field
                validate={required({ msg: 'Check input' })}
                name="text1"
                id="text1"
                render={({ input, meta }) => <FinalFormField validateOnMount meta={meta} input={input} label="Some text field" />}
              />
            </Col>
            <Col xs={12}>
              <Field
                validate={required({ msg: 'Check input' })}
                name="check"
                id="check"
                type="checkbox"
                render={({ input, meta }) => (
                  <FinalFormCheckBox validateOnMount input={input} meta={meta} label="Checkbox" />
                )}
              />
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <Button type="submit">Submit</Button>
            </Col>
          </Row>
        </PfForm>
      )}
    />
  </Grid>
);

export default function renderApp() {
  ReactDOM.render(
    wrapperComponent(),
    document.getElementById('demo-app'),
  );
}
