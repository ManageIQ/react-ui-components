import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { TextualSummary } from '../index.jsx';
import { summary1 } from '../data/textual_summary';

storiesOf('TextualSummary', module)
  .add('TextualSummary', () => {
    return (
      <TextualSummary summary={summary1} onClick={action('onClick')} />
    );
  })
;
