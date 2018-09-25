import {Component, DoCheck, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {FilterType} from './filters-type.enum';
import {IFilterOption, IFiltersConfig} from './filters-config.interface';
import {FiltersModel} from './filters.model';
import * as _ from 'lodash';

@Component({
  selector: 'hxa-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent implements OnInit, DoCheck {

  @ViewChild('carousel') private carousel: ElementRef;

  FilterType = FilterType;
  data: FiltersModel[] = [];
  private _filters: IFiltersConfig[] = [];
  private _oldFilters: IFiltersConfig[] = [];
  private _collapsed = false;

  @Input()
  get collapsed(): boolean {
    return this._collapsed;
  }

  set collapsed(value: boolean) {
    this._collapsed = value;
  }

  @Input()
  get filters(): IFiltersConfig[] {
    return this._filters;
  }

  set filters(value: IFiltersConfig[]) {
    this._filters = value;
    this.setData();
  }

  constructor() { }

  ngOnInit() {
  }

  ngDoCheck() {
    if (!_.isEqual(this._filters, this._oldFilters)) {
      this._oldFilters = _.cloneDeep(this._filters);
      this.setData();
    }
  }

  resetFilters() {
    for (const filter of this.data) {
      if (filter.type === FilterType.SingleSelect) {
        filter.setDefaultOption();
      } else if (filter.type === FilterType.Search) {
        filter.value = '';
      }
    }
  }

  clearSearch(filter: FiltersModel) {
      filter.value = '';
  }


  /**
   * Called when filter option is selected
   */
  onFilterOptionSelected(filter: FiltersModel, option: IFilterOption) {
    filter.setSelectedOption(option);
    this.executeFilterCallback(filter);
  }


  onCollapsedFilter($event) {
   this.onFilterOptionSelected($event.filter,  $event.option);
  }

  /**
   * Called when character is typed in the search filter type
   */
  onSearchFilterChange(filter: FiltersModel, value: string) {
    filter.callback[0].apply(this, [value]);
  }

  onCollapsedSearch($event) {
    this.onSearchFilterChange($event.filter,  $event.value);
  }


  /**
   * Used for track by and boost performance
   */
  trackByFn(index, action) {
    return index;
  }

  /**
   * Convert filter config objects to Filter Models
   */
  setData() {
    this.data = [];
    this._filters.forEach((filter: IFiltersConfig, index) => {
      this.data.push(new FiltersModel(_.cloneDeep(filter)));
    });
  }

  /**
   * Called when a filter is selected
   * Calls the parsed callback with optional arguments + selected filter option
   */
  private executeFilterCallback(filter: FiltersModel) {
    if (filter.callback.length) {
        const args: any[] = [];
        // if callback has 1 or more arguments
        for (let i = 1; i < filter.callback.length; i++) {
          args.push(filter.callback[i]);
        }
        // add selected filter as argument
        args.push(filter.selected);
        filter.callback[0].apply(this, args);
    }
  }
}
