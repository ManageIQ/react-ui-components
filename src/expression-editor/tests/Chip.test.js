import React from 'react';
import Chip from '../components/Chip';
import { shallow, mount } from 'enzyme';
import toJson from 'enzyme-to-json';


describe('Chip Component', () => {
  it('has focused class when focused', () => {
    const wrapper = mount(<Chip
      onDelete={jest.fn()}
      onFocus={jest.fn()}
      onDoubleClick={jest.fn()}
      onBlur={jest.fn()}
      onKeyDown={jest.fn()}
      setAliasMode={jest.fn()}
      setAlias={jest.fn()}
      isFocused={true}
      index={0}
      onClick={jest.fn()}
      label='label'
      type='category'
      chipRef={React.createRef()}
    />);

    expect(wrapper.find('span.focusedChip').length > 0).toBeTruthy();
  });

  it('OnClick called when clicked', () => {
    let onClick = jest.fn();
    const wrapper = mount(<Chip
      onDelete={jest.fn()}
      onFocus={jest.fn()}
      onDoubleClick={jest.fn()}
      onBlur={jest.fn()}
      onKeyDown={jest.fn()}
      setAliasMode={jest.fn()}
      setAlias={jest.fn()}
      isFocused={false}
      index={0}
      onClick={onClick}
      label='label'
      type='category'
      chipRef={React.createRef()}
    />);

    wrapper.find('span.pf-c-label').simulate('click');
    expect(onClick).toBeCalled();
  });

  it('OnFocus called when focused', () => {
    let onFocus = jest.fn();
    const wrapper = mount(<Chip
      onDelete={jest.fn()}
      onFocus={onFocus}
      onDoubleClick={jest.fn()}
      onBlur={jest.fn()}
      onKeyDown={jest.fn()}
      setAliasMode={jest.fn()}
      setAlias={jest.fn()}
      isFocused={false}
      index={0}
      onClick={jest.fn()}
      label='label'
      type='category'
      chipRef={React.createRef()}
    />);

    wrapper.find('span.pf-c-label').simulate('focus');
    expect(onFocus).toBeCalled();
  });

  it('onDoubleClick called when double-clicked', () => {
    let onDoubleClick = jest.fn();
    const wrapper = mount(<Chip
      onDelete={jest.fn()}
      onFocus={jest.fn()}
      onDoubleClick={onDoubleClick}
      onBlur={jest.fn()}
      onKeyDown={jest.fn()}
      setAliasMode={jest.fn()}
      setAlias={jest.fn()}
      isFocused={false}
      index={0}
      onClick={jest.fn()}
      label='label'
      type='category'
      chipRef={React.createRef()}
    />);

    wrapper.find('span.pf-c-label').simulate('dblclick');
    expect(onDoubleClick).toBeCalled();
  });

  it('onBlur called when blured', () => {
    let onBlur = jest.fn();
    const wrapper = mount(<Chip
      onDelete={jest.fn()}
      onFocus={jest.fn()}
      onDoubleClick={jest.fn()}
      onBlur={onBlur}
      onKeyDown={jest.fn()}
      setAliasMode={jest.fn()}
      setAlias={jest.fn()}
      isFocused={true}
      index={0}
      onClick={jest.fn()}
      label='label'
      type='category'
      chipRef={React.createRef()}
    />);

    wrapper.find('span.pf-c-label').simulate('blur');
    expect(onBlur).toBeCalled();
  });

  it('onBlur NOT called when clicked on menu item', () => {
    let onBlur = jest.fn();
    const wrapper = mount(<Chip
      onDelete={jest.fn()}
      onFocus={jest.fn()}
      onDoubleClick={jest.fn()}
      onBlur={onBlur}
      onKeyDown={jest.fn()}
      setAliasMode={jest.fn()}
      setAlias={jest.fn()}
      isFocused={true}
      index={0}
      onClick={jest.fn()}
      label='label'
      type='category'
      chipRef={React.createRef()}
    />);

    wrapper.find('button').first().simulate('click');
    expect(onBlur.mock.calls.length).toBe(0);
  });

    it('onDoubleClick called when pressed Enter with default index', () => {
      let onKeyDown = jest.fn();
      let onDoubleClick = jest.fn();
      const wrapper = mount(<Chip
        onDelete={jest.fn()}
        onFocus={jest.fn()}
        onDoubleClick={onDoubleClick}
        onBlur={jest.fn()}
        onKeyDown={onKeyDown}
        setAliasMode={jest.fn()}
        setAlias={jest.fn()}
        isFocused={true}
        index={0}
        onClick={jest.fn()}
        label='label'
        type='category'
        chipRef={React.createRef()}
      />);

      wrapper.find('span.focusedChip').simulate('keydown', {key: 'Enter', keyCode: 13});
      expect(onKeyDown.mock.calls.length).toBe(0);
      expect(onDoubleClick).toBeCalled();
    });

    it('onKeyDown called when other key pressed', () => {
      let onKeyDown = jest.fn();
      let onDoubleClick = jest.fn();
      const wrapper = mount(<Chip
        onDelete={jest.fn()}
        onFocus={jest.fn()}
        onDoubleClick={onDoubleClick}
        onBlur={jest.fn()}
        onKeyDown={onKeyDown}
        setAliasMode={jest.fn()}
        setAlias={jest.fn()}
        isFocused={true}
        index={0}
        onClick={jest.fn()}
        label='label'
        type='category'
        chipRef={React.createRef()}
      />);

      wrapper.find('span.focusedChip').simulate('keydown', {keyCode: 1});
      expect(onKeyDown).toBeCalled();
    });

    it('Navigate and click first item in the menu', () => {
      let onKeyDown = jest.fn();
      let onDoubleClick = jest.fn();
      const wrapper = mount(<Chip
        onDelete={jest.fn()}
        onFocus={jest.fn()}
        onDoubleClick={onDoubleClick}
        onBlur={jest.fn()}
        onKeyDown={onKeyDown}
        setAliasMode={jest.fn()}
        setAlias={jest.fn()}
        isFocused={true}
        index={0}
        onClick={jest.fn()}
        label='label'
        type='category'
        chipRef={React.createRef()}
      />);

      wrapper.find('span.focusedChip').simulate('keydown', {keyCode: 40});
      expect(onKeyDown.mock.calls.length).toBe(0);
      wrapper.find('span.focusedChip').simulate('keydown', {key: 'Enter', keyCode: 13});
      expect(onKeyDown.mock.calls.length).toBe(0);
      expect(onDoubleClick).toBeCalled();
    });

    it('Navigate and click second item in the menu', () => {
      let onKeyDown = jest.fn();
      let onDelete = jest.fn();
      const wrapper = mount(<Chip
        onDelete={onDelete}
        onFocus={jest.fn()}
        onDoubleClick={jest.fn()}
        onBlur={jest.fn()}
        onKeyDown={onKeyDown}
        setAliasMode={jest.fn()}
        setAlias={jest.fn()}
        isFocused={true}
        index={0}
        onClick={jest.fn()}
        label='label'
        type='category'
        chipRef={React.createRef()}
      />);

      wrapper.find('span.focusedChip').simulate('keydown', {keyCode: 40});
      expect(onKeyDown.mock.calls.length).toBe(0);
      wrapper.find('span.focusedChip').simulate('keydown', {keyCode: 40});
      expect(onKeyDown.mock.calls.length).toBe(0);
      wrapper.find('span.focusedChip').simulate('keydown', {key: 'Enter', keyCode: 13});
      expect(onKeyDown.mock.calls.length).toBe(0);
      expect(onDelete).toBeCalled();
    });

    it('Navigate and click third item in the menu', () => {
      let onKeyDown = jest.fn();
      let setAliasMode = jest.fn();
      const wrapper = mount(<Chip
        onDelete={jest.fn()}
        onFocus={jest.fn()}
        onDoubleClick={jest.fn()}
        onBlur={jest.fn()}
        onKeyDown={onKeyDown}
        setAliasMode={setAliasMode}
        setAlias={jest.fn()}
        isFocused={true}
        index={0}
        onClick={jest.fn()}
        label='label'
        type='category'
        chipRef={React.createRef()}
      />);

      wrapper.find('span.focusedChip').simulate('keydown', {keyCode: 40});
      expect(onKeyDown.mock.calls.length).toBe(0);
      wrapper.find('span.focusedChip').simulate('keydown', {keyCode: 40});
      expect(onKeyDown.mock.calls.length).toBe(0);
      wrapper.find('span.focusedChip').simulate('keydown', {keyCode: 40});
      expect(onKeyDown.mock.calls.length).toBe(0);
      wrapper.find('span.focusedChip').simulate('keydown', {key: 'Enter', keyCode: 13});
      expect(onKeyDown.mock.calls.length).toBe(0);
      expect(setAliasMode.mock.calls[0][0]).toBe(true);
      expect(setAliasMode).toBeCalled();
    });

    it('Navigate and click fourth item in the menu', () => {
      let onKeyDown = jest.fn();
      let setAlias = jest.fn();
      const wrapper = mount(<Chip
        onDelete={jest.fn()}
        onFocus={jest.fn()}
        onDoubleClick={jest.fn()}
        onBlur={jest.fn()}
        onKeyDown={onKeyDown}
        setAliasMode={jest.fn()}
        setAlias={setAlias}
        isFocused={true}
        index={0}
        onClick={jest.fn()}
        label='label'
        type='category'
        chipRef={React.createRef()}
      />);

      wrapper.find('span.focusedChip').simulate('keydown', {keyCode: 40});
      expect(onKeyDown.mock.calls.length).toBe(0);
      wrapper.find('span.focusedChip').simulate('keydown', {keyCode: 40});
      expect(onKeyDown.mock.calls.length).toBe(0);
      wrapper.find('span.focusedChip').simulate('keydown', {keyCode: 40});
      expect(onKeyDown.mock.calls.length).toBe(0);
      wrapper.find('span.focusedChip').simulate('keydown', {keyCode: 40});
      expect(onKeyDown.mock.calls.length).toBe(0);
      wrapper.find('span.focusedChip').simulate('keydown', {key: 'Enter', keyCode: 13});
      expect(onKeyDown.mock.calls.length).toBe(0);
      expect(setAlias.mock.calls[0][0]).toBe(false);
      expect(setAlias).toBeCalled();
    });



  it('match snapshot', () => {
    const component = shallow(
      <Chip
        onDelete={jest.fn()}
        onFocus={jest.fn()}
        onDoubleClick={jest.fn()}
        onBlur={jest.fn()}
        onKeyDown={jest.fn()}
        setAliasMode={jest.fn()}
        setAlias={jest.fn()}
        isFocused={true}
        index={0}
        onClick={jest.fn()}
        label='label'
        type='category'
        chipRef={{}}
      />
    );
    const tree = toJson(component);
    expect(tree).toMatchSnapshot();
  });
});
