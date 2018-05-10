import React from 'react';
import { Form, Field } from 'react-final-form';
import { Form as PfForm, Button, Col, Row, ButtonGroup } from 'patternfly-react';
import PropTypes from 'prop-types';
import { required } from 'redux-form-validators';

import { renderFinalFormField, renderFinalFormTextArea, renderFinalFormCheckBox } from '../../forms/';

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
                render={({ input, meta }) => renderFinalFormField(input, meta, labels.name, true)}
              />
            }
            <Field
              name="description"
              id="description"
              validate={descriptionRequired && required({ msg: errorMessages.description })}
              render={({ input, meta }) => renderFinalFormTextArea(input, meta, labels.description, true)}
            />
            <Field
              name="snap_memory"
              id="snap_memory"
              type="checkbox"
              render={({ input, meta }) => renderFinalFormCheckBox(input, meta, labels.snapMemory, true)}
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
