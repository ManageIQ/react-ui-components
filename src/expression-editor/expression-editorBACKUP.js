import React, { useState, useEffect, useReducer } from 'react';
import { TypeAheadSelect } from 'patternfly-react';
import Autosuggest from 'react-autosuggest';
import { Select, SelectOption, SelectVariant } from '@patternfly/react-core';
import { CheckCircleIcon, TimesCircleIcon } from '@patternfly/react-icons';
// import { parser } from './parser'
import { trimInput } from './helper'
const nearley = require("nearley");
const partialGrammar = require('./grammar.ne.js')
const validationGrammar = require('./validation-grammar.ne.js')
let partialParser = new nearley.Parser(nearley.Grammar.fromCompiled(partialGrammar));
let parser = new nearley.Parser(nearley.Grammar.fromCompiled(validationGrammar));

let autocomplete = {
  exp_type: ['FIELD:', 'TAGS:', 'COUNT OF:', 'FIND:', 'REGKEY:'],
  entity: ['host.'],
  field: ['name ', 'status ', 'system ', 'owner '],
  category: ['environment ', 'location '],
  operator: ['= ', 'CONTAINS ', '< ', '> ', '<= ', '>= ', 'INCLUDES ', 'IS NOT EMPTY ', 'IS ', 'STARTS WITH ', 'REGULAR EXPRESSION MATCHES '],
  tag_operator: ['= ', 'CONTAINS  ', ': '],
  exp_operator: ['AND ', 'OR '],
  value: ['value '],
  check: ['CHECK ALL:', 'CHECK ANY:', 'CHECK COUNT:'],
};
const getSuggestions = next => next.map(n => autocomplete[n]).flat().filter(Boolean);
let reloadSuggestions;

const initialState = {
  inputText: "",
  parsedAST: "",
  partialAST: {},
  isValid: true,
  caretPosition: 0,
  suggestions: [],
  filteredSuggestions: [],
  filterStr: "",
  selectedIndex: 0,
}

