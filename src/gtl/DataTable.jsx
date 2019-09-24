import * as React from 'react';
import PropTypes from 'prop-types';

/*
 *
 * <div class="miq-data-table">
 *   <div ng-if="tableCtrl.settings.isLoading" class="spinner spinner-lg"></div>
 *   <div class="miq-pagination"
 *        ng-if="tableCtrl.settings && tableCtrl.settings.sortBy && (tableCtrl.settings.isLoading || tableCtrl.rows.length !== 0)">
 *     <miq-pagination settings="tableCtrl.settings"
 *                     per-page="tableCtrl.perPage"
 *                     on-select-all="tableCtrl.onCheckAll(isSelected)"
 *                     has-checkboxes="tableCtrl.countCheckboxes() > 0"
 *                     on-change-sort="tableCtrl.onSortClick(sortId, isAscending)"
 *                     on-change-page="tableCtrl.setPage(pageNumber)"
 *                     on-change-per-page="tableCtrl.perPageClick(item)"></miq-pagination>
 *   </div>
 *   <table class="table table-bordered table-striped table-hover miq-table-with-footer miq-table"
 *          ng-if="tableCtrl.rows && tableCtrl.rows.length !== 0">
 *     <thead>
 *     <tr>
 *       <th class="narrow">
 * 
 *       </th>
 *       <th ng-if="$index !== 0"
 *           ng-repeat="column in tableCtrl.columns track by $index"
 *           ng-click="tableCtrl.onSortClick($index, !!tableCtrl.settings.sortBy && !tableCtrl.settings.sortBy.isAscending)"
 *           ng-class="tableCtrl.getColumnClass(column)">
 *         {{column.header_text}}
 *         <div class="pull-right" ng-if="tableCtrl.isFilteredBy(column)" >
 *           <i class="fa" ng-class="tableCtrl.getSortClass()"></i>
 *         </div>
 *       </th>
 *     </tr>
 *     </thead>
 *     <tbody>
 *     <tr ng-repeat="row in tableCtrl.rows"
 *         ng-class="{active : row.selected}"
 *         ng-click="tableCtrl.onRowClick({item: row, event: $event})">
 *       <td ng-repeat="(columnKey, column) in tableCtrl.columns"
 *           ng-class="{
 *             narrow: row.cells[columnKey].is_checkbox || row.cells[columnKey].icon || row.cells[columnKey].is_button,
 *             'is-checkbox-cell': row.cells[columnKey].is_checkbox,
 *           }">
 *         <input ng-if="row.cells[columnKey].is_checkbox && !tableCtrl.settings.hideSelect"
 *                ng-click="tableCtrl.onItemSelected({item: row, isSelected: isSelected})"
 *                onclick="event.stopPropagation();"
 *                type="checkbox"
 *                ng-model="isSelected"
 *                name="check_{{row.id}}"
 *                value="{{row.id}}"
 *                ng-checked="row.checked"
 *                class="list-grid-checkbox">
 *         <i ng-if="tableCtrl.getNodeIconType(row, columnKey) === 'icon'"
 *            class="{{row.cells[columnKey].icon}}"
 *            title="{{row.cells[columnKey].title}}">
 *           <i ng-if="row.cells[columnKey].icon2" ng-class="row.cells[columnKey].icon2"></i>
 *         </i>
 *         <img ng-if="tableCtrl.getNodeIconType(row, columnKey) === 'image'"
 *              ng-src="{{row.cells[columnKey].picture || row.cells[columnKey].image}}"
 *              alt="{{row.cells[columnKey].title}}"
 *              title="{{row.cells[columnKey].title}}" />
 *         <span ng-if="row.cells[columnKey].text && !row.cells[columnKey].is_button">
 *               {{row.cells[columnKey].text}}
 *         </span>
 *         <button ng-if="row.cells[columnKey].is_button && row.cells[columnKey].onclick"
 *                 class="btn btn-primary"
 *                 ng-disabled="row.cells[columnKey].disabled"
 *                 title="{{row.cells[columnKey].title}}"
 *                 alt="{{row.cells[columnKey].title}}"
 *                 ng-click="tableCtrl.onItemButtonClick(row.cells[columnKey], $event)">
 *           {{row.cells[columnKey].text}}
 *         </button>
 *       </td>
 *     </tr>
 *     </tbody>
 *   </table>
 * </div>
 */

import {IDataTableBinding} from '../../interfaces/dataTable';
import {DataViewClass} from '../../interfaces/abstractDataViewClass';
import * as _ from 'lodash';

/**
 * This controller is for managing data table entities. It extends {@link miqStaticAssets.gtl.DataViewClass}
 * which is abstract class with basic methods for filtering, sorting and limiting entries in data table.
 * @extends miqStaticAssets.gtl.DataViewClass
 * @memberof miqStaticAssets.gtl
 * @ngdoc controller
 * @name DataTableController
 */

