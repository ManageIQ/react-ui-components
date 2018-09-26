import React from 'react';
import PropTypes from 'prop-types';

import ExpressionEditorPropTypes from '../ExpressionEditorPropTypes'
import ExpressionEditor2 from '../ExpressionEditor2';

const userInputMock = [{ id: 666, label: '', type: 'userinput', next: [], flags: {}, parent: null }];

export default class MockExpressionEditor2 extends React.Component {
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
    this.state.expressions = [[]];
    console.log('constructor', this.state);
  }

  mapParent = (parent, nodes) => {
    nodes.map(node => node.parent = parent);
    nodes.map(node => this.mapParent(node, node.next));
    return parent;
  }

  onClick = (selected, expression) => {
    // const selectedExp = this.state.expression.find((exp) => (exp.term.id === selected.id));
    const expressionIndex = this.state.expressions.indexOf(expression);
    const selectedTerm = expression.find((exp) => (exp.term === selected));

    selectedTerm.flags.isEditing = !selectedTerm.flags.isEditing;;
    //const expression = this.state.expression.filter((exp) => (exp.id !== selected.id));
    // console.log('mock onclick', selected, expression, this.state.expression);
    this.state.expressions.splice(expressionIndex, 1, expression);
    this.setState({expressions: [...this.state.expressions]});
    console.log('mock onclick', selected, this.state.expression);
  }

  onSubmit = (selected, previous, expression) => {

    const expressionIndex = this.state.expressions.indexOf(expression);
    let filteredExpression = expression.filter((exp) => (exp.term.id !== userInputMock[0].id));
    const selectedTerm = filteredExpression.find((exp) => (exp.term === selected));
    const selectedFlags = selectedTerm && selectedTerm.flags;
    let index = filteredExpression.map(e => e.term.id).indexOf(selected.id);
    console.log('mock expression editor', filteredExpression, previous, selected, selectedFlags);
    if (index >= 0) {
      filteredExpression = filteredExpression.slice(0, index);
    } else {
      index = filteredExpression.map(e => e.term.id).indexOf(previous.id);
      if (index >= 0) {
        filteredExpression = filteredExpression.slice(0, index);
      }
    }
    const flags = { ...selectedFlags, isEditing: false };
    filteredExpression.push({term: selected, flags: flags});
    console.log('mock expression', filteredExpression, flags);
    //this.setState({expression: [...expression, selected, {...userInputMock[0], next: selected.next, parent: selected}]});
    this.state.expressions.splice(expressionIndex, 1, filteredExpression);
    this.setState({expressions: [...this.state.expressions]});
    // this.setState({label: selected.label, isEditing: false});
    // this.setState({selected: selected})
    console.log('mock on submit', selected, this.state);

  }


  onDelete = (selected, expression) => {
    console.log('MOCK onDelete', selected);
    const expressionIndex = this.state.expressions.indexOf(expression);
    const filteredExpression = expression.filter((exp) => (exp.term.id !== selected.id));
    this.state.expressions.splice(expressionIndex, 1, filteredExpression);
    this.setState({expressions: [...this.state.expressions]});
  }

  onFocus = (selected, expression) => {
    console.log('on focus', selected, expression);
  }

  render() {
    return (
      <ExpressionEditor2
        onClick={this.onClick}
        onDoubleClick={this.onClick}
        onSubmit={this.onSubmit}
        onDelete={this.onDelete}
        expressions={this.state.expressions}
        next={this.state.options}
      />
    )
  }
}
