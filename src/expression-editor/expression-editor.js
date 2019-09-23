import React, { useState, useEffect, useReducer } from 'react';
import { TypeAheadSelect } from 'patternfly-react';
import Autosuggest from 'react-autosuggest';
import { Select, SelectOption, SelectVariant } from '@patternfly/react-core';
import { CheckCircleIcon, TimesCircleIcon } from '@patternfly/react-icons';
import { parser } from './parser'
import { trimInput } from './helper'

const nearley = require("nearley");
const partialGrammar = require('./grammar.ne.js')
let partialParser = new nearley.Parser(nearley.Grammar.fromCompiled(partialGrammar));

const autocomplete = {
  exp_type: ["FIELD:", "TAGS:", "COUNT OF:", "FIND:", "REGKEY:"],
  entity: ["vm.","host."],
  field: ['name ', 'status '],
  category: ['environment ', 'category '],
  operator: ['= ', 'CONTAINS ', '< ', '> ', '<= ', '>= ', 'INCLUDES ', 'IS NOT EMPTY ', 'IS ', 'STARTS WITH ', "REGULAR EXPRESSION MATCHES "],
  tag_operator: ['= ', 'CONTAINS  ', ': '],
  exp_operator: ['AND ', 'OR '],
  value: ['value '],
  check: ['CHECK ALL:', 'CHECK ANY:', 'CHECK COUNT:']
}

const ast = value => ({
  toString: () => value.map(x=> x.type === 'entity' ? x.value + '.' : x.value + ' ').reduce((acc, i) => acc+i, ''),
  positionTokenIndex: (index) => value.reduce((acc, i) => (acc.length+i.value.length < index ? {index: acc.index+1, length: acc.length+i.value.length} : acc),{length: 0, index:-1}).index,
  value,
  last: value.slice(-1)[0]
})

const getSuggestions = next => next.map(n => autocomplete[n]).flat()


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
  // console.log(action);
  let { type, inputText, caretPosition } = action;
  // console.log('action: ',type);
  switch (type) {
    case 'inputChanged':
      const { parsedAST, isValid } = parse(inputText);
      let newState = {...state};
      let next = [];
      try {
        partialParser = new nearley.Parser(nearley.Grammar.fromCompiled(partialGrammar));
        // while(inputText[caretPosition] !== ' '&& inputText[caretPosition] !== '.' && caretPosition < inputText.length) {
        //   caretPosition++;
        // }
        let currentExp = inputText.slice(0,caretPosition)+"<<caret_position>>";
        console.log('CURENT', currentExp);

        const leftIndex = Math.max(currentExp.lastIndexOf('AND'), currentExp.lastIndexOf('OR'), 0);
        const rightIndex = [inputText.indexOf('AND', caretPosition-3), inputText.indexOf('OR', caretPosition-2)].reduce((a,b) => b > 0 ? (a < b ? a : b) : a, inputText.length-1)
        // console.log(inputText.slice(leftIndex, rightIndex));
        // console.log(rightIndex);
        // console.log(currentExp.slice(leftIndex).replace(/AND|OR/,''));
        partialParser.feed(currentExp.slice(leftIndex).replace(/AND|OR/,''));
        next = partialParser.results[0][0].next;
        // console.log(next);
        newState.partialAST = partialParser.results[0][0].results;
        const tmp = ast(partialParser.results[0][0].results);
        console.log(inputText.slice(leftIndex, rightIndex));
        console.log(tmp.value, tmp.value[tmp.positionTokenIndex(caretPosition-leftIndex)]);
      }
      catch(err) {
        console.log(err.message);
      }
      const filterStr =  newState.partialAST.slice(-1)[0] ? newState.partialAST.slice(-1)[0].value : '';
      // console.log(filterStr);
      // console.log(newState.partialAST);
      const suggestions = getSuggestions(next);
      // console.log(suggestions);
      const filteredSuggestions = suggestions.filter(x => x.toLowerCase().includes(filterStr.toLowerCase()));
      return {...newState,
        inputText,
        parsedAST,
        isValid,
        caretPosition,
        suggestions,
        filteredSuggestions,
        filterStr,
      }

    case 'downArrow':
      console.log('downArrow');
      console.log( Math.min(state.selectedIndex+1, state.filteredSuggestions.length-1));
      return {
        ...state,
        selectedIndex: Math.min(state.selectedIndex+1, state.filteredSuggestions.length-1)
      };
    case 'upArrow':
      console.log('upArrow');
      console.log( Math.max(state.selectedIndex-1, 0));
      return {
        ...state,
        selectedIndex: Math.max(state.selectedIndex-1, 0)
      };
    case 'leftArrow':
      return {...state, caretPosition};
    case 'rightArrow':
      return {...state, caretPosition};
    case 'resetSelection':
      return {...state, selectedIndex: 0}
    // case 'enter':
    //   console.log('enter', state.filteredSuggestions[state.selectedIndex]);
    //   return {...state};
    default:
      return state;

  }
}

const keyCodeToActions = (keyCode, {caretPosition, inputText, filterStr, newValue}) => ({
  13: () => ([inputTextAction(inputText, newValue, caretPosition, filterStr), {type: 'resetSelection'}]),
  37: () => ([{type: 'leftArrow', caretPosition}]),
  38: () => ([{type: 'upArrow', caretPosition}]),
  39: () => ([{type: 'rightArrow', caretPosition}]),
  40: () => ([{type: 'downArrow', caretPosition}]),
}[keyCode])

