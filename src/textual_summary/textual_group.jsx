import * as React from 'react';
import PropTypes from 'prop-types';
import GenericGroup from './generic_group';
import TagGroup from './tag_group';
import SimpleTable from './simple_table';
import OperationRanges from './operation_ranges';
import MultilinkTable from './multilink_table';
import TableListView from './table_list_view';
import EmptyGroup from './empty_group';

const renderComponent = (props) => {
  switch (props.group.partial) {
    case 'shared/summary/textual':
      return (
        <GenericGroup onClick={props.onClick} items={props.group.items} title={props.group.title} />
      );
    case 'shared/summary/textual_tags':
      return <TagGroup items={props.group.items} title={props.group.title} />;
    case 'shared/summary/textual_table':
    case 'shared/summary/textual_multilabel':
      return (
        <SimpleTable
          labels={props.group.labels}
          rows={props.group.rows}
          title={props.group.title}
        />
      );
    case 'shared/summary/textual_normal_operating_ranges':
      return <OperationRanges items={props.group.items} title={props.group.title} />;
    case 'shared/summary/multilink_table':
      return (
        <MultilinkTable
          onClick={props.onClick}
          items={props.group.items}
          title={props.group.title}
        />
      );
    case 'shared/summary/textual_listview':
      return (
        <TableListView
          onClick={props.onClick}
          title={props.group.title}
          headers={props.group.headers}
          values={props.group.values}
          colOrder={props.group.colOrder}
        />
      );
    case 'empty':
      return <EmptyGroup title={props.group.title} text={props.group.text} />;
    default:
      return <span>Error: Unknown summary group type.</span>;
  }
};

export default function TextualGroup(props) {
  return (
    <div className="col-md-12 col-lg-6">
      {renderComponent(props)}
    </div>
  );
}

renderComponent.propTypes = {
  group: PropTypes.shape({
    title: PropTypes.string.isRequired,
    partial: PropTypes.string.isRequired,
    items: PropTypes.any,
    labels: PropTypes.any,
    rows: PropTypes.any,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
};

