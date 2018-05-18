import { ITabularRow } from './tabular-row.interface';
import { TabularColumnTypes } from './tabular-column.interface';
export declare enum SortByDirection {
    Ascending = 0,
    Descending = 1,
    None = 2,
}
export interface ISortByProperty {
    property: string;
    direction: SortByDirection;
    type: TabularColumnTypes;
}
export declare class TabularSortByService {
    sortBy(rows?: ITabularRow[], sortProps?: ISortByProperty[]): void;
}
