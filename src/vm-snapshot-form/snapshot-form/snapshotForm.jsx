import React from 'react';
import { Form, Field } from 'react-final-form';
import { Form as PfForm, Button, Col, Row, ButtonGroup } from 'patternfly-react';
import PropTypes from 'prop-types';
import { required } from 'redux-form-validators';

import { FinalFormField, FinalFormTextArea, FinalFormCheckBox } from '../../forms/';

const renderTextField = (input, meta, label) => (
  <FinalFormField input={input} meta={meta} label={label} />
);

const renderTextArea = (input, meta, label) => (
  <FinalFormTextArea input={input} meta={meta} label={label} />
);

const renderCheckBox = (input, meta, label) => (
  <FinalFormCheckBox input={input} meta={meta} label={label} />
);

export const VmSnapshotForm = ({
  onSubmit,
  errorMessages,
  hideName,
  onCancel,
  nameRequired,
  descriptionRequired,
  labels,
}) => (
  <Form
    onSubmit={onSubmit}
    render={({ invalid, values, handleSubmit }) => (
      <PfForm horizontal>
        <Row>
          <Col xs={12}>
            {!hideName &&
              <Field
                validate={nameRequired && required({ msg: errorMessages.name })}
                name="name"
                id="name"
                render={({ input, meta }) => renderTextField(input, meta, labels.name)}
              />
            }
            <Field
              name="description"
              id="description"
              validate={descriptionRequired && required({ msg: errorMessages.description })}
              render={({ input, meta }) => renderTextArea(input, meta, labels.description)}
            />
            <Field
              name="snap_memory"
              id="snap_memory"
              type="checkbox"
              render={({ input, meta }) => renderCheckBox(input, meta, labels.snapMemory)}
            />
            <hr />
          </Col>
          <Col xs={12}>
            <ButtonGroup className="pull-right">
              <Button id="snap-form-submit" onClick={() => handleSubmit(values)} disabled={invalid} bsStyle="primary">{labels.create}</Button>
              <Button id="snap-form-cancel" onClick={onCancel}>{labels.cancel}</Button>
            </ButtonGroup>
          </Col>
        </Row>
      </PfForm>
    )}
  />
);

VmSnapshotForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  errorMessages: PropTypes.shape({
    name: PropTypes.string,
    description: PropTypes.string,
  }),
  labels: PropTypes.shape({
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    snapMemory: PropTypes.string.isRequired,
    create: PropTypes.string.isRequired,
    cancel: PropTypes.string.isRequired,
  }).isRequired,
  hideName: PropTypes.bool,
  nameRequired: PropTypes.bool,
  descriptionRequired: PropTypes.bool,
};

VmSnapshotForm.defaultProps = {
  hideName: false,
  nameRequired: false,
  descriptionRequired: false,
};
