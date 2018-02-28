import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import '../styles.scss';
import { ExampleCmp } from '../some-cmp/example.component';
import Provider from './provider';

storiesOf('Example', module)
  .add('Stateless component', () => <ExampleCmp onChangeText={action('change text')} onChangeType={action('change type')} />)
  .addDecorator(story => <Provider story={story()} />)
  .add('Statefull component', () => <div />);
