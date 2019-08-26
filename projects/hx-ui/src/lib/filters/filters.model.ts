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
  charLimit = 2;
  width: number;

  constructor(data?: IFiltersConfig) {
    Object.assign(this, data);
    if (this.type !== FilterType.Search) {
      this.setSelectedOption();
    }
    this.isIconised();
  }

   setSelectedOption(option?: IFilterOption) {
    if (option) {
      if (this.selected) {
        this.selected.selected = false;
      }
      this.selected = option;
      option.selected =  true;
    } else {
      // set preselected option
      if (this.options.length && !this.selected) {
        this.selected = this.options.find((opt) => {
          return opt.selected;
        });
      }
    }
  }

  setDefaultOption() {
    if (this.options.length) {
      this.selected.selected = false;
      this.selected = this.options[this.defaultIndex];
      this.selected.selected = true;
    }
  }

  isDefaultOptionActive() {
    if (this.type === FilterType.SingleSelect) {
      return (this.selected === this.options[this.defaultIndex]);
    } else if (this.type === FilterType.Search) {
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
