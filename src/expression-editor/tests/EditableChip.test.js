import React from 'react';
import EditableChip from '../components/EditableChip';
import { shallow, mount } from 'enzyme';
import toJson from 'enzyme-to-json';

const chipProps = {
  key: 1,
  label: 'label',
  isAliasSet: false,
  isEditing: false,
  isFocused: false,
  onClick: jest.fn(),
  onDoubleClick: jest.fn(),
  onSubmit: jest.fn(),
  onDelete: jest.fn(),
  onFocus: jest.fn(),
  onBlur: jest.fn(),
  setAlias: jest.fn(),
  blurAllChips: jest.fn(),
  onKeyDown: jest.fn(),
  chipRef: React.createRef(),
  options: [],
  selected: {id: 111, label: 'first', type: 'operator', next: []},
  item: {id: 111, label: 'first', type: 'operator', next: []},
  index: 0,
};

describe('EditableChip Component', () => {

  it('Onclick calls callback', () => {
    let onClick = jest.fn();
    const wrapper = mount(
      <EditableChip {...chipProps} onClick={onClick}/>
    );

    // let spy = jest.spyOn(wrapper.instance(), 'setAliasMode');
    wrapper.find('span.pf-c-label').simulate('click');
    expect(onClick).toBeCalledWith(0);
  });

  it('onDoubleClick calls callback', () => {
    let onDoubleClick = jest.fn();
    const wrapper = mount(
      <EditableChip {...chipProps} onDoubleClick={onDoubleClick}/>
    );

    wrapper.find('span.pf-c-label').simulate('dblclick');
    expect(onDoubleClick).toBeCalledWith({"id": 111, "label": "first", "next": [], "type": "operator"}, 0);
  });

  it('onFocus calls callback', () => {
    let onFocus = jest.fn();
    const wrapper = mount(
      <EditableChip {...chipProps} onFocus={onFocus}/>
    );

    wrapper.find('span.pf-c-label').simulate('focus');
    expect(onFocus).toBeCalledWith({"id": 111, "label": "first", "next": [], "type": "operator"}, 0);
  });

  it('onBlur calls callback', () => {
    let onBlur = jest.fn();
    const wrapper = mount(
      <EditableChip {...chipProps} onBlur={onBlur}/>
    );

    wrapper.find('span.pf-c-label').simulate('blur');
    expect(onBlur).toBeCalledWith({"id": 111, "label": "first", "next": [], "type": "operator"}, 0);
  });

  it('onDelete calls callback', () => {
    let onDelete = jest.fn();
    const wrapper = mount(
      <EditableChip {...chipProps} onDelete={onDelete} isFocused/>
    );

    wrapper.find('span.focusedChip').simulate('keydown', {keyCode: 40});
    wrapper.find('span.focusedChip').simulate('keydown', {keyCode: 40});
    wrapper.find('span.focusedChip').simulate('keydown', {key: 'Enter', keyCode: 13});
    expect(onDelete).toBeCalledWith({"id": 111, "label": "first", "next": [], "type": "operator"}, 0);
  });

  it('onSubmit calls callback', () => {
    let onSubmit = jest.fn();
    const wrapper = mount(
      <EditableChip {...chipProps} isEditing onSubmit={onSubmit}/>
    );

    wrapper.find('input').simulate('keydown', {key: 'Enter', keyCode: 13});

    expect(onSubmit).toBeCalledWith(
      {"id": "label", "label": "label", "next": [], "parent": undefined, "type": "userinput"},
      {"id": 111, "label": "first", "next": [], "type": "operator"}
    );
  });

  it('onSubmit calls callback with setAlias=true', () => {

    let setAlias = jest.fn();
    const wrapper = mount(
      <EditableChip {...chipProps} isEditing setAlias={setAlias}/>
    );

    wrapper.setState({aliasMode: true});
    wrapper.find('input').simulate('keydown', {key: 'Enter', keyCode: 13});
    expect(wrapper.state().aliasMode).toBe(false);
    expect(setAlias).toBeCalledWith('label', 0);
  });

  it('onChange calls callback', () => {
    let onChange = jest.fn();
    const wrapper = mount(
      <EditableChip {...chipProps} isEditing onChange={onChange} label='ahoj'/>
    );

    wrapper.find('input').simulate('change');
    expect(wrapper.state().filterString).toBe('ahoj');
  });

  it('setAliasMode sets state', () => {
    let setAlias = jest.fn();
    const wrapper = mount(
      <EditableChip {...chipProps} setAlias={setAlias}/>
    );

    let spy = jest.spyOn(wrapper.instance(), 'setAliasMode');
    let ret = wrapper.instance().setAliasMode('true');
    expect(wrapper.state().aliasMode).toBeTruthy();
  });



  it('Matches the snapshot with disabled edit', () => {
    const component = shallow(
      <EditableChip {...chipProps} />
    );

    const tree = toJson(component);
    expect(tree).toMatchSnapshot();
  });

  it('Matches the snapshot with enabled edit', () => {
    const component = shallow(
      <EditableChip {...chipProps} isEditing={true} inputRef={React.createRef()} />
    );

    const tree = toJson(component);
    expect(tree).toMatchSnapshot();
  });
});
