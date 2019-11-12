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
  settings,
  onItemSelect,
}) => {
  const tileSettings = {
    ...settings, // not needed?
    sortBy: {},
  };

  const pagination = { page: 1, perPage: 10, perPageOptions: [5, 10, 20, 50, 100, 200] };
  const total = 128;

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
      onSort={() => console.log('onSort')}
      onRowClick={() => console.log('onRowClick')}
      onItemSelect={onItemSelect}
      onItemButtonClick={() => console.log('onItemButtonClick')}
    />
  );
  //     'miq-data-table', '',
  //     "ng-class"         => "{'no-action': dataCtrl.initObject.showUrl === false}",
  //     "settings"         => "dataCtrl.settings",
  //     "per-page"         => "dataCtrl.perPage",
  //     "rows"             => "dataCtrl.gtlData.rows",
  //     "on-row-click"     => "dataCtrl.onItemClicked(item, event)",
  //     "on-sort"          => "dataCtrl.onSort(headerId, isAscending)",
  //     "load-more-items"  => "dataCtrl.onLoadNext(start, perPage)",
  //     "on-item-selected" => "dataCtrl.onItemSelect(item, isSelected)",
  //     "columns"          => "dataCtrl.gtlData.cols"
  //   )

  return gtlType === 'grid' ? miqTileView() : miqDataTable();
};

StaticGTLView.defaultProps = {
  gtlType: 'grid',
};

StaticGTLView.propTypes = {
  gtlType: PropTypes.string,
  settings: PropTypes.any,
  rows: PropTypes.arrayOf(PropTypes.any).isRequired,
  head: PropTypes.arrayOf(PropTypes.any).isRequired,
  onItemSelect: PropTypes.func,
};
