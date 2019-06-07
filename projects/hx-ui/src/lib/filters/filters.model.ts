import {IFilterOption, IFiltersConfig} from './filters-config.interface';
import {FilterType} from './filters-type.enum';
import { DateRange } from '../date-range-picker/date-range-picker.component';

export class FiltersModel implements IFiltersConfig {

  id: string;
  type: FilterType;
  label: string;
  options?: IFilterOption[];
  value?: string;
  //value comes from source component without type parse
  sourceValue?: any;
  callback: any;
  selected: IFilterOption;
  defaultIndex = 0;
  charLimit = 2;
  dateRangePicker_displayMode?:number = 1;
  dateRangePicker_displayDateFormat?: string = 'dd/MM/yyyy';

  constructor(data?: IFiltersConfig) {
    Object.assign(this, data);
    if (this.type !== FilterType.Search) {
      this.setSelectedOption();
    }
    this.isIconised();
  }

   setSelectedOption(option?: IFilterOption) {
    if (option) {
      option.selected = true;
      this.selected = option;
    } else {
      if (this.options.length && !this.selected) {
        this.selected = this.options.find((opt) => {
          return opt.selected;
        });
      }
    }
  }

  setDefaultOption() {
    if (this.options.length) {
      this.selected = this.options[this.defaultIndex];
    }
  }

  isDefaultOptionActive() {
    if (this.type === FilterType.SingleSelect) {
      return (this.selected === this.options[this.defaultIndex]);
    } else if (this.type === FilterType.Search) {
      return (this.value === '' || this.value === undefined);
    }
    else if (this.type === FilterType.DateRange){
      return (this.value === '' || this.value === undefined);
    }
  }

  isIconised() {
    if (this.options) {
      const hasIcons = this.options.find((option) => {
        return (typeof option.icon !== 'undefined' && option.icon !== '');
      });
      return (typeof hasIcons !== 'undefined');
    }
    return false;
  }
}
