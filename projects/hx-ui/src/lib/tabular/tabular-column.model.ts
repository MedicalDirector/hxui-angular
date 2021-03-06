import {
  ITabularColumn,
  ITabularColumnOptions,
  TabularColumnTypes
} from "./tabular-column.interface";

export class TabularColumn implements ITabularColumn {
  constructor(
    public id: string,
    public label: string,
    public dataType: TabularColumnTypes,
    public sortable: boolean,
    public cssClass: string = "",
    public hidden: boolean = false,
    public options?: ITabularColumnOptions
  ) {}
}
