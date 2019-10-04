import * as React from 'react';
import PropTypes from 'prop-types';
import findIndex from 'lodash/findIndex';

import {
  Paginator,
  PAGINATION_VIEW,
} from 'patternfly-react';

import Quadicon from '../quadicon/';

/* eslint max-len: "off" */
/*
 *
 * <div class="miq-tile-section">
 *     <div ng-if="tileCtrl.settings.isLoading" class="spinner spinner-lg"></div>
 *     <div class="miq-pagination"
 *          ng-if="tileCtrl.isVisible()">
 *       <miq-pagination settings="tileCtrl.settings"
 *                       per-page="tileCtrl.perPage"
 *                       has-checkboxes="tileCtrl.countCheckboxes() > 0"
 *                       on-select-all="tileCtrl.onCheckAll(isSelected)"
 *                       on-change-sort="tileCtrl.onSortClick(sortId, isAscending)"
 *                       on-change-page="tileCtrl.setPage(pageNumber)"
 *                       on-change-per-page="tileCtrl.perPageClick(item)"></miq-pagination>
 *     </div>
 *   <div pf-card-view
 *        class="miq-sand-paper"
 *        config="tileCtrl.options"
 *        items="tileCtrl.rows"
 *        class="miq-tile-view"
 *        ng-if="tileCtrl.isVisible()"
 *        ng-class="tileCtrl.tileClass()">
 *     <div ng-switch="config.type">
 *       <ng-switch-when ng-switch-when="small">
 *         <div class="miq-tile-head">
 *           <a href="javascript:void(0)" title="{{config.fetchTileName(item)}}" ng-click="config.onItemClick(item, $event)">{{config.fetchTileName(item) | limitToSuffix : 5 : 5 }}</a>
 *         </div>
 *         <div class="miq-quadicon">
 *           <a href="javascript:void(0)" ng-click="config.onItemClick(item, $event)">
 *             <div ng-if="!item.quad" ng-bind-html="config.trustAsHtmlQuadicon(item)"></div>
 *             <miq-quadicon ng-if="item.quad" data="item.quad"></miq-quadicon>
 *           </a>
 *         </div>
 *       </ng-switch-when>
 *       <ng-switch-when ng-switch-when="big">
 *         <a href="javascript:void(0)" ng-click="config.onItemClick(item, $event)">{{config.fetchTileName(item)}}</a>
 *         <div class="row miq-row-margin-only-top ">
 *           <div class="col-md-3 col-lg-3 col-xs-3 miq-icon-section">
 *             <a href="javascript:void(0)" ng-click="config.onItemClick(item, $event)">
 *               <div ng-if="!item.quad" ng-bind-html="config.trustAsHtmlQuadicon(item)"></div>
 *               <miq-quadicon ng-if="item.quad" data="item.quad"></miq-quadicon>
 *             </a>
 *           </div>
 *           <div class="col-md-9 col-lg-9 col-xs-9 miq-info-section">
 *             <dl class="dl-horizontal tile">
 *               <dt ng-repeat-start="(key, header) in config.columns | limitTo: 7 track by $index" ng-if="header.header_text && header.header_text.indexOf('Name') === -1" title="{{header.header_text}}">{{header.header_text}}:</dt>
 *               <dd ng-repeat-end ng-if="header.header_text && header.header_text.indexOf('Name') === -1" title="{{item.cells[key].text}}">{{item.cells[key].text | limitToSuffix : 25 : 25}}</dd>
 *             </dl>
 *             <div ng-repeat="(columnKey, column) in config.columns"
 *                  ng-if="item.cells[columnKey].is_button && item.cells[columnKey].onclick"
 *                  align="right">
 *               <button class="btn btn-primary"
 *                       title="{{item.cells[columnKey].title}}"
 *                       alt="{{item.cells[columnKey].title}}"
 *                       ng-disabled="item.cells[columnKey].disabled"
 *                       ng-click="config.onButtonItemClick(item.cells[columnKey], $event)">
 *                 {{item.cells[columnKey].text}}
 *               </button>
 *             </div>
 *           </div>
 *         </div>
 *       </ng-switch-when>
 *     </div>
 *   </div>
 * </div>
 *
 */

// import {TileType} from '../../interfaces/tileType';
// import {IDataTableBinding} from '../../interfaces/dataTable';
// import {DataViewClass} from '../../interfaces/abstractDataViewClass'; // FIXME: probably needed

