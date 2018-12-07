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
import { logicalOperatorsMock, userInputMock } from "../constants"

const store = createStore(ExpressionEditorReducers);


let defaultOptions = {id: 0, label: 'root', type: 'root', next:
  [{ id: 1, label: 'Fields', type: 'category', next: [
      { id: 11, label: 'Hostname', type: 'category',
        next: [{ id: 111, label: '=', type: 'operator', next: userInputMock}, { id: 112, label: '!=', type: 'operator', next: userInputMock}]
      },
      { id: 12, label: 'IP Address', type: 'category',
        next: [{ id: 121, label: '=', type: 'operator', next: userInputMock}, { id: 122, label: '!=', type: 'operator', next: userInputMock}]
      },
      { id: 13, label: 'VM count', type: 'category',
        next: [{ id: 131, label: '=', type: 'operator', next: userInputMock}, { id: 132, label: '!=', type: 'operator', next: userInputMock}]
      },
      { id: 14, label: 'Status', type: 'category',
        next: [{ id: 141, label: '=', type: 'operator', next: userInputMock}, { id: 142, label: '!=', type: 'operator', next: userInputMock}]
      },
    ]
  },
    { id: 2, label: 'Tags', type: 'category', next: [
        { id: 21, label: 'Location', type: 'category',
          next: [{ id: 211, label: '=', type: 'operator', next: userInputMock}, { id: 212, label: '!=', type: 'operator', next: userInputMock}]
        },
        { id: 22, label: 'Department', type: 'category',
          next: [{ id: 221, label: '=', type: 'operator', next: userInputMock}, { id: 222, label: '!=', type: 'operator', next: userInputMock}]
        },
        { id: 23, label: 'Environment', type: 'category',
          next: [{ id: 231, label: '=', type: 'operator', next: userInputMock}, { id: 232, label: '!=', type: 'operator', next: userInputMock}]
        },
        { id: 24, label: 'Owner', type: 'category',
          next: [{ id: 241, label: '=', type: 'operator', next: userInputMock}, { id: 242, label: '!=', type: 'operator', next: userInputMock}]
        },
      ]
    }
  ]
};

storiesOf('ExpressionEditor2', module)
  .add('ExpressionEditor2 MOCK', () => (<MockExpressionEditor2 />));

storiesOf('ExpressionEditor2', module)
  .add('ExpressionEditor2 CONNECTED', () => (<Provider store={store}><ExpressionEditorConnected2 data={defaultOptions}/></Provider>));

storiesOf('Editable Chip', module)
  .add('EditableChip', () => (<MockEditableChip />));
