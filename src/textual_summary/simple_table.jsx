import * as React from 'react';
import PropTypes from 'prop-types';

export default function SimpleTable(props) {
  const renderLabel = (label) => {
    if ((typeof label === 'object') && label.sortable) {
      const sortClass = label.sortable === 'asc' ? 'fa fa-sort-asc' : 'fa fa-sort-desc';
      return (
        <React.Fragment>
          <div className="pull-left">{label.value}</div>
          <div className="pull-right">
            <i className={sortClass} />
          </div>
        </React.Fragment>
      );
    }
    return label;
  };

  const renderValue = (value, j) => {
    if ((value != null) && (typeof value === 'object') && value.expandable) {
      return (
        <td key={j}>
          <div className="pull-left expand">{value.value}</div>
          <div className="pull-right" />
        </td>
      );
    }
    return <td key={j}>{value}</td>;
  };

  const renderRow = (row, i) => <tr key={i}>{row.map((value, j) => renderValue(value, j))}</tr>;

  return (
    <table className="table table-bordered table-striped table-summary-screen">
      <thead>
        <tr>
          <th colSpan={props.labels.length} align="left">{props.title}</th>
        </tr>
        <tr>
          {props.labels.map((label, i) => <td key={i}><strong>{renderLabel(label)}</strong></td>)}
        </tr>
      </thead>
      <tbody>
        {props.rows.map((row, i) => renderRow(row, i))}
      </tbody>
    </table>
  );
}

SimpleTable.propTypes = {
  title: PropTypes.string.isRequired,
  labels: PropTypes.arrayOf(PropTypes.string).isRequired,
  rows: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.any)).isRequired,
};