// /**
//  * Controller for tile components. It extends {@link miqStaticAssets.gtl.DataViewClass}.
//  * @memberof miqStaticAssets.gtl
//  * @ngdoc controller
//  * @name TileViewController
//  */
// export class TileViewController extends DataViewClass implements IDataTableBinding {
//   public type: string;
//   public options: any;
//   /* @ngInject */
//   constructor(private $sce: any, MiQTranslateService: any) {
//     super(MiQTranslateService);
//     this.initOptions();
//   }
//
//   /**
//    * Method for creating basic options for tiles.
//    * @memberof TileViewController
//    * @function initOptions
//    */
//   private initOptions(): void {
//     this.options = {
//       selectionMatchProp: 'id',
//       selectItems: false,
//       multiSelect: true,
//       showSelectBox: true,
//       selectedItems: this.filterSelected(),
//       onClick: (item, event) => this.onTileClick(item),
//       onCheckBoxChange: (item) => this.onTileSelect(item),
//       onItemClick: (item: any, $event: any) => this.onRowClick({item: item, event: $event}),
//       onButtonItemClick: (item: any, $event: any) => this.onItemButtonClick(item, $event),
//       fetchTileName: (item) => this.fetchTileName(item),
//       trustAsHtmlQuadicon: (item) => this.trustAsHtmlQuadicon(item),
//       type: this.type
//     };
//   }

//  /**
//   * Method for enabling quadicons html to be displayed inside tile.
//   * @memberof TileViewController
//   * @function trustAsHtmlQuadicon
//   * @param item item with quadicon.
//   * @returns {any} trusted html object, which cn be used as `bind-html`.
//   */
//  public trustAsHtmlQuadicon(item) {
//    return this.$sce.trustAsHtml(item.quadicon);
//  }

//  /**
//   * Method for fetching name of item, it will try to guess which column should be showed as name of tile, usually it's
//   * column with Name in them.
//   * @memberof TileViewController
//   * @function fetchTileName
//   * @param item which will be displayed in tile. If no column with name is not present third cell text will be used.
//   * @returns {string} text which will be displayed as tile header.
//   */
//  public fetchTileName(item): string {
//    const nameIndex = _.findIndex(this.columns, oneColumn => oneColumn.text && oneColumn.text.indexOf('Name') !== -1);
//    return (nameIndex !== -1 && item.cells && item.cells[nameIndex]) ?
//      item.cells[nameIndex]['text'] :
//      item.cells[2]['text'];
//  }

/**
 * Angular's method for fetching change events.
 * @memberof TileViewController
 * @function $onChanges
 * @param changesObj angular's change object.
 */
//   public $onChanges(changesObj: any) {
//     super.$onChanges(changesObj);
//     if (changesObj.type) {
//       this.options.type = this.type;
//     }
//
//     if (changesObj.settings) {
//       this.options.showSelectBox = !this.settings.hideSelect;
//     }
//
//     if (changesObj.columns) {
//       this.options.columns = this.columns;
//     }
//
//     this.setPagingNumbers();
//   }

/**
 * Method which will be called when clicking on tile.
 * @memberof TileViewController
 * @function onTileClick
 * @param item which tile was clicked.
 */
//  public onTileClick(item) {
//    if (!this.settings.hideSelect) {
//      this.onItemSelected({item: item, isSelected: !item.selected});
//    }
//  }
//
//  public onTileSelect(item) {
//    this.onItemSelected({item: item, isSelected: item.selected});
//  }

/**
 * Method for checking all tiles and then filtering selected items.
 * @memberof TileViewController
 * @function tileClass
 * @param isSelected true | false.
 */
//  public onCheckAllTiles(isSelected: boolean) {
//    this.onCheckAll(isSelected);
//    this.options.selectedItems = this.filterSelected();
//  }

// NOT needed, we only implement "small"
//   /**
//    * Method for filtering selected tiles based on checked property.
//    * @memberof TileViewController
//    * @function tileClass
//    * @returns filtered array of checked items.
//    */
//   public filterSelected() {
//     return _.filter(this.rows, {checked: true});
//   }
//
//   /**
//    * Angular's method for getting tile's class based on it's type.
//    * @memberof TileViewController
//    * @function tileClass
//    * @returns {Object} it will return angular class object: `{miq-small-tile: boolean, miq-tile-with-body: boolean}`
//    */
//   public tileClass() {
//     return {
//       'miq-small-tile': this.type === TileType.SMALL,
//       'miq-tile-with-body': this.type === TileType.BIG
//     };
//   }
// }

