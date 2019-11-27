import React, { useState } from 'react';
import PropTypes from 'prop-types';

import './styles.scss';
import { Quadicon } from '../quadicon/';

/* eslint no-unused-vars: 'off' */
export const TileCard = ({
  text,
  title,
  item,
  onItemClick,
  onItemSelect,
}) => {
  const [mouseIn, setMouseIn] = useState(false);

  return (
    <div
      className="card"
      onMouseEnter={() => setMouseIn(true)}
      onMouseLeave={() => setMouseIn(false)}
    >
      { (mouseIn || item.checked) && (
        <div className="card-checkbox">
          <input type="checkbox" value={item.checked} onChange={ev => onItemSelect(item, ev.target.checked)} />
        </div>
      )}
      <div className="card-content" key={item.id}>
        <div className="miq-tile-head">
          <span
            role="button"
            tabIndex={0}
            title={title}
            onClick={ev => onItemClick(item, ev)}
          >
            {text}
          </span>
        </div>
        <div className="miq-quadicon">
          <span
            role="button"
            tabIndex={0}
            onClick={ev => onItemClick(item, ev)}
          >
            {item.quad && <Quadicon data={item.quad} />}
          </span>
        </div>
      </div>
    </div>
  );
};

TileCard.propTypes = {
  text: PropTypes.string,
  title: PropTypes.string,
  item: PropTypes.shape({
    id: PropTypes.string.isRequired,
    checked: PropTypes.bool,
    quad: PropTypes.shape({}).isRequired,
  }),
  onItemClick: PropTypes.func,
  onItemSelect: PropTypes.func,
};
