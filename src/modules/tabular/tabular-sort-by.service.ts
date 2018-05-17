import {Injectable} from '@angular/core';
import {ITabularRow} from './tabular-row.interface';
import sortBy from 'array-sort-by';

export enum SortByDirection {
    Ascending,
    Descending,
    None
}

export interface ISortByProperty {
  property: string;
  direction: SortByDirection;
}

@Injectable()
export class TabularSortByService {


  public sortBy(rows: ITabularRow[] = [], sortProps: ISortByProperty[] = []) {

    const  stringifiedSortProps = [];
    for (const prop of sortProps) {
      stringifiedSortProps.push((prop.direction === SortByDirection.Descending) ? -prop.property : prop.property);
    }

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
    sortBy(rows, item => stringifiedSortProps);
  }

}
