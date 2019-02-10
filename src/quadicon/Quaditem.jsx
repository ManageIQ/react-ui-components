import * as React from 'react';
import PropTypes from 'prop-types';
import { numeral } from 'numeral';

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
  const length = text.length();

  if (length < 3) {
    return 'font-normal';
  } else if (length > 2 && length < 4) {
    return 'font-small';
  }
  return 'font-tiny';
};

const Quaditem = (props) => {
  const shortText = abbrNumber(props.data.text);
  const parts = [];
  if (props.data.fonticon) {
    parts.push((
      <div className="fonticon">
        <i className={props.data.fonticon} style={props.data.color ? { color: props.data.color } : {}} />
      </div>));
  } else if (props.data.fileicon) {
    parts.push((
      <div className="fileicon">
        <img alt="fileicon" src={props.data.fileicon} />
      </div>));
  }
  if (props.data.text) {
    parts.push((
      <div className="text" ng-class={fontSize(shortText)}>
        {shortText}
      </div>));
  }
  if (props.data.piechart || props.data.piechart === 0) {
    parts.push((
      <div className="piechart fill-{{ $ctrl.data.piechart }}" />
    ));
  }
  return parts;
};

export default Quaditem;

Quaditem.propTypes = {
  data: PropTypes.any.isRequired,
  // fonticon, color, fileicon, text, piechart
};
/*
   * The data object can contain the following keys:
   * - fonticon
   * - fileicon
   * - text
   * - tooltip
   * - background - background color of the given quadrant
   * - color - color of text/fonticon
   * - piechart - numeric value between 0..20, requires the .piechart CSS class from the demo to be extracted
   */
