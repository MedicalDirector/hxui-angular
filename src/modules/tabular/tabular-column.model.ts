import {ITabularColumn} from './tabular-column.interface';

export class TabularColumn implements ITabularColumn {

  constructor(public id: string,
              public label: string,
              public dataType: number,
              public sortable: boolean,
              public cssClass: string = '') {
  }
}
