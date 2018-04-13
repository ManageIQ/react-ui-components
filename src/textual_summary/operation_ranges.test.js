import React from 'react';
import renderer from 'react-test-renderer';
import OperationRanges from './operation_ranges';

describe('Operation Ranges', () => {
  it('renders just fine...', () => {
    const rangesData = {
      title: 'Operation Ranges',
      items: [
        {
          label: 'CPU',
          value: [{ label: 'Max', value: 'Not Available' }, { label: 'High', value: '0 MHz' }, { label: 'Average', value: '0 MHz' }, { label: 'Low', value: '0 MHz' }],
          hoverClass: 'no-hover',
        },
        {
          label: 'CPU Usage',
          value: [{ label: 'Max', value: 'Not Available' }, { label: 'High', value: '0.00%' }, { label: 'Average', value: '0.00%' }, { label: 'Low', value: '0.00%' }],
          hoverClass: 'no-hover',
        },
      ],
    };
    const component = renderer.create(<OperationRanges title={rangesData.title} items={rangesData.items} />);
    const table = component.toJSON();
    expect(table).toMatchSnapshot();
  });
});

