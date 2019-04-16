import {
  Component, Input, Output, EventEmitter, OnInit, DoCheck, OnChanges, SimpleChanges
} from '@angular/core';
import { TabularColumn } from './tabular';
import { ITabularConfig } from './tabular-config.interface';
import { ActionConfigRouteType, IActionsConfig } from './actions-config.interface';
import { TabularSortByService, SortByDirection, ISortByProperty } from './tabular-sort-by.service';
import { TabularConfig } from './tabular.config';
import { TabularSize } from './tabular-size.enum';
import { ITabularColumnBadgeType, ITabularColumnIconType, TabularColumnTypes } from './tabular-column.interface';
import { ITabularRow } from './tabular-row.interface';
import { Context } from '../enums';
import * as _ from 'lodash';

@Component({
  selector: 'hxa-tabular',
  templateUrl: './tabular.component.html',
  styles: [
    '.tabular__sortable {}',
    '.tabular__sorter {cursor:pointer; display:flex; align-items: center;}',
    '.tabular__sorter .hx-icon {margin-left:.1rem;}',
    '.tabular__checkboxes{width:2%;}',
    '.tabular__checkboxes .hx-checkbox-control{display:flex;}',
    '.tabularActions__action button.hx-button{ width: 1rem;}',
    '.tabularActions__action {display:flex;}'
  ]
})


export class TabularComponent implements OnInit, DoCheck {

  /**
   * Collection of column models
   */
  @Input() columns: TabularColumn[];

  /**
   * Collection of data rows
   */
  // todo - this is not strict. should it be when it's dynamic?.
  @Input() rows: ITabularRow[];

  /**
   * Tabular configuration
   * IPaginationInstance, ISearchConfig
   */
  @Input()
  public get config(): ITabularConfig {
    return this._config;
  }
  public set config(c: ITabularConfig) {
    if (!c.sortBy) {
      c.sortBy = [];
    }
    this._config = c;
  }

  /** The function to call when a action item is clicked **/
  @Input()
  public get callback(): Function {
    return this._callback;
  }
  public set callback(Fn: Function) {
    this._callback = Fn;
  }


  /**
   * Search term is used in the simple search pipe
   * Array of objects: *ngFor="#row of rows | simpleSearch : 'the search term'"
   */
  @Input()
  public get searchTerm(): string {
    return this._searchTerm;
  }
  public set searchTerm(term: string) {
    this._searchTerm = term;
  }

  /**
   * Event fired when refresh is called.
   * Host should refresh data of input.
   */
  @Output() refresh: EventEmitter<boolean> = new EventEmitter<boolean>();

  /**
   * Event fired when a row is clicked.
   */
  @Output() rowClick: EventEmitter<any> = new EventEmitter<any>();


  /**
   * Event fired when a column is sorted
   */
  @Output() onSort: EventEmitter<ISortByProperty[]> = new EventEmitter<ISortByProperty[]>();

  /**
   * Event fired when selecting a checkbox on a tabular row
   */
  @Output() onCheck: EventEmitter<ITabularRow> = new EventEmitter<ITabularRow>();

  /**
   * Event fired when selecting a group checkbox on a tabular column
   */
  @Output() onCheckAll: EventEmitter<boolean> = new EventEmitter<boolean>();

  public oldRows: ITabularRow[] = [];
  public pagedItems: any[] = [];
  public TabularColumnTypes = TabularColumnTypes;
  public TabularSize = TabularSize;
  public ActionConfigRouteType = ActionConfigRouteType;
  public selectAll = false;
  public Context = Context;
  public SortByDirection = SortByDirection;
  protected _callback: Function;
  protected _config: ITabularConfig;
  protected _searchTerm: string;
  private _isSorting = false;


  constructor(
    private conf: TabularConfig,
    private sortByService: TabularSortByService
  ) {
    Object.assign(this, conf);
  }

  ngOnInit() {

  }

  ngDoCheck() {
    if (!_.isEqual(this.rows, this.oldRows)) {
      console.log(this.rows);
      console.log(this.oldRows);
      this.oldRows = _.cloneDeep(this.rows);

      if (!this._isSorting) {
        this.orderByData(false);
      }

      this._isSorting = false;
    }
  }

  /**
   * Calls the parsed callback with optional arguments
   */
  executeCallback(event: Event, cb: any[]) {
    if (cb.length) {
      if (cb.length === 1) { // if callback has no arguments
        cb[0]();
      } else { // if callback has 1 or more arguments
        const args: any[] = [];
        for (let i = 1; i < cb.length; i++) {
          args.push(cb[i]);
        }
        cb[0].apply(this, args);
      }
    }
  }

  toggleSelectAll = ($event) => {
    for (let i = 0; i < this.rows.length; i++) {
      this.rows[i].checked = this.selectAll;
    }
    this.onCheckAll.emit(this.selectAll);
  }


