import React from 'react';
import Expression from '../components/Expression';
import EditableChip from '../components/EditableChip';
import { shallow, mount } from 'enzyme';
import toJson from 'enzyme-to-json';

const expressionProps = {
  key: 0,
  onClick: jest.fn(),
  onDoubleClick: jest.fn(),
  onSubmit: jest.fn(),
  onKeyDown: jest.fn(),
  onDelete: jest.fn(),
  onFocus: jest.fn(),
  onBlur: jest.fn(),
  blurAllChips: jest.fn(),
  setAlias: jest.fn(),
  onInsertExpression: jest.fn(),
  onDeleteExpression: jest.fn(),
  expression: [{flags: {isEditing: false}, term: {id: 1, label: 'ahoj', type: 'category', next: [], parent: {id: 0, label: 'root', type: 'root', next:[], parent: null}}}],
  chipRefs: [React.createRef()],
  isFocused: false,
  index: 1,
  isLastExpression: false,
  parenthesesCount: {left:0, right: 0},
  inputRef: React.createRef(),
  next: {id: 2, label: 'input', type: 'userinput', next:[{id: 2, label: 'input', type: 'userinput', next:[], parent: null}], parent: {id: 3, label: 'ahoj', type: 'userinput', next:[], parent: null}}
};

describe('Expression Component', () => {

  it('Onclick calls callback', () => {
    let onClick = jest.fn();
    const wrapper = mount(
      <Expression {...expressionProps} onClick={onClick}/>
    );

    wrapper.find('span.pf-c-label').simulate('click');
    expect(onClick).toBeCalledWith(1, 0);
  });

  it('onDoubleClick calls callback', () => {
    let onDoubleClick = jest.fn();
    const wrapper = mount(
      <Expression {...expressionProps} onDoubleClick={onDoubleClick}/>
    );

    wrapper.find('span.pf-c-label').simulate('dblclick');
    expect(onDoubleClick).toBeCalledWith({"id": 1, "label": "ahoj", "next": [], "parent": {"id": 0, "label": "root", "next": [], "parent": null, "type": "root"}, "type": "category"}, 1, 0);
  });

  it('onSubmit calls callback', () => {
    let onSubmit = jest.fn();
    const wrapper = mount(
      <Expression {...expressionProps}
        expression={[{flags: {isEditing: true}, term: {id: 1, label: 'ahoj', type: 'category', next: [], parent: {id: 0, label: 'root', type: 'root', next:[], parent: null}}}]}
        isFocused
        onSubmit={onSubmit}
      />
    );

    wrapper.find('input').simulate('keydown', {key: 'Enter', keyCode: 13});
    expect(onSubmit).toBeCalledWith(
      {"id": "ahoj", "label": "ahoj", "next": [], "parent": {"id": 0, "label": "root", "next": [], "parent": null, "type": "root"}, "type": "userinput"},
      {"id": 1, "label": "ahoj", "next": [], "parent": {"id": 0, "label": "root", "next": [], "parent": null, "type": "root"}, "type": "category"},
      1
    );
  });

  it('onDelete calls callback', () => {
    let onDelete = jest.fn();
    const wrapper = mount(
      <Expression {...expressionProps}
        expression={[{flags: {isEditing: false, isFocused: true}, term: {id: 1, label: 'ahoj', type: 'category', next: [], parent: {id: 0, label: 'root', type: 'root', next:[], parent: null}}}]}
        onDelete={onDelete}
        isFocused
      />
    );

    wrapper.find('span.focusedChip').simulate('keydown', {keyCode: 40});
    wrapper.find('span.focusedChip').simulate('keydown', {keyCode: 40});
    wrapper.find('span.focusedChip').simulate('keydown', {key: 'Enter', keyCode: 13});
    expect(onDelete).toBeCalledWith( {"id": 1, "label": "ahoj", "next": [], "parent": {"id": 0, "label": "root", "next": [], "parent": null, "type": "root"}, "type": "category"}, 1, 0);
  });

  it('setAlias calls callback', () => {
    let setAlias = jest.fn();
    const wrapper = mount(
      <Expression {...expressionProps}
        expression={[{flags: {isEditing: true, isFocused: true}, term: {id: 1, label: 'ahoj', type: 'category', next: [], parent: {id: 0, label: 'root', type: 'root', next:[], parent: null}}}]}
        setAlias={setAlias}
        isFocused
      />
    );

    wrapper.find(EditableChip).setState({aliasMode: true});
    wrapper.find('input').simulate('keydown', {key: 'Enter', keyCode: 13});
    expect(setAlias).toBeCalledWith('ahoj', 1, 0);
  });


  it('onFocus calls callback', () => {
    let onFocus = jest.fn();
    const wrapper = mount(
      <Expression {...expressionProps}
        expression={[{flags: {isEditing: false, isFocused: false}, term: {id: 1, label: 'ahoj', type: 'category', next: [], parent: {id: 0, label: 'root', type: 'root', next:[], parent: null}}}]}
        onFocus={onFocus}
      />
    );

    wrapper.find('span.pf-c-label').simulate('focus');
    expect(onFocus).toBeCalledWith({"id": 1, "label": "ahoj", "next": [], "parent": {"id": 0, "label": "root", "next": [], "parent": null, "type": "root"}, "type": "category"}, 1, 0);
  });

  it('OnBlur calls callback', () => {
    let onBlur = jest.fn();
    const wrapper = mount(
      <Expression {...expressionProps}
        expression={[{flags: {isEditing: false, isFocused: false}, term: {id: 1, label: 'ahoj', type: 'category', next: [], parent: {id: 0, label: 'root', type: 'root', next:[], parent: null}}}]}
        onBlur={onBlur}
        isFocused
      />
    );

    wrapper.find('span.pf-c-label').simulate('blur');
    expect(onBlur).toBeCalledWith({"id": 1, "label": "ahoj", "next": [], "parent": {"id": 0, "label": "root", "next": [], "parent": null, "type": "root"}, "type": "category"}, 1, 0);
  });

  it('onInsertExpression calls callback', () => {
    let onInsertExpression = jest.fn();
    const wrapper = mount(
      <Expression {...expressionProps}
        expression={[{flags: {isEditing: false, isFocused: false}, term: {id: 1, label: 'ahoj', type: 'category', next: [], parent: {id: 0, label: 'root', type: 'root', next:[], parent: null}}}]}
        onInsertExpression={onInsertExpression}
        isFocused
      />
    );

    wrapper.find('button#insert-expression-button').simulate('click');
    expect(onInsertExpression).toBeCalledWith(1);
  });

  it('onDeleteExpression calls callback', () => {
    let onDeleteExpression = jest.fn();
    const wrapper = mount(
      <Expression {...expressionProps}
        expression={[{flags: {isEditing: false, isFocused: false}, term: {id: 1, label: 'ahoj', type: 'category', next: [], parent: {id: 0, label: 'root', type: 'root', next:[], parent: null}}}]}
        onDeleteExpression={onDeleteExpression}
        isFocused
      />
    );

    wrapper.find('button#delete-expression-button').simulate('click');
    expect(onDeleteExpression).toBeCalledWith(1);
  });

  it('Matches the snapshot', () => {
    const component = shallow(
      <Expression {...expressionProps} />
    );

    const tree = toJson(component);
    expect(tree).toMatchSnapshot();
  });

  it('Matches the snapshot', () => {
    const component = shallow(
      <Expression {...expressionProps} isLastExpression parenthesesCount={{left: 1, right: 0}}/>
    );

    const tree = toJson(component);
    expect(tree).toMatchSnapshot();
  });
});
