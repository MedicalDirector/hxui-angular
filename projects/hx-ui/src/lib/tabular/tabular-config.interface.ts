import {TabularSize} from './tabular-size.enum';
import {ISortByProperty, SortByDirection} from './tabular-sort-by.service';

export abstract class ITabularConfig {
  id: string;
  size: TabularSize;
  pagination: {
    itemsPerPage: number,
    currentPage: number
  };
  clickableRows?: boolean;
  sortBy?: ISortByProperty[];
  cssClass?: string;
  stickyHeader?: boolean;
  remoteSorting?: boolean;
  multiSorting?: boolean;
}



