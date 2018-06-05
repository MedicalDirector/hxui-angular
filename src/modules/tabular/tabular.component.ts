import {
  Component, Input, Output, EventEmitter, OnInit, DoCheck, OnChanges, SimpleChanges
} from '@angular/core';
import {TabularColumn} from './tabular';
import {ITabularConfig} from './tabular-config.interface';
import {ActionConfigRouteType, IActionsConfig} from './actions-config.interface';
import {TabularSortByService, SortByDirection, ISortByProperty} from './tabular-sort-by.service';
import {TabularConfig} from './tabular.config';
import {TabularSize} from './tabular-size.enum';
import {TabularColumnTypes} from './tabular-column.interface';
import {ITabularRow} from './tabular-row.interface';
import {Context} from '../enums';
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


export class TabularComponent implements OnInit, DoCheck, OnChanges {

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
  public get config(): ITabularConfig  {
    return this._config;
  }
  public set config(c: ITabularConfig)  {
    if (!c.sortBy) {
      c.sortBy = [];
    }
    this._config = c;
  }

  /** The function to call when a action item is clicked **/
  @Input()
  public get callback(): Function{
    return this._callback;
  }
  public set callback(Fn: Function){
    this._callback = Fn;
  }


  /**
   * Search term is used in the simple search pipe
   * Array of objects: *ngFor="#row of rows | simpleSearch : 'the search term'"
   */
  @Input()
  public get searchTerm(): string{
    return this._searchTerm;
  }
  public set searchTerm(term: string){
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


  private oldRows: ITabularRow[] = [];
  private changeDetected: boolean;
  private pagedItems: any[] = [];
  private TabularColumnTypes = TabularColumnTypes;
  private TabularSize = TabularSize;
  private ActionConfigRouteType = ActionConfigRouteType;
  private selectAll = false;
  private Context = Context;
  private SortByDirection = SortByDirection;
  protected _callback: Function;
  protected _config: ITabularConfig;
  protected _searchTerm: string;


  public constructor(
    private conf: TabularConfig,
    private sortByService: TabularSortByService
  ) {
    Object.assign(this, conf);
  }

  ngOnInit() {

  }

  ngDoCheck() {
    if (!_.isEqual(this.rows, this.oldRows)) {
      this.oldRows = _.cloneDeep(this.rows);
      this.orderByData();
    }
  }

  ngOnChanges(changes: SimpleChanges) {
  }


  /**
   * Calls the parsed callback with optional arguments
   */
  private executeCallback(event: Event, cb: any[]) {
    event.stopPropagation();
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


  private toggleSelectAll = () => {
    for (let i = 0; i < this.rows.length; i++) {
      this.rows[i].checked = this.selectAll;
    }
  }


  private toggleIndividualSelect = () => {
    let count = 0;
    for (let i = 0; i < this.rows.length; i++) {
      if (this.rows[i].checked) {
        count++;
      }
    }
    this.selectAll = (this.rows.length === count);
  }


  setPage($event: {page: number, itemsPerPage: number} = {
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
      }  else if (prop.direction === SortByDirection.Ascending) {
        if (index > -1) {
          this.config.sortBy.splice(index, 1);
        }
      }
    } else {
      this.config.sortBy.push({property: key, direction: SortByDirection.Descending, type: type});
    }

    this.orderByData();
    return false;
  }


  isColumnSorted(key: string, direction: SortByDirection): boolean {
    const findPropInSortList = this.config.sortBy.filter((prop: ISortByProperty) => { return (prop.property === key && prop.direction === direction); });
    return (findPropInSortList.length > 0);
  }


  /**
   * Handles the row click event.
   */
  private onRowClickHandler(data: any) {
    if (this.config.clickableRows) {
      this.rowClick.emit(data);
    }
  }

  private orderByData() {
    if (this.config.sortBy.length > 0) {
      this.rows = [...this.rows]; // Required as array-sort-by mutates the original array
      this.sortByService.sortBy(this.rows, this.config.sortBy);
    }
    this.setPage();
  }


  get totalItemCount(): number{
    return this.rows.length;
  }


  /**
   * Helper to determine if tabular instance is in small mode
   */
  isSmall(): boolean {
    return (this.config.size === TabularSize.Small);
  }


  hasValidBadgeTypeParams(colData) {
    if (colData) {
      if (typeof colData.label !== 'undefined' && typeof colData.cssClass !== 'undefined') {
        return true;
      } else {
        console.error('Record for column type badge is invalid, make sure you have the right type. {label:string,cssClass:string}', colData);
      }
    }
    return false;
  }


  hasChildren(action: IActionsConfig): boolean {
    return (action.children && action.children.length > 0);
  }

  trackByFn(index, action) {
    return index; // or action.id
  }

}
