import {Injectable} from '@angular/core';
import {ITabularRow} from './tabular-row.interface';
import sortBy from 'array-sort-by';
import {TabularColumnTypes} from './tabular-column.interface';

export enum SortByDirection {
    Ascending,
    Descending,
    None
}

export interface ISortByProperty {
  property: string;
  direction: SortByDirection;
  type: TabularColumnTypes;
}

@Injectable()
export class TabularSortByService {


  public sortBy(rows: ITabularRow[] = [], sortProps: ISortByProperty[] = []) {

    /**
     * @example Sorting
     * Sorting ASC by @name, after DESC by @age, after ASC by @id
     * let arr = [
     * { id: 9, age: 26, name: 'pedro' },
     * { id: 6, age: 21, name: 'Pedro' },
     * { id: 7, age: 26, name: 'Maria' },
     * { id: 2, age: 26, name: 'maría' }
     * ];
     * sortBy(arr, item => [item.name, -item.age, item.id]);
     */
    sortBy(rows, item => {
      const sort = [];
      for (const prop of sortProps) {
        if (prop.type === TabularColumnTypes.String && prop.direction === SortByDirection.Descending) {
          sort.push('desc:' + item[prop.property]);
        } else if (prop.type === TabularColumnTypes.Number && prop.direction === SortByDirection.Descending) {
          sort.push(-item[prop.property]);
        } else if ((prop.type === TabularColumnTypes.Date || prop.type === TabularColumnTypes.DateTime) && prop.direction === SortByDirection.Descending) {
          sort.push(-new Date(item[prop.property]));
        } else if ((prop.type === TabularColumnTypes.Date || prop.type === TabularColumnTypes.DateTime) && prop.direction === SortByDirection.Ascending) {
          sort.push(new Date(item[prop.property]));
        } else if (prop.type === TabularColumnTypes.Html && prop.direction === SortByDirection.Descending) {
          const sortableValue = item[prop.property];
          sort.push('desc:' + sortableValue.replace(/<.*?>/g, ''));
        } else {
          sort.push(item[prop.property]);
        }
      }
     return sort;
    });

  }

}
