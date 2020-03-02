import {Component, Input, Output, OnInit, ViewChild, EventEmitter} from '@angular/core';
import {FilterType} from './filters-type.enum';
import {FiltersModel} from './filters.model';
import {IFilterOption, IFiltersConfig} from './filters-config.interface';
import {DropdownDirective} from '../dropdown/dropdown.directive';
import {animate, state, style, transition, trigger} from '@angular/animations';

type PaneType = 'left' | 'right';

@Component({
  selector: 'hxa-filters-collapsed',
  templateUrl: './filters-collapsed.component.html',
  styleUrls: ['./filters-collapsed.component.scss'],
  animations: [
    trigger('slide', [
      state('left', style({ transform: 'translateX(0)' })),
      state('right', style({ transform: 'translateX(-100%)' })),
      transition('* => *', animate(200))
    ])
   ]
})
export class FiltersCollapsedComponent implements OnInit {

  @ViewChild('dropdown', { static: true }) dropdown: DropdownDirective;

  FilterType = FilterType;
  activePane = 'left';
  selectedFilter: FiltersModel;

  @Input() data: FiltersModel[] = [];

  @Output() onFilter = new EventEmitter();
  @Output() onSearchFilter = new EventEmitter();
  @Output() onBack = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  clearSearch(filter: FiltersModel) {
    filter.value = '';
    this.onSearchFilter.emit({filter: filter, value: filter.value});
  }

  changeFilterSelection(filter: FiltersModel) {
    this.selectedFilter = filter;
    this.activePane = 'right';
  }

  selectFilterOption( option: IFilterOption, goBack = true) {
    this.onFilter.emit({filter: this.selectedFilter, option: option});
    if (goBack) {
      this.back();
    }
  }

  searchFilter(filter: FiltersModel) {
    this.onSearchFilter.emit({filter: filter});
  }

  back() {
    this.activePane = 'left';
    this.onBack.emit({filter: this.selectedFilter});
  }

  onSlideDone($event) {
    if ($event.toState === 'left') {
      this.selectedFilter = null;
    }
  }

  totalActiveFilters(): number {
    let count = 0;
    this.data.forEach((filter: FiltersModel, index: number) => {
      if (filter.type === FilterType.SingleSelect ||
        filter.type === FilterType.MultiSelect && filter.selected.length !== 0 && filter.selected.length < (filter.options.length - 1)
        || filter.type === FilterType.Search && filter.value) {
        count++;
      }
    });
    return count;
  }

  getFilterLabel() {
    const plural = (this.totalActiveFilters() > 1) ? 'filters' : 'filter';
    return (this.totalActiveFilters() > 0) ? this.totalActiveFilters() + ` ${plural} applied` : `Filters`;
  }


  /**
   * Used for track by and boost performance
   */
  trackByFn(index, action) {
    return index;
  }
}
