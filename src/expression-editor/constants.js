
export const logicalOperators = [
  { id: 1000, label: 'AND', type: 'operator', next: [], parent: null },
  { id: 1001, label: 'OR', type: 'operator', next: [], parent: null },
  { id: 1002, label: ')', type: 'parenteze', next: [], parent: null }
];
export const userInputMock = [{ id: 666, label: '', type: 'userinput', next: [], parent: null }];


export const logicalOperatorsMock = {id: 0, label: 'root', type: 'root', next: logicalOperators };


logicalOperators.map((a) => { a.parent = logicalOperatorsMock; });
