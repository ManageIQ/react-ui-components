import React from 'react';
import AutocompleteTextInput from '../components/AutocompleteTextInput';
import { shallow, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import { Dropdown } from '@patternfly/react-core';

// TODO test internal method like eligibleForSubmit


describe('AutocompleteTextInput Component', () => {
  let dropdownItem;
  let dropdown;
  beforeAll(() => {
    dropdown = document.createElement('div');
    dropdown.className = "pf-c-dropdown__menu";
    dropdownItem = document.createElement('div');
    dropdownItem.className = "pf-c-dropdown__menu-item";
    dropdown.appendChild(dropdownItem);
    document.body.appendChild(dropdown);
  });

  afterAll(() => {
    document.body.removeChild(dropdown);
  });

  it('Calls onSubmit when custom user input is allowed', () => {
    let onSubmit = jest.fn();
    let onKeyDown = jest.fn();
    const wrapper = mount(
      <AutocompleteTextInput
        onSubmit={onSubmit}
        onChange={jest.fn()}
        onKeyDown={onKeyDown}
        options={[]}
        value={'ahoj'}
        denyUserInput={true}
        setAliasMode={jest.fn()}
        aliasMode={jest.fn()}
        isLastElement={false}
        deleteExpression={jest.fn()}
        blurAllChips={jest.fn()}
        inputRef={React.createRef()}
        index={0}
        next={[]}/>
      );

      // expect(component.eligibleForSubmit("")).toBe(true);
      wrapper.find('input').simulate('keydown', {key: 'Enter', keyCode: 13});
      expect(onKeyDown.mock.calls.length).toBe(0);
      expect(onKeyDown.mock.calls.length).toBe(0);
  });

  it('Does NOT call onSubmit when custom user input is allowed', () => {
    let onSubmit = jest.fn();
    let onKeyDown = jest.fn();
    const wrapper = mount(
      <AutocompleteTextInput
        onSubmit={onSubmit}
        onChange={jest.fn()}
        onKeyDown={onKeyDown}
        options={[]}
        value={'ahoj'}
        denyUserInput={false}
        setAliasMode={jest.fn()}
        aliasMode={jest.fn()}
        isLastElement={false}
        deleteExpression={jest.fn()}
        blurAllChips={jest.fn()}
        inputRef={React.createRef()}
        index={0}
        next={[]}/>
      );

      // expect(component.eligibleForSubmit("")).toBe(true);
      wrapper.find('input').simulate('keydown', {key: 'Enter', keyCode: 13});
      expect(onKeyDown.mock.calls.length).toBe(0);
      expect(onSubmit).toBeCalled();
  });

    it('Selects on submit first options by keyboard', () => {
    let options =  [{ id: 111, label: 'first', type: 'operator'}, { id: 112, label: 'second', type: 'operator'}];
    let onSubmit = jest.fn();
    let onKeyDown = jest.fn();
    console.log(JSON.stringify(document.getElementsByClassName("pf-c-dropdown__menu")));
    console.log(JSON.stringify(document.getElementsByClassName("pf-c-dropdown__menu-item")));
    const wrapper = mount(
      <AutocompleteTextInput
        onSubmit={onSubmit}
        onChange={jest.fn()}
        onKeyDown={onKeyDown}
        options={options}
        value={'ahoj'}
        denyUserInput={false}
        setAliasMode={jest.fn()}
        aliasMode={jest.fn()}
        isLastElement={false}
        deleteExpression={jest.fn()}
        blurAllChips={jest.fn()}
        inputRef={React.createRef()}
        index={0}
        next={[]}/>
      );

      // expect(component.eligibleForSubmit("")).toBe(true);
      // wrapper.find('button').at(1).simulate('click');
      wrapper.find('input').simulate('keydown', {keyCode: 40});
      wrapper.find('input').simulate('keydown', {key: 'Enter', keyCode: 13});
      expect(onKeyDown.mock.calls.length).toBe(0);
      expect(onSubmit).toBeCalled();
  });


  it('Selects on submit first options by pressing down -> up -> down key', () => {
  let options =  [{ id: 111, label: 'first', type: 'operator'}, { id: 112, label: 'second', type: 'operator'}];
  let onSubmit = jest.fn();
  let onKeyDown = jest.fn();
  const wrapper = mount(
    <AutocompleteTextInput
      onSubmit={onSubmit}
      onChange={jest.fn()}
      onKeyDown={onKeyDown}
      options={options}
      value={'ahoj'}
      denyUserInput={false}
      setAliasMode={jest.fn()}
      aliasMode={jest.fn()}
      isLastElement={false}
      deleteExpression={jest.fn()}
      blurAllChips={jest.fn()}
      inputRef={React.createRef()}
      index={0}
      next={[]}/>
    );

    // expect(component.eligibleForSubmit("")).toBe(true);
    // wrapper.find('button').at(1).simulate('click');
    wrapper.find('input').simulate('keydown', {keyCode: 40});
    wrapper.find('input').simulate('keydown', {keyCode: 38});
    wrapper.find('input').simulate('keydown', {keyCode: 40});
    wrapper.find('input').simulate('keydown', {key: 'Enter', keyCode: 13});
    expect(onKeyDown.mock.calls.length).toBe(0);
    expect(onSubmit).toBeCalled();
  });

  it('Call onKeyDown for Home, End, leftArrow with empty value', () => {
  let onKeyDown = jest.fn();
  const wrapper = mount(
    <AutocompleteTextInput
      onSubmit={jest.fn()}
      onChange={jest.fn()}
      onKeyDown={onKeyDown}
      options={[]}
      value={''}
      denyUserInput={false}
      setAliasMode={jest.fn()}
      aliasMode={jest.fn()}
      isLastElement={false}
      deleteExpression={jest.fn()}
      blurAllChips={jest.fn()}
      inputRef={React.createRef()}
      index={0}
      next={[]}/>
    );

    // expect(component.eligibleForSubmit("")).toBe(true);
    // wrapper.find('button').at(1).simulate('click');
    wrapper.find('input').simulate('keydown', {keyCode: 35});
    wrapper.find('input').simulate('keydown', {keyCode: 36});
    wrapper.find('input').simulate('keydown', {keyCode: 37});
    wrapper.find('input').simulate('keydown', {keyCode: 1});
    expect(wrapper.state().index).toBe(-1);
    expect(onKeyDown.mock.calls.length).toBe(3);
  });

  it('Selects on submit first options by pressing down -> up -> down key', () => {
  let onKeyDown = jest.fn();
  const wrapper = mount(
    <AutocompleteTextInput
      onSubmit={jest.fn()}
      onChange={jest.fn()}
      onKeyDown={onKeyDown}
      options={[]}
      value={'ahoj'}
      denyUserInput={false}
      setAliasMode={jest.fn()}
      aliasMode={jest.fn()}
      isLastElement={false}
      deleteExpression={jest.fn()}
      blurAllChips={jest.fn()}
      inputRef={React.createRef()}
      index={0}
      next={[]}/>
    );

    // expect(component.eligibleForSubmit("")).toBe(true);
    // wrapper.find('button').at(1).simulate('click');

    wrapper.find('input').simulate('keydown', {keyCode: 37});
    expect(onKeyDown.mock.calls.length).toBe(0);
  });

  it('Selects on submit first options by mouse click', () => {
  let options =  [{ id: 111, label: 'first', type: 'operator'}, { id: 112, label: 'second', type: 'operator'}];
  let onSubmit = jest.fn();
  const wrapper = mount(
    <AutocompleteTextInput
      onSubmit={onSubmit}
      onChange={jest.fn()}
      onKeyDown={jest.fn()}
      options={options}
      value={''}
      denyUserInput={true}
      setAliasMode={jest.fn()}
      aliasMode={jest.fn()}
      isLastElement={false}
      deleteExpression={jest.fn()}
      blurAllChips={jest.fn()}
      inputRef={React.createRef()}
      index={0}
      next={[]}/>
    );

    // expect(component.eligibleForSubmit("")).toBe(true);
    wrapper.find('button').at(1).simulate('mouseDown');
    // expect(onSubmit.mock.calls[0][0]).toBe({ id: 111, label: 'first', type: 'operator'});
    expect(onSubmit).toHaveBeenCalledWith({ id: 112, label: 'second', type: 'operator'});
});

  it('OnBlur calls submit and sets state', () => {
  let onSubmit = jest.fn();
  const wrapper = mount(
    <AutocompleteTextInput
      onSubmit={onSubmit}
      onChange={jest.fn()}
      onKeyDown={jest.fn()}
      options={[]}
      value={'ahoj'}
      denyUserInput={false}
      setAliasMode={jest.fn()}
      aliasMode={jest.fn()}
      isLastElement={false}
      deleteExpression={jest.fn()}
      blurAllChips={jest.fn()}
      inputRef={React.createRef()}
      index={0}
      next={[]}/>
    );

    // expect(component.eligibleForSubmit("")).toBe(true);
    // wrapper.find('button').at(1).simulate('click');
    wrapper.find('input').simulate('focus');
    expect(wrapper.state().isFocused).toBeTruthy();
    wrapper.find('input').simulate('blur');
    expect(wrapper.state().isFocused).toBeFalsy();
    expect(onSubmit).toBeCalled();
  });

  it('onChange is called', () => {
  let onChange = jest.fn();
  const wrapper = mount(
    <AutocompleteTextInput
      onSubmit={jest.fn()}
      onChange={onChange}
      onKeyDown={jest.fn()}
      options={[]}
      value={'ahoj'}
      denyUserInput={false}
      setAliasMode={jest.fn()}
      aliasMode={jest.fn()}
      isLastElement={false}
      deleteExpression={jest.fn()}
      blurAllChips={jest.fn()}
      inputRef={React.createRef()}
      index={0}
      next={[]}/>
    );

    // expect(component.eligibleForSubmit("")).toBe(true);
    // wrapper.find('button').at(1).simulate('click');
    wrapper.find('input').simulate('change', 'a');
    expect(wrapper.state().isFocused).toBeTruthy();
    expect(onChange).toBeCalled();
  });

  it('eligibleForSubmit return false with empty string argument', () => {
  let onChange = jest.fn();
  const wrapper = mount(
    <AutocompleteTextInput
      onSubmit={jest.fn()}
      onChange={onChange}
      onKeyDown={jest.fn()}
      options={[]}
      value={'ahoj'}
      denyUserInput={false}
      setAliasMode={jest.fn()}
      aliasMode={jest.fn()}
      isLastElement={false}
      deleteExpression={jest.fn()}
      blurAllChips={jest.fn()}
      inputRef={React.createRef()}
      index={0}
      next={[]}/>
    );

    let spy = jest.spyOn(wrapper.instance(), 'eligibleForSubmit');
    let ret = wrapper.instance().eligibleForSubmit('');
    expect(spy).toHaveBeenCalled();
    expect(ret).toBe(false);
  });

  it('eligibleForSubmit return value with empty string argument and aliasMode=true', () => {
  let onChange = jest.fn();
  const wrapper = mount(
    <AutocompleteTextInput
      onSubmit={jest.fn()}
      onChange={onChange}
      onKeyDown={jest.fn()}
      options={[]}
      value={'ahoj'}
      denyUserInput={false}
      setAliasMode={jest.fn()}
      aliasMode={true}
      isLastElement={false}
      deleteExpression={jest.fn()}
      blurAllChips={jest.fn()}
      inputRef={React.createRef()}
      index={1}
      next={[]}/>
    );

    let spy = jest.spyOn(wrapper.instance(), 'eligibleForSubmit');
    let ret = wrapper.instance().eligibleForSubmit('val');
    expect(spy).toHaveBeenCalled();
    expect(ret).toBe('val');
  });

  it('eligibleForSubmit returns matching options', () => {
  let options =  [{ id: 111, label: 'first', type: 'operator'}, { id: 112, label: 'second', type: 'operator'}];
  const wrapper = mount(
    <AutocompleteTextInput
      onSubmit={jest.fn()}
      onChange={jest.fn()}
      onKeyDown={jest.fn()}
      options={options}
      value={'ahoj'}
      denyUserInput={false}
      setAliasMode={jest.fn()}
      aliasMode={false}
      isLastElement={false}
      deleteExpression={jest.fn()}
      blurAllChips={jest.fn()}
      inputRef={React.createRef()}
      index={-1}
      next={[]}/>
    );

    let spy = jest.spyOn(wrapper.instance(), 'eligibleForSubmit');
    let ret = wrapper.instance().eligibleForSubmit('fi');
    expect(spy).toHaveBeenCalled();
    expect(ret).toEqual({"id": 111, "label": "first", "type": "operator"});
  });

  it('eligibleForSubmit returns new userinput type object', () => {
  let options =  [{ id: 111, label: 'first', type: 'operator'}, { id: 112, label: 'second', type: 'operator'}];
  const wrapper = mount(
    <AutocompleteTextInput
      onSubmit={jest.fn()}
      onChange={jest.fn()}
      onKeyDown={jest.fn()}
      options={options}
      value={'ahoj'}
      denyUserInput={false}
      setAliasMode={jest.fn()}
      aliasMode={false}
      isLastElement={false}
      deleteExpression={jest.fn()}
      blurAllChips={jest.fn()}
      inputRef={React.createRef()}
      index={-1}
      next={[]}/>
    );

    let spy = jest.spyOn(wrapper.instance(), 'eligibleForSubmit');
    let ret = wrapper.instance().eligibleForSubmit('bla');
    expect(spy).toHaveBeenCalled();
    expect(ret).toEqual({"id": "bla", "label": "bla", "next": [], "type": "userinput"});
  });

  it('eligibleForSubmit returns false if there are no matching options and user input is denied', () => {
  let options =  [{ id: 111, label: 'first', type: 'operator'}, { id: 112, label: 'second', type: 'operator'}];
  const wrapper = mount(
    <AutocompleteTextInput
      onSubmit={jest.fn()}
      onChange={jest.fn()}
      onKeyDown={jest.fn()}
      options={options}
      value={'ahoj'}
      denyUserInput={true}
      setAliasMode={jest.fn()}
      aliasMode={false}
      isLastElement={false}
      deleteExpression={jest.fn()}
      blurAllChips={jest.fn()}
      inputRef={React.createRef()}
      index={-1}
      next={[]}/>
    );

    let spy = jest.spyOn(wrapper.instance(), 'eligibleForSubmit');
    let ret = wrapper.instance().eligibleForSubmit('bla');
    expect(spy).toHaveBeenCalled();
    expect(ret).toEqual(false);
  });

  it('eligibleForSubmit returns object on selected index', () => {
  let options =  [{ id: 111, label: 'first', type: 'operator'}, { id: 112, label: 'second', type: 'operator'}];
  const wrapper = mount(
    <AutocompleteTextInput
      onSubmit={jest.fn()}
      onChange={jest.fn()}
      onKeyDown={jest.fn()}
      options={options}
      value={'ahoj'}
      denyUserInput={true}
      setAliasMode={jest.fn()}
      aliasMode={false}
      isLastElement={false}
      deleteExpression={jest.fn()}
      blurAllChips={jest.fn()}
      inputRef={React.createRef()}
      index={1}
      next={[]}/>
    );

    wrapper.setState({index: 1});
    let spy = jest.spyOn(wrapper.instance(), 'eligibleForSubmit');
    let ret = wrapper.instance().eligibleForSubmit('');
    expect(spy).toHaveBeenCalled();
    expect(ret).toEqual({"id": 112, "label": "second", "type": "operator"});
    expect(wrapper.state().index).toBe(1);
  });

  it('Matches the snapshot', () => {
    const component = shallow(
      <AutocompleteTextInput
        onSubmit={jest.fn()}
        onChange={jest.fn()}
        onKeyDown={jest.fn()}
        options={[]}
        value={''}
        denyUserInput={true}
        setAliasMode={jest.fn()}
        aliasMode={jest.fn()}
        isLastElement={false}
        deleteExpression={jest.fn()}
        blurAllChips={jest.fn()}
        inputRef={React.createRef()}
        index={0}
        next={[]}/>
      );

      const tree = toJson(component);
      expect(tree).toMatchSnapshot();
  });
})
