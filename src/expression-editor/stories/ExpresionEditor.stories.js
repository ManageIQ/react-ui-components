import React from 'react';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import { ExpressionEditorWithRedux } from '../containers/ExpressionEditor2'
import ExpressionEditorReducers from '../reducers/'
import './index.scss';
import { logicalOperatorsMock, userInputMock } from "../constants"



const store = createStore(combineReducers({...ExpressionEditorReducers}));


let defaultOptions = {id: 0, label: 'root', type: 'root', next:
  [{ id: 1, label: 'Fields', type: 'category', next: [
      { id: 11, label: 'Hostname', type: 'category',
        next: [{ id: 111, label: '=', type: 'operator', next: userInputMock}, { id: 112, label: '!=', type: 'operator', next: userInputMock},
            { id: 113, label: 'CONTAINS', type: 'operator', next: userInputMock}, { id: 114, label: 'MATCH REG EXP', type: 'operator', next: userInputMock},
            { id: 115, label: 'BLABLA', type: 'operator', next: userInputMock}, { id: 116, label: 'BLABLA2', type: 'operator', next: userInputMock},
            { id: 117, label: 'BLAsasaBLA', type: 'operator', next: userInputMock}, { id: 118, label: 'BLABLA2', type: 'operator', next: userInputMock},
            { id: 119, label: 'BLABLsasA', type: 'operator', next: userInputMock}, { id: 120, label: 'BLABLsssA2', type: 'operator', next: userInputMock}
          ]
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
          next: [{ id: 221, label: '=', type: 'operator', next: [{ id: 2211, label: 'Financial Services', type: 'value', next: []},
            { id: 2212, label: 'Human Resources', type: 'value', next: []}]},
          { id: 222, label: '!=', type: 'operator', next: [{ id: 2221, label: 'Financial Services', type: 'value', next: []},
            { id: 2222, label: 'Human Resources', type: 'value', next: []}]}]
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

storiesOf('Expression Editor', module)
  .add('New Expression Editor', () => (ExpressionEditorWithRedux({data: defaultOptions})));
