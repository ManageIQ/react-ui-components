import React from 'react';
import { storiesOf } from '@storybook/react';
import OperationRanges from '../operation_ranges';
import { operationRangesData } from '../data/operation_ranges';

storiesOf('TextualSummary', module)
  .add('OperationRanges', () => {
    return (
      <OperationRanges title={operationRangesData.title} items={operationRangesData.items} />
    );
  })
;

