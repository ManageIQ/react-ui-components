import React from 'react';
import { logicalOperatorsMock, userInputMock } from "../constants"

let defaultOptions = {};

let preProcess = true;
const mapParent = (parent, nodes) => {
  nodes.map(node => node.parent = parent);
  nodes.map(node => mapParent(node, node.next));
  return parent;
}

const isLastExpressionOperator = (expressions) => {
  const flatExpressions = expressions.flat();
  const lastTerm = flatExpressions[flatExpressions.length-1] || {term: {type: ["default"]}};
  return lastTerm.term.type === "logicalOperator";
}

const preProcessData = (data) => {
  data = mapParent(data, data.next);
  data.next.push({ id: 1004, label: 'NOT', type: 'logicalOperator', next: data.next, parent: data });
  data.next.push({ id: 1003, label: '(', type: 'leftParenteze', next: data.next, parent: data });
  return data;
}

export const dataProvider = () => (Component) => {
  const DataProvider = (props) => {
    if (preProcess) {
      defaultOptions = preProcessData(props.data);
      preProcess = false;
    }
    const isLastElementOperator = isLastExpressionOperator(props.expressions);
    const options = props.expressions.map((_, i) => (i % 2 === 0 ? defaultOptions : logicalOperatorsMock));
    let newProps = {...props};
    newProps.next = options;
    return <Component  {...newProps}/>
  };
  return DataProvider;
}
