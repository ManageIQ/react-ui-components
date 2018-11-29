
export const logicalOperators = [
  { id: 1000, label: 'AND', type: 'logicalOperator', next: [], parent: null },
  { id: 1001, label: 'OR', type: 'logicalOperator', next: [], parent: null }
];

const rightParenteze = { id: 1002, label: ')', type: 'rightParenteze', next: logicalOperators, parent: null };

logicalOperators.push(rightParenteze);

export const userInputMock = [{ id: 666, label: '', type: 'userinput', next: [], parent: null }];


export const logicalOperatorsMock = {id: 0, label: 'root', type: 'root', next: logicalOperators };

rightParenteze.parent = userInputMock;
logicalOperators.map((a) => { a.parent = logicalOperatorsMock; });

export const keyCodes = {
   backspace: 8,
   enter: 13,
   end: 35,
   home: 36,
   leftArrow: 37,
   upArrow: 38,
   rightArrow: 39,
   downArrow: 40,
   insert: 45,
   delete: 46,

}
