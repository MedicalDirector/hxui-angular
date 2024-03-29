import { Code } from 'src/app/shared/page-base/page-base.model';

export class PageFilterCode {
  usage: Code = {
    lang: ['ts'],
    text: `import { FiltersModule } from "@hxui/angular";

@NgModule({
  imports: [FiltersModule.forRoot(), ...]
})
export class AppModule {}
`,
  };

  egBasicV11HTML: Code = {
    lang: ['xml'],
    text: `<div class="hx-flex hx-flex-align-center">
  <button 
    type="button" 
    class="hx-button is-primary mr-1"
    (click)="toggleCollapsed()"
  >
    Toggle collapsed state
  </button>
  <button 
    type="button" 
    class="hx-button is-primary"
    (click)="clearFilters()"
  >
    Clear filters
  </button>
  <div class="hx-spacer"></div>
  <hxa-filters 
    #filterComp 
    [collapsed]="collapsed" 
    [filters]="filters"
  ></hxa-filters>
</div>
    `,
  };

  egBasicV11TS: Code = {
    lang: ['ts'],
    text: `import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import {
  IFiltersConfig, 
  FilterType, 
  FiltersComponent, 
  FiltersModel 
} from '@hxui/angular';

@Component({
  selector: 'app-myfeature',
  templateUrl: './myfeature.component.html'
})
export class MyFeatureComponent implements OnInit, OnDestroy  {

  @ViewChild('filterComp') filtersComponent: FiltersComponent;

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
      defaultIndex: [1]
    },
    {
      id: 'statusFilter',
      type: FilterType.MultiSelect,
      label: 'Status',
      options: [
        {
          icon: 'hx-icon icon-clock',
          label: 'Waiting',
          value: 1,
          selected: true
        },
        {
          icon: 'hx-icon icon-doctor',
          label: 'In consult',
          value: 2,
          selected: true
        },
        {
          icon: 'hx-icon icon-check',
          label: 'Finished consult',
          value: 3,
          selected: true
        },
        {
          icon: 'hx-icon icon-did-not-wait',
          label: 'Did not wait',
          value: 4,
          selected: true
        }
      ],
      defaultIndex: [1, 2, 3, 4]
    },
    {
      id: 'hcpFilter',
      type: FilterType.SingleSelect,
      label: 'HCP',
      options: [
        {
          label: "All",
          value: 0,
          selected: true
        },
        {
          label: "First Available",
          value: 1,
          selected: false
        },
        {
          label: "Mr GP, John",
          value: 2,
          selected: false
        },
        {
          label: "Mr GP, Camila",
          value: 3,
          selected: false
        },
        {
          label: "Mr GP, Peter",
          value: 4,
          selected: false
        },
        {
          label: "Mr GP, Brian",
          value: 5,
          selected: false
        },
        {
          label: "Mr GP, Simon",
          value: 6,
          selected: false
        },
        {
          label: "Mr GP, Peter",
          value: 7,
          selected: false
        },
        {
          label: "Mr GP, Matthew",
          value: 8,
          selected: false
        },
        {
          label: "Mr GP, Jane",
          value: 9,
          selected: false
        },
        {
          label: "Mr GP, Susan",
          value: 10,
          selected: false
        },
        {
          label: "Mr GP, Brendan",
          value: 11,
          selected: false
        },
        {
          label: "Mr GP, Laura",
          value: 12,
          selected: false
        },
        {
          label:
            "Dr Sigmundsson-Higgenbotham Smythe King AB Junior III, Max Samuel Smithers Terrance Howard Allisonn Henry",
          value: 13,
          selected: false
        }
      ]
    },
    {
      id: 'billingFilter',
      type: FilterType.MultiSelect,
      label: 'Billing',
      options: [
        {
          icon: 'hx-icon icon-circle is-text-light is-small',
          label: 'No billing',
          value: 1,
          selected: true
        },
        {
          icon: 'hx-icon icon-circle is-text-caution is-small',
          label: 'Billing not set',
          value: 2,
          selected: true
        },
        {
          icon: 'hx-icon icon-circle is-text-success is-small',
          label: 'Ready to bill',
          value: 3,
          selected: true
        },
        {
          icon: 'hx-icon icon-circle is-text-warning is-small',
          label: 'Draft',
          value: 4,
          selected: true
        },
        {
          icon: 'hx-icon icon-circle-outline is-small',
          label: 'Issued',
          value: 5,
          selected: false
        }
      ],
      defaultIndex: [1, 2, 3, 4]
    },
    {
      id: "dateRangeFilter",
      type: FilterType.DateRange,
      label: "Date Range",
      dateRangePickerDisplayMode: 2,
      options: []
    },
    {
      id: 'searchFilter',
      type: FilterType.Search,
      label: 'Filter by name',
      width: this.getSearchWidth('Filter by name')
    }
  ];

  onFilterChangeEvent$ = new Subscription();

  constructor() {}

  ngOnInit() {
    this.onFilterChangeEvent$ = this.filtersComponent.onFilterOptionChanged$
      .subscribe((filter: FiltersModel) => {
        console.log(filter);
    });

    this.filters.forEach(f => console.log(f.width));
  }

  ngOnDestroy() {
    this.onFilterChangeEvent$.unsubscribe();
  }

  resetFilters() {
    this.filtersComponent.data.forEach(f => f.disabled = false);
    this.filtersComponent.resetFilters();
  }

  disableFilters() {
    this.filtersComponent.data.forEach(f => f.disabled = !f.disabled);
  }

  toggleCollapsed() {
    this.collapsed = !this.collapsed;
  }

  // dynamically calculate an appropriate width (rem)
  getSearchWidth(label: string) {
    const min = 8;
    const max = 12;

    // based on root html font size
    const charwidth = .42;

    // base search filter
    const filter = 3.9;

    const calc = label.length * charwidth + filter;

    if (min <= calc && calc <= max) {
      return calc;
    }

    return min > calc ? min : max;
  }
}
`,
  };

