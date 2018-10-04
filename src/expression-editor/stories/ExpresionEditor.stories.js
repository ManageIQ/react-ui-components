import React from 'react';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
// import MockExpressionEditor from '../components/MOCKS/MockExpressionEditor'
// import { ExpressionEditorConnected } from '../containers/ExpressionEditor'
import { ExpressionEditorConnected2 } from '../containers/ExpressionEditor2'
import ExpressionEditorReducers from '../reducers/'
import MockEditableChip from '../components/MOCKS/MockEditableChip'
import MockExpression from '../components/MOCKS/MockExpression'
import MockExpressionEditor2 from '../components/MOCKS/MockExpressionEditor2'
import './index.scss';


const store = createStore(ExpressionEditorReducers);




storiesOf('ExpressionEditor2', module)
  .add('ExpressionEditor2 MOCK', () => (<MockExpressionEditor2 />));

storiesOf('ExpressionEditor2', module)
  .add('ExpressionEditor2 CONNECTED', () => (<Provider store={store}><ExpressionEditorConnected2 /></Provider>));

storiesOf('Editable Chip', module)
  .add('EditableChip', () => (<MockEditableChip />));
