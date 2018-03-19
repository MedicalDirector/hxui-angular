import { ITabularConfig } from './tabular-config.interface';
import { OrderByDirection } from './tabular-order-by.service';
/**
 * Configuration service, provides default values for the NavComponent.
 */
export declare class TabularConfig {
    /**
     * Tabular configuration
     * IPaginationInstance, ISearchConfig
     */
    config: ITabularConfig;
    /**
     * Default order by value
     */
    defaultOrderBy: Array<string>;
    /**
     * Default order by direction
     */
    defaultOrderByDirection: OrderByDirection;
}
