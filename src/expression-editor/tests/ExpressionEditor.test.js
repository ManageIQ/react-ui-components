import React from 'react';
import ExpressionEditor2 from '../components/ExpressionEditor2';
import { shallow, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import { userInputMock } from "../constants"

const mapParent = (parent, nodes) => {
  nodes.map(node => node.parent = parent);
  nodes.map(node => mapParent(node, node.next));
  return parent;
}

let defaultOptions = {id: 0, label: 'root', type: 'root', next:
  [{ id: 1, label: 'Fields', type: 'category', next: [
      { id: 11, label: 'Hostname', type: 'category',
        next: [{ id: 111, label: '=', type: 'operator', next: userInputMock}, { id: 112, label: '!=', type: 'operator', next: userInputMock},
            { id: 113, label: 'CONTAINS', type: 'operator', next: userInputMock}, { id: 114, label: 'MATCH REG EXP', type: 'operator', next: userInputMock},
            { id: 115, label: 'BLABLA', type: 'operator', next: userInputMock}, { id: 116, label: 'BLABLA2', type: 'operator', next: userInputMock},
            { id: 117, label: 'BLAsasaBLA', type: 'operator', next: userInputMock}, { id: 118, label: 'BLABLA2', type: 'operator', next: userInputMock},
            { id: 119, label: 'BLABLsasA', type: 'operator', next: userInputMock}, { id: 120, label: 'BLABLsssA2', type: 'operator', next: userInputMock}
          ]
      },
      { id: 12, label: 'IP Address', type: 'category',
        next: [{ id: 121, label: '=', type: 'operator', next: userInputMock}, { id: 122, label: '!=', type: 'operator', next: userInputMock}]
      },
      { id: 13, label: 'VM count', type: 'category',
        next: [{ id: 131, label: '=', type: 'operator', next: userInputMock}, { id: 132, label: '!=', type: 'operator', next: userInputMock}]
      },
      { id: 14, label: 'Status', type: 'category',
        next: [{ id: 141, label: '=', type: 'operator', next: userInputMock}, { id: 142, label: '!=', type: 'operator', next: userInputMock}]
      },
    ]
  },
    { id: 2, label: 'Tags', type: 'category', next: [
        { id: 21, label: 'Location', type: 'category',
          next: [{ id: 211, label: '=', type: 'operator', next: userInputMock}, { id: 212, label: '!=', type: 'operator', next: userInputMock}]
        },
        { id: 22, label: 'Department', type: 'category',
          next: [{ id: 221, label: '=', type: 'operator', next: [{ id: 2211, label: 'Financial Services', type: 'value', next: []},
            { id: 2212, label: 'Human Resources', type: 'value', next: []}]},
          { id: 222, label: '!=', type: 'operator', next: [{ id: 2221, label: 'Financial Services', type: 'value', next: []},
            { id: 2222, label: 'Human Resources', type: 'value', next: []}]}]
        },
        { id: 23, label: 'Environment', type: 'category',
          next: [{ id: 231, label: '=', type: 'operator', next: userInputMock}, { id: 232, label: '!=', type: 'operator', next: userInputMock}]
        },
        { id: 24, label: 'Owner', type: 'category',
          next: [{ id: 241, label: '=', type: 'operator', next: userInputMock}, { id: 242, label: '!=', type: 'operator', next: userInputMock}]
        },
      ]
    }
  ]
};

defaultOptions = mapParent(defaultOptions, defaultOptions.next);


const props = {
  onClick: jest.fn(),
  onSubmit: jest.fn(),
  onDelete: jest.fn(),
  onFocus: jest.fn(),
  onBlur: jest.fn(),
  setAlias: jest.fn(),
  expressions: [[]],
  parenthesesCount: {left: 0, right: 0},
  next: defaultOptions.next
}

describe('Expression Component', () => {

  it('localToGlobalIndex convert indices', () => {
    const wrapper = mount(
      <ExpressionEditor2 {...props}
        expressions={[[{flags: {isEditing: false, isFocused: false}, term: {id: 1, label: 'ahoj', type: 'category', next: [], parent: {id: 0, label: 'root', type: 'root', next:[], parent: null}}}],
          [{flags: {isEditing: false, isFocused: false}, term: {id: 1, label: 'ahoj', type: 'category', next: [], parent: {id: 0, label: 'root', type: 'root', next:[], parent: null}}},
            {flags: {isEditing: false, isFocused: false}, term: {id: 1, label: 'ahoj', type: 'category', next: [], parent: {id: 0, label: 'root', type: 'root', next:[], parent: null}}}
          ],
          [{flags: {isEditing: false, isFocused: false}, term: {id: 1, label: 'ahoj', type: 'category', next: [], parent: {id: 0, label: 'root', type: 'root', next:[], parent: null}}}]]}
      />
    );

    let spy = jest.spyOn(wrapper.instance(), 'localToGlobalIndex');
    const ret = wrapper.instance().localToGlobalIndex(1, 2)
    expect(spy).toHaveBeenCalled();
    expect(ret).toBe(4);

  });

  it('FocusInput blurs chips', (done) => {
    const blurAllChips = jest.fn();
    const wrapper = mount(
      <ExpressionEditor2 {...props}
        blurAllChips={blurAllChips}
        />
    );
    setTimeout(() => {
      jest.spyOn(wrapper.instance(), 'focusInput')
      wrapper.instance().focusInput()
      done()
      expect(blurAllChips).toHaveBeenCalled()
    }, 100);
  });

  it('FocusChip focus chip', (done) => {
    const wrapper = mount(
      <ExpressionEditor2 {...props}
        expressions={[[{flags: {isEditing: false, isFocused: false}, term: {id: 1, label: 'ahoj', type: 'category', next: [], parent: {id: 0, label: 'root', type: 'root', next:[], parent: null}}}],
          [{flags: {isEditing: false, isFocused: false}, term: {id: 1, label: 'ahoj', type: 'category', next: [], parent: {id: 0, label: 'root', type: 'root', next:[], parent: null}}},
            {flags: {isEditing: false, isFocused: false}, term: {id: 1, label: 'ahoj', type: 'category', next: [], parent: {id: 0, label: 'root', type: 'root', next:[], parent: null}}}
          ],
          [{flags: {isEditing: true, isFocused: false}, term: {id: 1, label: 'ahoj', type: 'category', next: [], parent: {id: 0, label: 'root', type: 'root', next:[], parent: null}}}]]}
        />
    );
    setTimeout(() => {
      let spy = jest.spyOn(wrapper.instance(), 'focusChip');
      wrapper.instance().focusChip(1)
      expect(spy).toHaveBeenCalled();
      done()
    }, 100);
  });

  it('RightArrow pressed', (done) => {
    const blurAllChips = jest.fn();
    const wrapper = mount(
      <ExpressionEditor2 {...props}
        blurAllChips={blurAllChips}
        next={userInputMock}
        expressions={[[{flags: {isEditing: false, isFocused: true}, term: defaultOptions.next[0] }, {flags: {isEditing: false, isFocused: false}, term: defaultOptions.next[0].next[0]}]]}
        />
    );
    setTimeout(() => {
      let focusChip = jest.spyOn(wrapper.instance(), 'focusChip');
      let focusInput = jest.spyOn(wrapper.instance(), 'focusInput');
      wrapper.find('span.pf-c-label').first().simulate('keydown', {keyCode: 39});
      expect(focusChip).toHaveBeenCalledWith(1);
      wrapper.find('span.pf-c-label').at(1).simulate('keydown', {keyCode: 39});
      expect(focusInput).toHaveBeenCalled();
      // wrapper.find('span.pf-c-label').first().simulate('keydown', {ctrlKey: true, keyCode: 39});
      // expect(focusInput).toHaveBeenCalled();
      done()
    }, 100);
  });

  it('LeftArrow pressed', (done) => {
    const wrapper = mount(
      <ExpressionEditor2 {...props}
        next={userInputMock}
        expressions={[[{flags: {isEditing: false, isFocused: true}, term: defaultOptions.next[0] }, {flags: {isEditing: false, isFocused: false}, term: defaultOptions.next[0].next[0]}]]}
        />
    );
    setTimeout(() => {
      let focusChip = jest.spyOn(wrapper.instance(), 'focusChip');
      let focusInput = jest.spyOn(wrapper.instance(), 'focusInput');
      wrapper.find('span.pf-c-label').at(1).simulate('keydown', {keyCode: 37});
      expect(focusChip).toHaveBeenCalledWith(0);
      done()
    }, 100);
  });

  it('End pressed focuses input', (done) => {
    const blurAllChips = jest.fn();
    const wrapper = mount(
      <ExpressionEditor2 {...props}
        next={userInputMock}
        blurAllChips={blurAllChips}
        expressions={[[{flags: {isEditing: false, isFocused: true}, term: defaultOptions.next[0] }, {flags: {isEditing: false, isFocused: false}, term: defaultOptions.next[0].next[0]}]]}
        />
    );

    setTimeout(() => {
      let focusInput = jest.spyOn(wrapper.instance(), 'focusInput');
      wrapper.find('span.pf-c-label').at(0).simulate('keydown', {keyCode: 35});
      expect(focusInput).toHaveBeenCalled();
      done()
    }, 100);
  });

  it('End pressed focuses last chip', (done) => {
    const blurAllChips = jest.fn();
    const wrapper = mount(
      <ExpressionEditor2 {...props}
        next={userInputMock}
        blurAllChips={blurAllChips}
        expressions={[[{flags: {isEditing: false, isFocused: true}, term: defaultOptions.next[0] }, {flags: {isEditing: false, isFocused: false}, term: {...defaultOptions.next[0].next[0], next: []}}]]}
        />
    );

    setTimeout(() => {
      let focusChip = jest.spyOn(wrapper.instance(), 'focusChip');
      wrapper.find('span.pf-c-label').at(0).simulate('keydown', {keyCode: 35});
      expect(focusChip).toHaveBeenCalledWith(1);
      done()
    }, 100);
  });

  it('Home pressed focuses first chip', (done) => {
    const blurAllChips = jest.fn();
    const wrapper = mount(
      <ExpressionEditor2 {...props}
        next={userInputMock}
        blurAllChips={blurAllChips}
        expressions={[[{flags: {isEditing: false, isFocused: true}, term: defaultOptions.next[0] }, {flags: {isEditing: false, isFocused: false}, term: defaultOptions.next[0].next[0]}]]}
        />
    );

    setTimeout(() => {
      let focusChip = jest.spyOn(wrapper.instance(), 'focusChip');
      wrapper.find('span.pf-c-label').at(1).simulate('keydown', {keyCode: 36});
      expect(focusChip).toHaveBeenCalledWith(0);
      done()
    }, 100);
  });

  it('Delete pressed calls onDelete', (done) => {
    const onDelete = jest.fn();
    const blurAllChips = jest.fn();
    const wrapper = mount(
      <ExpressionEditor2 {...props}
        next={userInputMock}
        onDelete={onDelete}
        blurAllChips={blurAllChips}
        expressions={[[{flags: {isEditing: false, isFocused: true}, term: defaultOptions.next[0] }, {flags: {isEditing: false, isFocused: false}, term: defaultOptions.next[0].next[0]}]]}
        />
    );

    setTimeout(() => {
      wrapper.find('span.pf-c-label').at(1).simulate('keydown', {keyCode: 46});
      expect(onDelete).toHaveBeenCalled();
      done()
    }, 100);
  });

  it('Backspace pressed calls onDelete', (done) => {
    const onDelete = jest.fn();
    const blurAllChips = jest.fn();
    const wrapper = mount(
      <ExpressionEditor2 {...props}
        next={userInputMock}
          onDelete={onDelete}
        blurAllChips={blurAllChips}
        expressions={[[{flags: {isEditing: false, isFocused: true}, term: defaultOptions.next[0] }, {flags: {isEditing: false, isFocused: false}, term: defaultOptions.next[0].next[0]}]]}
        />
    );

    setTimeout(() => {
      wrapper.find('span.pf-c-label').at(1).simulate('keydown', {keyCode: 8});
      expect(onDelete).toHaveBeenCalled();
      done()
    }, 100);
  });

  it('Insert pressed calls onInsert', (done) => {
    const onInsert = jest.fn();
    const wrapper = mount(
      <ExpressionEditor2 {...props}
        next={userInputMock}
        onInsert={onInsert}
        expressions={[[{flags: {isEditing: false, isFocused: true}, term: defaultOptions.next[0] }, {flags: {isEditing: false, isFocused: false}, term: defaultOptions.next[0].next[0]}]]}
        />
    );

    setTimeout(() => {
      wrapper.find('span.pf-c-label').at(1).simulate('keydown', {keyCode: 45});
      expect(onInsert).toHaveBeenCalledWith(0);
      done()
    }, 100);
  });



  it('Enter pressed calls onSubmit', (done) => {
    const onSubmit = jest.fn();
    const wrapper = mount(
      <ExpressionEditor2 {...props}
        next={userInputMock}
        onSubmit={onSubmit}
        expressions={[[{flags: {isEditing: false, isFocused: true}, term: defaultOptions.next[0] }, {flags: {isEditing: false, isFocused: false}, term: defaultOptions.next[0].next[0].next[0]}]]}
        />
    );

    setTimeout(() => {
      // let focusChip = jest.spyOn(wrapper.instance(), 'focusChip');
      wrapper.find('input').simulate('change', {target: {value: 'ahoj'}});
      wrapper.find('input').simulate('keydown', {keyCode: 13});
      expect(onSubmit).toHaveBeenCalled();
      done()
    }, 100);
  });

  it('Matches the snapshot', () => {
    const component = mount(
      <ExpressionEditor2 {...props}

       />
    );

    const tree = toJson(component);
    expect(tree).toMatchSnapshot();
  });
});
