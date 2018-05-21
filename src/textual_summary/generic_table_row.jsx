import * as React from 'react';
import PropTypes from 'prop-types';
import IconOrImage from './icon_or_image';

const renderMultivalue = function renderMultivalue(values, onClick) {
  return (
    <table cellPadding="0" cellSpacing="0">
      <tbody>
        {
          values.map((item, i) => (
            <tr onClick={e => onClick(item, e)} key={i} className={item.link ? '' : 'no-hover'} title={item.title}>
              <td style={{ border: 0, margin: 0, padding: 0 }}>
                <IconOrImage icon={item.icon} image={item.image} title={item.title} />
                {item.value}
              </td>
            </tr>
          ))
        }
      </tbody>
    </table>
  );
};

const renderValue = function renderValue(value, onClick) {
  return Array.isArray(value) ? renderMultivalue(value, onClick) : <span> {value}</span>;
};

export default function GenericTableRow(props) {
  const { item } = props;
  const value = renderValue(item.value, props.onClick);

  return (
    <tr onClick={e => props.onClick(item, e)} className={item.hoverClass} title={item.title}>
      <td className="label">{item.label}</td>
      <td>
        <IconOrImage icon={item.icon} image={item.image} title={item.title} />
        {value}
      </td>
    </tr>
  );
}

GenericTableRow.propTypes = {
  item: PropTypes.shape({
    hoverClass: PropTypes.string.isRequired,
    link: PropTypes.string,
    title: PropTypes.string,
    image: PropTypes.string,
    icon: PropTypes.string,
    label: PropTypes.any,
    value: PropTypes.any,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
};
