import {
  Component, Input, Output, EventEmitter, OnInit, DoCheck
} from '@angular/core';
import {TabularColumn} from './tabular';
import {ITabularConfig} from './tabular-config.interface';
import {IActionsConfig} from './actions-config.interface';
import {TabularOrderByService, OrderByDirection} from './tabular-order-by.service';
import {TabularConfig} from './tabular.config';
import {TabularSize} from './tabular-size.enum';
import {TabularColumnTypes} from './tabular-column.interface';


@Component({
  selector: 'hxa-tabular',
  template: `<table class="tabular hx-table is-striped" [class.is-narrow]="config.size === TabularSize.Small">
    <thead>
    <tr>
      <th *ngFor="let col of columns" class="{{col.cssClass}} tabular__{{col.label}}" [ngClass]="{'tabular__checkboxes': col.dataType === 6}">

        <!-- sortable column -->
        <a class="tabular__sorter" href="#" *ngIf="col.sortable && col.dataType != 6" (click)="onSortClickHandler(col.id)"><i class="hx-icon {{iconDirection}} is-small" *ngIf="orderBy == col.id"></i> {{col.label}}</a>

        <!-- non sortable column -->
        <span *ngIf="!col.sortable && col.dataType != 6">{{col.label}}</span>

        <!-- checkbox column -->
        <div *ngIf="col.dataType == 6" class="hx-checkbox-control">
          <input id="selectAll" name="selectAll" type="checkbox" class="hx-checkbox" (change)="toggleSelectAll($event)" title="Select All" [(ngModel)]="selectAll" />
          <label for="selectAll" class="hx-label"></label>
        </div>
      </th>
    </tr>
    </thead>

    <tbody>
    <!--<tr *ngFor="let row of rows | paginate: config.pagination | simpleSearch: searchTerm">-->
    <tr *ngFor="let row of pagedItems | simpleSearch: searchTerm">
      <td *ngFor="let col of columns" class="{{col.cssClass}} tabular__{{col.label}}" [ngClass]="{'tabular__checkboxes': col.dataType === 6}">

        <!-- string type -->
        <span *ngIf="col.dataType == TabularColumnTypes.String" title="{{row[col.id]}}">{{row[col.id]}}</span>

        <!-- icon type -->
        <i *ngIf="col.dataType == TabularColumnTypes.Icon" class="icon {{row[col.id]}}"></i>

        <!-- date type -->
        <span *ngIf="col.dataType == TabularColumnTypes.Date">{{row[col.id] | date:'d/M/yyyy'}}</span>

        <!-- status type -->
        <span *ngIf="col.dataType == TabularColumnTypes.Status" class="hx-icon" [ngClass]="{'is-primary':row[col.id],'is-danger':!row[col.id], 'icon-check-empty': row[col.id], 'icon-close-empty':!row[col.id]}" ></span>

        <!-- badge type -->
        <span *ngIf="col.dataType == TabularColumnTypes.Badge && hasValidBadgeTypeParams(row[col.id])" class="hx-badge is-small {{row[col.id].cssClass}}"><span class="hx-badge-content">{{row[col.id].label}}</span></span>
        
        <!-- date time type -->
        <span *ngIf="col.dataType == TabularColumnTypes.DateTime">{{row[col.id] | date:'d/M/yyy h:mm a'}}</span>

        <!-- actions type -->
        <div *ngIf="col.dataType == TabularColumnTypes.Actions" class="hx-dropdown tabularActions">


          <div class="tabularActions__action">
            <div class="hx-dropdown" hxDropdown [isRight]="true">

              <ng-template *ngIf="!hasDefaultAction(row[col.id]); else splitBtn">
              <!-- collection of actions DOES NOT have a default -->
              <button class="hx-button is-flat hx-button-dropdown" [class.is-small]="config.size === TabularSize.Small" hxDropdownToggle type="button">
                <i class="icon icon-more"></i>
              </button>
              </ng-template>
              <ng-template #splitBtn>
              <!-- collection of actions DOES have a default -->
              <div class="hx-button-split">
                <button type="button" class="hx-button is-flat" [class.is-small]="config.size === TabularSize.Small"  (click)='executeCallback($event,getDefaultActionCallback(row[col.id]))' [innerHtml]="getDefaultActionName(row[col.id])"></button>
                <button type="button" class="hx-button is-flat" [class.is-small]="config.size === TabularSize.Small" hxDropdownToggle><i class="icon icon-more"></i></button>
              </div>
              </ng-template>
              
              <div class="hx-dropdown-menu" *hxDropdownMenu>

                <ng-container *ngFor="let action of row[col.id]">
                  <a *ngIf="!getActionDisabledState(action) && action.routeType==0 && !action.isDefault"
                     [routerLink]="action.route"
                     class="hx-dropdown-item {{action.css}}"
                     [innerHTML]="action.label">
                  </a>
                  <a *ngIf="!getActionDisabledState(action) && action.routeType==1 && !action.isDefault"
                     (click)='executeCallback($event,action.callback)'
                     class="hx-dropdown-item {{action.css}}"
                     [innerHTML]="action.label">
                  </a>
                </ng-container>

              </div>

            </div>

          </div>
        </div>

        <!-- checkbox type -->
        <div *ngIf="col.dataType == 6" class="hx-checkbox-control">
          <input id="checkbox-{{row.id}}" name="{{col.label}}-checkbox" type="checkbox" class="hx-checkbox" title="{{col.label}}" (change)="toggleIndividualSelect($event)" [(ngModel)]="row.selected" />
          <label for="checkbox-{{row.id}}" class="hx-label"></label>
        </div>

      </td>
    </tr>
    </tbody>
  </table>

  <hx-pagination [directionLinks]="true" [boundaryLinks]="true" [rotate]="false" [maxSize]="10"
                 [totalItems]="totalItemCount" [itemsPerPage]="config.pagination.itemsPerPage"
                 [(ngModel)]="config.pagination.currentPage" (pageChanged)="setPage($event)" *ngIf="totalItemCount > config.pagination.itemsPerPage"></hx-pagination>
  `,
  styles: [
    '.tabular__sorter{position:relative;cursor:pointer} th .icon{position: absolute;left:-1rem;}',
    '.tabular__checkboxes{width:2%;}',
    '.tabular__checkboxes .hx-checkbox-control{margin:0;display:flex;}',
    '.tabularActions__action button.hx-button{ width: 1rem;}'
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
   */
  @Output() refresh: EventEmitter<boolean> = new EventEmitter<boolean>();


  private defaultOrderBy: Array<string> = ['id'];
  private defaultOrderByDirection: OrderByDirection;
  private TabularColumnTypes = TabularColumnTypes;
  private TabularSize = TabularSize;
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
    return (this.defaultOrderByDirection === OrderByDirection.Ascending) ? ' icon-arrow-up' : ' icon-arrow-down';
  }

  /**
   * Calls the parsed callback with optional arguments
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
   */
  private getActionTooltip(action: IActionsConfig): string {
    return (action && action.disabledConfig) ? action.disabledConfig.tooltip : '';
  }


  private getActionDisabledState(action: IActionsConfig): boolean {
    return (action && action.disabledConfig) ? action.disabledConfig.disabled : false;
  }


  /**
   * Handles the column header click event.
   */
  private onSortClickHandler(key: string) {
    this.orderBy = ([key] === this.orderBy) ? this.defaultOrderBy : [key];
    this.orderByData();
    return false;
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
   */
  private isSmall(): boolean {
    return (this.config.size === TabularSize.Small);
  }


  private hasValidBadgeTypeParams(colData) {
    if (colData) {
      if (typeof colData.label !== 'undefined' && typeof colData.cssClass !== 'undefined') {
        return true;
      } else {
        console.error('Record for column type badge is invalid, make sure you have the right type. {label:string,cssClass:string}', colData);
      }
    }
    return false;
  }

  private getDefaultAction(actions: IActionsConfig[]): IActionsConfig {
    const action = actions.find(function (a) { return a.isDefault; });
    return action;
  }

  private hasDefaultAction(actions: IActionsConfig[]): boolean {
    return (typeof this.getDefaultAction(actions) !== 'undefined');
  }

  private getDefaultActionName(actions: IActionsConfig[]) {
    const action = this.getDefaultAction(actions);
    return (action) ? action.label : '';
  }

  private getDefaultActionCallback(actions: IActionsConfig[]) {
    const action = this.getDefaultAction(actions);
    return (action) ? action.callback : {};
  }

}