  egBasicV8HTML: Code = {
    lang: ['xml'],
    text: `<div class="hx-flex hx-flex-align-center">
  <button 
    type="button" 
    class="hx-button is-primary mr-1" 
    (click)="toggleCollapsed()"
  >
    Toggle collapsed state
  </button>
  <button 
    type="button" 
    class="hx-button is-primary" 
    (click)="clearFilters()"
  >
    Clear filters
  </button>
  <div class="hx-spacer"></div>
  <hxa-filters 
    #filterComp 
    [collapsed]="collapsed" 
    [filters]="filters"
  ></hxa-filters>
</div>
`,
  };

  egBasicV8TS: Code = {
    lang: ['ts'],
    text: `import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import {
  IFiltersConfig, 
  FilterType, 
  FiltersComponent,
  FiltersModel
} from '@hxui/angular';

@Component({
  selector: 'app-myfeature',
  templateUrl: './myfeature.component.html'
})
export class MyFeatureComponent implements OnInit, OnDestroy  {

  @ViewChild('filterComp', { static: true }) filtersComponent: FiltersComponent;

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
          label: "All",
          value: 0,
          selected: true
        },
        {
          label: "First Available",
          value: 1,
          selected: false
        },
        {
          label: "Mr GP, John",
          value: 2,
          selected: false
        },
        {
          label: "Mr GP, Camila",
          value: 3,
          selected: false
        },
        {
          label: "Mr GP, Peter",
          value: 4,
          selected: false
        },
        {
          label: "Mr GP, Brian",
          value: 5,
          selected: false
        },
        {
          label: "Mr GP, Simon",
          value: 6,
          selected: false
        },
        {
          label: "Mr GP, Peter",
          value: 7,
          selected: false
        },
        {
          label: "Mr GP, Matthew",
          value: 8,
          selected: false
        },
        {
          label: "Mr GP, Jane",
          value: 9,
          selected: false
        },
        {
          label: "Mr GP, Susan",
          value: 10,
          selected: false
        },
        {
          label: "Mr GP, Brendan",
          value: 11,
          selected: false
        },
        {
          label: "Mr GP, Laura",
          value: 12,
          selected: false
        },
        {
          label:
            "Dr Sigmundsson-Higgenbotham Smythe King AB Junior III, Max Samuel Smithers Terrance Howard Allisonn Henry",
          value: 13,
          selected: false
        }
      ]
    },
    {
      id: "dateRangeFilter",
      type: FilterType.DateRange,
      label: "Date Range",
      dateRangePickerDisplayMode: 2,
      options: []
    },
    {
      id: 'searchFilter',
      type: FilterType.Search,
      label: 'Filter by name',
      width: this.getSearchWidth('Filter by name')
    }
  ];

  onFilterChangeEvent$ = new Subscription();

  ngOnInit() {
    this.onFilterChangeEvent$ = this.filtersComponent.onFilterOptionChanged$
      .subscribe((filter: FiltersModel) => {
        console.log(filter);
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

  // dynamically calculate an appropriate width (rem)
  getSearchWidth(label: string) {
    const min = 8;
    const max = 12;

    // based on root html font size
    const charwidth = .42;

    // base search filter
    const filter = 3.9;

    const calc = label.length * charwidth + filter;

    if(min <= calc && calc <= max) {
      return calc;
    }

    return min > calc ? min : max;
  }
}
  `,
  };
}
