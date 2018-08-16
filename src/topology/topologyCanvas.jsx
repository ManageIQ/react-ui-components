import React, { Component } from 'react';
import PropTypes from 'prop-types'; // eslint-disable-line
import * as d3 from 'd3';
import _ from 'lodash';

import { nodes as n, edges as e } from './data'; // eslint-disable-line
import './styles.scss';

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
    window.magix = this;
    window.d3 = d3;

    this.minDepth = Math.min.apply(undefined, n.map(({ depth }) => depth));
    // load icon characters from stylesheet for IE browser
    if (this.IE11) {
      console.log('is IE');
      this.cssRules = this.findCssIconRules();
    }
    this.cacheIconChars(n);

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


    const forceX = d3.forceX(this.canvasWidth / 2).strength(0.015);
    const forceY = d3.forceY(this.canvasHeight / 2).strength(0.015);
    // force layout
    this.simulation = d3.forceSimulation()
      .force('link', d3.forceLink().id(node => node.id).distance(150).strength(0.9))
      .force('collision', d3.forceCollide(d => d.size * 1.5 || 30))
      .force('charge', () => 200)
      .force('x', forceX)
      .force('y', forceY);

    // find node on hover
    d3.select(this.canvas).on('mousemove', () => {
      this.hoveredNode = this.findNode(d3.event.x - this.coords.left, d3.event.y - this.coords.top);
    });

    d3.select(this.canvas).on('click', () => {
      const selectedNode = this.findNode(d3.event.x - this.coords.left, d3.event.y - this.coords.top);
      if (selectedNode) {
        if (this.selectedNode && this.selectedNode.id !== selectedNode.id) {
          this.selectedNode.selected = false;
        }
        selectedNode.selected = !selectedNode.selected;
        this.selectedNode = selectedNode;
        this.handleNodeClicked(selectedNode);
      }
    });

    this.simulation.nodes(n).on('tick', this.forceTick);
    this.simulation.force('link').links(e);
  }

  onDragStart = () => {
    if (!d3.event.active) {
      this.simulation.alphaTarget(0.3).restart();
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
    nodes.forEach(({ fonticon, fileicon }) => {
      if (fonticon && !this.icons[fonticon]) {
        this.icons[fonticon] = this.loadIcon(fonticon);
      } else if (fileicon && !this.icons[fileicon]) {
        this.icons[fileicon] = this.loadImage(fileicon);
      }
    });
    this.icons['fa fa-question'] = this.loadIcon('fa fa-question');
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
    if (edge.source.depth === 0) {
      coords.source = { x: 50, y: this.canvasHeight / 2 };
    }
    if (edge.target.depth === 0) {
      coords.target = { x: 50, y: this.canvasHeight / 2 };
    }
    this.ctx.beginPath();
    this.ctx.strokeStyle = '#dcdcdc';
    this.ctx.lineWidth = 2;
    this.ctx.moveTo(...this.transform.apply([coords.source.x, coords.source.y]));
    this.ctx.lineTo(...this.transform.apply([coords.target.x, coords.target.y]));
    this.ctx.stroke();
  }

  drawNode = (node) => {
    if (node.depth === this.minDepth) {
      node.x = 50; // eslint-disable-line no-param-reassign
      node.y = this.canvasHeight / 2; // eslint-disable-line no-param-reassign
    }
    const coords = {
      x: this.transform.apply([node.x, node.y])[0],
      y: this.transform.apply([node.x, node.y])[1],
    };
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
    if (node.selected) {
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
    nodes.forEach(this.drawNode);

    if (this.transform.k !== 1) this.drawMinimap();
  }

  handleNodeClicked = node => console.log('Node clicked: ', node);

  handleButtonZoom = value => d3.select(this.canvas).transition().duration(300).call(this.zoom.scaleTo, this.transform.k + value);

  findCssIconRules = () => {
    const styleSheet = _.find(document.styleSheets, sheet =>
      _.find(sheet.rules, rule => rule.selectorText && rule.selectorText.indexOf('fa-gear::before') !== -1));
    return styleSheet ? styleSheet.rules : undefined;
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
          <div style={{ float: 'left', position: 'absolute', bottom: 0 }}>
            <button>OK</button>
            <button>WARN</button>
            <button>ERROR</button>
          </div>
          <div style={{ float: 'right' }}>
            <button style={{ display: 'block' }} onClick={() => this.handleButtonZoom(0.25)}>+</button>
            <button style={{ display: 'block' }} onClick={() => this.handleButtonZoom(-0.25)}>-</button>
          </div>
        </div>
      </div>
    );
  }
}

TopologyCanvas.propTypes = {};

TopologyCanvas.defaultProps = {};

export default TopologyCanvas;
