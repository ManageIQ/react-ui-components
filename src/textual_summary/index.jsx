import * as React from 'react';
import PropTypes from 'prop-types';
import TextualRow from './textual_row';

/**
 * Render a whole textual summary.
 *
 * Outer array elements are rows, inner array elements are groups.
 */
export default function TextualSummary(props) {
  return (
    <React.Fragment>
      {
        props.summary.map((bigGroup, i) => (
          <TextualRow onClick={props.onClick} key={i} groups={bigGroup} />
        ))
      }
    </React.Fragment>
  );
}

TextualSummary.propTypes = {
  summary: PropTypes.arrayOf(PropTypes.any).isRequired,
  onClick: PropTypes.func.isRequired,
};
