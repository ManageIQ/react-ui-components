import React from 'react';
import { Form, Field } from 'react-final-form';
import { Form as PfForm, Button, Col, Row, ButtonGroup } from 'patternfly-react';
import PropTypes from 'prop-types';
import { required } from 'redux-form-validators';

import { renderFinalFormField, renderFinalFormTextArea, FinalFormSwitch } from '../../forms/';
import { __ } from '../../global-functions';

export const VmSnapshotForm = ({
  onSubmit,
  hideName,
  showMemorySwitch,
  onCancel,
  nameRequired,
  descriptionRequired,
}) => (
  <Form
    onSubmit={onSubmit}
    initialValues={{
      snap_memory: false,
    }}
    render={({ invalid, values, handleSubmit }) => (
      <PfForm horizontal>
        <Row>
          <Col xs={12}>
            {!hideName &&
              <Field
                validate={nameRequired && required({ msg: __('Required') })}
                name="name"
                id="name"
                render={({ input, meta }) => renderFinalFormField(input, meta, __('Name'), true)}
              />
            }
          </Col>
          <Col xs={12}>
            <Field
              name="description"
              id="description"
              validate={descriptionRequired && required({ msg: __('Required') })}
              render={({ input, meta }) => renderFinalFormTextArea(input, meta, __('Description'), true)}
            />
          </Col>
          {showMemorySwitch &&
            <Col xs={12}>
              <Field
                name="snap_memory"
                id="snap_memory"
                component={FinalFormSwitch}
                label={__('Snapshot VM memory')}
                onText={__('Yes')}
                offText={__('No')}
              />
            </Col>
          }
          <Col xs={12}>
            <hr />
            <ButtonGroup className="pull-right">
              <Button id="snap-form-submit" onClick={() => handleSubmit(values)} disabled={invalid} bsStyle="primary">{__('Create')}</Button>
              <Button id="snap-form-cancel" onClick={onCancel}>{__('Cancel')}</Button>
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
  hideName: PropTypes.bool,
  nameRequired: PropTypes.bool,
  descriptionRequired: PropTypes.bool,
  showMemorySwitch: PropTypes.bool,
};

VmSnapshotForm.defaultProps = {
  hideName: false,
  nameRequired: false,
  descriptionRequired: false,
  showMemorySwitch: true,
};
