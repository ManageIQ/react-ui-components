const userInputMock = [{ id: 666, label: 'UserInput', type: 'userinput', next: [] }];


const initialState = {
  options: {id: 0, label: 'root', type: 'root', next:
    [{ id: 1, label: 'fields', type: 'category', next: [
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
      { id: 2, label: 'tags', type: 'category', next: [
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
  },
  selected: [],
  next: null,
  steps: []
};

export default initialState;