// export class DataTableController extends DataViewClass implements IDataTableBinding {
//   public currentPageView: number;
//
//   /**
//    * This method will check if user wants to go to non-existent page and will validate it.
//    * @memberof DataTableController
//    * @function setTablePage
//    * @param pageNumber {Number} desired page.
//    */
//   public setTablePage(pageNumber) {
//     pageNumber = Number(pageNumber);
//     if (_.isNaN(pageNumber)) {
//       this.currentPageView = this.settings.current;
//       pageNumber = this.currentPageView;
//     } else {
//       if (pageNumber <= 0) {
//         this.currentPageView = 1;
//         pageNumber = 1;
//       }
//       this.setPage(pageNumber);
//     }
//   }

/**
 * Public method for getting column class, narrow column with checkbox or image.
 * @memberof DataTableController
 * @function getColumnClass
 * @param column {Object} header column. This column will have `is_narrow` property set to true and `narrow` class
 * will be present in classes.
 * @returns {Object} angular class object. `{narrow: boolean}`
 */
const getColumnClass = column => (
  {
    narrow: column.is_narrow,
    'table-view-pf-select': column.is_narrow
  }
)

  /**
   * Public method for retrieving what icon type should be displayed
   * @memberof DataTableController
   * @function getNodeIconType
   * @param row {object} whole row with data.
   * @param columnKey header column key.
   * @returns {string} image | icon
   */
  public getNodeIconType(row, columnKey) {
    const allowedGraphics = ['image', 'icon'];
    if (row && row.cells) {
      return allowedGraphics.find(item => row.cells[columnKey].hasOwnProperty(item) && !!row.cells[columnKey][item]);
    }
  }

  /**
   * Public method for checking if column of table has an icon.
   * @memberof DataTableController
   * @function hasIcon
   */
  public hasIcon(row, columnKey): boolean {
    return row && row.cells && row.cells[columnKey].hasOwnProperty('icon') && row.cells[columnKey].icon;
  }

  /**
   * Public method for checking if column of table has an image.
   * @memberof DataTableController
   * @function hasImage
   * @param row {object} whole row with data.
   * @param columnKey header column key.
   * @returns {boolean} true | false, if column has image or not.
   */
  public hasImage(row, columnKey): boolean {
    return row && row.cells && row.cells[columnKey].hasOwnProperty('image') && row.cells[columnKey].image;
  }

  /**
   * Public method for finding out if it's filtered by header column.
   * @memberof DataTableController
   * @function isFilteredBy
   * @param column column which is checked if it's filtered by.
   * @returns {boolean} true | false if `this.settings.sortBy.sortObject.col_idx` is equal to `column.col_idx`.
   */
  public isFilteredBy(column: any) {
    return !!this.settings.sortBy && (this.settings.sortBy.sortObject.col_idx === column.col_idx);
  }

  /**
   * Public method for getting sort class, either `fa-sort-asc` or `fa-sort-desc`.
   * @memberof DataTableController
   * @function getSortClass
   * @returns {Object} angular class object: `{fa-sort-asc: boolean, fa-sort-desc: boolean}`
   */
  public getSortClass() {
    return {
      'fa-sort-asc': !!this.settings.sortBy && this.settings.sortBy.isAscending,
      'fa-sort-desc': !(!!this.settings.sortBy && this.settings.sortBy.isAscending)
    };
  }

  /**
   * Angular's $onchange function to find out if one of bounded option has changed.
   * @memberof DataTableController
   * @function $onChanges
   * @param changesObj angular changed object.
   */
  public $onChanges(changesObj: any) {
    super.$onChanges(changesObj);
    if (changesObj.settings && this.settings) {
      this.currentPageView = this.settings.current;
    }

    this.setPagingNumbers();
  }
}

/**
 * @description
 *    Component for data table.
 * @memberof miqStaticAssets.gtl
 * @ngdoc component
 * @name miqDataTable
 * @attr {Object} rows
 *    Array of rows which will be displayed.
 * @attr {Object} perPage
 *    Object which will be displayed as dropdown picker to filter number of rows.
 * @attr {Object} columns
 *    Columns which will be displayed as header in table.
 * @attr {Object} settings
 *    Table settings look at {@see ITableSettings} for more information.
 * @attr {Expression} loadMoreItems
 *    Function which will be called upon loading more items. Function call has to have `start`, `perPage` params.
 * @attr {Expression} onSort
 *    Function to triggering sorting items. Function call has to have `headerId`, `isAscending` params.
 * @attr {Expression} onRowClick
 *    Function which will be executed when click on row event is fired. Function call has to have `item` param.
 * @attr {Expression} onItemSelected
 *    Function to be called on selecting item (trough selectbox next to each row). Function call has to have `item`,
 *    `isSelected` params.
 * @example
 * <miq-data-table rows="ctrl.rows"
 *                 columns="ctrl.columns"
 *                 per-page="ctrl.perPage"
 *                 settings="ctrl.settings"
 *                 load-more-items="ctrl.onLoadMoreItems(start, perPage)"
 *                 on-sort="ctrl.onSort(headerId, isAscending)"
 *                 on-row-click="ctrl.onRowClick(item)"
 *                 on-item-selected="ctrl.onItemSelect(item, isSelected)">
 * </miq-data-table>
 */

