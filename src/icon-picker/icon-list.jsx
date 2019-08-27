import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FontIcon from './font-icon';
import { findIcons } from './icon-picker-helper';

class IconsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      icons: this.props.isVisible ? findIcons(this.props.type) : undefined,
    };
  }

  componentDidUpdate(_prevProps, prevState) {
    if (!prevState.icons && this.props.isVisible) {
        this.setState((_state, props) => ({ icons: findIcons(props.type) })); // eslint-disable-line
    }
  }

  render() {
    const {
      type,
      iconChanged,
      activeIcon,
      isVisible,
    } = this.props;

    if (!isVisible || !this.state.icons) {
      return null;
    }
    return this.state.icons.map(row => (
      <tr key={row.toString()}>
        {row.map(icon => (
          <td className={`icon-list-cell ${activeIcon === icon ? 'active' : ''}`} key={icon} onClick={() => iconChanged(icon)} >
            <FontIcon type={type} icon={icon} />
          </td>))
          }
      </tr>
    ));
  }
}

IconsList.propTypes = {
  type: PropTypes.string.isRequired,
  iconChanged: PropTypes.func.isRequired,
  activeIcon: PropTypes.string,
  isVisible: PropTypes.bool,
};

export default IconsList;
