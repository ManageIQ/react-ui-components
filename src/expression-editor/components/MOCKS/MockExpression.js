import React from 'react';
import PropTypes from 'prop-types';

import Expression from '../Expression'

const userInputMock = [{ id: 666, label: '', type: 'userinput', next: [], flags: {}, parent: null }];

export default class MockExpression extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      // what could be selected
      options: {id: 'root', label: 'root', type: 'root', next: [{ id: 1, label: 'fields', type: 'category', next: [
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
      }
    }
    console.log('constructor', this.state);
    // const a = this.state.options.map(node => this.mapParent(node, node.next));
    const options = this.mapParent(this.state.options, this.state.options.next)
    this.state.options = options;
    // this.state.expression = [{...userInputMock[0], parent: this.state.options}];
    this.state.expression = [];
    console.log('constructor', this.state);
  }

  mapParent = (parent, nodes) => {
    nodes.map(node => node.parent = parent);
    nodes.map(node => this.mapParent(node, node.next));
    return parent;
  }

  onClick = selected => {
    const selectedExp = this.state.expression.find((exp) => (exp.term.id === selected.id));
    const isEditing = selectedExp.flags.isEditing
    selectedExp.flags.isEditing = !isEditing;
    //const expression = this.state.expression.filter((exp) => (exp.id !== selected.id));
    // console.log('mock onclick', selected, expression, this.state.expression);
    this.setState({expression: [...this.state.expression]});
    console.log('mock onclick', selected, this.state.expression);
  }

  onSubmit = (selected, previous) => {
    let expression = this.state.expression.filter((exp) => (exp.term.id !== userInputMock[0].id));
    const selectedExp = this.state.expression.find((exp) => (exp.term.id === selected.id));
    const selectedFlags = selectedExp && selectedExp.flags;
    let index = expression.map(e => e.term.id).indexOf(selected.id);
    console.log('mock expression', expression, previous, selected, selectedFlags);
    if (index >= 0) {
      expression = expression.slice(0, index);
    } else {
      index = expression.map(e => e.term.id).indexOf(previous.id);
      if (index >= 0) {
        expression = expression.slice(0, index);
      }
    }
    const flags = { ...selectedFlags, isEditing: false };
    console.log('mock expression', expression, flags);
    //this.setState({expression: [...expression, selected, {...userInputMock[0], next: selected.next, parent: selected}]});
    this.setState({expression: [...expression, {term: selected, flags: flags}]});
    // this.setState({label: selected.label, isEditing: false});
    // this.setState({selected: selected})
    console.log('mock on submit', selected, this.state);

  }

  onKeyDown = (e) => {
    console.log('MOCK onKeyDown', e);
  }

  onDelete = (selected) => {
    console.log('MOCK onDelete', selected);
    const expression = this.state.expression.filter((exp) => (exp.term.id !== selected.id));
    this.setState({expression: [...expression]});
  }

  render() {
    console.log('render mock', this.state, this.state.expression.length);
    return (
      <Expression
        onClick={this.onClick}
        onDoubleClick={this.onClick}
        onSubmit={this.onSubmit}
        onKeyDown={this.onKeyDown}
        onDelete={this.onDelete}
        expression={this.state.expression}
        next={{...userInputMock[0],
          parent: (this.state.expression[this.state.expression.length - 1] && this.state.expression[this.state.expression.length - 1].term ||
           this.state.options)}}
      />
    )
  }
}
