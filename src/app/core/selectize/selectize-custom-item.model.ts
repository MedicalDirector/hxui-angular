import {ISelectizeItem} from '../../../../projects/hx-ui/src/lib/selectize/selectize-item.interface';

export class SelectizeCustomItemModel implements ISelectizeItem {
  public label: string;
  public value: string;
  public error: boolean;
  public info: boolean;
}
