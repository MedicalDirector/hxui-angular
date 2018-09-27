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
    if (this.type !== FilterType.Search) {
      this.setSelectedOption();
    }
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
  }
}
