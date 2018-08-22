import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';
import _ from 'lodash';
import { Button, Icon } from 'patternfly-react';
import { __ } from '../global-functions';
import { duplicateArray, loadImage, findIconUnicode, createIconChar } from './utils';
import './styles.scss';

const VALID = 'valid';
const WARNING = 'warning';
const CRITICAL = 'critical';
const WHITE = '#FFFFFF';
const DEFAUT_NODE_SIZE = 30;
const EDGE_COLOR = '#DCDCDC';
const TOOLTIP_COLOR = '#72767B';
const FONT = 'normal normal normal 12px "Open Sans"';

class TopologyCanvas extends Component {
  componentDidMount() {
    this.IE11 = !!window.MSInputMethodContext && !!document.documentMode;
    const { canvas } = this;
    this.updateDimensions(canvas);
    this.ctx = canvas.getContext('2d');
    this.highlightedNodes = [];
    this.transform = d3.zoomIdentity;
    if (this.IE11) {
      this.cssRules = this.findCssIconRules();
    }
    this.setUpCanvas();
    this.simulation = d3.forceSimulation()
      .force('link', d3.forceLink().id(node => node.id).distance(130).strength(1)
        .iterations(5))
      .force('collision', d3.forceCollide(() => 60))
      .force('charge', d3.forceManyBody().strength(-100).distanceMin(500))
      .force('y', d3.forceY(this.canvasHeight / 2).strength(0.005))
      .force('x', d3.forceX(this.canvasWidth / 2).strength(0.035));

    // find node on hover
    d3.select(this.canvas).on('mousemove', () => {
      this.hoveredNode = this.findNode(d3.event.x - this.coords.left, d3.event.y - this.coords.top);
      this.simulation.on('tick')();
    });

    this.minDepth = Math.min.apply(undefined, this.props.nodes.map(({ depth }) => depth));
    this.staticNodesCount = this.props.nodes.filter(({ depth }) => depth === this.minDepth).length;
    // setup inital nodes positions
    const n = duplicateArray(this.props.nodes, this.computeLevelDistance);
    const e = duplicateArray(this.props.edges);
    this.cacheIconChars(n);

    // register resize event
    window.addEventListener('resize', () => {
      this.updateDimensions(canvas);
      this.setUpCanvas();
      this.simulation.on('tick')();
    });
    this.simulation.nodes(n).on('tick', this.forceTick);
    this.simulation.force('link').links(e);
  }

