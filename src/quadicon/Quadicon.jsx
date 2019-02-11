import * as React from 'react';
import PropTypes from 'prop-types';
import kebabCase from 'lodash/kebabCase';

import Quaditem from './Quaditem';
import './styles.scss';

const quadSet = ['topLeft', 'topRight', 'bottomLeft', 'bottomRight', 'middle'];

// const getBackground = (data, item) => (
//   data[item] && data[item].background ? { background: data[item].background } : {}
// ); // FIXME: check if we can just pass an undefined background in the markup

const renderSingle = item => (
  <div className="single-wrapper">
    <Quaditem
      fonticon={item.fonticon}
      fileicon={item.fileicon}
      text={item.text}
      tooltip={item.tooltip}
      background={item.background}
      color={item.color}
      piechart={item.piechart}
    />
  </div>
);

const renderQuad = data => (
  <div className="quad-wrapper">
    {quadSet.filter(key => data[key]).map(item => (
      <Quaditem
        fonticon={data[item].fonticon}
        fileicon={data[item].fileicon}
        text={data[item].text}
        tooltip={data[item].tooltip}
        background={data[item].background}
        color={data[item].color}
        piechart={data[item].piechart}
        cls={kebabCase(item)}
      />))}
  </div>
);

const isQuad = data => quadSet.some(quad => data[quad]);

const Quadicon = props => (<div className="miq-quadicon">{isQuad(props.data) ? renderQuad(props.data) : renderSingle(props.data)}</div>);
export default Quadicon;

Quadicon.propTypes = {
  data: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.shape(Quadicon.propTypes)).isRequired,
    PropTypes.shape(Quadicon.propTypes).isRequired,
  ]),
};
