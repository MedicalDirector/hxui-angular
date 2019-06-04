import {Component, Inject, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {CoreBaseComponent} from '../core-base.component';
import {DOCUMENT} from '@angular/common';
import {PageScrollService} from 'ngx-page-scroll';
import {FiltersCode} from './filters.code';
import {IFiltersConfig} from '../../../../projects/hx-ui/src/lib/filters/filters-config.interface';
import {FilterType} from '../../../../projects/hx-ui/src/lib/filters/filters-type.enum';
import {FiltersComponent as HxFiltersComponent } from '../../../../projects/hx-ui/src/lib/filters/filters.component';
import {BreakpointObserver} from '@angular/cdk/layout';
import {Subscription} from 'rxjs/index';
import {FiltersModel} from '../../../../projects/hx-ui/src/lib/filters/filters.model';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styles: [':host { display: flex; flex: 1; min-width: 0; }']
})
export class FiltersComponent extends CoreBaseComponent implements OnInit, OnDestroy {

  @ViewChild('filterComp') filtersComponent: HxFiltersComponent;

  code = new FiltersCode();
  collapsed = false;
  filters: IFiltersConfig[] = [
    {
      id: 'workareaFilter',
      type: FilterType.SingleSelect,
      label: 'Work area',
      options: [
        {
          label: 'Dental',
          value: 0,
          selected: false
        },
        {
          label: 'GP',
          value: 1,
          selected: true
        },
        {
          label: 'Physio',
          value: 2,
          selected: false
        },
        {
          label: 'Radiology',
          value: 3,
          selected: false
        },
        {
          label: 'Skin Cancer Clinic',
          value: 4,
          selected: false
        },
        {
          label: 'Specialist',
          value: 5,
          selected: false
        }
      ],
      defaultIndex: 1
    },
    {
      id: 'statusFilter',
      type: FilterType.SingleSelect,
      label: 'Status',
      options: [
        {
          icon: '',
          label: 'All',
          value: 0,
          selected: true
        },
        {
          icon: 'hx-icon icon-clock',
          label: 'Waiting',
          value: 1,
          selected: false
        },
        {
          icon: 'hx-icon icon-doctor',
          label: 'In consult',
          value: 2,
          selected: false
        },
        {
          icon: 'hx-icon icon-check',
          label: 'Finished consult',
          value: 3,
          selected: false
        },
        {
          icon: 'hx-icon icon-did-not-wait',
          label: 'Did not wait',
          value: 4,
          selected: false
        }
      ]
    },
    {
      id: 'hcpFilter',
      type: FilterType.SingleSelect,
      label: 'HCP',
      options: [
        {
          label: 'All',
          value: 0,
          selected: true
        },
        {
          label: 'First Available',
          value: 1,
          selected: false
        },
        {
          label: 'Mr GP, John',
          value: 2,
          selected: false
        },
        {
          label: 'Mr GP, Camila',
          value: 3,
          selected: false
        },
        {
          label: 'Mr GP, Peter',
          value: 4,
          selected: false
        },
        {
          label: 'Mr GP, Brian',
          value: 4,
          selected: false
        },
        {
          label: 'Mr GP, Simon',
          value: 4,
          selected: false
        },
        {
          label: 'Mr GP, Peter',
          value: 4,
          selected: false
        },
        {
          label: 'Mr GP, Matthew',
          value: 4,
          selected: false
        },
        {
          label: 'Mr GP, Jane',
          value: 4,
          selected: false
        },
        {
          label: 'Mr GP, Susan',
          value: 4,
          selected: false
        },
        {
          label: 'Mr GP, Brendan',
          value: 4,
          selected: false
        },
        {
          label: 'Mr GP, Laura',
          value: 4,
          selected: false
        },
        {
          label: 'Dr Sigmundsson-Higgenbotham Smythe King AB Junior III, Max Samuel Smithers Terrance Howard Allisonn Henry',
          value: 4,
          selected: false
        }
      ]
    },
    {
    id: 'dateRangeFilter',
    type: FilterType.DateRange,
    label: 'Date Range',
    dateRangePicker_displayMode: 1,
    dateRangePicker_displayDateFormat: 'yyyy-MM-dd',
    options: [
      {
        label: 'Yesterday',
        value: 0,
        selected: false
      },
      {
        label: 'Tomorrow',
        value: 1,
        selected: false
      },
      {
        label: 'Last Year',
        value: 2,
        selected: false
      },
      {
        label: 'Next Year',
        value: 3,
        selected: false
      },
      {
        label: 'Last Month',
        value: 4,
        selected: false
      },
      {
        label: 'Next Month',
        value: 5,
        selected: false
      },
      {
        label: 'Last Week',
        value: 6,
        selected: false
      },
      {
        label: 'Next Week',
        value: 7,
        selected: false
      },
      {
        label: 'Last Fortnight',
        value: 8,
        selected: false
      },
      {
        label: 'Next Fortnight',
        value: 9,
        selected: false
      }
    ]
  },
    {
      id: 'searchFilter',
      type: FilterType.Search,
      label: 'Filter by name'
    }
  ];
  displayFilterResult: string;
  onFilterChangeEvent$ = new Subscription();
  filterLists: FiltersModel[];

  constructor(
    protected pageScrollService: PageScrollService,
    protected breakpointObserver: BreakpointObserver,
    @Inject(DOCUMENT) protected document: any
  ) {
    super(pageScrollService, breakpointObserver, document);
  }

  ngOnInit() {
    this.onFilterChangeEvent$ = this.filtersComponent.onFilterOptionChanged$
      .subscribe((filter: FiltersModel) => {
        this.filterLists = this.filtersComponent.data;
        this.displayFilterResult = `filter name: ${filter.label}
        filter value: ${filter.value}
        filter selected value: ${filter.selected?filter.selected.label:'empty' }`;
    });
    
  }

  ngOnDestroy() {
    this.onFilterChangeEvent$.unsubscribe();
  }

  resetFilters() {
    this.filtersComponent.resetFilters();
  }

  toggleCollapsed() {
    this.collapsed = !this.collapsed;
  }

  displayFilterValue(filter: FiltersModel) {
    if(filter.type === FilterType.SingleSelect) {
      return filter.selected?filter.selected.label: 'empty';
    }
    else if (filter.type === FilterType.Search || filter.type === FilterType.DateRange){
      return filter.value? filter.value:'empty';
    }
  }

}