// /**
//  * @description
//  *    Component for tile list. This component requires pf-tile to be part of angular's components. For patternfly's
//  *    implementation look at
//  *    <a href="http://angular-patternfly.rhcloud.com/#/api/patternfly.views.directive:pfCardView">pfCardView</a>
//  * @memberof miqStaticAssets.gtl
//  * @ngdoc component
//  * @name miqTileView
//  * @attr {Object} type
//  *    Type of tile look at {@see miqStaticAssets.gtl.TileType}
//  * @attr {Object} rows
//  *    Array of rows which will be displayed.
//  * @attr {Object} perPage
//  *    Object which will be displayed as dropdown picker to filter number of tiles.
//  * @attr {Object} columns
//  *    Columns which will be displayed as header in tile.
//  * @attr {Object} settings
//  *    Tile settings look at {@see ITableSettings} for more information.
//  * @attr {Expression} loadMoreItems
//  *    Function which will be called upon loading more items. Function call has to have `start`, `perPage` params.
//  * @attr {Expression} onSort
//  *    Function to triggering sorting items. Function call has to have `headerId`, `isAscending` params.
//  * @attr {Expression} onRowClick
//  *    Function which will be executed when click on tile event is fired. Function call has to have `item` param.
//  * @attr {Expression} onItemSelected
//  *    Function to be called on selecting item (trough clicking on tile). Function call has to have `item`, `isSelected`
//  *    params.
//  * @example
//  * <miq-tile-view type="ctrl.type"
//  *                rows="ctrl.rows"
//  *                columns="ctrl.columns"
//  *                per-page="ctrl.perPage"
//  *                settings="ctrl.settings"
//  *                load-more-items="ctrl.onLoadMoreItems(start, perPage)"
//  *                on-sort="ctrl.onSort(headerId, isAscending)"
//  *                on-row-click="ctrl.onRowClick(item)"
//  *                on-item-selected="ctrl.onItemSelect(item, isSelected)>
//  * </miq-tile-view>
//  */
// export default class TileView implements ng.IComponentOptions {
//   public replace = true;
//   public controller = TileViewController;
//   public template = require('./tile-view.html');
//   public controllerAs = 'tileCtrl';
//   public bindings: any = {
//     type: '<',
//     rows: '<',
//     columns: '<',
//     perPage: '<',
//     settings: '<',
//     loadMoreItems: '&',
//     onSort: '&',
//     onRowClick: '&',
//     onItemSelected: '&'
//   };
// }

const limitToSuffix = (value, start, end) =>
  (value.length > start + end + 3 ? `${value.slice(0, start)}...${value.slice(-end)}` : value);

export const TileView = (props) => {
  const {
    rows, columns, settings, isLoading,
  } = props;

  const renderPagination = () => {
    const state = {
      pagination: { page: 1, itemCount: 5, perPage: 10 },
      total: 5,
    };
    const setPage = () => null;
    const perPageSelect = () => null;
    // <div class="miq-pagination" >
    //   <miq-pagination settings="tileCtrl.settings"
    //                   per-page="tileCtrl.perPage"
    //                   has-checkboxes="tileCtrl.countCheckboxes() > 0"
    //                   on-select-all="tileCtrl.onCheckAll(isSelected)"
    //                   on-change-sort="tileCtrl.onSortClick(sortId, isAscending)"
    //                   on-change-page="tileCtrl.setPage(pageNumber)"
    //                   on-change-per-page="tileCtrl.perPageClick(item)"></miq-pagination>
    // </div>
    return (
      <Paginator
        viewType={PAGINATION_VIEW.TABLE}
        pagination={state.pagination}
        itemCount={state.total}
        onPageSet={setPage}
        onPerPageSelect={perPageSelect}
      />
    );
  };

  const onItemClick = (item, ev) => {
    console.log('onClick: ', item, ev);
    // onClick={config.onItemClick(item, $event}
  };

  const fetchTileName = (item) => {
    const nameIndex = findIndex(columns, oneColumn => oneColumn.text && oneColumn.text.indexOf('Name') !== -1);
    return (nameIndex !== -1 && item.cells && item.cells[nameIndex]) ?
      item.cells[nameIndex].text :
      item.cells[2].text;
  };

  const renderItem = item => (
    <div>
      <div className="miq-tile-head">
        <span
          role="button"
          tabIndex={0}
          title={fetchTileName(item)}
          onClick={ev => onItemClick(item, ev)}
        >
          {limitToSuffix(fetchTileName(item), 5, 5)}
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
  );

  const renderCardView = rows => (
    //  className="pf-card-view"
    // config="tileCtrl.options"
    <div
      className="miq-small-tile miq-sand-paper miq-tile-view"
    >
      { rows.map(i => renderItem(i)) }
    </div>
  );

  const isVisible = settings && settings.sortBy && (isLoading || rows.length !== 0);
  console.log('TileView: ', settings, rows);
  console.log('TileView: ', isLoading);
  console.log('TileView: ', isVisible);

  return (
    <div className="miq-tile-section">
      { isLoading && <div className="spinner spinner-lg" /> }
      { isVisible && renderPagination() }
      { isVisible && renderCardView(rows) }
    </div>
  );
};

TileView.propTypes = {
  rows: PropTypes.arrayOf(PropTypes.any),
  columns: PropTypes.arrayOf(PropTypes.any),
  settings: PropTypes.shape({
    sortBy: PropTypes.shape({}),
  }),
  isLoading: PropTypes.bool,
};
