import {IFilterOption, IFiltersConfig} from './filters-config.interface';
import {FilterType} from './filters-type.enum';

export class FiltersModel implements IFiltersConfig {

  id: string;
  type: FilterType;
  label: string;
  options?: IFilterOption[];
  value?: string;
  callback: any;
  selected: IFilterOption;
  defaultIndex = 0;

  constructor(data?: IFiltersConfig) {
    Object.assign(this, data);
    this.setSelectedOption();
  }

   setSelectedOption(option?: IFilterOption) {
    if (option) {
      option.selected = true;
      this.selected = option;
    } else {
      if (this.options) {
        this.selected = this.options.find((opt) => {
          return opt.selected;
        });
      }
    }
  }

  setDefaultOption() {
    if (this.options) {
      this.selected = this.options[this.defaultIndex];
    }
  }
}
