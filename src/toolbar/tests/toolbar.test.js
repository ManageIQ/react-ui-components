import React from 'react';
import toJson from 'enzyme-to-json';
import { mount, shallow } from 'enzyme';

import { Toolbar } from '..';
import { ToolbarButton } from '../ToolbarButton';
import { ToolbarGroup } from '../Toolbar';
import { ToolbarKebab } from '../ToolbarKebab';
import { ToolbarList } from '../ToolbarList';
import { ToolbarView } from '../ToolbarView';

const toolbarData = require('../data/toolbar-big.json');
const viewData = require('../data/toolbar-view.json');

describe('Toolbar', () => {
  it('Well it works ;-)', () => {
    const t = shallow(
      <Toolbar
        onClick={() => {}}
        groups={toolbarData}
        views={viewData}
        count={0}
      />
    );
    expect(t).toMatchSnapshot()
  })

  it('renders the ToolbarView component', () => {
    const t = shallow(
      <Toolbar
        onClick={() => {}}
        groups={toolbarData}
        views={viewData}
        count={0}
      />
    );
    expect(t.find(ToolbarView)).toHaveLength(1);
  });

  it('renders view buttons', () => {
    const t = mount(
      <Toolbar
        onClick={() => {}}
        groups={toolbarData}
        views={viewData}
        count={0}
      />
    );
    expect(t.find('button.btn.btn-link')).toHaveLength(3);
  });

  it('renders groups', () => {
    const t = shallow(
      <Toolbar
        onClick={() => {}}
        groups={toolbarData}
        views={viewData}
        count={0}
      />
    );
    expect(t.find(ToolbarGroup)).toHaveLength(4);
  });

  it('renders simple buttons', () => {
    const t = mount(
      <Toolbar
        onClick={() => {}}
        groups={toolbarData}
        views={viewData}
        count={0}
      />
    );
    expect(t.find(ToolbarButton)).toHaveLength(2);
    expect(t.find(ToolbarButton).at(0).containsMatchingElement(
        <i className="fa fa-refresh fa-lg"/>
      )
    ).toBeTruthy()
  });

  it('renders drop-down buttons', () => {
    const t = mount(
      <Toolbar
        onClick={() => {}}
        groups={toolbarData}
        views={viewData}
        count={0}
      />
    );
    expect(t.find(ToolbarList)).toHaveLength(7);
    expect(t.find(ToolbarList).at(1).text()).toContain('Configuration');
    expect(t.find(ToolbarList).at(1).containsMatchingElement(
        <i className="fa fa-cog fa-lg"/>
      )
    ).toBeTruthy()
  });

  it('renders kebab buttons', () => {
    const t = mount(
      <Toolbar
        onClick={() => {}}
        groups={toolbarData}
        views={viewData}
        count={0}
      />
    );
    expect(t.find(ToolbarKebab)).toHaveLength(1);
  });
});
