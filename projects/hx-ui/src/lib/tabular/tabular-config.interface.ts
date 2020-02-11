import {TabularSize} from './tabular-size.enum';
import {ISortByProperty, SortByDirection} from './tabular-sort-by.service';
import {TabularTheme} from './tabular-theme.enum';

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
  remoteSorting?: boolean;
  multiSorting?: boolean;
  stickyHeader?: boolean;
  stickyColumns?: {
    left: boolean;
    right: boolean;
  };
  theme?: TabularTheme;
}



