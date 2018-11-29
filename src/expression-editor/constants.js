
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

export const backspaceKeyCode = 8;
export const enterKeyCode = 13;
export const endKeyCode = 35;
export const homeKeyCode = 36;
export const leftArrowKeyCode = 37;
export const upArrowKeyCode = 38;
export const rightArrowKeyCode = 39;
export const downArrowKeyCode = 40;
export const insertKeyCode = 45;
export const deleteKeyCode = 46;
