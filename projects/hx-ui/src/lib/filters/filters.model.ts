import {IFilterOption, IFiltersConfig} from './filters-config.interface';
import {FilterType} from './filters-type.enum';
import * as _ from 'lodash';

export class FiltersModel implements IFiltersConfig {

  id: string;
  type: FilterType;
  label: string;
  options?: IFilterOption[];
  value?: string;
  callback: any;
  selected: IFilterOption[] = [];
  defaultIndex = [0];
  charLimit = 2;
  width: number;
  disabled = false;
  hidden = false;
  isLoading = false;
  selectAllState = {
    all: false,
    indeterminate: false,
    none: true
  };
  selectAllValue = 'Select all';

  constructor(data?: IFiltersConfig) {
    Object.assign(this, data);
    if (this.type === FilterType.SingleSelect) {
      this.setSingleSelectOption();
    } else if (this.type === FilterType.MultiSelect) {
      this.addSelectAll();
      this.setMultiSelectOptions();
    }
    this.isIconised();
  }

  /*
   * Adds a select all option for multiselect filter types
   */
  addSelectAll() {
    this.options.unshift({
      label: 'Select all',
      value: this.selectAllValue,
      selected: false
    });
  }

  /**
   * Set single select option
   */
   setSingleSelectOption(option?: IFilterOption) {
    if (option) {
      if (this.selected.length) {
        this.selected[0].selected = false;
      }
      this.selected = [option];
      option.selected =  true;
    } else {
      // set preselected option
      if (this.options.length && this.selected.length === 0) {
        this.selected = [this.options.find((opt) => {return opt.selected; })];
      }
    }
  }

  /**
   * Set multi select options
   */
  setMultiSelectOptions(option?: IFilterOption) {
    if (option) {
      this.selected = [];
      if (option.value !== this.selectAllValue) {
        this.options.forEach((opt, i) => {
          if (opt.value !== this.selectAllValue) {
            if (opt.selected) {
              this.selected.push(opt);
            }
          }
        });
      } else {
        this.options.forEach((opt, i) => {
          if (opt.value !== this.selectAllValue) {
            opt.selected = (option.selected);
            if (option.selected) {
              this.selected.push(opt);
            }
          }
        });
      }
    } else {
      // set preselected options and select all
      if (this.options.length && this.selected.length === 0) {
        this.options.forEach((opt, i) => {
          if (opt.selected) {
            this.selected.push(opt);
          }
        });
      }
    }

    this.setSelectAllState();
  }


  setSelectAllState() {
    const reducer = (accumulator, option) => (option.selected && option.value !== this.selectAllValue) ? accumulator + 1 : accumulator
    const count = this.options.reduce(reducer, 0);
    this.selectAllState.all = (count === (this.options.length - 1));
    this.selectAllState.indeterminate = (count > 0 && count < (this.options.length - 1));
    this.selectAllState.none = (count === 0);
    this.options[0].selected = (this.selectAllState.all && !this.selectAllState.indeterminate);
  }

  setDefaultOption() {
    if (this.options.length) {
      if (this.type === FilterType.SingleSelect) {
        this.selected[0].selected = false;
        this.selected[0] = this.options[this.defaultIndex[0]];
        this.selected[0].selected = true;
      } else if (this.type === FilterType.MultiSelect) {
        this.selected = [];
        this.options.forEach((opt, i) => {
          opt.selected = false;
        });
        this.defaultIndex.forEach((di, i) => {
           this.options[di].selected = true;
           this.selected.push(this.options[di]);
        });
        this.setSelectAllState();
      }
    }
  }

  setSelectAll() {
    this.selected = [];
    this.options.forEach((opt, i) => {
        opt.selected = true;
        if (opt.value !== this.selectAllValue) {
          this.selected.push(opt);
        }
    });
  }

  isDefaultOptionActive() {
    if (this.type === FilterType.SingleSelect) {
      return (this.selected[0] === this.options[this.defaultIndex[0]]);
    } else if (this.type === FilterType.MultiSelect) {
      const selectedIndexes = [];
      this.options.forEach((opt, i) => {
        if (opt.selected && opt.value !== this.selectAllValue) {
          selectedIndexes.push(i);
        }
      });
      return (_.isEqual(selectedIndexes, this.defaultIndex));
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

  getSelectedLabel() {
    if (this.selected.length === (this.options.length - 1)) {
      return 'All';
    } else if (this.selected.length === 1) {
      return this.selected[0].label;
    } else if (this.selected.length) {
     return this.selected.length + ' selected';
    } else {
      return 'All';
    }
  }
}