const parse = (text, callback) => {
  try {
    return { parsedAST: JSON.stringify(parser.parse(text)), isValid: true};
  }
  catch(err) {
    return { parsedAST: err.message, isValid: false};
  }
}

const statusDiv = (isValid) => ((
  isValid
    ? <CheckCircleIcon style={{color: 'lightGreen', fontSize: '24px', 'margin-right': '10px'}}/>
    : <TimesCircleIcon style={{color: 'red', fontSize: '24px', 'margin-right': '10px'}}/>
));

const generateMenu = (item, focus) => <button type='button' className={`pf-c-select__menu-item ${focus ? 'pf-m-focus' : ''}`}>{item}</button>
const renderContainer = ({ containerProps, children, query }) => {
  return (
    <div className="pf-c-select pf-m-expanded" {... containerProps}>
      {children}
    </div>
  );
}

const inputTextAction = (inputText, newValue, caretPosition, filterStr) => {
  const leftPart = inputText.slice(0, caretPosition);
  const rightPart = inputText.slice(caretPosition);
  const cutedLeftPart = leftPart.slice(0, leftPart.length - filterStr.length);
  return {
    type: 'inputChanged',
    caretPosition: caretPosition + newValue.length - filterStr.length,
    inputText: `${cutedLeftPart}${newValue}${rightPart}`,
  };
}

export default function ExpressionEditor() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const onChange = (e, { newValue, method }) => {
    console.log('onchage');
    switch (method) {
      case 'type':
        console.log('TYPE');
        dispatch({
          type: 'inputChanged',
          caretPosition: e.target.selectionStart,
          inputText: e.target.value,
        })
        break;
        case 'click':
          console.log('CLICK');
          dispatch(inputTextAction(state.inputText, newValue, state.caretPosition, state.filterStr));
        break;
      //   case 'enter':
      //   newValue = state.filteredSuggestions[state.selectedIndex];
      //   console.log('enter', newValue);
      //   leftPart = state.inputText.slice(0, state.caretPosition);
      //   rightPart = state.inputText.slice(state.caretPosition);
      //   cutedLeftPart = leftPart.slice(0, leftPart.length - state.filterStr.length);
      //   console.log(state.partialAST);
      //   console.log(`${cutedLeftPart}${newValue}${rightPart}`);
      //     dispatch({
      //       type: 'inputChanged',
      //       caretPosition: state.caretPosition + newValue.length - state.filterStr.length,
      //       inputText: `${cutedLeftPart}${newValue}${rightPart}`,
      //     })
      //   break;
      default:

    }
  }

  // const a =       (<TypeAheadSelect
  //         id="ee"
  //         options={state.suggestions}
  //         emptyLabel={null}
  //         filterBy={(x)=>(x)}
  //         isValid={state.isValid}
  //         isInvalid={!state.isValid}
  //         onChange={e=>console.log(e)}
  //         inputProps={{onKeyUp: e => dispatch({type: 'onKeyDown', caretPosition: e.target.selectionStart, inputText: e.target.value, keyCode: e.keyCode, ctrlKey: e.ctrlKey })}}
  //         filterBy={(option, props) => {
  //           return option.includes(state.filterStr)
  //         }}
  //       >
  //
  //       </TypeAheadSelect>);
  // const b = (<input
  //   // onChange={e => setInputText(e.target.value)}
  //   onKeyDown={e => dispatch({type: 'onKeyDown', caretPosition: e.target.selectionStart, inputText: e.target.value, keyCode: e.keyCode, ctrlKey: e.ctrlKey })}
  //   />);
    // console.log(state.suggestions, state.filteredSuggestions, state.filterStr);
    // console.log(state.filteredSuggestions[state.selectedIndex], state.selectedIndex);
    const {inputText, filterStr, filteredSuggestions, selectedIndex } = state;
    // console.log(keyCodeToActions(38, {caretPosition: 0, inputText, filterStr, newValue: filteredSuggestions[selectedIndex]})());
    const c = (

      <div className="pf-c-select__toggle-wrapper">
        <div style={{display: 'flex'}}>
        {statusDiv(state.isValid)}
        <Autosuggest
          theme={{}}
          alwaysRenderSuggestions
          suggestions={state.filteredSuggestions}
          getSuggestionValue={x=>x}
          inputProps={{
            value: state.inputText,
            onChange: (e,  action) => onChange(e, action),
            onKeyDown: (e) => {
              const actions = (keyCodeToActions(e.keyCode, {caretPosition: e.target.selectionStart, inputText, filterStr, newValue: filteredSuggestions[selectedIndex]}) || (() => ([])))();
              actions.map(action => dispatch(action));
            },
            onKeyUp: (e) => dispatch({type: 'inputChanged', inputText: e.target.value, caretPosition: e.target.selectionStart}),
            onClick: e => console.log(e.target.selectionStart), style: {width: '500px', 'font-size':'14px'},
          }}
          renderSuggestion={(item) => generateMenu(item, state.filteredSuggestions[state.selectedIndex] === item)}
          onSuggestionsFetchRequested={x => x}
          onSuggestionSelected={ (e, { method, suggestionValue }) => onChange(e,{method, newValue: suggestionValue})}
          renderSuggestionsContainer={renderContainer}
        />
        </div>
      </div>)

  return (
    <div>
      {c}

      <p>
        {state.parsedAST}
      </p>
    </div>
  );
}