const reducer = (state, action) => {
  let { type, inputText, caretPosition, model } = action;
  // console.log(action);
  switch (type) {
    case 'inputChanged':
      const { parsedAST, isValid } = parse(inputText);
      let newState = { ...state };
      let next = [];
      try {
        partialParser = new nearley.Parser(nearley.Grammar.fromCompiled(partialGrammar));
        let currentExp = trimInput(inputText, caretPosition);
        partialParser.feed(currentExp);
        next = partialParser.results[0][0].next;
        newState.partialAST = partialParser.results[0][0].results;
      }
      catch (err) {
        // console.log(err.message);
      }
      const filterStr = newState.partialAST.slice(-1)[0] ? newState.partialAST.slice(-1)[0].value : '';
      if (inputText.slice(-1) === '.' || inputText.slice(-1) === ' ') {
        // await (async () => {
        //   const input = newState.partialAST.slice(0, -1).map(i => i.value.replace(/"'/g));
        //   console.log('written input', input);
        //   autocomplete = await reloadSuggestions(model, next, input);
        //   console.log('RELOAD', autocomplete);
        // })()
        const input = newState.partialAST.slice(0, -1).map(i => i.value.replace(/"'/g));
        reloadSuggestions(model, next, input).then((value) => dispatch('SETSUGGESTION', value);
      }
      // const suggestions = getSuggestions(next);
      //console.log('sugestions', suggestions);
      dispatch('SETSUGGESTION', []);

      const filteredSuggestions = suggestions.filter(x => x.toLowerCase().includes(filterStr.toLowerCase()));
      return {
        ...newState,
        inputText,
        parsedAST,
        isValid,
        caretPosition,
        // suggestions,
        filteredSuggestions,
        filterStr,
      }

    case 'downArrow':
      return {
        ...state,
        selectedIndex: Math.min(state.selectedIndex + 1, state.filteredSuggestions.length - 1)
      };
    case 'upArrow':
      return {
        ...state,
        selectedIndex: Math.max(state.selectedIndex - 1, 0)
      };
    case 'leftArrow':
      return { ...state, caretPosition };
    case 'rightArrow':
      return { ...state, caretPosition };
    case 'resetSelection':
      return { ...state, selectedIndex: 0 }
    default:
      return state;

  }
}

const keyCodeToActions = (keyCode, { caretPosition, inputText, filterStr, newValue, model }) => ({
  13: () => ([inputTextAction(inputText, newValue, caretPosition, filterStr, model), { type: 'resetSelection' }]),
  37: () => ([{ type: 'leftArrow', caretPosition }]),
  38: () => ([{ type: 'upArrow', caretPosition }]),
  39: () => ([{ type: 'rightArrow', caretPosition }]),
  40: () => ([{ type: 'downArrow', caretPosition }]),
}[keyCode])

const parse = (text, callback) => {
  try {
    parser = new nearley.Parser(nearley.Grammar.fromCompiled(validationGrammar));
    parser.feed(text);
    if (parser.results.length === 0) {
      throw { message: 'Unexpected end of input. Please complete the expression.' };
    }
    return { parsedAST: JSON.stringify(parser.results[0]), isValid: true };
  }
  catch (err) {
    return { parsedAST: err.message, isValid: false };
  }
}
const statusDiv = (isValid, isHidden = false) => ((
  isValid
    ? <CheckCircleIcon style={{ color: 'lightGreen', fontSize: '24px', 'margin-right': '10px', visibility: isHidden ? 'hidden' : 'visible' }} />
    : <TimesCircleIcon style={{ color: 'red', fontSize: '24px', 'margin-right': '10px', visibility: isHidden ? 'hidden' : 'visible' }} />
));


const inputTextAction = (inputText, newValue, caretPosition, filterStr, model) => {
  const leftPart = inputText.slice(0, caretPosition);
  const rightPart = inputText.slice(caretPosition);
  const cutedLeftPart = leftPart.slice(0, leftPart.length - filterStr.length);
  console.log('modeeel', model);

  // this works only for the same selection
  let rightCut = 0;
  for (let i = newValue.length; i > 0; i--) {
    if (rightPart.slice(0, i) === newValue.slice(newValue.length - i)) {
      rightCut = i;
    }
  }
  return {
    type: 'inputChanged',
    caretPosition: caretPosition + newValue.length - filterStr.length,
    inputText: `${cutedLeftPart}${newValue}${rightPart.slice(rightCut)}`,
    model: model,
  };
}

export default function ExpressionEditor(props) {
  // console.log(props)
  const [state, dispatch] = useReducer(reducer, initialState);
  reloadSuggestions = props.reloadSuggestions;
  useEffect(() => {
    (async () => {
      autocomplete = await props.reloadSuggestions(props.model, ['exp_type', 'entity'], []);
      console.log('ON  LOAD', autocomplete);
    })()
  }, []);
  const onChange = (e, { newValue, method }) => {
    // console.log('onchange', e.keyCode, {a: newValue.slice(-1).charCodeAt(0)}, method);
    // don't add trailing enter, it should be done in different way, but...
    if (newValue.slice(-1).charCodeAt(0) === 10) {
      return;
    }
    switch (method) {
      case 'type':
        dispatch({
          type: 'inputChanged',
          caretPosition: e.target.selectionStart,
          inputText: newValue,
          model: props.model
        })
        break;
      case 'click':
        dispatch(inputTextAction(state.inputText, newValue, state.caretPosition, state.filterStr, model));
        break;
      default:
    }
  }
  const { inputText, filterStr, filteredSuggestions, selectedIndex } = state;
  const inputComponent = (
    <div className="pf-c-select__toggle-wrapper">
      <div style={{ display: 'flex' }}>
        {statusDiv(state.isValid, inputText.length === 0)}
        <Autosuggest
          alwaysRenderSuggestions
          theme={{}}
          suggestions={state.filteredSuggestions}
          getSuggestionValue={x => x}
          inputProps={{
            value: state.inputText,
            onChange,
            onKeyDown: (e) => {
              const actions = (keyCodeToActions(e.keyCode, { caretPosition: e.target.selectionStart, inputText, filterStr, newValue: filteredSuggestions[selectedIndex], model: props.model }) || (() => ([])))();
              actions.map(action => dispatch(action));
            },
            onKeyUp: (e) => { console.log('keyup', e.target.value); dispatch({ type: 'inputChanged', inputText: e.target.value, caretPosition: e.target.selectionStart, model: props.model }) },
            onClick: e => console.log(e.target.selectionStart),
            style: props.style,
          }}
          renderSuggestion={(item) => props.renderSuggestion(item, state.filteredSuggestions[state.selectedIndex] === item)}
          onSuggestionsFetchRequested={x => x}
          onSuggestionSelected={(e, { method, suggestionValue }) => onChange(e, { method, newValue: suggestionValue })}
          renderSuggestionsContainer={props.renderSuggestionsContainer}
          renderInputComponent={props.renderInputComponent}
        />
      </div>
    </div>)

  return (
    <div>
      {inputComponent}
      <pre style={{ 'white-space': 'pre-wrap', visibility: inputText.length === 0 ? 'hidden' : 'visible' }}>
        {state.parsedAST}
      </pre>
    </div>
  );
}
