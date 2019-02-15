import * as React from 'react';
import PropTypes from 'prop-types';
import kebabCase from 'lodash/kebabCase';

import Quaditem from './Quaditem';
import './styles.scss';

const quadSet = ['topLeft', 'topRight', 'bottomLeft', 'bottomRight', 'middle'];

// const getBackground = (data, item) => (
//   data[item] && data[item].background ? { background: data[item].background } : {}
// ); // FIXME: check if we can just pass an undefined background in the markup

const renderSingle = (item) => {
  const { className: _className, ...rest } = item;
  return (
    <div className="single-wrapper">
      <Quaditem {...rest} />
    </div>
  );
};

const renderQuad = data => (
  <div className="quad-wrapper">
    {quadSet.filter(key => data[key]).map((item) => {
      const { className: _className, ...rest } = data[item];
      return (<Quaditem key={item} className={kebabCase(item)} {...rest} />);
    })}
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
