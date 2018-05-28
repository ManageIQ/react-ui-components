import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { Form, Field } from 'react-final-form';
import { Form as PfForm, Col, Row, Button, Grid } from 'patternfly-react';
import { FinalFormSwitch } from '../src/forms';
import { translate, sprintf } from '../src/global-functions';

const onSubmit = values => console.log('onSubmit: ', values);

const wrapperComponent = () => (
  <Grid>
    <h1>Select</h1>
    <Form
      onSubmit={onSubmit}
      initialValues={{
        switch: false,
      }}
      render={({ handleSubmit }) => (
        <PfForm
          horizontal
          onSubmit={handleSubmit}
        >
          <Row>
            <Col xs={12}>
              <Field
                name="switch"
                id="switch"
                render={({ input, meta }) => <FinalFormSwitch input={input} meta={meta} label="Switch component" />}
              />
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <Button type="submit">{translate(sprintf('Mask $d'), 21)}</Button>
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
