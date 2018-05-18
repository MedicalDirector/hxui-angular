import { TabularSize } from './tabular-size.enum';
import { ISortByProperty } from './tabular-sort-by.service';
export declare abstract class ITabularConfig {
    size: TabularSize;
    pagination: {
        itemsPerPage: number;
        currentPage: number;
    };
    clickableRows?: boolean;
    sortBy?: ISortByProperty[];
}
