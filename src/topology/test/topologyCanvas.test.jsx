import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import { TopologyCanvas } from '../';
import { nodes as n, edges as e } from '../data';

describe('Topology canvas component', () => {
  let initialProps;
  beforeEach(() => {
    initialProps = {
      nodes: n,
      edges: e,
      handleNodeClick: jest.fn(),
    };
  });
  it('should render correctly', () => {
    const wrapper = shallow(<TopologyCanvas {...initialProps} />);
    wrapper.instance().transform.k = 2;
    wrapper.instance().forceTick();
    wrapper.update();
    expect(toJson(wrapper)).toMatchSnapshot();
  });
  it('should zoom on button clicks.', () => {
    const wrapper = shallow(<TopologyCanvas {...initialProps} />);
    const spyZoom = jest.spyOn(wrapper.instance(), 'handleButtonZoom');

    const zoomIn = wrapper.find('button#canvas-zoom-in');
    zoomIn.simulate('click');
    expect(spyZoom).toHaveBeenCalledWith(0.25);
    jest.clearAllMocks();

    const zoomOut = wrapper.find('button#canvas-zoom-out');
    zoomOut.simulate('click');
    expect(spyZoom).toHaveBeenCalledWith(-0.25);
  });
  it('should assign highlighted nodes when filtering', () => {
    const wrapper = shallow(<TopologyCanvas
      {...initialProps}
    />);
    wrapper.setProps({
      nodes: [...initialProps.nodes, {
        id: 44,
        title: 'foo',
        size: 24,
        fonticon: 'fa fa-cloud',
        depth: 3,
        status: 'valid',
        highlight: true,
      }],
      isFiltering: true,
    });
    wrapper.instance().forceTick();
    expect(wrapper.instance().highlightedNodes).toHaveLength(1);
    wrapper.setProps({ isFiltering: false });
    wrapper.instance().forceTick();
    wrapper.update();
    expect(wrapper.instance().highlightedNodes).toHaveLength(0);
  });

  it('should highlight hovered node', () => {
    const wrapper = shallow(<TopologyCanvas {...initialProps} />);
    const spyDrawNodeGradient = jest.spyOn(wrapper.instance(), 'drawNodeGradient');
    wrapper.instance().hoveredNode = { ...initialProps.nodes[0] };
    wrapper.instance().forceTick();
    expect(spyDrawNodeGradient).toHaveBeenCalledWith(expect.objectContaining({ id: initialProps.nodes[0].id }), expect.any(Array), '#DDDDDD');
  });

  it('should highligh clicked node', () => {
    const wrapper = shallow(<TopologyCanvas {...initialProps} />);
    const spyDrawNodeGradient = jest.spyOn(wrapper.instance(), 'drawNodeGradient');
    wrapper.instance().selectedNode = { ...initialProps.nodes[0] };
    wrapper.instance().forceTick();
    expect(spyDrawNodeGradient).toHaveBeenCalledWith(expect.objectContaining({ id: initialProps.nodes[0].id }), expect.any(Array));
  });

  it('should call drawStateLegend method', () => {
    const wrapper = shallow(<TopologyCanvas {...initialProps} />);
    const spyDrawStateLegend = jest.spyOn(wrapper.instance(), 'drawStateLegend');
    wrapper.setProps({ healthState: true });
    wrapper.instance().forceTick();
    expect(spyDrawStateLegend).toHaveBeenCalled();
  });

  it('should find node from simulation', () => {
    const wrapper = shallow(<TopologyCanvas {...initialProps} />);
    wrapper.instance().forceTick();
    const expectedNode = wrapper.instance().simulation.nodes()[0];
    expect(wrapper.instance().findNode(expectedNode.x + 5, expectedNode.y - 8)).toEqual(expectedNode);
  });
});
