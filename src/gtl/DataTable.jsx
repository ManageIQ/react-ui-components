import * as React from 'react';
import PropTypes from 'prop-types';

import { renderPagination } from './utils';

const classNames = require('classnames');

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

// import {IDataTableBinding} from '../../interfaces/dataTable';
// import {DataViewClass} from '../../interfaces/abstractDataViewClass';
// import * as _ from 'lodash';

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
 * What icon type should be displayed
 * @param row {object} whole row with data.
 * @param columnKey header column key.
 * @returns {string} image | icon
 */
const getNodeIconType = (row, columnKey) =>
  row && row.cells && ['image', 'icon']
    .find(item => Object.prototype.hasOwnProperty.call(row.cells[columnKey], item)
      && !!row.cells[columnKey][item]);

//  /**
//   * Public method for checking if column of table has an icon.
//   * @memberof DataTableController
//   * @function hasIcon
//   */
//  public hasIcon(row, columnKey): boolean {
//    return row && row.cells && row.cells[columnKey].hasOwnProperty('icon') && row.cells[columnKey].icon;
//  }
//
//  /**
//   * Public method for checking if column of table has an image.
//   * @memberof DataTableController
//   * @function hasImage
//   * @param row {object} whole row with data.
//   * @param columnKey header column key.
//   * @returns {boolean} true | false, if column has image or not.
//   */
//  public hasImage(row, columnKey): boolean {
//    return row && row.cells && row.cells[columnKey].hasOwnProperty('image') && row.cells[columnKey].image;
//  }

const isFilteredBy = (sortBy, column) => !!sortBy && (sortBy.sortObject && sortBy.sortObject.col_idx === column.col_idx);

//  /**
//   * Angular's $onchange function to find out if one of bounded option has changed.
//   * @memberof DataTableController
//   * @function $onChanges
//   * @param changesObj angular changed object.
//   */
//  public $onChanges(changesObj: any) {
//    super.$onChanges(changesObj);
//    if (changesObj.settings && this.settings) {
//      this.currentPageView = this.settings.current;
//    }
//
//    this.setPagingNumbers();
//  }

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

// export default class DataTable {
//   public replace: boolean = true;
//   public template = require('./data-table.html');
//   public controller: any = DataTableController;
//   public transclude: boolean = true;
//   public controllerAs: string = 'tableCtrl';
// }

export const DataTable = ({
  rows,
  columns,
  // perPage,
  settings,
  isLoading,
  pagination,
  total,
  // loadMoreItems,
  onSort,
  onRowClick,
  onItemButtonClick,
  onItemSelect,
  onPerPageSelect,
  onPageSet,
}) => {
  const renderTableHeader = () => (
    <thead>
      <tr>
        <th className="narrow" />
        {columns.map((column, index) =>
          index !== 0 &&
            <th
              onClick={() => onSort({ headerId: index, isAscending: !!settings.sortBy && !settings.sortBy.isAscending })}
              className={classNames({ narrow: column.is_narrow, 'table-view-pf-select': column.is_narrow })}
            >
              {column.header_text}
              {isFilteredBy(settings.sortBy, column) &&
                <div classNAme="pull-right">
                  <i className={
                    classNames('fa', {
                      'fa-sort-asc': !!settings.sortBy && settings.sortBy.isAscending,
                      'fa-sort-desc': !(!!settings.sortBy && settings.sortBy.isAscending),
                    })}
                  />
                </div>
              }
            </th>)
        }
      </tr>
    </thead>
  );

  const localOnItemSelected = (ev, item, isSelected) => {
    onItemSelect({ item, isSelected });
    ev.stopPropagation();
  };

  const renderTableBody = () => (
    <tbody>
      {rows.map(row => (
        <tr
          className={row.selected ? 'active' : ''}
          onClick={event => onRowClick({ item: row, event })}
        >
          {columns.map((column, columnKey) => (
            <td
              className={classNames({
                narrow: row.cells[columnKey].is_checkbox || row.cells[columnKey].icon || row.cells[columnKey].is_button,
                'is-checkbox-cell': row.cells[columnKey].is_checkbox,
              })}
            >
              { row.cells[columnKey].is_checkbox && !settings.hideSelect &&
                <input
                  onChange={ev => localOnItemSelected(ev, row, ev.target.checked)}
                  type="checkbox"
                  name={`check_${row.id}`}
                  value={row.id}
                  checked={row.checked}
                  className="list-grid-checkbox"
                />
              }
              { getNodeIconType(row, columnKey) === 'icon' &&
                <i
                  className={row.cells[columnKey].icon}
                  title={row.cells[columnKey].title}
                >
                  <i ng-if="row.cells[columnKey].icon2" className={row.cells[columnKey].icon2} />
                </i>
              }
              { getNodeIconType(row, columnKey) === 'image' &&
                <img
                  src={row.cells[columnKey].picture || row.cells[columnKey].image}
                  alt={row.cells[columnKey].title}
                  title={row.cells[columnKey].title}
                />
              }
              { row.cells[columnKey].text && !row.cells[columnKey].is_button &&
                <span>
                  {row.cells[columnKey].text}
                </span>
              }
              { row.cells[columnKey].is_button && row.cells[columnKey].onclick &&
                <button
                  className="btn btn-primary"
                  disabled={row.cells[columnKey].disabled}
                  title={row.cells[columnKey].title}
                  alt={row.cells[columnKey].title}
                  onClick={ev => onItemButtonClick(row.cells[columnKey], ev)}
                >
                  {row.cells[columnKey].text}
                </button>
              }
            </td>))}
        </tr>
      ))}
    </tbody>);
  console.log('rows: ', rows);
  console.log('columns: ', columns);

  const renderTable = () => (
    <table className="table table-bordered table-striped table-hover miq-table-with-footer miq-table">
      { renderTableHeader() }
      { renderTableBody() }
    </table>
  );

  const isVisible = settings && settings.sortBy && (isLoading || rows.length !== 0);

  return (
    <div className="miq-data-table">
      { isLoading && <div className="spinner spinner-lg" /> }
      { isVisible &&
        renderPagination({
          pagination, total, onPerPageSelect, onPageSet,
        })
      }
      { rows.length !== 0 && renderTable() }
    </div>
  );
};

DataTable.propTypes = {
  rows: PropTypes.arrayOf(PropTypes.any).isRequired,
  columns: PropTypes.arrayOf(PropTypes.any).isRequired,
  // perPage: PropTypes.any.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  settings: PropTypes.any.isRequired,

  pagination: PropTypes.any.isRequired,
  total: PropTypes.number.isRequired,
  isLoading: PropTypes.bool,
  onSort: PropTypes.func.isRequired,
  onRowClick: PropTypes.func.isRequired,
  onItemSelect: PropTypes.func.isRequired,
  onItemButtonClick: PropTypes.func.isRequired,
  onPerPageSelect: PropTypes.func.isRequired,
  onPageSet: PropTypes.func.isRequired,
};

export default DataTable;

