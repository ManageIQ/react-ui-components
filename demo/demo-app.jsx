import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { Form, Field } from 'react-final-form';
import { Form as PfForm, Col, Row } from 'patternfly-react';
import { required } from 'redux-form-validators';
import { FinalFormField, FinalFormSelect } from '../src/forms';

const options = [{
  value: 1,
  label: 'One',
}, {
  value: 2,
  label: 'Two',
}];

const onSubmit = values => console.log('onSubmit: ', values);

const wrapperComponent = () => (
  <div>
    <h1>Select</h1>
    <Form
      onSubmit={onSubmit}
      render={({ handleSubmit }) => (
        <PfForm
          horizontal
          onSubmit={handleSubmit}
        >
          <Row>
            <Col xs={12}>
              <Field
                validate={required({ msg: 'Select required' })}
                name="test"
                id="test"
                render={({ input, meta }) => (<FinalFormSelect
                  placeholder="Some placehoder"
                  input={input}
                  meta={meta}
                  options={options}
                  label="test select"
                  validateOnMount
                  inputColumnSize={5}
                />)
              }
              />
              <Field
                validate={required({ msg: 'Compare input' })}
                name="compared"
                id="compared"
                render={({ input, meta }) => (
                  <FinalFormField
                    validateOnMount
                    input={input}
                    meta={meta}
                    label="compared"
                    inputColumnSize={4}
                    labelColumnSize={8}
                  />
                )}
              />
            </Col>
          </Row>
        </PfForm>
      )}
    />
  </div>
);

export default function renderApp() {
  ReactDOM.render(
    wrapperComponent(),
    document.getElementById('demo-app'),
  );
}
