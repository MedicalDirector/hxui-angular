import { EventEmitter, OnInit, DoCheck, OnChanges, SimpleChanges } from '@angular/core';
import { TabularColumn } from './tabular';
import { ITabularConfig } from './tabular-config.interface';
import { IActionsConfig } from './actions-config.interface';
import { TabularSortByService, SortByDirection } from './tabular-sort-by.service';
import { TabularConfig } from './tabular.config';
import { TabularColumnTypes } from './tabular-column.interface';
import { ITabularRow } from './tabular-row.interface';
export declare class TabularComponent implements OnInit, DoCheck, OnChanges {
    private conf;
    private sortByService;
    /**
     * Collection of column models
     */
    columns: TabularColumn[];
    /**
     * Collection of data rows
     */
    rows: ITabularRow[];
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
     */
    refresh: EventEmitter<boolean>;
    /**
     * Event fired when a row is clicked.
     */
    rowClick: EventEmitter<any>;
    private oldRows;
    private changeDetected;
    private pagedItems;
    private TabularColumnTypes;
    private TabularSize;
    private selectAll;
    private Context;
    private SortByDirection;
    protected _callback: Function;
    protected _config: ITabularConfig;
    protected _searchTerm: string;
    constructor(conf: TabularConfig, sortByService: TabularSortByService);
    ngOnInit(): void;
    ngDoCheck(): void;
    ngOnChanges(changes: SimpleChanges): void;
    /**
     * Calls the parsed callback with optional arguments
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
     */
    getActionTooltip(action: IActionsConfig): string;
    getActionDisabledState(action: IActionsConfig): boolean;
    /**
     * Handles the column header click event for sorting.
     * Sort order is Descending, Ascending followed by None.
     */
    onSortClickHandler(key: string, type: TabularColumnTypes): boolean;
    isColumnSorted(key: string, direction: SortByDirection): boolean;
    /**
     * Handles the row click event.
     */
    private onRowClickHandler(data);
    private orderByData();
    readonly totalItemCount: number;
    /**
     * Helper to determine if tabular instance is in small mode
     */
    private isSmall();
    private hasValidBadgeTypeParams(colData);
    private getDefaultAction(actions);
    private hasDefaultAction(actions);
    private getDefaultActionName(actions);
    private getDefaultActionCallback(actions);
}
