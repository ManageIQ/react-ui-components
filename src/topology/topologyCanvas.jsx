import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';
import _ from 'lodash';
import { Button, Icon } from 'patternfly-react';
import { __ } from '../global-functions';
import './styles.scss';

const VALID = 'valid';
const WARNING = 'warning';
const CRITICAL = 'critical';

class TopologyCanvas extends Component {
  componentDidMount() {
    this.IE11 = !!window.MSInputMethodContext && !!document.documentMode;
    const { canvas } = this;
    this.coords = canvas.getBoundingClientRect();
    this.canvasWidth = canvas.clientWidth;
    this.canvasHeight = canvas.clientHeight;
    this.transform = d3.zoomIdentity;
    canvas.width = this.canvasWidth;
    canvas.height = this.canvasHeight;
    this.ctx = canvas.getContext('2d');
    this.highlightedNodes = [];
    window.magix = this;
    window.d3 = d3;
    // load icon characters from stylesheet for IE browser
    if (this.IE11) {
      console.log('is IE');
      this.cssRules = this.findCssIconRules();
    }

    // click
    d3.select(this.canvas).on('click', () => {
      const selectedNode = this.findNode(d3.event.x - this.coords.left, d3.event.y - this.coords.top);
      if (selectedNode) {
        if (this.selectedNode) {
          this.selectedNode.selected = false;
        }
        selectedNode.selected = true;
        this.selectedNode = selectedNode;
        this.props.handleNodeClick(selectedNode);
      }
    });

    // drag
    d3.select(canvas).call(d3.drag().container(canvas)
      .subject(() => this.findNode(d3.event.x, d3.event.y))
      .on('start', this.onDragStart)
      .on('drag', this.onDrag)
      .on('end', this.onDragEnd));

    // pan and zoom
    this.zoom = d3.zoom()
      .translateExtent([[0, 0], [this.canvasWidth, this.canvasHeight]])
      .scaleExtent([1, 8])
      .on('zoom', () => this.onZoom({ manual: false }));

    d3.select(canvas).call(this.zoom);


    const forceX = d3.forceX(this.canvasWidth / 2).strength(0.0125);
    const forceY = d3.forceY(this.canvasHeight / 2).strength(0.0125);
    // force layout
    this.simulation = d3.forceSimulation()
      .force('link', d3.forceLink().id(node => node.id).distance(120).strength(1)
        .iterations(10))
      .force('collision', d3.forceCollide(d => d.size * 2 || 30))
      .force('charge', () => -5000)
      .force('y', forceY)
      .force('x', forceX);

    // find node on hover
    d3.select(this.canvas).on('mousemove', () => {
      this.hoveredNode = this.findNode(d3.event.x - this.coords.left, d3.event.y - this.coords.top);
    });

    const n = this.props.nodes.map(node => ({
      ...node,
      ...this.computeLevelDistance(node),
    }));
    const e = this.props.edges.map(edge => ({
      ...edge,
      source: n.find(({ id }) => edge.source === id),
      targer: n.find(({ id }) => edge.target === id),
    }));
    this.cacheIconChars(n);
    this.minDepth = Math.min.apply(undefined, n.map(({ depth }) => depth));
    this.staticNodesCount = n.filter(({ depth }) => depth === this.minDepth).length;

    // register resize event
    window.addEventListener('resize', this.updateDimensions);

    this.simulation.nodes(n).on('tick', this.forceTick);
    this.simulation.force('link').links(e);
  }

