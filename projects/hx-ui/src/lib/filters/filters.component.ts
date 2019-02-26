import {Component, DoCheck, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {FilterType} from './filters-type.enum';
import {IFilterOption, IFiltersConfig} from './filters-config.interface';
import {FiltersModel} from './filters.model';
import * as _ from 'lodash';
import {Subject} from 'rxjs/index';

@Component({
  selector: 'hxa-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent implements OnInit, DoCheck {

  @ViewChild('carousel') private carousel: ElementRef;

  FilterType = FilterType;
  data: FiltersModel[] = [];
  onFilterOptionChanged$ = new Subject<FiltersModel>();


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
        this.onFilterOptionChanged$.next(filter);
      } else if (filter.type === FilterType.Search) {
        this.clearSearch(filter);
      }
    }
  }

  clearSearch(filter: FiltersModel) {
      filter.value = '';
      this.onFilterOptionChanged$.next(filter);
  }


  /**
   * Called when filter option is selected
   */
  onFilterOptionSelected(filter: FiltersModel, option: IFilterOption) {
    filter.setSelectedOption(option);
    this.onFilterOptionChanged$.next(filter);
  }

  /**
   * Called when character is typed in the search filter type
   */
  onSearchFilterChange(filter: FiltersModel, value: string) {
    this.onFilterOptionChanged$.next(filter);
  }


  onCollapsedFilter($event) {
   this.onFilterOptionSelected($event.filter,  $event.option);
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
    if (this._filters) {
      this._filters.forEach((filter: IFiltersConfig, index) => {
        this.data.push(new FiltersModel(_.cloneDeep(filter)));
      });
    }
  }
}
