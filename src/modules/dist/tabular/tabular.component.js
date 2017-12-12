import { Component, Input, Output, EventEmitter, OnInit, DoCheck } from '@angular/core';
import { TabularColumn } from './tabular';
import { ITabularConfig } from './tabular-config.interface';
import { IActionsConfig } from './actions-config.interface';
import { TabularOrderByService, OrderByDirection } from './tabular-order-by.service';
import { TabularConfig } from './tabular.config';
import { TabularSize } from './tabular-size.enum';
var TabularComponent = /** @class */ (function () {
    function TabularComponent(conf, orderByService) {
        var _this = this;
        this.conf = conf;
        this.orderByService = orderByService;
        /**
           * Event fired when refresh is called.
           * Host should refresh data of input.
           * @type {EventEmitter<any>}
           */
        this.refresh = new EventEmitter();
        this.defaultOrderBy = ['id'];
        this.selectAll = false;
        /**
           * Order by used by orderBy service
           * @example *ngFor="#person of people | orderBy : ['-age', 'firstName']"
           * @example *ngFor="#person of people | orderBy : ['+age', 'firstName']"
           */
        this.orderBy = this.defaultOrderBy;
        this.toggleSelectAll = function () {
            for (var i = 0; i < _this.rows.length; i++) {
                _this.rows[i].selected = _this.selectAll;
            }
        };
        this.toggleIndividualSelect = function () {
            var count = 0;
            for (var i = 0; i < _this.rows.length; i++) {
                if (_this.rows[i].selected) {
                    count++;
                }
            }
            _this.selectAll = (_this.rows.length === count);
        };
        Object.assign(this, conf);
    }
    Object.defineProperty(TabularComponent.prototype, "config", {
        get: /**
           * Tabular configuration
           * IPaginationInstance, ISearchConfig
           */
        function () {
            return this._config;
        },
        set: function (c) {
            this._config = c;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TabularComponent.prototype, "callback", {
        get: /** The function to call when a action item is clicked **/
        function () {
            return this._callback;
        },
        set: function (Fn) {
            this._callback = Fn;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TabularComponent.prototype, "searchTerm", {
        get: /**
           * Search term is used in the simple search pipe
           * Array of objects: *ngFor="#row of rows | simpleSearch : 'the search term'"
           */
        function () {
            return this._searchTerm;
        },
        set: function (term) {
            this._searchTerm = term;
        },
        enumerable: true,
        configurable: true
    });
    TabularComponent.prototype.ngOnInit = function () {
    };
    TabularComponent.prototype.ngDoCheck = function () {
        this.setPage();
    };
    Object.defineProperty(TabularComponent.prototype, "iconDirection", {
        get: function () {
            return (this.defaultOrderByDirection === OrderByDirection.Ascending) ? 'icon-sort-asc' : 'icon-sort-desc';
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Calls the parsed callback with optional arguments
     * @param event
     * @param cb
     * @returns {boolean}
     */
    /**
       * Calls the parsed callback with optional arguments
       * @param event
       * @param cb
       * @returns {boolean}
       */
    TabularComponent.prototype.executeCallback = /**
       * Calls the parsed callback with optional arguments
       * @param event
       * @param cb
       * @returns {boolean}
       */
    function (event, cb) {
        if (cb.length) {
            if (cb.length === 1) {
                // if callback has no arguments
                cb[0]();
            }
            else {
                // if callback has 1 or more arguments
                var args = [];
                for (var i = 1; i < cb.length; i++) {
                    args.push(cb[i]);
                }
                cb[0].apply(this, args);
            }
        }
        return false;
    };
    TabularComponent.prototype.setPage = function ($event) {
        if ($event === void 0) { $event = {
            page: this.config.pagination.currentPage,
            itemsPerPage: this.config.pagination.itemsPerPage
        }; }
        this.config.pagination.currentPage = $event.page;
        // calculate start and end page item indexes
        var startIndex = (this.config.pagination.currentPage - 1) * this.config.pagination.itemsPerPage;
        var endIndex = Math.min(startIndex + this.config.pagination.itemsPerPage - 1, this.totalItemCount - 1);
        this.pagedItems = this.rows.slice(startIndex, endIndex + 1);
    };
    /**
     * Get the action tooltip if it exists
     * @param action
     * @returns {string}
       */
    /**
       * Get the action tooltip if it exists
       * @param action
       * @returns {string}
         */
    TabularComponent.prototype.getActionTooltip = /**
       * Get the action tooltip if it exists
       * @param action
       * @returns {string}
         */
    function (action) {
        return (action && action.disabledConfig) ? action.disabledConfig.tooltip : '';
    };
    TabularComponent.prototype.getActionDisabledState = function (action) {
        return (action && action.disabledConfig) ? action.disabledConfig.disabled : false;
    };
    /**
     * Handles the column header click event.
     * @param key
     */
    /**
       * Handles the column header click event.
       * @param key
       */
    TabularComponent.prototype.onSortClickHandler = /**
       * Handles the column header click event.
       * @param key
       */
    function (key) {
        this.orderBy = ([key] === this.orderBy) ? this.defaultOrderBy : [key];
        this.orderByData();
    };
    /**
     * Order collection via full collection and not via pipe.
     * The pagination pipe will only return the paginated amount.
     * Which means the order by filter will only be applied to whats paginated
     * and not the full collection.
     */
    /**
       * Order collection via full collection and not via pipe.
       * The pagination pipe will only return the paginated amount.
       * Which means the order by filter will only be applied to whats paginated
       * and not the full collection.
       */
    TabularComponent.prototype.orderByData = /**
       * Order collection via full collection and not via pipe.
       * The pagination pipe will only return the paginated amount.
       * Which means the order by filter will only be applied to whats paginated
       * and not the full collection.
       */
    function () {
        var direction;
        if (this.defaultOrderByDirection === OrderByDirection.Ascending) {
            direction = '-';
            this.defaultOrderByDirection = OrderByDirection.Descending;
        }
        else {
            direction = '+';
            this.defaultOrderByDirection = OrderByDirection.Ascending;
        }
        this.orderByService.doTransform(this.rows, [direction + this.orderBy[0]]);
        this.setPage();
    };
    Object.defineProperty(TabularComponent.prototype, "totalItemCount", {
        get: function () {
            return this.rows.length;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Helper to determine if tabular instance is in small mode
     * @returns {boolean}
     */
    /**
       * Helper to determine if tabular instance is in small mode
       * @returns {boolean}
       */
    TabularComponent.prototype.isSmall = /**
       * Helper to determine if tabular instance is in small mode
       * @returns {boolean}
       */
    function () {
        return (this.config.size === TabularSize.Small);
    };
    TabularComponent.decorators = [
        { type: Component, args: [{
                    selector: 'hx-tabular',
                    template: "<table class=\"tabular hx-table is-striped\">\n    <thead>\n    <tr>\n      <th *ngFor=\"let col of columns\" class=\"{{col.cssClass}} tabular__{{col.label}}\" [ngClass]=\"{'tabular__checkboxes': col.dataType === 6}\">\n\n        <!-- sortable column -->\n        <a class=\"tabular__sorter\" *ngIf=\"col.sortable && col.dataType != 6\" (click)=\"onSortClickHandler(col.id)\">{{col.label}}<i class=\"icon {{iconDirection}}\" *ngIf=\"orderBy == col.id\"></i></a>\n\n        <!-- non sortable column -->\n        <span *ngIf=\"!col.sortable && col.dataType != 6\">{{col.label}}</span>\n\n        <!-- checkbox column -->\n        <div *ngIf=\"col.dataType == 6\" class=\"hx-checkbox-control\">\n          <input id=\"selectAll\" name=\"selectAll\" type=\"checkbox\" class=\"hx-checkbox\" (change)=\"toggleSelectAll($event)\" title=\"Select All\" [(ngModel)]=\"selectAll\" />\n          <label for=\"selectAll\" class=\"hx-label\"></label>\n        </div>\n      </th>\n    </tr>\n    </thead>\n\n    <tbody>\n    <!--<tr *ngFor=\"let row of rows | paginate: config.pagination | simpleSearch: searchTerm\">-->\n    <tr *ngFor=\"let row of pagedItems | simpleSearch: searchTerm\">\n      <td *ngFor=\"let col of columns\" class=\"{{col.cssClass}} tabular__{{col.label}}\" [ngClass]=\"{'tabular__checkboxes': col.dataType === 6}\">\n\n        <!-- string type -->\n        <span *ngIf=\"col.dataType == 0\">{{row[col.id]}}</span>\n\n        <!-- icon type -->\n        <i *ngIf=\"col.dataType == 1\" class=\"icon {{row[col.id]}}\"></i>\n\n        <!-- date type -->\n        <span *ngIf=\"col.dataType == 2\">{{row[col.id] | date}}</span>\n\n        <!-- status type -->\n        <span *ngIf=\"col.dataType == 4\" class=\"hx-badge text-uppercase\" [ngClass]=\"{'is-primary':row[col.id],'is-danger':!row[col.id]}\">{{(row[col.id])?'ACTIVE':'INACTIVE'}}</span>\n\n        <!-- date time type -->\n        <span *ngIf=\"col.dataType == 5\">{{row[col.id] | date:'medium'}}</span>\n\n        <!-- actions type -->\n        <div *ngIf=\"col.dataType==3\" class=\"hx-dropdown tabularActions\">\n\n\n          <div class=\"tabularActions__action\">\n            <div class=\"hx-dropdown\" hxDropdown [isRight]=\"true\">\n\n              <button class=\"hx-button is-small hx-button-dropdown\" hxDropdownToggle type=\"button\">\n                <i class=\"icon icon-more\"></i>\n              </button>\n              <div class=\"hx-dropdown-menu\" *hxDropdownMenu>\n\n                <ng-container *ngFor=\"let action of row[col.id]\">\n                  <a *ngIf=\"!getActionDisabledState(action) && action.routeType==0\"\n                     [routerLink]=\"action.route\"\n                     class=\"hx-dropdown-item {{action.css}}\"\n                     [innerHTML]=\"action.label\">\n                  </a>\n                  <a *ngIf=\"!getActionDisabledState(action) && action.routeType==1\"\n                     (click)='executeCallback($event,action.callback)'\n                     class=\"hx-dropdown-item {{action.css}}\"\n                     [innerHTML]=\"action.label\">\n                  </a>\n                </ng-container>\n\n              </div>\n\n            </div>\n\n          </div>\n        </div>\n\n        <!-- checkbox type -->\n        <div *ngIf=\"col.dataType == 6\" class=\"hx-checkbox-control\">\n          <input id=\"checkbox-{{row.id}}\" name=\"{{col.label}}-checkbox\" type=\"checkbox\" class=\"hx-checkbox\" title=\"{{col.label}}\" (change)=\"toggleIndividualSelect($event)\" [(ngModel)]=\"row.selected\" />\n          <label for=\"checkbox-{{row.id}}\" class=\"hx-label\"></label>\n        </div>\n\n      </td>\n    </tr>\n    </tbody>\n  </table>\n\n  <hx-pagination [directionLinks]=\"true\" [boundaryLinks]=\"true\" [rotate]=\"false\" [maxSize]=\"10\"\n                 [totalItems]=\"totalItemCount\" [itemsPerPage]=\"config.pagination.itemsPerPage\"\n                 [(ngModel)]=\"config.pagination.currentPage\" (pageChanged)=\"setPage($event)\"></hx-pagination>\n  ",
                    styles: [
                        '.tabular__sorter{position:relative;cursor:pointer} th .icon{position: absolute;}',
                        '.tabular__checkboxes{width:2%;}',
                        '.tabular__checkboxes .hx-checkbox-control{margin:0;display:flex;}'
                    ]
                },] },
    ];
    /** @nocollapse */
    TabularComponent.ctorParameters = function () { return [
        { type: TabularConfig, },
        { type: TabularOrderByService, },
    ]; };
    TabularComponent.propDecorators = {
        "columns": [{ type: Input },],
        "rows": [{ type: Input },],
        "config": [{ type: Input },],
        "callback": [{ type: Input },],
        "searchTerm": [{ type: Input },],
        "refresh": [{ type: Output },],
    };
    return TabularComponent;
}());
export { TabularComponent };
//# sourceMappingURL=tabular.component.js.map