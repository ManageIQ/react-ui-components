import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withInfo } from '@storybook/addon-info';

import AmazonSecurityFormGroup from '../amazon-security-form-group';

const vpcIds = [
  {
    value: 0,
    label: 'Davidson',
  },
  {
    value: 1,
    label: 'Coleen',
  },
  {
    value: 2,
    label: 'Matthews',
  },
  {
    value: 3,
    label: 'Andrews',
  },
  {
    value: 4,
    label: 'Ruthie',
  },
  {
    value: 5,
    label: 'Lydia',
  },
  {
    value: 6,
    label: 'Jillian',
  },
  {
    value: 7,
    label: 'Sarah',
  },
  {
    value: 8,
    label: 'Mitchell',
  },
  {
    value: 9,
    label: 'Daniels',
  },
  {
    value: 10,
    label: 'Chan',
  },
  {
    value: 11,
    label: 'Cooper',
  },
  {
    value: 12,
    label: 'Stewart',
  },
  {
    value: 13,
    label: 'Patrice',
  },
  {
    value: 14,
    label: 'Cheryl',
  },
];

const simulateRequest = () => new Promise((resolve) => {
  setTimeout(() => resolve(vpcIds), 1500);
});

storiesOf('Amazon Security forms', module).add('Amazon Security form group', withInfo()(() => (
  <AmazonSecurityFormGroup
    onSave={action('onSubmit')}
    onCancel={action('onCancel')}
    loadData={simulateRequest}
    updateFormState={action('State update')}
  />
)));
