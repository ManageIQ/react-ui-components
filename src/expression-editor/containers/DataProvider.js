// import ExpressionEditor from '../components/ExpressionEditor';
import { logicalOperatorsMock, userInputMock } from "../constants"
const endpoints = {
};

let defaultOptions = {id: 0, label: 'root', type: 'root', next:
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
};

const mapParent = (parent, nodes) => {
  nodes.map(node => node.parent = parent);
  nodes.map(node => mapParent(node, node.next));
  return parent;
}
defaultOptions = mapParent(defaultOptions, defaultOptions.next);
defaultOptions.next.push({ id: 1002, label: '(', type: 'parenteze', next: defaultOptions.next, parent: defaultOptions });


export const dataProvider = (endpoints) => (Component) => {
  const DataProvider = (props) => {
    // console.log('data provider', props);
    // console.log('DATA PROVIDER', props.next, defaultOptions);
    let options = props.isLastElement ? logicalOperatorsMock : defaultOptions;
    console.log("NEXT", options);
    // options = mapParent(options, options.next);
    // console.log('options', options);
    let newProps = {...props};
    newProps.next = options;
    // console.log('DATA PROVIDER2', newProps);
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
