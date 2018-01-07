import { Injectable } from '@angular/core';
import { ITabularConfig } from './tabular-config.interface';
import { OrderByDirection } from './tabular-order-by.service';
import { TabularSize } from './tabular-size.enum';
/**
 * Configuration service, provides default values for the NavComponent.
 */
var TabularConfig = /** @class */ (function () {
    function TabularConfig() {
        /**
             * Tabular configuration
             * IPaginationInstance, ISearchConfig
             */
        this.config = {
            size: TabularSize.Default,
            pagination: {
                itemsPerPage: 5,
                currentPage: 1
            },
        };
        /**
             * Default order by value
             * @type {string[]}
             */
        this.defaultOrderBy = ['id'];
        /**
             * Default order by direction
             * @type OrderByDirection
             */
        this.defaultOrderByDirection = OrderByDirection.Ascending;
    }
    TabularConfig.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    TabularConfig.ctorParameters = function () { return []; };
    return TabularConfig;
}());
export { TabularConfig };
//# sourceMappingURL=tabular.config.js.map