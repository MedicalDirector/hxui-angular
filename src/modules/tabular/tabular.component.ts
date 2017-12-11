import {
  Component, Input, Output, EventEmitter, OnInit, DoCheck
} from '@angular/core';
import {TabularColumn} from './tabular';
import {ITabularConfig} from './tabular-config.interface';
import {IActionsConfig} from './actions-config.interface';
import {TabularOrderByService, OrderByDirection} from './tabular-order-by.service';
import {TabularConfig} from './tabular.config';
import {TabularSize} from './tabular-size.enum';


@Component({
  selector: 'hx-tabular',
  templateUrl: './tabular.tpl.html',
  styles: [
    '.tabular__sorter{position:relative;cursor:pointer} th .icon{position: absolute;}',
    '.tabular__checkboxes{width:2%;}',
    '.tabular__checkboxes .hx-checkbox-control{margin:0;display:flex;}'
  ]
})


export class TabularComponent implements OnInit, DoCheck {

  /**
   * Collection of column models
   */
  @Input() columns: Array<TabularColumn>;

  /**
   * Collection of data rows
   */
  // todo - this is not strict. should it be when it's dynamic?.
   @Input() rows: Array<any>;


  /**
   * Tabular configuration
   * IPaginationInstance, ISearchConfig
   */
  @Input()
  public get config(): ITabularConfig  {
    return this._config;
  }
  public set config(c: ITabularConfig)  {
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
   * @type {EventEmitter<any>}
   */
  @Output() refresh: EventEmitter<boolean> = new EventEmitter<boolean>();


  private defaultOrderBy: Array<string> = ['id'];
  private defaultOrderByDirection: OrderByDirection;
  pagedItems: any[];
  private selectAll = false;
  protected _callback: Function;
  protected _config: ITabularConfig;
  protected _searchTerm: string;

  /**
   * Order by used by orderBy service
   * @example *ngFor="#person of people | orderBy : ['-age', 'firstName']"
   * @example *ngFor="#person of people | orderBy : ['+age', 'firstName']"
   */
  public orderBy: Array<string> = this.defaultOrderBy;


  public constructor(private conf: TabularConfig,
                     private orderByService: TabularOrderByService) {
    Object.assign(this, conf);
  }

  ngOnInit() {
  }

  ngDoCheck() {
    this.setPage();
  }

  private get iconDirection(): string{
    return (this.defaultOrderByDirection === OrderByDirection.Ascending) ? 'icon-sort-asc' : 'icon-sort-desc';
  }

  /**
   * Calls the parsed callback with optional arguments
   * @param event
   * @param cb
   * @returns {boolean}
   */
  private executeCallback(event: Event, cb: any[]) {
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
    return false;
  }


  private toggleSelectAll = () => {
    for (let i = 0; i < this.rows.length; i++) {
      this.rows[i].selected = this.selectAll;
    }
  }


  private toggleIndividualSelect = () => {
    let count = 0;
    for (let i = 0; i < this.rows.length; i++) {
      if (this.rows[i].selected) {
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
   * @param action
   * @returns {string}
     */
  private getActionTooltip(action: IActionsConfig): string{
    return (action && action.disabledConfig) ? action.disabledConfig.tooltip : '';
  }


  private getActionDisabledState(action: IActionsConfig): boolean {
    return (action && action.disabledConfig) ? action.disabledConfig.disabled : false;
  }


  /**
   * Handles the column header click event.
   * @param key
   */
  private onSortClickHandler(key: string) {
    this.orderBy = ([key] === this.orderBy) ? this.defaultOrderBy : [key];
    this.orderByData();
  }



  /**
   * Order collection via full collection and not via pipe.
   * The pagination pipe will only return the paginated amount.
   * Which means the order by filter will only be applied to whats paginated
   * and not the full collection.
   */
  private orderByData() {
    let direction: string;
    if (this.defaultOrderByDirection === OrderByDirection.Ascending) {
      direction = '-';
      this.defaultOrderByDirection = OrderByDirection.Descending;
    } else {
      direction = '+';
      this.defaultOrderByDirection = OrderByDirection.Ascending;
    }

    this.orderByService.doTransform(this.rows, [direction + this.orderBy[0]]);
    this.setPage();
  }


  get totalItemCount(): number{
    return this.rows.length;
  }


  /**
   * Helper to determine if tabular instance is in small mode
   * @returns {boolean}
   */
  private isSmall(): boolean {
    return (this.config.size === TabularSize.Small);
  }

}
