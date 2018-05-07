import React from 'react';
import renderer from 'react-test-renderer';
import OperationRanges from '../operation_ranges';
import { operationRangesData } from '../data/operation_ranges';

describe('Operation Ranges', () => {
  it('renders just fine...', () => {
    const component = renderer.create(<OperationRanges title={operationRangesData.title} items={operationRangesData.items} />);
    const table = component.toJSON();
    expect(table).toMatchSnapshot();
  });
});

