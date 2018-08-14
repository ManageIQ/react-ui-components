import React, { Component } from 'react';
import PropTypes from 'prop-types'; // eslint-disable-line
import * as d3 from 'd3';

import { nodes as n, edges } from './data'; // eslint-disable-line
import './styles.scss';

class TopologyCanvas extends Component {
  componentDidMount() {
    const { canvas } = this;
    this.coords = canvas.getBoundingClientRect();
    this.canvasWidth = canvas.clientWidth;
    this.canvasHeight = canvas.clientHeight;
    this.transform = d3.zoomIdentity;
    canvas.width = this.canvasWidth;
    canvas.height = this.canvasHeight;
    this.ctx = canvas.getContext('2d');
    console.log('Topology: ', this);
    window.d3 = d3;
    window.ctx = this.ctx;

    this.simulation = d3.forceSimulation()
      .force('link', d3.forceLink().id(d => d.id))
      .force('collision', d3.forceCollide(d => d.size || 17))
      .force('charge', d3.forceManyBody().strength(() => -200))
      .force('center', d3.forceCenter(this.canvasW / 2, this.canvasH / 2));

    this.simulation.nodes(n).on('tick', () => this.forceTick());
    this.simulation.force('link').links(edges);
  }

  normalizeNode = (node) => {
    node.size = node.size || 17; // eslint-disable-line no-param-reassign
    node.x = Math.max(node.size + 1, Math.min(this.canvasW - node.size - 1, node.x)); // eslint-disable-line no-param-reassign
    node.y = Math.max(node.size + 1, Math.min(this.canvasH - node.size - 1, node.y)); // eslint-disable-line no-param-reassign
  }

  drawEdge = (edge) => {
    this.ctx.strokeStyle = 'rgba(150, 150, 150, 0.6)';
    this.ctx.lineWidth = 1;
    this.ctx.moveTo(...this.transform.apply([edge.source.x, edge.source.y]));
    this.ctx.lineTo(...this.transform.apply([edge.target.x, edge.target.y]));
    this.ctx.beginPath();
    this.ctx.moveTo(edge.source.x, edge.source.y);
    this.ctx.lineTo(edge.target.x, edge.target.y);
    /**
     * this.ctx.beginPath();
    this.ctx.moveTo(...this.transform.apply([edge.source.x, edge.source.y]));
    this.ctx.lineTo(...this.transform.apply([edge.target.x, edge.target.y]));
    this.ctx.strokeStyle = 'rgba(150, 150, 150, 0.6)';
    this.ctx.stroke();
    */
  }

  drawNode = (node) => {
    this.ctx.beginPath();
    // Create the circle
    this.ctx.arc(...this.transform.apply([node.x, node.y]), node.size, 0, 2 * Math.PI);
    this.ctx.fillStyle = '#FFFFFF';
    this.ctx.strokeStyle = '#000000';
    this.ctx.fill();
    this.ctx.stroke();
  }

  forceTick = () => {
    const nodes = this.simulation.nodes();
    const links = this.simulation.force('link').links();
    // Clear the canvas
    this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
    nodes.forEach(this.normalizeNode);
    links.forEach(this.drawEdge);
    nodes.forEach(this.drawNode);
    console.log('tick');
  }

  render() {
    return (
      <canvas className="topology-graph" ref={(canvas) => { this.canvas = canvas; }} />
    );
  }
}

TopologyCanvas.propTypes = {};

TopologyCanvas.defaultProps = {};

export default TopologyCanvas;
