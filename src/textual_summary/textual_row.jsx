import * as React from 'react';
import PropTypes from 'prop-types';
import TextualGroup from './textual_group';

export default function TextualRow(props) {
  return (
    <div className="row">
      {
        props.groups.map(group => (
          <TextualGroup onClick={props.onClick} key={group.title} group={group} />
        ))
      }
    </div>
  );
}

TextualRow.propTypes = {
  groups: PropTypes.arrayOf(PropTypes.any).isRequired,
  onClick: PropTypes.func.isRequired,
};