export default class DataTable {
  public replace: boolean = true;
  public template = require('./data-table.html');
  public controller: any = DataTableController;
  public transclude: boolean = true;
  public controllerAs: string = 'tableCtrl';
  public bindings: any = {
    rows: '<',
    columns: '<',
    perPage: '<',
    settings: '<',
    loadMoreItems: '&',
    onSort: '&',
    onRowClick: '&',
    onItemSelected: '&'
  };
}
const DataTable = (props) => {
  const isLoading = true;

  const renderPagination = () => (
    <div class="miq-pagination"
      <miq-pagination
        settings="tableCtrl.settings"
        per-page="tableCtrl.perPage"
        on-select-all="tableCtrl.onCheckAll(isSelected)"
        has-checkboxes="tableCtrl.countCheckboxes() > 0"
        on-change-sort="tableCtrl.onSortClick(sortId, isAscending)"
        on-change-page="tableCtrl.setPage(pageNumber)"
        on-change-per-page="tableCtrl.perPageClick(item)">
      </miq-pagination>
    </div>
  );

  const renderTableHeader = () => {
    return (
      <thead>
      <tr>
        <th class="narrow">

        </th>
        {columns.map((column, index) =>
          index !== 0 &&
            <th onClick={onSortClick(index, !!sortBy && !sortBy.isAscending)} className={getColumnClass(column)}>
              {column.header_text}
              {isFilteredBy(column) &&
                <div class="pull-right">
                  <i class="fa" className={getSortClass()}></i>
                </div>
              }
            </th>
        }
      </tr>
      </thead>
    );
  };

  const renderTableBody = () => {
    return (
      <tbody>
        {rows.map(row => (
          <tr ng-class="{active : row.selected}" ng-click="tableCtrl.onRowClick({item: row, event: $event})">
            {columns.map((columnKey, column ) =>
              <td /*ng-repeat="(columnKey, column) in tableCtrl.columns"*/
                ng-class="{
                  narrow: row.cells[columnKey].is_checkbox || row.cells[columnKey].icon || row.cells[columnKey].is_button,
                  'is-checkbox-cell': row.cells[columnKey].is_checkbox,
                }">
                <input ng-if="row.cells[columnKey].is_checkbox && !tableCtrl.settings.hideSelect"
                       ng-click="tableCtrl.onItemSelected({item: row, isSelected: isSelected})"
                       onclick="event.stopPropagation();"
                       type="checkbox"
                       ng-model="isSelected"
                       name="check_{{row.id}}"
                       value="{{row.id}}"
                       ng-checked="row.checked"
                       class="list-grid-checkbox">
                <i ng-if="tableCtrl.getNodeIconType(row, columnKey) === 'icon'"
                   class="{{row.cells[columnKey].icon}}"
                   title="{{row.cells[columnKey].title}}">
                  <i ng-if="row.cells[columnKey].icon2" ng-class="row.cells[columnKey].icon2"></i>
                </i>
                <img ng-if="tableCtrl.getNodeIconType(row, columnKey) === 'image'"
                     ng-src="{{row.cells[columnKey].picture || row.cells[columnKey].image}}"
                     alt="{{row.cells[columnKey].title}}"
                     title="{{row.cells[columnKey].title}}" />
                <span ng-if="row.cells[columnKey].text && !row.cells[columnKey].is_button">
                      {{row.cells[columnKey].text}}
                </span>
                <button ng-if="row.cells[columnKey].is_button && row.cells[columnKey].onclick"
                        class="btn btn-primary"
                        ng-disabled="row.cells[columnKey].disabled"
                        title="{{row.cells[columnKey].title}}"
                        alt="{{row.cells[columnKey].title}}"
                        ng-click="tableCtrl.onItemButtonClick(row.cells[columnKey], $event)">
                  {{row.cells[columnKey].text}}
                </button>
              </td>
            }
          </tr>
        )}
      </tbody>
    );
  };

  const renderTable = () => {
    return (
      <table class="table table-bordered table-striped table-hover miq-table-with-footer miq-table">
        { renderTableHeader() }
        { renderTableBody() }
      </table>
    );
  }

  return (
    <div class="miq-data-table">
      { isLoading <div class="spinner spinner-lg"></div> }
      { isLoading && sortBy (isLoading || rows.length !== 0) && renderPagination() }
      { rows.length !== 0 && renderTable() }
    </div>
  );
}

DataTable.propTypes = {
};

export default DataTable;

