import { EventEmitter, OnInit, DoCheck } from '@angular/core';
import { TabularColumn } from './tabular';
import { ITabularConfig } from './tabular-config.interface';
import { TabularOrderByService } from './tabular-order-by.service';
import { TabularConfig } from './tabular.config';
export declare class TabularComponent implements OnInit, DoCheck {
    private conf;
    private orderByService;
    /**
     * Collection of column models
     */
    columns: Array<TabularColumn>;
    /**
     * Collection of data rows
     */
    rows: Array<any>;
    /**
     * Tabular configuration
     * IPaginationInstance, ISearchConfig
     */
    config: ITabularConfig;
    /** The function to call when a action item is clicked **/
    callback: Function;
    /**
     * Search term is used in the simple search pipe
     * Array of objects: *ngFor="#row of rows | simpleSearch : 'the search term'"
     */
    searchTerm: string;
    /**
     * Event fired when refresh is called.
     * Host should refresh data of input.
     * @type {EventEmitter<any>}
     */
    refresh: EventEmitter<boolean>;
    private defaultOrderBy;
    private defaultOrderByDirection;
    pagedItems: any[];
    private selectAll;
    protected _callback: Function;
    protected _config: ITabularConfig;
    protected _searchTerm: string;
    /**
     * Order by used by orderBy service
     * @example *ngFor="#person of people | orderBy : ['-age', 'firstName']"
     * @example *ngFor="#person of people | orderBy : ['+age', 'firstName']"
     */
    orderBy: Array<string>;
    constructor(conf: TabularConfig, orderByService: TabularOrderByService);
    ngOnInit(): void;
    ngDoCheck(): void;
    private readonly iconDirection;
    /**
     * Calls the parsed callback with optional arguments
     * @param event
     * @param cb
     * @returns {boolean}
     */
    private executeCallback(event, cb);
    private toggleSelectAll;
    private toggleIndividualSelect;
    setPage($event?: {
        page: number;
        itemsPerPage: number;
    }): void;
    /**
     * Get the action tooltip if it exists
     * @param action
     * @returns {string}
       */
    private getActionTooltip(action);
    private getActionDisabledState(action);
    /**
     * Handles the column header click event.
     * @param key
     */
    private onSortClickHandler(key);
    /**
     * Order collection via full collection and not via pipe.
     * The pagination pipe will only return the paginated amount.
     * Which means the order by filter will only be applied to whats paginated
     * and not the full collection.
     */
    private orderByData();
    readonly totalItemCount: number;
    /**
     * Helper to determine if tabular instance is in small mode
     * @returns {boolean}
     */
    private isSmall();
}
