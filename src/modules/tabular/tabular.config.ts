import { Injectable } from '@angular/core';
import {ITabularConfig} from './tabular-config.interface';
import {SortByDirection} from './tabular-sort-by.service';
import {TabularSize} from './tabular-size.enum';


/**
 * Configuration service, provides default values for the NavComponent.
 */
@Injectable()
export class TabularConfig {

    /**
     * Tabular configuration
     * IPaginationInstance, ISearchConfig
     */
    public config: ITabularConfig = {
        size: TabularSize.Default,
        pagination: {
            itemsPerPage: 5,
            currentPage: 1
        },
        clickableRows: false
    };

}
