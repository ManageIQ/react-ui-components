import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import TopologyWrapper from './topologyWrapper';

storiesOf('Topology', module).add('Controlled topology component', withInfo()(() => (
  <TopologyWrapper />
)));
