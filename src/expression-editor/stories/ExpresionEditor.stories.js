import React from 'react';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import MockExpressionEditor from '../components/MOCKS/MockExpressionEditor'
import { ExpressionEditorConnected } from '../containers/ExpressionEditor'
import ExpressionEditorReducers from '../reducers/'
import MockEditableChip from '../components/MOCKS/MockEditableChip'
import MockExpression from '../components/MOCKS/MockExpression'

const store = createStore(ExpressionEditorReducers);


storiesOf('ExpressionEditor', module)
  .add('ExpressionEditor MOCK', () => (<MockExpressionEditor
  />));

storiesOf('ExpressionEditor', module)
  .add('ExpressionEditor CONNECTED', () => (<Provider store={store}><ExpressionEditorConnected /></Provider>));

  storiesOf('ExpressionEditor', module)
    .add('Expression MOCK', () => (<MockExpression />));

storiesOf('Editable Chip', module)
  .add('EditableChip', () => (<MockEditableChip />));
