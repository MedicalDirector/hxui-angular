import {TabularSize} from './tabular-size.enum';

export interface ITabularConfig {
  size: TabularSize;
  pagination: {
    itemsPerPage: number,
    currentPage: number
  };
}



