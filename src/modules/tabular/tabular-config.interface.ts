import {TabularSize} from './tabular-size.enum';

export abstract class ITabularConfig {
  size: TabularSize;
  pagination: {
    itemsPerPage: number,
    currentPage: number
  };
}



