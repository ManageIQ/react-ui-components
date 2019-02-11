import * as React from 'react';
import PropTypes from 'prop-types';
import numeral from 'numeral';

import './styles.scss';

const abbrNumber = (value) => {
  const num = numeral(value);
  // Return the input if it's not a number.
  if (!num.value() || num.value().toString() !== value.toString()) {
    return value;
  }

  let abbr = num.format('0.0a');
  if (abbr.match(/\d\.0[a-z]?$/) || abbr.length > 5) {
    // Drop the .0 as we want to save the space
    abbr = num.format('0a');
  }

  return abbr.toUpperCase();
};

const fontSize = (text) => {
  const len = text.length;

  if (len < 3) {
    return 'font-normal';
  } else if (len > 2 && len < 4) {
    return 'font-small';
  }
  return 'font-tiny';
};

const Quaditem = (props) => {
  const shortText = abbrNumber(props.text);
  const parts = [];
  if (props.fonticon) {
    parts.push((
      <div className="fonticon">
        <i className={props.fonticon} style={props.color ? { color: props.color } : {}} />
      </div>));
  } else if (props.fileicon) {
    parts.push((
      <div className="fileicon">
        <img alt="fileicon" src={props.fileicon} />
      </div>));
  }
  if (props.text) {
    parts.push((
      <div className={`text ${fontSize(shortText)}`}>
        {shortText}
      </div>));
  }
  if (props.piechart || props.piechart === 0) {
    parts.push((
      <div className={`piechart fill-${props.piechart}`} />
    ));
  }
  return (
    <div className={`miq-quaditem ${props.cls}`} title={props.tooltip} style={{ background: props.background }}>
      {parts}
    </div>
  );
};

export default Quaditem;

/*
 * The Quaditem can contain the following keys:
 *   fonticon
 *   fileicon
 *   text
 *   tooltip
 *   background - background color of the given quadrant
 *   color - color of text/fonticon
 *   piechart - numeric value between 0..20, requires the .piechart CSS class from the demo to be extracted
 *   cls - class of an individual quad calculated from `quadSet`
 */

Quaditem.propTypes = {
  cls: PropTypes.string.isRequired,
  fonticon: PropTypes.string,
  fileicon: PropTypes.string,
  text: PropTypes.string,
  tooltip: PropTypes.string,
  background: PropTypes.string,
  color: PropTypes.string,
  piechart: PropTypes.string,
};
