import React from 'react';
import { storiesOf } from '@storybook/react';
import TagGroup from '../tag_group';
import './table_style.scss';
import { tagGroupData } from '../data/tag_group';

storiesOf('TextualSummary', module)
  .add('TagGroup', () => {
    return (<TagGroup items={tagGroupData.items} title={tagGroupData.title} />);
  })
;
