import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import OperationRanges from '../operation_ranges';
import { operationRangesData } from '../data/operation_ranges';

describe('Operation Ranges', () => {
  it('renders just fine...', () => {
    const table = shallow(<OperationRanges title={operationRangesData.title} items={operationRangesData.items} />);
    expect(toJson(table)).toMatchSnapshot();
  });
});
