import React from 'react';
import { storiesOf } from '@storybook/react';
import { IconPicker } from '../';

const iconTypes = [{ type: 'fa', title: 'Font Awesome' }, { type: 'pf', title: 'PatternFly' }];

storiesOf('Icon Picker', module)
  .add('Icon Picker', () => (
    <IconPicker iconTypes={iconTypes} />
  ));
