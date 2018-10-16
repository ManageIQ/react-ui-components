import { expressions } from '../reducers/reducers';
import * as actions from '../actions';



const ipAddressClosed = {id: 12, label: "IP Address", type: "category", next: [], parent: {}};
const eqOperatorClosed = {id: 121, label: "==", type: "operator", next: [], parent: {}};

const ipAddressOpen = {id: 12, label: "IP Address", type: "category", next: [{label: "something"}], parent: {}};
const eqOperatorOpen = {id: 121, label: "==", type: "operator", next: [{label: "bla bla"}], parent: {}};
const notEqOperatorOpen = {id: 122, label: "!=", type: "operator", next: [{label: "bla bla bla"}], parent: {}};
const hostnameOpen = {"id": 13, "label": "hostnameOpen", "next": [{label: "something else"}], "parent": {}, "type": "category"};
const statusOpen = {"id": 14, "label": "statusOpen", "next": [{label: "something different"}], "parent": {}, "type": "category"};

const defautExpressionState = {"expressions": [[]]};
const oneElementExpressionState = {
  "expressions": [[{"flags": {"isEditing": false},
  "term": ipAddressOpen}]]
};

const oneElementExpressionStateEditing = {
  "expressions": [[{"flags": {"isEditing": true},
  "term": ipAddressOpen}]]
};

const twoElementExpressionState = {
  "expressions": [
    [{"flags": {"isEditing": false},
    "term": ipAddressOpen},
    {"flags": {"isEditing": false},
    "term": eqOperatorClosed}]]
};

const twoExpressionsState = {
  "expressions": [
    [{"flags": {"isEditing": false},
    "term": ipAddressClosed}],
    [{"flags": {"isEditing": false},
    "term": hostnameOpen}]
  ]
};

const twoExpressionsTwoElementsState = {
  "expressions": [
    [{"flags": {"isEditing": false},
    "term": ipAddressOpen},
    {"flags": {"isEditing": false},
    "term": eqOperatorClosed}],
    [{"flags": {"isEditing": false},
    "term": statusOpen},
    {"flags": {"isEditing": false},
    "term": eqOperatorClosed}]
  ]
};


