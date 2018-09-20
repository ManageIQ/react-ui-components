import React from 'react';
import { storiesOf } from '@storybook/react';
import TagView from '../components/TagView';
import { Badge } from '@patternfly/react-core'
import './index.scss';

// const assignedTags = [{ description: 'Name', id: 1, values: [{ description: 'Pepa', id: 11 }, { description: 'Marie', id: 11 }, { description: 'Marie', id: 11 }] }];
const assignedTags = [{ description: 'Name', id: 1, values: [{ description: 'Pepa', id: 11 }, { description: 'Marie', id: 13 }, { description: 'Daenerys Stormborn XXXXXdsffffffffdsdfdsf', id: 12 }] }];


storiesOf('Tagging PF4', module)
  .add('TagView', () => <TagView assignedTags={assignedTags} />);

  storiesOf('Tagging PF4', module)
    .add('TagView with delete', () => <TagView assignedTags={assignedTags} onTagDeleteClick={() => { console.log('Tag delete clicked') }}/>);
