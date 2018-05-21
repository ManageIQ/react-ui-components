import React from 'react';
import { storiesOf } from '@storybook/react';
import GenericGroup from '../generic_group';
import { genericGroupData } from '../data/generic_group';

storiesOf('TextualSummary', module)
  .add('GenericGroup', () => {
    return (
      <GenericGroup items={genericGroupData.items} title={genericGroupData.title} onClick={e => null} />
    );
  })
;
