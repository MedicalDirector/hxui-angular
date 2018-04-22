import {ISelectizeItem} from '../../../modules/selectize/selectize-item.interface';

export class SelectizeCustomItemModel implements ISelectizeItem {
  public label: string;
  public value: string;
  public error: boolean;
  public info: boolean;
}
