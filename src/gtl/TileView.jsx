import * as React from 'react';
import PropTypes from 'prop-types';
import findIndex from 'lodash/findIndex';

import { renderPagination } from './utils';

import { TileCard } from './TileCard';

import './styles.scss';

/* eslint max-len: "off" */

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

const limitToSuffix = (value, start, end) =>
  (value.length > start + end + 3 ? `${value.slice(0, start)}...${value.slice(-end)}` : value);

export const TileView = ({
  rows,
  columns,
  settings,
  isLoading,
  pagination,
  total,
  onItemClick,
  /* eslint-disable-next-line */
  onItemSelect,
  onPerPageSelect,
  onPageSet,
}) => {
  const fetchTileName = (item) => {
    const nameIndex = findIndex(columns, oneColumn => oneColumn.text && oneColumn.text.indexOf('Name') !== -1);
    return (nameIndex !== -1 && item.cells && item.cells[nameIndex]) ?
      item.cells[nameIndex].text :
      item.cells[2].text;
  };

  const renderItem = (item) => {
    const tileName = fetchTileName(item);

    return (
      <TileCard
        text={limitToSuffix(tileName, 5, 5)}
        title={tileName}
        item={item}
        onItemClick={onItemClick}
        onItemSelect={onItemSelect}
      />
    );
  };

  const renderCardView = rows => (
    //  className="pf-card-view"
    // config="tileCtrl.options"
    <div
      className="miq-small-tile miq-sand-paper miq-tile-view"
    >
      <div className="card-view-pf">
        { rows.map(i => renderItem(i)) }
      </div>
    </div>
  );

  const isVisible = settings && settings.sortBy && (isLoading || rows.length !== 0);
  console.log('TileView settings, props: ', settings, rows);
  console.log('TileView isLoading: ', isLoading);
  console.log('TileView isVisible: ', isVisible);

  return (
    <div className="miq-tile-section">
      { isLoading && <div className="spinner spinner-lg" /> }
      { isVisible &&
          renderPagination({
            pagination, total, onPerPageSelect, onPageSet,
          })
      }
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
  pagination: PropTypes.any.isRequired,
  total: PropTypes.number.isRequired,
  isLoading: PropTypes.bool,
  onItemClick: PropTypes.func,
  onItemSelect: PropTypes.func,
  onPerPageSelect: PropTypes.func.isRequired,
  onPageSet: PropTypes.func.isRequired,
};