describe('expressions reducer', () => {
  it('should return the initial state', () => {
    expect(expressions(undefined, {})).toEqual(defautExpressionState);
    expect(defautExpressionState).toEqual({"expressions": [[]]});
  });

  it('Add expression element that is closing the expression, it adds empty expression at the end', () => {
    expect(expressions(
      defautExpressionState,
      actions.onSubmit(ipAddressClosed, {}, 0),
    )).toEqual({
    "expressions": [[{"flags": {"isEditing": false},
    "term": ipAddressClosed}], []]
    });
    expect(ipAddressClosed).toEqual({id: 12, label: "IP Address", type: "category", next: [], parent: {}});
    expect(defautExpressionState).toEqual({"expressions": [[]]});

  });

  it('Add expression element that is NOT closing the expression', () => {
    expect(expressions(
      defautExpressionState,
      actions.onSubmit(ipAddressOpen, {}, 0),
    )).toEqual({
    "expressions": [[{"flags": {"isEditing": false},
    "term": ipAddressOpen}]]
    });
    expect(ipAddressOpen).toEqual({id: 12, label: "IP Address", type: "category", next: [{label: "something"}], parent: {}});
    expect(defautExpressionState).toEqual({"expressions": [[]]});
  });

  it('Add expression element that is closing the expression to non empty state', () => {
    expect(expressions(
      oneElementExpressionState,
      actions.onSubmit(eqOperatorClosed, {}, 0),
    )).toEqual({
      "expressions": [[
        {
          "flags": {"isEditing": false},
          "term": ipAddressOpen
        },
        {
          "flags": {"isEditing": false},
          "term": eqOperatorClosed
        }
      ], []]
    });
    expect(ipAddressOpen).toEqual({id: 12, label: "IP Address", type: "category", next: [{label: "something"}], parent: {}});
    expect(eqOperatorClosed).toEqual({id: 121, label: "==", type: "operator", next: [], parent: {}});
    expect(oneElementExpressionState).toEqual({
      "expressions": [[{"flags": {"isEditing": false},
      "term": ipAddressOpen}]]
    });
  });

  it('Add expression element that is NOT closing the expression to non empty state', () => {
    expect(expressions(
      oneElementExpressionState,
      actions.onSubmit(eqOperatorOpen, {}, 0),
    )).toEqual({
      "expressions": [[
        {
          "flags": {"isEditing": false},
          "term": ipAddressOpen
        },
        {
          "flags": {"isEditing": false},
          "term": eqOperatorOpen
        }
      ]]
    });
    expect(ipAddressOpen).toEqual({id: 12, label: "IP Address", type: "category", next: [{label: "something"}], parent: {}});
    expect(eqOperatorOpen).toEqual({id: 121, label: "==", type: "operator", next: [{label: "bla bla"}], parent: {}});
    expect(oneElementExpressionState).toEqual({
      "expressions": [[{"flags": {"isEditing": false},
      "term": ipAddressOpen}]]
    });
  });

  it('Modify expression element that is NOT closing the expression to non empty state', () => {
    expect(expressions(
      oneElementExpressionStateEditing,
      actions.onSubmit(hostnameOpen,
      ipAddressOpen, 0),
    )).toEqual({
      "expressions": [[
        {
          "flags": {"isEditing": false},
          "term": hostnameOpen
        }
      ]]
    });
    expect(ipAddressOpen).toEqual({id: 12, label: "IP Address", type: "category", next: [{label: "something"}], parent: {}});
    expect(hostnameOpen).toEqual({"id": 13, "label": "hostnameOpen", "next": [{label: "something else"}], "parent": {}, "type": "category"});
    expect(oneElementExpressionStateEditing).toEqual({
      "expressions": [[{"flags": {"isEditing": true},
      "term": ipAddressOpen}]]
    });
  });

  it('Modify first expression element from two, second one is removed', () => {
    expect(expressions(
      twoElementExpressionState,
      actions.onSubmit(statusOpen,
      ipAddressOpen, 0),
    )).toEqual({
      "expressions": [[
        {
          "flags": {"isEditing": false},
          "term": statusOpen
        }
      ]]
    });
    expect(ipAddressOpen).toEqual({id: 12, label: "IP Address", type: "category", next: [{label: "something"}], parent: {}});
    expect(statusOpen).toEqual({"id": 14, "label": "statusOpen", "next": [{label: "something different"}], "parent": {}, "type": "category"});
    expect(twoElementExpressionState).toEqual({
      "expressions": [
        [{"flags": {"isEditing": false},
        "term": ipAddressOpen},
        {"flags": {"isEditing": false},
        "term": eqOperatorClosed}]]
    });
  });

  it('Modify second expression element from two, first one should stay same', () => {
    expect(expressions(
      twoElementExpressionState,
      actions.onSubmit(notEqOperatorOpen,
      eqOperatorOpen, 0),
    )).toEqual({
      "expressions": [[
        {
          "flags": {"isEditing": false},
          "term": ipAddressOpen
        },
        {
          "flags": {"isEditing": false},
          "term": notEqOperatorOpen
        }
      ]]
    });
    expect(ipAddressOpen).toEqual({id: 12, label: "IP Address", type: "category", next: [{label: "something"}], parent: {}});
    expect(notEqOperatorOpen).toEqual({id: 122, label: "!=", type: "operator", next: [{label: "bla bla bla"}], parent: {}});
    expect(twoElementExpressionState).toEqual({
      "expressions": [
        [{"flags": {"isEditing": false},
        "term": ipAddressOpen},
        {"flags": {"isEditing": false},
        "term": eqOperatorClosed}]]
    });
  });

  it('Modify expression element from first expression, second should stay same', () => {
    expect(expressions(
      twoExpressionsState,
      actions.onSubmit(statusOpen,
      ipAddressOpen, 0),
    )).toEqual({
      "expressions": [[
        {
          "flags": {"isEditing": false},
          "term": statusOpen
        }
      ], twoExpressionsState.expressions[1]]
    });
    expect(ipAddressOpen).toEqual({id: 12, label: "IP Address", type: "category", next: [{label: "something"}], parent: {}});
    expect(statusOpen).toEqual({"id": 14, "label": "statusOpen", "next": [{label: "something different"}], "parent": {}, "type": "category"});
    expect(twoExpressionsState).toEqual({
      "expressions": [
        [{"flags": {"isEditing": false},
        "term": ipAddressClosed}],
        [{"flags": {"isEditing": false},
        "term": hostnameOpen}]
      ]
    });
  });

  it('Delete expression element from expression with one element', () => {
    expect(expressions(
      oneElementExpressionState,
      actions.onDelete(ipAddressOpen, 0),
    )).toEqual({
    "expressions": [[]]
    });
    expect(ipAddressOpen).toEqual({id: 12, label: "IP Address", type: "category", next: [{label: "something"}], parent: {}});
    expect(oneElementExpressionState).toEqual({
      "expressions": [[{"flags": {"isEditing": false},
      "term": ipAddressOpen}]]
    });
  });

  it('Delete first expression element leaves rest untouched', () => {
    expect(expressions(
      twoExpressionsTwoElementsState,
      actions.onDelete(ipAddressOpen, 0),
    )).toEqual({
    "expressions": [[twoExpressionsTwoElementsState.expressions[0][1]], twoExpressionsTwoElementsState.expressions[1]]
    });
    expect(ipAddressOpen).toEqual({id: 12, label: "IP Address", type: "category", next: [{label: "something"}], parent: {}});
    expect(twoExpressionsTwoElementsState).toEqual({
      "expressions": [
        [{"flags": {"isEditing": false},
        "term": ipAddressOpen},
        {"flags": {"isEditing": false},
        "term": eqOperatorClosed}],
        [{"flags": {"isEditing": false},
        "term": statusOpen},
        {"flags": {"isEditing": false},
        "term": eqOperatorClosed}]
      ]
    });
  });

  it('Delete last expression elementleaves rest untouched', () => {
    expect(expressions(
      twoExpressionsTwoElementsState,
      actions.onDelete(eqOperatorClosed, 1),
    )).toEqual({
    "expressions": [twoExpressionsTwoElementsState.expressions[0], [twoExpressionsTwoElementsState.expressions[1][0]]]
    });
    expect(eqOperatorClosed).toEqual({id: 121, label: "==", type: "operator", next: [], parent: {}});
    expect(twoExpressionsTwoElementsState).toEqual({
      "expressions": [
        [{"flags": {"isEditing": false},
        "term": ipAddressOpen},
        {"flags": {"isEditing": false},
        "term": eqOperatorClosed}],
        [{"flags": {"isEditing": false},
        "term": statusOpen},
        {"flags": {"isEditing": false},
        "term": eqOperatorClosed}]
      ]
    });
  });

  it('Delete first expression element from second expression leaves rest untouched', () => {
    expect(expressions(
      twoExpressionsTwoElementsState,
      actions.onDelete(statusOpen, 1),
    )).toEqual({
    "expressions": [twoExpressionsTwoElementsState.expressions[0], [twoExpressionsTwoElementsState.expressions[1][1]]]
    });
    expect(statusOpen).toEqual({"id": 14, "label": "statusOpen", "next": [{label: "something different"}], "parent": {}, "type": "category"});
    expect(twoExpressionsTwoElementsState).toEqual({
      "expressions": [
        [{"flags": {"isEditing": false},
        "term": ipAddressOpen},
        {"flags": {"isEditing": false},
        "term": eqOperatorClosed}],
        [{"flags": {"isEditing": false},
        "term": statusOpen},
        {"flags": {"isEditing": false},
        "term": eqOperatorClosed}]
      ]
    });
  });

  it('Click expression element set isEditing for simple expression', () => {
    expect(expressions(
      oneElementExpressionState,
      actions.onClick(ipAddressOpen, 0),
    )).toEqual({
    "expressions": [[
        {
          "flags": {"isEditing": true},
          "term": ipAddressOpen
        }
      ]]
    });
    expect(ipAddressOpen).toEqual({id: 12, label: "IP Address", type: "category", next: [{label: "something"}], parent: {}});
    expect(oneElementExpressionState).toEqual({
      "expressions": [[{"flags": {"isEditing": false},
      "term": ipAddressOpen}]]
    });
  });

  it('Click expression element set isEditing from bit more complex expression', () => {
    expect(expressions(
      twoExpressionsTwoElementsState,
      actions.onClick(ipAddressOpen, 0),
    )).toEqual({
    "expressions": [[
        {
          "flags": {"isEditing": true},
          "term": ipAddressOpen
        },
        twoExpressionsTwoElementsState.expressions[0][1]],
        twoExpressionsTwoElementsState.expressions[1]
      ]
    });
    expect(ipAddressOpen).toEqual({id: 12, label: "IP Address", type: "category", next: [{label: "something"}], parent: {}});
    expect(twoExpressionsTwoElementsState).toEqual({
      "expressions": [
        [{"flags": {"isEditing": false},
        "term": ipAddressOpen},
        {"flags": {"isEditing": false},
        "term": eqOperatorClosed}],
        [{"flags": {"isEditing": false},
        "term": statusOpen},
        {"flags": {"isEditing": false},
        "term": eqOperatorClosed}]
      ]
    });
  });


  it('Focus expression element set isFocused for simple expression', () => {
    expect(expressions(
      oneElementExpressionState,
      actions.onFocus(ipAddressOpen, 0),
    )).toEqual({
    "expressions": [[
        {
          "flags": {"isEditing": false, isFocused: true},
          "term": ipAddressOpen
        }
      ]]
    });
    expect(ipAddressOpen).toEqual({id: 12, label: "IP Address", type: "category", next: [{label: "something"}], parent: {}});
    expect(oneElementExpressionState).toEqual({
      "expressions": [[{"flags": {"isEditing": false},
      "term": ipAddressOpen}]]
    });
  });

  it('Focus expression element set isEditing for bit more complex expression', () => {
    expect(expressions(
      twoExpressionsTwoElementsState,
      actions.onFocus(ipAddressOpen, 0),
    )).toEqual({
    "expressions": [[
        {
          "flags": {"isEditing": false, "isFocused": true},
          "term": ipAddressOpen
        },
        twoExpressionsTwoElementsState.expressions[0][1]],
        twoExpressionsTwoElementsState.expressions[1]
      ]
    });
    expect(ipAddressOpen).toEqual({id: 12, label: "IP Address", type: "category", next: [{label: "something"}], parent: {}});
    expect(twoExpressionsTwoElementsState).toEqual({
      "expressions": [
        [{"flags": {"isEditing": false},
        "term": ipAddressOpen},
        {"flags": {"isEditing": false},
        "term": eqOperatorClosed}],
        [{"flags": {"isEditing": false},
        "term": statusOpen},
        {"flags": {"isEditing": false},
        "term": eqOperatorClosed}]
      ]
    });
  });

  it('Blur expression element reset isFocused for simple expression', () => {
    expect(expressions(
      oneElementExpressionState,
      actions.onBlur(ipAddressOpen, 0),
    )).toEqual({
    "expressions": [[
        {
          "flags": {"isEditing": false, isFocused: false},
          "term": ipAddressOpen
        }
      ]]
    });
    expect(ipAddressOpen).toEqual({id: 12, label: "IP Address", type: "category", next: [{label: "something"}], parent: {}});
    expect(oneElementExpressionState).toEqual({
      "expressions": [[{"flags": {"isEditing": false},
      "term": ipAddressOpen}]]
    });
  });

  it('Blur expression element set isEditing for bit more complex expression', () => {
    expect(expressions(
      twoExpressionsTwoElementsState,
      actions.onBlur(ipAddressOpen, 0),
    )).toEqual({
    "expressions": [[
        {
          "flags": {"isEditing": false, "isFocused": false},
          "term": ipAddressOpen
        },
        twoExpressionsTwoElementsState.expressions[0][1]],
        twoExpressionsTwoElementsState.expressions[1]
      ]
    });
    expect(ipAddressOpen).toEqual({id: 12, label: "IP Address", type: "category", next: [{label: "something"}], parent: {}});
    expect(twoExpressionsTwoElementsState).toEqual({
      "expressions": [
        [{"flags": {"isEditing": false},
        "term": ipAddressOpen},
        {"flags": {"isEditing": false},
        "term": eqOperatorClosed}],
        [{"flags": {"isEditing": false},
        "term": statusOpen},
        {"flags": {"isEditing": false},
        "term": eqOperatorClosed}]
      ]
    });
  });
});