  toggleIndividualSelect = ($event: ITabularRow) => {
    let count = 0;
    for (let i = 0; i < this.rows.length; i++) {
      if (this.rows[i].checked) {
        count++;
      }
    }

    const oldSelectAll = this.selectAll;
    if (this.rows.length === count) {
      this.selectAll = true;
    } else {
      this.selectAll = false;
    }
    this.onCheck.emit($event);

    if (oldSelectAll !== this.selectAll) {
      this.onCheckAll.emit(this.selectAll)
    }
  }


  setPage($event: { page: number, itemsPerPage: number } = {
    page: this.config.pagination.currentPage,
    itemsPerPage: this.config.pagination.itemsPerPage
  }) {
    this.config.pagination.currentPage = $event.page;

    // calculate start and end page item indexes
    const startIndex: number = (this.config.pagination.currentPage - 1) * this.config.pagination.itemsPerPage;
    const endIndex: number = Math.min(startIndex + this.config.pagination.itemsPerPage - 1, this.totalItemCount - 1);

    this.pagedItems = this.rows.slice(startIndex, endIndex + 1);
  }


  /**
   * Get the action tooltip if it exists
   */
  getActionTooltip(action: IActionsConfig): string {
    return (action && action.disabledConfig) ? action.disabledConfig.tooltip : '';
  }


  getActionDisabledState(action: IActionsConfig): boolean {
    return (action && action.disabledConfig) ? action.disabledConfig.disabled : false;
  }


  /**
   * Handles the column header click event for sorting.
   * Sort order is Descending, Ascending followed by None.
   */
  onSortClickHandler(key: string, type: TabularColumnTypes) {

    const findPropInSortList = this.config.sortBy.filter((prop: ISortByProperty) => { return (prop.property === key); });

    if (findPropInSortList.length) {
      const prop = findPropInSortList[0];
      const index = this.config.sortBy.findIndex(x => x === prop);
      if (prop.direction === SortByDirection.None) {
        prop.direction = SortByDirection.Descending;
      } else if (prop.direction === SortByDirection.Descending) {
        prop.direction = SortByDirection.Ascending;
      } else if (prop.direction === SortByDirection.Ascending) {
        if (index > -1) {
          this.config.sortBy.splice(index, 1);
        }
      }
    } else {
      if (!this.config.multiSorting) {
        this.config.sortBy = [];
      }
      this.config.sortBy.push({ property: key, direction: SortByDirection.Descending, type: type });
    }

    this.orderByData(true);
    return false;
  }


  isColumnSorted(key: string, direction: SortByDirection): boolean {
    const findPropInSortList = this.config.sortBy.filter((prop: ISortByProperty) => { return (prop.property === key && prop.direction === direction); });
    return (findPropInSortList.length > 0);
  }


  /**
   * Handles the row click event.
   */
  onRowClickHandler($event: any, data: any) {
    const el: Element = $event.target;
    if (this.config.clickableRows) {
      if (el.parentElement.tagName === 'BUTTON' ||
        el.tagName === 'BUTTON' ||
        el.parentElement.classList.contains('hx-checkbox-control')) {
        return;
      }
      this.rowClick.emit(data);
    }
  }

  private orderByData(emitSortEvent: boolean) {
    if (this.config.sortBy.length > 0) {
      if (!this.config.remoteSorting) {
        this._isSorting = true;
        this.rows = [...this.rows]; // Required as array-sort-by mutates the original array
        this.sortByService.sortBy(this.rows, this.config.sortBy);
      }
    }
    if (emitSortEvent) {
      this.onSort.emit(this.config.sortBy);
    }
    this.setPage();
  }


  get totalItemCount(): number {
    return this.rows.length;
  }


  /**
   * Helper to determine if tabular instance is in small mode
   */
  isSmall(): boolean {
    return (this.config.size === TabularSize.Small);
  }


  hasValidBadgeTypeParams(colData: ITabularColumnBadgeType) {
    if (colData) {
      if (typeof colData.label !== 'undefined') {
        return true;
      } else {
        console.error('Record for column type badge is invalid, make sure you have the right type. ITabularColumnTypeBadge', { columnValue: colData });
      }
    }
    return false;
  }

  hasValidIconTypeParams(colData: ITabularColumnIconType) {
    let hasError = false;
    if (colData) {
      if (typeof colData.icon !== 'undefined') {
        if (typeof colData.tooltip.config !== 'undefined' && typeof colData.tooltip.content !== 'undefined') {
          if (typeof colData.tooltip.config.context !== 'undefined' || typeof colData.tooltip.config.placement !== 'undefined') {
            return true;
          } else {
            hasError = true;
          }
        } else {
          hasError = true;
        }
      } else {
        hasError = true;
      }
    }

    if (hasError) {
      console.error('Record for column type icon is invalid, make sure you have the right type. ITabularColumnTypeIcon', { columnValue: colData });
    }

    return false;
  }

  getTooltipContext(colData: ITabularColumnIconType): Context {
    return (!this.hasValidIconTypeParams(colData)) ? colData.tooltip.config.context : Context.None;
  }



  hasChildren(action: IActionsConfig): boolean {
    return (action.children && action.children.length > 0);
  }

  trackByFn(index, action) {
    return index; // or action.id
  }

}
