import { Overlay } from '@angular/cdk/overlay';
import { CommonModule, DatePipe } from '@angular/common';
import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { action } from '@storybook/addon-actions';
import { Meta, moduleMetadata, Story } from '@storybook/angular';
import { IConfig, NgxMaskModule } from 'ngx-mask';
import { Subscription } from 'rxjs';
import { DateRangePickerModule } from '../date-range-picker/date-range-picker.module';
import { DatepickerModule } from '../datepicker/datepicker.module';
import { DropdownModule } from '../dropdown/dropdown.module';
import { FiltersCollapsedComponent } from './filters-collapsed.component';
import { IFiltersConfig } from './filters-config.interface';
import { FilterType } from './filters-type.enum';
import { FiltersComponent } from './filters.component';
import { FiltersConfig } from './filters.config';
import { FiltersModel } from './filters.model';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'sb-storybook-filter',
  template: `
    <div class="hx-flex hx-flex-align-center">
      <div class="hx-spacer"></div>
      <hxa-filters
        #filterComp
        [collapsed]="collapsed"
        [filters]="filters"
        [customMask]="customMask"
      ></hxa-filters>
    </div>
  `,
  styles: [],
})
class StorybookFilterComponent implements OnInit, OnDestroy {
  @ViewChild('filterComp', { static: true })
  filtersComponent: FiltersComponent;

  @Input() collapsed = false;
  @Input() customMask: string;

  @Input() filters: IFiltersConfig[] = [];
  onFilterChangeEvent$ = new Subscription();

  ngOnInit() {
    this.onFilterChangeEvent$ =
      this.filtersComponent.onFilterOptionChanged$.subscribe(
        (filter: FiltersModel) => {
          action('filter changed')(filter);
        }
      );

    this.filters.forEach(f => action('filter')(f));
  }

  ngOnDestroy() {
    this.onFilterChangeEvent$.unsubscribe();
  }
}

const mask_options: Partial<IConfig> | (() => Partial<IConfig>) = {};

export default {
  decorators: [
    moduleMetadata({
      imports: [
        CommonModule,
        DropdownModule.forRoot(),
        FormsModule,
        DatepickerModule.forRoot(),
        DateRangePickerModule.forRoot(),
        NgxMaskModule.forRoot(mask_options),
        BrowserAnimationsModule,
      ],
      declarations: [
        StorybookFilterComponent,
        FiltersComponent,
        FiltersCollapsedComponent,
      ],
      providers: [FiltersConfig, DatePipe, Overlay],
    }),
  ],
  title: 'Component/Filter',
  excludeStories: /.*Data$/,
} as Meta;

const Template: Story = args => ({
  props: {
    ...args,
  },
  template: `
    <sb-storybook-filter
      [collapsed]="collapsed"
      [filters]="filters"
    ></sb-storybook-filter>
  `,
});

const filters: IFiltersConfig[] = [
  {
    id: 'workareaFilter',
    type: FilterType.SingleSelect,
    label: 'Work area',
    disabled: true,
    options: [
      {
        label: 'Dental',
        value: 0,
        selected: false,
      },
      {
        label: 'GP',
        value: 1,
        selected: true,
      },
      {
        label: 'Physio',
        value: 2,
        selected: false,
      },
      {
        label: 'Radiology',
        value: 3,
        selected: false,
      },
      {
        label: 'Skin Cancer Clinic',
        value: 4,
        selected: false,
      },
      {
        label: 'Specialist',
        value: 5,
        selected: false,
      },
    ],
    defaultIndex: [1],
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
        selected: true,
      },
      {
        icon: 'hx-icon icon-doctor',
        label: 'In consult',
        value: 2,
        selected: true,
      },
      {
        icon: 'hx-icon icon-check',
        label: 'Finished consult',
        value: 3,
        selected: true,
      },
      {
        icon: 'hx-icon icon-did-not-wait',
        label: 'Did not wait',
        value: 4,
        selected: true,
      },
    ],
    defaultIndex: [1, 2, 3, 4],
  },
  {
    id: 'hcpFilter',
    type: FilterType.SingleSelect,
    label: 'HCP',
    options: [
      {
        label: 'All',
        value: 0,
        selected: true,
      },
      {
        label: 'First Available',
        value: 1,
        selected: false,
      },
      {
        label: 'Mr GP, John',
        value: 2,
        selected: false,
      },
      {
        label: 'Mr GP, Camila',
        value: 3,
        selected: false,
      },
      {
        label: 'Mr GP, Peter',
        value: 4,
        selected: false,
      },
      {
        label: 'Mr GP, Brian',
        value: 5,
        selected: false,
      },
      {
        label: 'Mr GP, Simon',
        value: 6,
        selected: false,
      },
      {
        label: 'Mr GP, Peter',
        value: 7,
        selected: false,
      },
      {
        label: 'Mr GP, Matthew',
        value: 8,
        selected: false,
      },
      {
        label: 'Mr GP, Jane',
        value: 9,
        selected: false,
      },
      {
        label: 'Mr GP, Susan',
        value: 10,
        selected: false,
      },
      {
        label: 'Mr GP, Brendan',
        value: 11,
        selected: false,
      },
      {
        label: 'Mr GP, Laura',
        value: 12,
        selected: false,
      },
      {
        label:
          'Dr Sigmundsson-Higgenbotham Smythe King AB Junior III, Max Samuel Smithers Terrance Howard Allisonn Henry',
        value: 13,
        selected: false,
      },
    ],
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
        selected: true,
      },
      {
        icon: 'hx-icon icon-circle is-text-caution is-small',
        label: 'Billing not set',
        value: 2,
        selected: true,
      },
      {
        icon: 'hx-icon icon-circle is-text-success is-small',
        label: 'Ready to bill',
        value: 3,
        selected: true,
      },
      {
        icon: 'hx-icon icon-circle is-text-warning is-small',
        label: 'Draft',
        value: 4,
        selected: true,
      },
      {
        icon: 'hx-icon icon-circle-outline is-small',
        label: 'Issued',
        value: 5,
        selected: false,
      },
    ],
    defaultIndex: [1, 2, 3, 4],
  },
  {
    id: 'dateRangeFilter',
    type: FilterType.DateRange,
    label: 'Date Range',
    dateRangePickerDisplayMode: 2,
    options: [],
    sourceValue: {
      fromDate: new Date('2022-01-01'),
      toDate: new Date('2022-01-30'),
    },
  },
  {
    id: 'searchFilter',
    type: FilterType.Search,
    label: 'Filter by name',
  },
];

// https://github.com/storybookjs/storybook/discussions/15602
export const Expanded = Template.bind({});
Expanded.args = {
  collapsed: false,
  filters,
  customMask: '99999999',
};

export const Collapsed = Template.bind({});
Collapsed.args = {
  collapsed: true,
  filters,
  customMask: '99999999',
};
