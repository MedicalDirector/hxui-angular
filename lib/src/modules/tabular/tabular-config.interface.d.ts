import { TabularSize } from './tabular-size.enum';
export declare abstract class ITabularConfig {
    size: TabularSize;
    pagination: {
        itemsPerPage: number;
        currentPage: number;
    };
}
