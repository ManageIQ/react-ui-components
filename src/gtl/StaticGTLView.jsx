import React from 'react';
import PropTypes from 'prop-types';
import camelCase from 'lodash/camelCase';
import reduce from 'lodash/reduce';

import { TileView } from './TileView';
import { DataTable } from './DataTable';

// temporary:
const __ = x => x;

const translateHeaderText = heads => heads.map(h => ({ ...h, header_text: __(h.text) }));

const camelizeQuadicon = quad =>
  reduce(quad, (result, current, key) => {
    const item = {};
    item[camelCase(key)] = current;
    return Object.assign(result, item);
  }, {});

export const StaticGTLView = ({
  gtlType,
  rows,
  head,
  total,
  settings,
  pagination,

  onItemSelect,
  onSort,
  onPerPageSelect,
  onPageSet,
}) => {
  const tileSettings = {
    ...settings, // not needed?
    sortBy: {},
  };

  const miqTileView = () => {
    const rowsWithQuads = rows.map(row => (
      {
        ...row,
        quad: camelizeQuadicon(row.quad),
      }));

    return (
      <TileView
        rows={rowsWithQuads}
        columns={head}
        pagination={pagination}
        total={total}
        settings={tileSettings}
        onItemSelect={onItemSelect}
        onPageSet={onPageSet}
        onPerPageSelect={onPerPageSelect}
      />
    );
  };
  //    'miq-tile-view', '',
  //    "ng-class"         => "{'no-action': dataCtrl.initObject.showUrl === false}",
  //    "settings"         => "dataCtrl.settings",
  //    "per-page"         => "dataCtrl.perPage",
  //    "rows"             => "dataCtrl.gtlData.rows",
  //    "on-row-click"     => "dataCtrl.onItemClicked(item, event)",
  //    "on-sort"          => "dataCtrl.onSort(headerId, isAscending)",
  //    "on-item-selected" => "dataCtrl.onItemSelect(item, isSelected)",
  //    "load-more-items"  => "dataCtrl.onLoadNext(start, perPage)",
  //    "columns"          => "dataCtrl.gtlData.cols",
  //    "type"             => "dataCtrl.gtlType === 'grid' ? 'small' : 'big'"
  //  )

  const miqDataTable = () => (
    <DataTable
      rows={rows}
      columns={translateHeaderText(head)}
      pagination={pagination}
      total={total}
      settings={tileSettings}
      loadMoreItems={() => console.log('loadMoreItems')}
      onSort={onSort}
      onRowClick={() => console.log('onRowClick')}
      onItemSelect={onItemSelect}
      onItemButtonClick={() => console.log('onItemButtonClick')}
      onPageSet={onPageSet}
      onPerPageSelect={onPerPageSelect}
    />
  );
  //     "ng-class"         => "{'no-action': dataCtrl.initObject.showUrl === false}",
  //     "settings"         => "dataCtrl.settings",
  //     "on-row-click"     => "dataCtrl.onItemClicked(item, event)",
  //     "load-more-items"  => "dataCtrl.onLoadNext(start, perPage)",

  return gtlType === 'grid' ? miqTileView() : miqDataTable();
};

StaticGTLView.defaultProps = {
  gtlType: 'grid',
  pagination: { page: 1, perPage: 10, perPageOptions: [5, 10, 20, 50, 100, 200] },
  onSort: (headerId, isAscending) => console.log('onSort', headerId, isAscending),
  onPerPageSelect: foo => console.log('onPerPageSelect', foo),
  onPageSet: foo => console.log('onPageSet', foo),
  total: 128,
};

StaticGTLView.propTypes = {
  gtlType: PropTypes.string,
  settings: PropTypes.any,
  rows: PropTypes.arrayOf(PropTypes.any).isRequired,
  head: PropTypes.arrayOf(PropTypes.any).isRequired,
  total: PropTypes.number,
  pagination: PropTypes.shape({
    page: PropTypes.number,
    perPage: PropTypes.number,
    perPageOptions: PropTypes.arrayOf(PropTypes.number),
  }),
  onItemSelect: PropTypes.func,
  onSort: PropTypes.func,
  onPerPageSelect: PropTypes.func,
  onPageSet: PropTypes.func,
};
