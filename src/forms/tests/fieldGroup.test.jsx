import React from 'react';
import { mount } from 'enzyme';
import renderer from 'react-test-renderer';
import { Field, Form } from 'react-final-form';
import { required } from 'redux-form-validators';
import PropTypes from 'prop-types';

import { FieldGroup, FinalFormRadio } from '../';

describe('Final form FieldGroup component', () => {
  const Group = ({ validateOnMount }) => (
    <Form
      onSubmit={() => {}}
      render={() => (
        <FieldGroup name="some group" label="Field group" validateOnMount={validateOnMount}>
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
      )}
    />
  );

  Group.propTypes = {
    validateOnMount: PropTypes.bool,
  };

  it('Should render correctly', () => {
    const tree = renderer.create(<Group />);
    expect(tree).toMatchSnapshot();
  });

  it('Should render correctly with error state', () => {
    const tree = renderer.create(<Group validateOnMount />);
    expect(tree).toMatchSnapshot();
  });
});
