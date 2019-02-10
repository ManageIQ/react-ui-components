import * as React from 'react';
import PropTypes from 'prop-types';
import kebabCase from 'lodash/kebabCase';

import { Quaditem } from './Quaditem';

const quadSet = ['topLeft', 'topRight', 'bottomLeft', 'bottomRight', 'middle'];

const getBackground = (data, item) => (
  data[item] && data[item].background ? { background: data[item].background } : {}
);

const renderSingle = data => (
  <div className="single-wrapper">
    <Quaditem data={data} title={data.tooltip} />
  </div>
);

const renderQuad = data => (
  <div className="quad-wrapper">
    { quadSet.map(item => (
      <Quaditem
        data={data[item]}
        title={data[item].tooltip}
        className={kebabCase(item)}
        style={getBackground(data, item)}
      />))}
  </div>
);

const isQuad = data => quadSet.some(quad => data[quad]);

const Quadicon = props => (isQuad(props.data) ? renderQuad(data) : renderSingle(data));
export default Quadicon;

Quadicon.propTypes = {
  // data: PropTypes.arrayOf(PropTypes.any).isRequired,
  data: PropTypes.any.isRequired,
};