  componentDidUpdate(prevProps) {
    // resize canvas
    const { canvas } = this;
    this.coords = canvas.getBoundingClientRect();
    this.canvasWidth = canvas.clientWidth;
    this.canvasHeight = canvas.clientHeight;
    this.transform = d3.zoomIdentity;
    canvas.width = this.canvasWidth;
    canvas.height = this.canvasHeight;
    if (prevProps.resetSelected && !this.props.resetSelected) {
      this.selectedNode = undefined;
    }

    this.minDepth = Math.min.apply(undefined, this.props.nodes.map(({ depth }) => depth));
    this.staticNodesCount = this.props.nodes.filter(({ depth }) => depth === this.minDepth).length;
    const newNodes = this.props.nodes.filter(({ id }) => !prevProps.nodes.find(node => id === node.id)).map(node => ({
      ...node,
      ...this.computeLevelDistance(node),
    }));
    const oldNodes = this.simulation.nodes().map(node => ({
      ...node,
      highlight: this.props.nodes.find(({ id }) => id === node.id).highlight,
    }));
    this.simulation.nodes([...oldNodes, ...newNodes]);
    this.minDepth = Math.min.apply(undefined, this.props.nodes.map(({ depth }) => depth));
    this.simulation.force('link').links(this.props.edges.map(edge => ({
      ...edge,
    })));
    if (!prevProps.isFiltering) this.overlayDelay = 0;
    if (this.props.isFiltering) {
      this.highlightedNodes = [
        ...this.simulation.nodes().filter(({ highlight }) => !!highlight),
        ...newNodes.filter(({ highlight }) => !!highlight),
      ];
    } else {
      this.highlightedNodes = [];
    }
    this.simulation.alphaTarget(0.3);
    this.simulation.restart();
    let x = 0;
    // smooth animation after data update
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

  loadIcon = (fontIcon) => {
    const tmp = document.createElement('i');
    document.body.appendChild(tmp);
    tmp.className = `hidden ${fontIcon}`;
    let char = window.getComputedStyle(tmp, ':before').content;
    document.body.removeChild(tmp);
    if (this.IE11) {
      const code = this.findIconUnicode(fontIcon).toUpperCase().replace('\\', '0x');
      console.log('IE loading icon character', code);
      char = String.fromCharCode(code.replace(/'|"/g, ''));
      return char;
    }
    return char.replace(/'|"/g, '');
  }

  loadImage = (imagePath) => {
    const image = new Image(60, 60);
    image.src = imagePath;
    return image;
  }

  findIconUnicode = (fontIcon) => {
    let rule;
    console.log('fonticon: ', fontIcon);
    const className = fontIcon.substring(fontIcon.indexOf(' ') + 1);
    if (this.cssRules) {
      rule = _.find(this.cssRules, r => r.selectorText && r.selectorText.indexOf(`${className}::before`) !== -1);
    }
    console.log('raw icon', rule.style.content);
    return rule ? rule.style.content : undefined;
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
        this.icons[fileicon] = this.loadImage(fileicon);
      }
    });
  }

  findNode = (x, y) => {
    const point = this.transform.invert([x, y]);
    const node = this.simulation.find(...point, 30);
    return node ? this.simulation.find(...point, node.size) : undefined;
  }

  normalizeNode = (node) => {
    node.size = node.size || 17; // eslint-disable-line no-param-reassign
    node.x = Math.max(node.size + 1, Math.min(this.canvasWidth - node.size - 1, node.x)); // eslint-disable-line no-param-reassign
    node.y = Math.max(node.size + 1, Math.min(this.canvasHeight - node.size - 1, node.y)); // eslint-disable-line no-param-reassign
  }

  drawEdge = (edge) => {
    const coords = {
      source: {
        x: edge.source.x,
        y: edge.source.y,
      },
      target: {
        x: edge.target.x,
        y: edge.target.y,
      },
    };
    if (edge.source.depth === this.minDepth) {
      coords.source = { x: 50, y: this.topY + this.staticEdgeRenderCount * (5 * edge.source.size) };
      if (JSON.stringify(this.lastStaticEdge) !== JSON.stringify(edge) &&
        this.staticEdgeRenderCount < this.staticNodesCount) this.staticEdgeRenderCount += 1;
      this.lastStaticEdge = edge;
    }
    if (edge.target.depth === this.minDepth) {
      coords.target = { x: 50, y: this.topY + this.staticEdgeRenderCount * (5 * edge.target.size) };
      if (
        JSON.stringify(this.lastStaticEdge) !== JSON.stringify(edge) &&
        this.staticEdgeRenderCount < this.staticNodesCount) this.staticEdgeRenderCount += 1;
      this.lastStaticEdge = edge;
    }
    this.ctx.beginPath();
    this.ctx.strokeStyle = '#dcdcdc';
    this.ctx.lineWidth = 2;
    this.ctx.moveTo(...this.transform.apply([coords.source.x, coords.source.y]));
    this.ctx.lineTo(...this.transform.apply([coords.target.x, coords.target.y]));
    this.ctx.stroke();
  }

  drawTooltip = ({ x, y }, { title, highlight }) => {
    this.ctx.beginPath();
    this.ctx.fillStyle = highlight ? '#FFFFFF' : '#72767B';
    this.ctx.textAlign = 'center';
    this.ctx.textBaseline = 'middle';
    this.ctx.font = 'normal normal normal 12px "Open Sans"';
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
    this.ctx.fillStyle = '#FFFFFF';
    this.ctx.strokeStyle = this.getStateIconColor(status);
    this.ctx.lineWidth = 1;
    this.ctx.fill();
    this.ctx.stroke();
    this.ctx.fillStyle = this.getStateIconColor(status);
    this.ctx.fillText(this.getStateIcon(status), x + size / 1.5, y + size / 1.5);
    this.ctx.strokeStyle = '#FFFFFF';
  }

  drawStateLegend = () => {
    const y = this.canvasHeight - 10;
    let x = 10;
    this.ctx.fillStyle = this.props.isFiltering ? '#FFFFFF' : '#72767B';
    this.ctx.font = 'normal normal normal 12px "Open Sans"';
    let text = `${__('Health State')}: `;
    x += this.ctx.measureText(text).width;
    this.ctx.fillText(text, x, y);
    x += this.ctx.measureText(text).width / 2 + 23;

    this.drawHealthState({
      x, y, size: 0, status: VALID,
    });
    this.ctx.font = 'normal normal normal 12px "Open Sans"';
    this.ctx.fillStyle = this.props.isFiltering ? '#FFFFFF' : '#72767B';
    text = __('Valid');
    x += this.ctx.measureText(text).width;
    this.ctx.fillText(text, x, y);

    x += this.ctx.measureText(text).width + 15;
    this.drawHealthState({
      x, y, size: 0, status: WARNING,
    });
    x -= 10;

    this.ctx.fillStyle = this.props.isFiltering ? '#FFFFFF' : '#72767B';
    this.ctx.font = 'normal normal normal 12px "Open Sans"';
    text = __('Warning');
    x += this.ctx.measureText(text).width;
    this.ctx.fillText(text, x, y);

    x += this.ctx.measureText(text).width;
    this.drawHealthState({
      x, y, size: 0, status: CRITICAL,
    });
    x -= 15;

    this.ctx.fillStyle = this.props.isFiltering ? '#FFFFFF' : '#72767B';
    this.ctx.font = 'normal normal normal 12px "Open Sans"';
    x += this.ctx.measureText(text).width;
    text = __('Critical');
    this.ctx.fillText(text, x, y);
  }

  computeLevelDistance = (node) => {
    if (!node.x) {
      node.x = node.depth * 120; // eslint-disable-line no-param-reassign
    }
    if (!node.y) {
      node.y = this.canvasHeight / 1.25; // eslint-disable-line no-param-reassign
    }
    const coords = this.transform.apply([node.x + node.depth * 10 * this.simulation.alpha(), node.y]);
    const x = coords[0];
    const y = coords[1];
    return {
      x,
      y,
    };
  }

  drawNode = (node) => {
    if (node.depth === this.minDepth) {
      node.x = 50; // eslint-disable-line no-param-reassign
      node.y = this.topY + this.staticNodeRenderCount * (5 * node.size); // eslint-disable-line no-param-reassign
      if (this.staticNodeRenderCount < this.staticNodesCount) this.staticNodeRenderCount += 1;
    }
    const coords = this.computeLevelDistance(node);
    // box-shadow: 0 2px 4px 0 rgba(0,0,0,0.5);
    this.ctx.beginPath();
    // Create shadow

    this.ctx.shadowColor = 'rgba(0,0,0,0.3)';
    this.ctx.shadowBlur = 5;
    this.ctx.shadowOffsetX = 1;
    this.ctx.shadowOffsetY = 2;
    this.ctx.arc(...[coords.x, coords.y], node.size, 0, 2 * Math.PI);
    this.ctx.stroke();
    this.ctx.fill();
    this.ctx.shadowBlur = 0;
    this.ctx.shadowOffsetX = 0;
    this.ctx.shadowOffsetY = 0;

    // Create the circle
    this.ctx.beginPath();
    this.ctx.arc(...[coords.x, coords.y], node.size, 0, 2 * Math.PI);
    // render gradient for selected node
    if (this.selectedNode && node.id === this.selectedNode.id) {
      const gradient = this.ctx.createRadialGradient(
        coords.x,
        coords.y,
        5,
        coords.x,
        coords.y,
        node.size,
      );
      gradient.addColorStop(0, '#FFFFFF');
      gradient.addColorStop(1, '#BBBBBB');
      this.ctx.strokeStyle = '#BBBBBB';
      this.ctx.fillStyle = gradient;
    } else {
      this.ctx.fillStyle = '#FFFFFF';
      this.ctx.strokeStyle = '#FFFFFF';
    }
    this.ctx.stroke();
    this.ctx.fill();

    // remove shadow
    if (node.fileicon) {
      this.drawImage(node, coords);
    } else {
      this.drawIcon(node, coords);
    }
    // draw node health state
    if (this.props.healthState && node.status) this.drawHealthState({ ...node, ...coords });
    this.drawTooltip(coords, node);
  }

  drawImage = ({ fileicon, size }, { x, y }) => {
    const imgRadius = size * 0.7;
    this.ctx.drawImage(this.icons[fileicon], x - imgRadius, y - imgRadius, 2 * imgRadius, 2 * imgRadius);
  }

  drawIcon = ({ fonticon = 'fa fa-question', size, iconColor }, { x, y }) => {
    const iconChar = this.icons[fonticon];
    this.ctx.beginPath();
    this.ctx.fillStyle = iconColor || '#72767B';
    this.ctx.textAlign = 'center';
    this.ctx.textBaseline = 'middle';
    this.ctx.font = `normal normal normal ${size}px FontAwesome`;
    this.ctx.fillText(iconChar, x, y);
  }

  drawMinimap = () => {
    this.ctx.beginPath();
    this.ctx.strokeStyle = 'rgba(0, 0, 0, 0.3)';
    this.ctx.fillStyle = 'rgba(252, 252, 252, 0.3)';
    const mapX = 0.9 * this.canvasWidth - 10;
    const mapY = 10;
    const mapW = 0.1 * this.canvasWidth;
    const mapH = 0.1 * this.canvasHeight;
    this.ctx.rect(mapX, mapY, mapW, mapH);
    this.ctx.stroke();
    this.ctx.fill();
    this.ctx.beginPath();
    this.ctx.fillStyle = 'rgba(224, 224, 224, 0.3)';
    this.ctx.rect(
      mapX - this.transform.x / this.transform.k * 0.1,
      mapY - this.transform.y / this.transform.k * 0.1,
      mapW / this.transform.k,
      mapH / this.transform.k,
    );
    this.ctx.stroke();
    this.ctx.fill();
  }

  forceTick = () => {
    const nodes = this.simulation.nodes();
    const links = this.simulation.force('link').links();
    this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
    nodes.forEach(this.normalizeNode);
    links.forEach(this.drawEdge);

    this.staticNodeRenderCount = 1;
    this.staticEdgeRenderCount = 1;
    this.topStatic = this.staticNodesCount * 100;
    this.topY = (this.canvasHeight / 2) - this.topStatic;
    nodes.forEach((node) => {
      if (this.props.isFiltering && node.highlight) {
        return;
      }
      this.drawNode(node);
    });
    if (this.props.isFiltering) {
      if (this.overlayDelay < 0.5) this.overlayDelay += 0.025;
      this.ctx.fillStyle = `rgba(0, 0, 0, ${this.overlayDelay})`;
      this.ctx.fillRect(0, 0, this.canvasWidth, this.canvasHeight);
      this.highlightedNodes.forEach(this.drawNode);
    } else {
      if (this.overlayDelay > 0) {  // eslint-disable-line
        this.overlayDelay -= 0.025;
        this.ctx.fillStyle = `rgba(0, 0, 0, ${this.overlayDelay})`;
        this.ctx.fillRect(0, 0, this.canvasWidth, this.canvasHeight);
        this.highlightedNodes.forEach(this.drawNode);
      }
    }

    if (this.props.healthState) this.drawStateLegend();
    if (this.transform.k !== 1) this.drawMinimap();
  }

  handleButtonZoom = value => d3.select(this.canvas).transition().duration(300).call(this.zoom.scaleTo, this.transform.k + value);

  findCssIconRules = () => {
    const styleSheet = _.find(document.styleSheets, sheet =>
      _.find(sheet.rules, rule => rule.selectorText && rule.selectorText.indexOf('fa-gear::before') !== -1));
    return styleSheet ? styleSheet.rules : undefined;
  }

  updateDimensions = () => {
    const { canvas } = this;
    this.coords = canvas.getBoundingClientRect();
    this.canvasWidth = canvas.clientWidth;
    this.canvasHeight = canvas.clientHeight;
    this.transform = d3.zoomIdentity;
    canvas.width = this.canvasWidth;
    canvas.height = this.canvasHeight;
    this.simulation.on('tick')();
  }

  render() {
    return (
      <div style={{ position: 'relative', height: '100%' }}>
        <canvas
          className="topology-graph"
          ref={(canvas) => { this.canvas = canvas; }}
          style={{
            fontFamily: 'FontAwesome',
            cursor: 'auto',
          }}
        />
        <div style={{ position: 'absolute', bottom: 0, width: '100%' }}>
          <div style={{ float: 'right' }}>
            <Button style={{ display: 'block' }} onClick={() => this.handleButtonZoom(0.25)}><Icon type="fa" name="plus" /></Button>
            <Button style={{ display: 'block' }} onClick={() => this.handleButtonZoom(-0.25)}><Icon type="fa" name="minus" /></Button>
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
