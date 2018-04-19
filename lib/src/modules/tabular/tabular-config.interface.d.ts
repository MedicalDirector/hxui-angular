import { TabularSize } from './tabular-size.enum';
import { OrderByDirection } from './tabular-order-by.service';
export declare abstract class ITabularConfig {
    size: TabularSize;
    pagination: {
        itemsPerPage: number;
        currentPage: number;
    };
    clickableRows?: boolean;
    defaultOrderBy?: string;
    defaultOrderByDirection?: OrderByDirection;
}
