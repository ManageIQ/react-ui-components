import React from 'react';
import renderer from 'react-test-renderer';
import { FinalFormSelect } from '../';
import { fieldMetaProps, fieldInputProp } from './mocks';

describe('React select component', () => {
  let initialProps = {};
  let options = [];
  beforeEach(() => {
    initialProps = { meta: fieldMetaProps, input: fieldInputProp, validateOnMount: true };
    options = [{
      label: 'option 1',
      value: 1,
    }, {
      label: 'option 2',
      value: 2,
    }];
  });

  it('Should render correctly', () => {
    const tree = renderer.create(<FinalFormSelect
      label="test select"
      options={options}
      {...initialProps}
    />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Should render correctly in error state', () => {
    const meta = { ...fieldMetaProps };
    meta.error = 'Required';
    initialProps = { ...initialProps, meta };
    const tree = renderer.create(<FinalFormSelect
      label="test select"
      options={options}
      {...initialProps}
    />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
