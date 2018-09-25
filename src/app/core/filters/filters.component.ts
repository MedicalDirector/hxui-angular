import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {CoreBaseComponent} from '../core-base.component';
import {DOCUMENT} from '@angular/common';
import {PageScrollService} from 'ngx-page-scroll';
import {FiltersCode} from './filters.code';
import {IFiltersConfig} from '../../../../projects/hx-ui/src/lib/filters/filters-config.interface';
import {FilterType} from '../../../../projects/hx-ui/src/lib/filters/filters-type.enum';
import {FiltersComponent as HxFiltersComponent } from '../../../../projects/hx-ui/src/lib/filters/filters.component';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styles: [':host { display: flex; flex: 1; min-width: 0; }']
})
export class FiltersComponent extends CoreBaseComponent {

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
      defaultIndex: 1,
      callback: [this.onFilterHandler, 'workarea']
    },
    {
      id: 'statusFilter',
      type: FilterType.SingleSelect,
      label: 'Status',
      options: [
        {
          label: 'All',
          value: 0,
          selected: true
        },
        {
          label: 'Waiting',
          value: 1,
          selected: false
        },
        {
          label: 'In consult',
          value: 2,
          selected: false
        },
        {
          label: 'Finished consult',
          value: 3,
          selected: false
        },
        {
          label: 'Did not wait',
          value: 4,
          selected: false
        }
      ],
      callback: [this.onFilterHandler, 'status']
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
      ],
      callback: [this.onFilterHandler, 'status']
    },
    {
      id: 'searchFilter',
      type: FilterType.Search,
      label: 'Filter by name',
      callback: [this.onSearchFilterHandler]
    }
  ];

  constructor(
    protected pageScrollService: PageScrollService,
    @Inject(DOCUMENT) protected document: any
  ) {
    super(pageScrollService, document);
  }

  resetFilters() {
    this.filtersComponent.resetFilters();
  }

  toggleCollapsed() {
    this.collapsed = !this.collapsed;
  }

  onFilterHandler(type, data) {
    console.log(type, data);
  }

  onSearchFilterHandler(term) {
    console.log(term);
  }

}