  componentDidUpdate(prevProps) {
    const { canvas } = this;
    this.staticNodesRendered = 0;
    this.updateDimensions(canvas);
    this.setUpCanvas();
    if (prevProps.resetSelected && !this.props.resetSelected) {
      this.selectedNode = undefined;
    }

    this.minDepth = Math.min.apply(undefined, this.props.nodes.map(({ depth }) => depth));
    this.staticNodesCount = this.props.nodes.filter(({ depth }) => depth === this.minDepth).length;
    const newNodes = this.props.nodes.filter(({ id }) => !prevProps.nodes.find(node => id === node.id))
      .map(node => ({ ...node, ...this.computeLevelDistance(node) }));
    this.simulation.nodes([...this.simulation.nodes().map(node => ({
      ...node,
      highlight: this.props.nodes.find(({ id }) => id === node.id).highlight,
    })), ...newNodes]);
    this.simulation.force('link').links(duplicateArray(this.props.edges));
    if (!prevProps.isFiltering) this.overlayDelay = 0;
    this.highlightedNodes = this.props.isFiltering ? [
      ...this.simulation.nodes().filter(({ highlight }) => !!highlight),
      ...newNodes.filter(({ highlight }) => !!highlight),
    ] : [];
    this.simulation.alphaTarget(0.2);
    this.simulation.restart();
    // smooth animation after data update
    let x = 0;
    const intervalID = setInterval(() => {
      this.simulation.on('tick')();
      x += 1;
      if (x === 100) {
        window.clearInterval(intervalID);
      }
    }, 5);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions);
  }

  onDragStart = () => {
    if (!d3.event.active) {
      this.simulation.alphaTarget(0.1).restart();
    }
    d3.event.subject.fx = d3.event.subject.x;
    d3.event.subject.fy = d3.event.subject.y;
    d3.event.subject.dragStart = true;
  }
   onDrag = () => {
     d3.event.subject.fx += d3.event.dx / this.transform.k;
     d3.event.subject.fy += d3.event.dy / this.transform.k;
     d3.event.subject.dragStart = false;
   }
   onDragEnd = () => {
     if (!d3.event.active) {
       this.simulation.alphaTarget(0);
     }
     if (d3.event.subject.dragStart) {
       d3.event.subject.fx = null;
       d3.event.subject.fy = null;
     }
     delete d3.event.subject.dragStart;
   }

  onZoom = () => {
    if (d3.event !== null) {
      this.simulation.alphaTarget(0).restart();
      this.transform = d3.event.transform;
    }
    this.simulation.on('tick')();
  }

  getStateIcon = status => ({
    [VALID]: this.icons['fa fa-check'],
    [CRITICAL]: this.icons['fa fa-times'],
    [WARNING]: this.icons['fa fa-exclamation'],
  })[status]

  getStateIconColor = status => ({
    [VALID]: '#3F9C35',
    [CRITICAL]: '#CC0000',
    [WARNING]: '#EC7A08',
  })[status];

  setUpNodeClick = () => {
    const selectedNode = this.findNode(d3.event.x - this.coords.left, d3.event.y - this.coords.top);
    if (selectedNode) {
      if (this.selectedNode) {
        this.selectedNode.selected = false;
      }
      selectedNode.selected = true;
      this.selectedNode = selectedNode;
      this.props.handleNodeClick(selectedNode);
    }
  }

  setUpCanvas = () => {
    const { canvas } = this;
    // pan and zoom handler
    this.zoom = d3.zoom()
      .translateExtent([[0, 0], [this.canvasWidth, this.canvasHeight]])
      .scaleExtent([1, 8])
      .on('zoom', this.onZoom);
    // click event handler
    d3.select(this.canvas).on('click', this.setUpNodeClick);
    // drag handler
    d3.select(canvas).call(d3.drag().container(canvas)
      .subject(() => this.findNode(d3.event.x, d3.event.y))
      .on('start', this.onDragStart)
      .on('drag', this.onDrag)
      .on('end', this.onDragEnd));
    // assign zoom handler to canvas
    d3.select(canvas).call(this.zoom);
  }

  loadIcon = (fontIcon) => {
    if (this.IE11) {
      const code = findIconUnicode(fontIcon, this.cssRules).toUpperCase().replace('\\', '0x');
      return String.fromCharCode(code.replace(/'|"/g, ''));
    }
    return createIconChar(fontIcon);
  }

  cacheIconChars = (nodes) => {
    this.icons = {};
    this.icons['fa fa-question'] = this.loadIcon('fa fa-question');
    this.icons['fa fa-exclamation'] = this.loadIcon('fa fa-exclamation');
    this.icons['fa fa-times'] = this.loadIcon('fa fa-times');
    this.icons['fa fa-check'] = this.loadIcon('fa fa-check');
    nodes.forEach(({ fonticon, fileicon }) => {
      if (fonticon && !this.icons[fonticon]) {
        this.icons[fonticon] = this.loadIcon(fonticon);
      } else if (fileicon && !this.icons[fileicon]) {
        this.icons[fileicon] = loadImage(fileicon);
      }
    });
  }

  findNode = (x, y) => this.simulation.find(...this.transform.invert([x, y]), DEFAUT_NODE_SIZE);

  normalizeNode = (node) => {
    node.size = node.size || DEFAUT_NODE_SIZE; // eslint-disable-line no-param-reassign
    node.x = Math.max(node.size + 5, Math.min(this.canvasWidth - node.size - 5, node.x)); // eslint-disable-line no-param-reassign
    node.y = Math.max(node.size + 5, Math.min(this.canvasHeight - node.size - DEFAUT_NODE_SIZE / 2, node.y)); // eslint-disable-line no-param-reassign
  }

  drawEdge = ({ source, target }) => {
    this.ctx.beginPath();
    this.ctx.lineWidth = 2;
    this.ctx.moveTo(...this.transform.apply([source.x, source.y]));
    this.ctx.lineTo(...this.transform.apply([target.x, target.y]));
    this.drawOnCanvas({ strokeStyle: EDGE_COLOR });
  }

  drawTooltip = ({ x, y }, { title, highlight }) => {
    this.ctx.beginPath();
    this.ctx.fillStyle = highlight ? WHITE : TOOLTIP_COLOR;
    this.ctx.textAlign = 'center';
    this.ctx.textBaseline = 'middle';
    this.ctx.font = FONT;
    this.ctx.fillText(title, x, y + 35);
  }

  drawHealthState = ({
    x,
    y,
    size,
    status,
  }) => {
    this.ctx.textAlign = 'center';
    this.ctx.textBaseline = 'middle';
    this.ctx.font = 'normal normal normal 8px FontAwesome';
    this.ctx.beginPath();
    this.ctx.arc(...[x + size / 1.5, y + size / 1.5], 7, 0, 2 * Math.PI);
    this.ctx.lineWidth = 3;
    this.drawOnCanvas({ strokeStyle: this.getStateIconColor(status), fillStyle: WHITE });

    this.ctx.fillStyle = this.getStateIconColor(status);
    this.ctx.fillText(this.getStateIcon(status), x + size / 1.5, y + size / 1.5);
    this.ctx.restore();
  }

  drawStateLegend = () => {
    const y = this.canvasHeight - 10;
    let x = 10;
    this.ctx.fillStyle = this.props.isFiltering ? WHITE : TOOLTIP_COLOR;
    this.ctx.font = FONT;
    let text = `${__('Health State')}: `;
    x += this.ctx.measureText(text).width;
    this.ctx.fillText(text, x, y);
    x += this.ctx.measureText(text).width / 2 + 23;

    this.drawHealthState({
      x, y, size: 0, status: VALID,
    });
    this.ctx.font = FONT;
    this.ctx.fillStyle = this.props.isFiltering ? WHITE : TOOLTIP_COLOR;
    text = __('Valid');
    x += this.ctx.measureText(text).width;
    this.ctx.fillText(text, x, y);

    x += this.ctx.measureText(text).width + 15;
    this.drawHealthState({
      x, y, size: 0, status: WARNING,
    });
    x -= 10;

    this.ctx.fillStyle = this.props.isFiltering ? WHITE : TOOLTIP_COLOR;
    this.ctx.font = FONT;
    text = __('Warning');
    x += this.ctx.measureText(text).width;
    this.ctx.fillText(text, x, y);

    x += this.ctx.measureText(text).width;
    this.drawHealthState({
      x, y, size: 0, status: CRITICAL,
    });
    x -= 15;

    this.ctx.fillStyle = this.props.isFiltering ? WHITE : TOOLTIP_COLOR;
    this.ctx.font = FONT;
    x += this.ctx.measureText(text).width;
    text = __('Critical');
    this.ctx.fillText(text, x, y);
  }

  isOdd = value => value % 2 === 1;

  computeLevelDistance = (node) => {
    if (!node.x) {
      node.x = node.depth === this.minDepth ? 50 : node.depth * 200; // eslint-disable-line no-param-reassign
    }
    if (!node.y) {
      node.y = this.canvasHeight * 0.2; // eslint-disable-line no-param-reassign
    }
    let coords = this.transform.apply([node.x + node.depth * 10 * this.simulation.alpha(), node.y]);
    if (node.depth === this.minDepth) {
      const step = 120;
      const topCoord = this.isOdd(this.staticNodesCount) ?
        ((this.staticNodesCount / 2) - this.staticNodesRendered) * step
        : (((this.staticNodesCount / 2) + 0.5) - this.staticNodesRendered) * step;
      this.staticNodesRendered += 1;
      coords = [
        60 + node.depth * 1 * this.simulation.alpha(),
        this.canvasHeight / 2 + topCoord - step,
      ];
      node.fx = coords[0]; // eslint-disable-line
      node.fy = coords[1]; // eslint-disable-line
      return {
        fx: node.fx,
        fy: node.fy,
      };
    }
    return {
      x: coords[0],
      y: coords[1],
    };
  }

  drawNodeGradient = ({ size }, coords, outerColor = '#BBBBBB') => {
    const gradient = this.ctx.createRadialGradient(
      coords[0],
      coords[1],
      5,
      coords[0],
      coords[1],
      size,
    );
    gradient.addColorStop(0, WHITE);
    gradient.addColorStop(1, outerColor);
    this.ctx.strokeStyle = outerColor;
    this.ctx.fillStyle = gradient;
  }

  drawNode = (node) => {
    this.computeLevelDistance(node);
    const coords = this.transform.apply([node.x, node.y]);
    this.ctx.restore();
    this.ctx.beginPath();
    // Create shadow
    this.ctx.shadowColor = 'rgba(0,0,0,0.3)';
    this.ctx.shadowBlur = 5;
    this.ctx.shadowOffsetX = 1;
    this.ctx.shadowOffsetY = 2;
    this.ctx.arc(...coords, node.size, 0, 2 * Math.PI);
    this.drawOnCanvas();
    this.ctx.shadowBlur = 0;
    this.ctx.shadowOffsetX = 0;
    this.ctx.shadowOffsetY = 0;

    // Create the circle
    this.ctx.beginPath();
    this.ctx.arc(...coords, node.size, 0, 2 * Math.PI);
    // render gradient for selected node
    if (this.selectedNode && node.id === this.selectedNode.id) {
      this.drawNodeGradient(node, coords);
    } else if (this.hoveredNode && node.id === this.hoveredNode.id) {
      this.drawNodeGradient(node, coords, '#DDDDDD');
    } else {
      this.ctx.fillStyle = WHITE;
      this.ctx.strokeStyle = WHITE;
    }
    this.drawOnCanvas();

    // draw node graphic
    if (node.fileicon) {
      this.drawImage(node, { x: coords[0], y: coords[1] });
    } else {
      this.drawIcon(node, { x: coords[0], y: coords[1] });
    }
    // draw node health state
    if (this.props.healthState && node.status) this.drawHealthState({ ...node, x: coords[0], y: coords[1] });
    this.drawTooltip({ x: coords[0], y: coords[1] }, node);
  }

  drawImage = ({ fileicon, size }, { x, y }) => {
    const imgRadius = size * 0.7;
    this.ctx.drawImage(this.icons[fileicon], x - imgRadius, y - imgRadius, 2 * imgRadius, 2 * imgRadius);
  }

  drawIcon = ({ fonticon = 'fa fa-question', size, iconColor }, { x, y }) => {
    const iconChar = this.icons[fonticon];
    this.ctx.beginPath();
    this.ctx.fillStyle = iconColor || TOOLTIP_COLOR;
    this.ctx.textAlign = 'center';
    this.ctx.textBaseline = 'middle';
    this.ctx.font = `normal normal normal ${size}px FontAwesome`;
    this.ctx.fillText(iconChar, x, y);
  }

  drawOnCanvas = ({ strokeStyle = this.ctx.strokeStyle, fillStyle = this.ctx.fillStyle } = {}) => {
    this.ctx.save();
    this.ctx.fillStyle = fillStyle;
    this.ctx.strokeStyle = strokeStyle;
    this.ctx.stroke();
    this.ctx.fill();
    this.ctx.restore();
  }

  drawMinimap = () => {
    this.ctx.beginPath();
    const mapX = 0.9 * this.canvasWidth - 10;
    const mapY = 10;
    const mapW = 0.1 * this.canvasWidth;
    const mapH = 0.1 * this.canvasHeight;
    this.ctx.rect(mapX, mapY, mapW, mapH);
    this.drawOnCanvas({ strokeStyle: 'rgba(0, 0, 0, 0.3)', fillStyle: 'rgba(252, 252, 252, 0.3)' });
    this.ctx.beginPath();
    this.ctx.fillStyle = 'rgba(224, 224, 224, 0.3)';
    this.ctx.rect(
      mapX - this.transform.x / this.transform.k * 0.1,
      mapY - this.transform.y / this.transform.k * 0.1,
      mapW / this.transform.k,
      mapH / this.transform.k,
    );
    this.drawOnCanvas({ fillStyle: 'rgba(224, 224, 224, 0.3)' });
  }

  forceTick = () => {
    // clear the canvas
    this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
    // reset static nodes counter
    this.staticNodesRendered = 0;
    const nodes = this.simulation.nodes();
    const links = this.simulation.force('link').links();
    nodes.forEach(this.normalizeNode);
    // render health state
    if (this.props.healthState) this.drawStateLegend();
    // render edges
    links.forEach(this.drawEdge);
    // render non highlighted nodes
    nodes.forEach((node) => {
      if (this.props.isFiltering && node.highlight) {
        return;
      }
      this.drawNode(node);
    });
    // render canvas overlay if filtering nodes
    if (this.props.isFiltering) {
      if (this.overlayDelay < 0.5) this.overlayDelay += 0.025;
      this.ctx.fillStyle = `rgba(0, 0, 0, ${this.overlayDelay})`;
      this.ctx.fillRect(0, 0, this.canvasWidth, this.canvasHeight);
      this.highlightedNodes.forEach(this.drawNode);
    } else if (!this.props.isFiltering && this.overlayDelay > 0) {
      this.overlayDelay -= 0.025;
      this.ctx.fillStyle = `rgba(0, 0, 0, ${this.overlayDelay})`;
      this.ctx.fillRect(0, 0, this.canvasWidth, this.canvasHeight);
      this.highlightedNodes.forEach(this.drawNode);
    }
    // render minimap if zoomed
    if (this.transform.k !== 1) this.drawMinimap();
  }

  handleButtonZoom = value => d3.select(this.canvas).transition().duration(300).call(this.zoom.scaleTo, this.transform.k + value);

  // find the css rule containing with icon content. Only for IE11
  findCssIconRules = () => {
    const styleSheet = _.find(document.styleSheets, sheet =>
      _.find(sheet.rules, rule => rule.selectorText && rule.selectorText.indexOf('fa-gear::before') !== -1));
    return styleSheet ? styleSheet.rules : undefined;
  }
  /**
   * @description Updates canvas size based on parent element size
   */
  updateDimensions = (canvas) => {
    this.coords = canvas.getBoundingClientRect();
    this.canvasWidth = canvas.clientWidth;
    this.canvasHeight = canvas.clientHeight;
    canvas.width = this.canvasWidth; // eslint-disable-line no-param-reassign
    canvas.height = this.canvasHeight; // eslint-disable-line no-param-reassign
  }

  render() {
    return (
      <div className="topology-container">
        <canvas
          className="topology-graph"
          ref={(canvas) => { this.canvas = canvas; }}
        />
        <div className="topology-zoom-container">
          <div>
            <Button onClick={() => this.handleButtonZoom(0.25)}><Icon type="fa" name="plus" /></Button>
            <Button onClick={() => this.handleButtonZoom(-0.25)}><Icon type="fa" name="minus" /></Button>
          </div>
        </div>
      </div>
    );
  }
}

TopologyCanvas.propTypes = {
  nodes: PropTypes.arrayOf(PropTypes.object).isRequired,
  edges: PropTypes.arrayOf(PropTypes.object).isRequired,
  isFiltering: PropTypes.bool,
  handleNodeClick: PropTypes.func,
  healthState: PropTypes.bool,
  resetSelected: PropTypes.bool,
};

TopologyCanvas.defaultProps = {
  isFiltering: false,
  handleNodeClick: () => ({}),
  healthState: false,
  resetSelected: false,
};

export default TopologyCanvas;
