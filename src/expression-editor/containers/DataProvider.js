// import ExpressionEditor from '../components/ExpressionEditor';

const endpoints = {
};

const userInputMock = [{ id: 666, label: 'UserInput', type: 'userinput', next: [] }];
const defaultOptions = [{ id: 1, label: 'fields', type: 'category', next: [
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
];

export const dataProvider = (endpoints) => (Component) => {
  const DataProvider = (props) => {
    console.log('data provider', props);
    const options = props.next || defaultOptions;
    console.log('options', options);
    let newProps = {...props};
    newProps.options = options;
    return <Component  {...newProps}/>
  };
  return DataProvider;
}


/*
const foo = (props) => {
  return (Component) => <Component {...props}/>
}
export default dataProvider(connect(mapStateToProps, mapDispatchToProps)(Foo));
*/
