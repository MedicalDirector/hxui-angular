import { Overlay } from '@angular/cdk/overlay';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule, DatePipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Event, RouterModule } from '@angular/router';
import { action } from '@storybook/addon-actions';
import { Meta, moduleMetadata, Story } from '@storybook/angular';
import { IConfig, NgxMaskModule } from 'ngx-mask';
import { Observable, of, Subscription } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { DateRangePickerModule } from '../date-range-picker/date-range-picker.module';
import { DatepickerModule } from '../datepicker/datepicker.module';
import { DropdownModule } from '../dropdown/dropdown.module';
import { Context } from '../enums';
import { FiltersCollapsedComponent } from '../filters/filters-collapsed.component';
import { IFiltersConfig } from '../filters/filters-config.interface';
import { FilterType } from '../filters/filters-type.enum';
import { FiltersComponent } from '../filters/filters.component';
import { FiltersConfig } from '../filters/filters.config';
import { FiltersModel } from '../filters/filters.model';
import { PaginationConfig } from '../pagination/pagination.config';
import { PaginationModule } from '../pagination/pagination.module';
import { TooltipConfig } from '../tooltip/tooltip.config';
import { TooltipModule } from '../tooltip/tooltip.module';
import { SimpleSearchPipe } from '../utils/pipes/simple-search.pipe';
import {
  ActionConfigRouteType,
  IActionsConfig,
} from './actions-config.interface';
import { TabularComponent } from './tabular';
import {
  ITabularColumnBadgeType,
  ITabularColumnIconType,
  TabularColumnTypes,
} from './tabular-column.interface';
import { TabularColumn } from './tabular-column.model';
import { ITabularConfig } from './tabular-config.interface';
import { TabularContentService } from './tabular-content.service';
import { ITabularRow } from './tabular-row.interface';
import { TabularSize } from './tabular-size.enum';
import {
  SortByDirection,
  TabularSortByService,
} from './tabular-sort-by.service';
import { TabularTheme } from './tabular-theme.enum';
import { IWithTooltip } from './tabular-tooltip.interface';
import { TabularConfig } from './tabular.config';

class RowDataModel implements ITabularRow {
  public id: number;
  public usercode: string;
  public firstname: string;
  public surname: string;
  public rolename: string;
  public email: string;
  public flag: ITabularColumnBadgeType;
  public active: boolean;
  public created: Date | IWithTooltip;
  public modified: Date;
  public selected: boolean;
  public checked: boolean;
  public info: ITabularColumnIconType;
  public icon: string;
  public actions: IActionsConfig[] = [];
  public actionDisabled = false;
  public name: string;

  constructor(data?: unknown) {
    if (data) {
      Object.assign(this, data);
    }
    this.setIcon();
    this.setActions();
    this.setName();
  }

  setIcon() {
    this.icon = this.active
      ? 'icon-check-empty is-primary'
      : 'icon-close-empty is-danger';
  }

  setActions() {
    this.actions = [
      {
        id: 'row_person_prescription',
        label: 'Prescribe',
        icon: 'icon-prescription',
        route: ['/prescription'],
        routeType: ActionConfigRouteType.Route,
        disabledConfig: { disabled: true, tooltip: 'Not enough permission' },
        tooltip: {
          config: {
            placement: 'top',
            context: Context.None,
            disabled: false,
            animation: false,
            showDelay: 0,
            hideDelay: 0,
            maxWidth: 200,
          },
          content: 'Prescriptions',
        },
      },
      {
        id: 'row_person_edit',
        label: 'Edit',
        icon: 'icon-edit',
        routeType: ActionConfigRouteType.Callback,
        callback: [this.onActionClickHandler, 'edit', 1],
        tooltip: {
          config: {
            placement: 'top',
            context: Context.None,
            disabled: false,
            animation: false,
            showDelay: 0,
            hideDelay: 0,
            maxWidth: 200,
          },
          content: 'Edit',
        },
      },
      {
        id: 'row_person_delete',
        label: 'Delete',
        icon: 'icon-bin',
        routeType: ActionConfigRouteType.Callback,
        callback: [this.onActionClickHandler, 'delete', 1],
        tooltip: {
          config: {
            placement: 'top',
            context: Context.None,
            disabled: false,
            animation: false,
            showDelay: 0,
            hideDelay: 0,
            maxWidth: 200,
          },
          content: 'Delete',
        },
      },
      {
        id: 'row_person_more',
        label: 'More',
        icon: 'icon-more',
        routeType: ActionConfigRouteType.None,
        tooltip: {
          config: {
            placement: 'right',
            context: Context.None,
            disabled: false,
            animation: false,
            showDelay: 0,
            hideDelay: 0,
            maxWidth: 200,
          },
          content: 'More options',
        },
        children: [
          {
            id: 'row_person_prescription',
            label: 'Prescribe',
            route: ['/prescription'],
            routeType: ActionConfigRouteType.Route,
            disabledConfig: {
              disabled: true,
              tooltip: 'Not enough permission',
            },
          },
          {
            id: 'row_person_edit',
            label: 'Edit',
            routeType: ActionConfigRouteType.Callback,
            callback: [this.onActionClickHandler, 'edit', 1],
          },
          {
            id: 'row_person_delete',
            label: 'Delete',
            routeType: ActionConfigRouteType.Callback,
            callback: [this.onActionClickHandler, 'delete', 1],
          },
        ],
      },
    ];
  }

  setName() {
    this.name =
      `<div class="is-text-weight-bolder">` +
      this.surname +
      `,</div><div>` +
      this.firstname +
      `</div>`;
  }

  /**
   * Function used in the callback actions
   * @param type
   * @param data
   */
  onActionClickHandler(type, data) {
    action(`${type} action clicked`)(type, data);

    if (type === 'delete') {
      this.actions[2].isLoading = true;
      setTimeout(() => (this.actions[2].isLoading = false), 1000);
    }
  }
}

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'sb-storybook-table',
  template: `
    <div class="hx-toolbar is-small is-perforated">
      <button class="hx-button mr-1" (click)="setCheckAllState(true)">
        Check All
      </button>
      <button class="hx-button" (click)="setCheckAllState(false)">
        Uncheck All
      </button>
      <div class="hx-divider"></div>
      <div>
        <span class="is-info is-text-weight-bolder">{{ totalSelected }}</span>
        of
        <span class="is-info is-text-weight-bolder">{{ rowData.length }}</span
        ><span class="is-text-weight-light"> items selected</span>
      </div>
      <div class="hx-spacer"></div>
      <hxa-filters
        #filterComp
        [collapsed]="collapsed"
        [filters]="filters"
      ></hxa-filters>
    </div>
    <hxa-tabular
      [rows]="rowData"
      [columns]="columnData"
      [config]="config"
      (refresh)="onRefresh($event)"
      (rowClick)="onRowClick($event)"
      (onSort)="onSortColumn($event)"
      (onCheck)="onCheckSingle($event)"
      (onCheckAll)="onCheckAll($event)"
    ></hxa-tabular>
  `,
})
class StorybookTableComponent implements OnInit {
  @Input() config: ITabularConfig;

  // TABLE
  users$: Observable<RowDataModel[]>;
  rowData: ITabularRow[] = [];

  labelHTML =
    '<span class="hx-icon-control" title="Role"><i class="hx-icon icon-person"></i></span>';

  columnData: TabularColumn[] = [
    new TabularColumn(
      'checkboxes',
      'Checkboxes',
      TabularColumnTypes.Checkbox,
      false
    ),
    new TabularColumn(
      'id',
      'Id',
      TabularColumnTypes.Number,
      true,
      undefined,
      true
    ),
    new TabularColumn('usercode', 'User Code', TabularColumnTypes.String, true),
    new TabularColumn('name', 'Name', TabularColumnTypes.Html, true),
    new TabularColumn(
      'rolename',
      'Role',
      TabularColumnTypes.String,
      true,
      '',
      false,
      {
        header: this.labelHTML,
      }
    ),
    new TabularColumn('flag', '', TabularColumnTypes.Badge, false),
    new TabularColumn('created', 'Created', TabularColumnTypes.Date, true),
    new TabularColumn(
      'modified',
      'Modified',
      TabularColumnTypes.DateTime,
      true
    ),
    new TabularColumn('info', 'info', TabularColumnTypes.Icon, false, '', true),
    new TabularColumn(
      'active',
      'Active',
      TabularColumnTypes.Status,
      false,
      'is-text-center'
    ),
    new TabularColumn('actions', 'Actions', TabularColumnTypes.Actions, false),
  ];

  // FILTER
  @ViewChild('filterComp', { static: true }) filtersComponent: FiltersComponent;
  onFilterChangeEvent$ = new Subscription();
  collapsed = false;
  filters: IFiltersConfig[] = [
    {
      id: 'roleFilter',
      type: FilterType.SingleSelect,
      label: 'Role',
      options: [
        {
          label: 'All',
          value: 'All',
          selected: true,
        },
        {
          label: 'Administrator',
          value: 'Administrator',
          selected: false,
        },
        {
          label: 'GP',
          value: 'GP',
          selected: false,
        },
        {
          label: 'Specialist',
          value: 'Specialist',
          selected: false,
        },
        {
          label: 'Practice Manager',
          value: 'Practice Manager',
          selected: false,
        },
        {
          label: 'Nurse',
          value: 'Nurse',
          selected: false,
        },
        {
          label: 'Receptionist',
          value: 'Receptionist',
          selected: false,
        },
      ],
      defaultIndex: [1],
    },
  ];

  get totalSelected(): number {
    let count = 0;
    this.rowData.forEach(row => {
      if (row.checked) {
        count++;
      }
    });
    return count;
  }

  ngOnInit(): void {
    this.onFilterChangeEvent$ =
      this.filtersComponent.onFilterOptionChanged$.subscribe(
        (filter: FiltersModel) => {
          action('filter changed')(filter);
          if (filter.type === FilterType.SingleSelect) {
            if (filter.selected[0].value === 'All') {
              this.getAllUsers().subscribe(users => this.setRowData(users));
            } else {
              this.getUserByRole(filter.selected[0].value).subscribe(users =>
                this.setRowData(users)
              );
            }
          }
        }
      );

    this.getAllUsers().subscribe(users => this.setRowData(users));
  }

  onCheckSingle($event: Event): void {
    action('check single')($event);
  }

  onCheckAll($event: Event): void {
    action('check all')($event);
  }

  /** Refresh data handler for data grid */
  onRefresh($event: Event): void {
    action('refresh')($event);
    this.getAllUsers();
  }

  onRowClick($event: Event): void {
    action('row')($event);
  }

  onSortColumn($event: Event): void {
    action('sort')($event);
  }

  onToggleCheckAll(state = false): void {
    this.rowData.forEach(row => {
      row.checked = state;
    });
  }

  private setRowData(users: RowDataModel[]) {
    const data: RowDataModel[] = [];
    if (users) {
      for (let i = 0; i < users.length; i++) {
        const user = new RowDataModel(users[i]);
        data.push(user);
      }
      this.rowData = data;
    }
  }

  /** Static data for example */
  private getAllUsers(): Observable<RowDataModel[]> {
    const items = getMockUsers();
    return of(items).pipe(delay(500)) as Observable<RowDataModel[]>;
  }

  private getUserByRole(role: string): Observable<RowDataModel[]> {
    const items = getMockUsers();
    return of(items).pipe(
      map(users => {
        users = users.filter(data => data.rolename === role);
        return users;
      }),
      delay(500)
    ) as Observable<RowDataModel[]>;
  }
}

const mask_options: Partial<IConfig> | (() => Partial<IConfig>) = {};

export default {
  title: 'Component/Table',
  decorators: [
    moduleMetadata({
      imports: [
        CommonModule,
        HttpClientModule,
        RouterModule,
        BrowserAnimationsModule,
        PaginationModule,
        TooltipModule,
        DropdownModule,
        FormsModule,
        ScrollingModule,
        DropdownModule.forRoot(),
        FormsModule,
        DatepickerModule.forRoot(),
        DateRangePickerModule.forRoot(),
        NgxMaskModule.forRoot(mask_options),
      ],
      declarations: [
        StorybookTableComponent,
        TabularComponent,
        SimpleSearchPipe,
        FiltersComponent,
        FiltersCollapsedComponent,
      ],
      providers: [
        TabularSortByService,
        TabularConfig,
        TabularContentService,
        TooltipConfig,
        FiltersConfig,
        DatePipe,
        Overlay,
        PaginationConfig,
      ],
    }),
  ],
  excludeStories: /.*Data$/,
} as Meta;

const Template: Story = args => {
  return {
    props: {
      ...args,
    },
    template: `
      <sb-storybook-table [config]="config"></sb-storybook-table>
    `,
  };
};
// config: <ITabularConfig>{
//   id: 'UniqueId',
//   size: TabularSize.Default,
//   theme: TabularTheme.Dark,
//   clickableRows: true,
//   pagination: {
//     itemsPerPage: 5,
//     currentPage: 1,
//   },
//   sortBy: [
//     {
//       property: 'modified',
//       type: TabularColumnTypes.DateTime,
//       direction: SortByDirection.Descending,
//     },
//   ],
//   stickyColumns: {
//     left: true,
//     right: true,
//   },
// },

export const Default = Template.bind({});
Default.args = {
  config: <ITabularConfig>{
    id: 'Unique-Id',
    size: TabularSize.Default,
    pagination: {
      itemsPerPage: 5,
      currentPage: 1,
    },
    clickableRows: false,
    stickyHeader: true,
    multiSorting: true,
  },
};

export const ClickableRows = Template.bind({});
ClickableRows.args = {
  config: <ITabularConfig>{
    size: TabularSize.Default,
    theme: TabularTheme.Dark,
    clickableRows: true,
    pagination: {
      itemsPerPage: 5,
      currentPage: 1,
    },
    sortBy: [
      {
        property: 'modified',
        type: TabularColumnTypes.DateTime,
        direction: SortByDirection.Descending,
      },
    ],
    stickyColumns: {
      left: true,
      right: true,
    },
  },
};

export const NarrowPadding = Template.bind({});
NarrowPadding.args = {
  config: <ITabularConfig>{
    size: TabularSize.Small,
    theme: TabularTheme.Dark,
    clickableRows: false,
    pagination: {
      itemsPerPage: 5,
      currentPage: 1,
    },
    sortBy: [
      {
        property: 'modified',
        type: TabularColumnTypes.DateTime,
        direction: SortByDirection.Descending,
      },
    ],
  },
};

export const NormalPadding = Template.bind({});
NormalPadding.args = {
  config: <ITabularConfig>{
    size: TabularSize.Default,
    theme: TabularTheme.Dark,
    clickableRows: false,
    pagination: {
      itemsPerPage: 5,
      currentPage: 1,
    },
    sortBy: [
      {
        property: 'modified',
        type: TabularColumnTypes.DateTime,
        direction: SortByDirection.Descending,
      },
    ],
  },
};

export const ComfortablePadding = Template.bind({});
ComfortablePadding.args = {
  config: <ITabularConfig>{
    size: TabularSize.Large,
    theme: TabularTheme.Dark,
    clickableRows: false,
    pagination: {
      itemsPerPage: 5,
      currentPage: 1,
    },
    sortBy: [
      {
        property: 'modified',
        type: TabularColumnTypes.DateTime,
        direction: SortByDirection.Descending,
      },
    ],
  },
};

export const LightTheme = Template.bind({});
LightTheme.args = {
  config: <ITabularConfig>{
    size: TabularSize.Default,
    theme: TabularTheme.Light,
    clickableRows: false,
    pagination: {
      itemsPerPage: 5,
      currentPage: 1,
    },
    sortBy: [
      {
        property: 'modified',
        type: TabularColumnTypes.DateTime,
        direction: SortByDirection.Descending,
      },
    ],
  },
};

export const DarkTheme = Template.bind({});
DarkTheme.args = {
  config: <ITabularConfig>{
    size: TabularSize.Default,
    theme: TabularTheme.Dark,
    clickableRows: false,
    pagination: {
      itemsPerPage: 5,
      currentPage: 1,
    },
    sortBy: [
      {
        property: 'modified',
        type: TabularColumnTypes.DateTime,
        direction: SortByDirection.Descending,
      },
    ],
  },
};

export const Sticky = Template.bind({});
Sticky.args = {
  config: <ITabularConfig>{
    size: TabularSize.Default,
    theme: TabularTheme.Dark,
    clickableRows: false,
    pagination: {
      itemsPerPage: 5,
      currentPage: 1,
    },
    sortBy: [
      {
        property: 'modified',
        type: TabularColumnTypes.DateTime,
        direction: SortByDirection.Descending,
      },
    ],
    stickyHeader: true,
    stickyColumns: {
      left: true,
      right: true,
    },
  },
};

function getMockUsers() {
  const users = [
    {
      id: 1,
      usercode: 'BR001',
      firstname: 'Brenda',
      surname: 'Reed',
      rolename: 'GP',
      email: 'brenda.reed@medicaldirector.com',
      active: false,
      info: {
        icon: 'icon-information-outline',
        tooltip: {
          config: {
            placement: 'right',
            context: Context.Danger,
          },
          content: 'Information',
        },
      },
      created: getRandomDate(new Date(2015, 0, 1), new Date()),
      modified: getRandomDate(new Date(2015, 0, 1), new Date()),
      cssClass: 'is-text-line-through',
    },
    {
      id: 2,
      usercode: 'MR001',
      firstname: 'Mercedes',
      surname: 'Mendez',
      rolename: 'GP',
      email: 'mercedes.mendez@medicaldirector.com',
      active: false,
      info: {
        icon: 'icon-information-outline',
        tooltip: {
          config: {
            placement: 'right',
            context: Context.Warning,
          },
          content: 'Information',
        },
      },
      created: getRandomDate(new Date(2015, 0, 1), new Date()),
      modified: getRandomDate(new Date(2015, 0, 1), new Date()),
      checked: true,
      flag: { label: 'S', cssClass: '' },
    },
    {
      id: 3,
      usercode: 'II006',
      firstname: 'John',
      surname: 'Smith',
      rolename: 'Specialist',
      email: 'john.smith@medicaldirector.com',
      active: true,
      info: {
        icon: 'icon-information-outline',
        tooltip: {
          config: {
            placement: 'right',
            context: Context.Danger,
          },
          content: 'Information',
        },
      },
      created: getRandomDate(new Date(2015, 0, 1), new Date()),
      modified: getRandomDate(new Date(2015, 0, 1), new Date()),
      flag: {
        label: 'S',
        cssClass: 'is-outlined',
      },
      selected: true,
    },
    {
      id: 4,
      usercode: 'JS001',
      firstname: 'Julia',
      surname: 'Sampson',
      rolename: 'Specialist',
      email: 'julia.sampson@medicaldirector.com',
      active: true,
      created: getRandomDate(new Date(2015, 0, 1), new Date()),
      modified: getRandomDate(new Date(2015, 0, 1), new Date()),
      flag: {
        label: 'S',
        cssClass: 'is-danger',
      },
      stripeContext: Context.Danger,
    },
    {
      id: 5,
      usercode: 'GP001',
      firstname: 'John',
      surname: 'Pipps',
      rolename: 'Specialist',
      email: 'john.gipps@medicaldirector.com',
      active: true,
      created: getRandomDate(new Date(2015, 0, 1), new Date()),
      modified: getRandomDate(new Date(2015, 0, 1), new Date()),
      flag: { label: 'S', cssClass: 'is-warning' },
      context: Context.Warning,
      stripeContext: Context.Warning,
    },
    {
      id: 6,
      usercode: 'NR001',
      firstname: 'Natalie',
      surname: 'Roberts',
      rolename: 'Receptionist',
      email: 'natalie.roberts@medicaldirector.com',
      active: false,
      info: {
        icon: 'icon-information-outline',
        tooltip: {
          config: {
            placement: 'bottom',
            context: Context.None,
          },
          content: 'Information',
        },
      },
      created: getRandomDate(new Date(2015, 0, 1), new Date()),
      modified: getRandomDate(new Date(2015, 0, 1), new Date()),
      flag: { label: 'S', cssClass: '' },
    },
    {
      id: 7,
      usercode: 'HS001',
      firstname: 'Harry',
      surname: 'Sechi',
      rolename: 'GP',
      email: 'harry.sechi@medicaldirector.com',
      active: true,
      info: {
        icon: 'icon-information-outline',
        tooltip: {
          config: {
            placement: 'right',
            context: Context.None,
          },
          content: 'Information',
        },
      },
      created: getRandomDate(new Date(2015, 0, 1), new Date()),
      modified: getRandomDate(new Date(2015, 0, 1), new Date()),
      flag: { label: 'S', cssClass: 'is-error' },
    },
    {
      id: 8,
      usercode: 'XL001',
      firstname: 'Xavier',
      surname: 'Lorenzo',
      rolename: 'Practice Manager',
      email: 'xavier.lorenzo@medicaldirector.com',
      active: true,
      info: {
        icon: 'icon-information-outline',
        tooltip: {
          config: {
            placement: 'right',
            context: Context.None,
          },
          content: 'Information',
        },
      },
      created: getRandomDate(new Date(2015, 0, 1), new Date()),
      modified: getRandomDate(new Date(2015, 0, 1), new Date()),
      flag: { label: 'S', cssClass: 'is-outlined' },
    },
    {
      id: 9,
      usercode: 'CY001',
      firstname: 'Chris',
      surname: 'Yap',
      rolename: 'GP',
      email: 'chris.yap@medicaldirector.com',
      active: true,
      info: {
        icon: 'icon-information-outline',
        tooltip: {
          config: {
            placement: 'right',
            context: Context.None,
          },
          content: 'Information',
        },
      },
      created: getRandomDate(new Date(2015, 0, 1), new Date()),
      modified: getRandomDate(new Date(2015, 0, 1), new Date()),
      flag: { label: 'S', cssClass: '' },
      context: Context.Danger,
    },
    {
      id: 10,
      usercode: 'MA001',
      firstname: 'Mohammad',
      surname: 'Ahmed',
      rolename: 'Specialist',
      email: 'mohammad.ahmed@medicaldirector.com',
      active: true,
      info: {
        icon: 'icon-information-outline',
        tooltip: {
          config: {
            placement: 'right',
            context: Context.None,
          },
          content: 'Information',
        },
      },
      created: {
        tooltip: {
          config: {
            placement: 'top',
            context: Context.White,
            disabled: false,
            animation: false,
            showDelay: 0,
            hideDelay: 0,
            maxWidth: 500,
            html: true,
          },
          content: `
          <div class="is-text-left pa-4">
            <div class="hx-columns">
              <div class="hx-column">
                <div class="hx-metadata">
                  <div class="hx-label">Appointment Type</div>
                  <div class="hx-value">Standard</div>
                </div>
              </div>
              <div class="hx-column">
                <div class="hx-metadata">
                  <div class="hx-label">Patient</div>
                  <div class="hx-value">Sally Caban</div>
                </div>
              </div>
              <div class="hx-column">
                <div class="hx-metadata">
                  <div class="hx-label">Work Area</div>
                  <div class="hx-value">Reception</div>
                </div>
              </div>
            </div>

            <div class="hx-columns">
              <div class="hx-column">
                <div class="hx-metadata">
                  <div class="hx-label">Elapsed Time</div>
                  <div class="hx-value"><i class="hx-icon icon-clock-outline is-small"></i> 00:15</div>
                </div>
              </div>
              <div class="hx-column">
                <div class="hx-metadata">
                  <div class="hx-label">Status</div>
                  <div class="hx-value">
                    <span class="hx-badge">
                      <span class="hx-badge-content">In progress</span>
                    </span>
                  </div>
                </div>
              </div>
              <div class="hx-column">
                <div class="hx-metadata">
                  <div class="hx-label">Pulse</div>
                  <div class="hx-value"><i class="hx-icon icon-heartbeat is-small"></i> 5 bpm</div>
                </div>
              </div>
            </div>
          </div>
        </div>`,
        },
        content: getRandomDate(new Date(2015, 0, 1), new Date()),
      },
      modified: new Date(),
      flag: { label: 'Short', cssClass: '' },
    },
    {
      id: 11,
      usercode: 'EG001',
      firstname: 'Elizabth',
      surname: 'Gino',
      rolename: 'Nurse',
      email: 'eli.gino@medicaldirector.com',
      active: true,
      info: {
        icon: 'icon-information-outline',
        tooltip: {
          config: {
            placement: 'right',
            context: Context.None,
          },
          content: 'Information',
        },
      },
      created: getRandomDate(new Date(2015, 0, 1), new Date()),
      modified: getRandomDate(new Date(2015, 0, 1), new Date()),
      flag: { label: 'S', cssClass: 'is-outlined' },
    },
    {
      id: 12,
      usercode: 'BP001',
      firstname: 'Brian',
      surname: 'Pulliese',
      rolename: 'Specialist',
      email: 'brian.pulliese@medicaldirector.com',
      active: true,
      info: {
        icon: 'icon-information-outline',
        tooltip: {
          config: {
            placement: 'right',
            context: Context.None,
          },
          content: 'Information',
        },
      },
      created: getRandomDate(new Date(2015, 0, 1), new Date()),
      modified: getRandomDate(new Date(2015, 0, 1), new Date()),
      flag: { label: 'S', cssClass: 'is-primary' },
    },
    {
      id: 13,
      usercode: 'AW001',
      firstname: 'Annabell',
      surname: 'Wilson',
      rolename: 'Receptionist',
      email: 'annabell.wilson@medicaldirector.com',
      active: true,
      info: {
        icon: 'icon-information-outline',
        tooltip: {
          config: {
            placement: 'right',
            context: Context.None,
          },
          content: 'Information',
        },
      },
      created: getRandomDate(new Date(2015, 0, 1), new Date()),
      modified: getRandomDate(new Date(2015, 0, 1), new Date()),
      flag: { label: 'S', cssClass: 'is-primary' },
    },
    {
      id: 13,
      usercode: 'BW001',
      firstname: 'Annabell',
      surname: 'Bolsen',
      rolename: 'Receptionist',
      email: 'annabell.wilson@medicaldirector.com',
      active: true,
      info: {
        icon: 'icon-information-outline',
        tooltip: {
          config: {
            placement: 'right',
            context: Context.None,
          },
          content: 'Information',
        },
      },
      created: getRandomDate(new Date(2015, 0, 1), new Date()),
      modified: getRandomDate(new Date(2015, 0, 1), new Date()),
      flag: { label: 'S', cssClass: 'is-primary' },
    },
    {
      id: 14,
      usercode: 'SH001',
      firstname: 'Susan',
      surname: 'Homes',
      rolename: 'Receptionist',
      email: 'susan.homes@medicaldirector.com',
      active: false,
      info: {
        icon: 'icon-information-outline',
        tooltip: {
          config: {
            placement: 'right',
            context: Context.None,
          },
          content: 'Information',
        },
      },
      created: getRandomDate(new Date(2015, 0, 1), new Date()),
      modified: getRandomDate(new Date(2015, 0, 1), new Date()),
      flag: { label: 'S', cssClass: ' is-outlined' },
    },
    {
      id: 15,
      usercode: 'KL001',
      firstname: 'Kevin',
      surname: 'Liang',
      rolename: 'GP',
      email: 'kevin.liang@medicaldirector.com',
      active: false,
      info: {
        icon: 'icon-information-outline',
        tooltip: {
          config: {
            placement: 'right',
            context: Context.None,
          },
          content: 'Information',
        },
      },
      created: getRandomDate(new Date(2015, 0, 1), new Date()),
      modified: getRandomDate(new Date(2015, 0, 1), new Date()),
      context: Context.Warning,
    },
    {
      id: 16,
      usercode: 'JK001',
      firstname: 'Jack',
      surname: 'Kelvin',
      rolename: 'Nurse',
      email: 'jack.kelvin@medicaldirector.com',
      active: true,
      info: {
        icon: 'icon-information-outline',
        tooltip: {
          config: {
            placement: 'right',
            context: Context.None,
          },
          content: 'Information',
        },
      },
      created: getRandomDate(new Date(2015, 0, 1), new Date()),
      modified: getRandomDate(new Date(2015, 0, 1), new Date()),
    },
    {
      id: 17,
      usercode: 'DP001',
      firstname: 'Dave',
      surname: 'Poon',
      rolename: 'Practice Manager',
      email: 'dave.poon@medicaldirector.com',
      active: true,
      info: {
        icon: 'icon-information-outline',
        tooltip: {
          config: {
            placement: 'right',
            context: Context.None,
          },
          content: 'Information',
        },
      },
      created: getRandomDate(new Date(2015, 0, 1), new Date()),
      modified: getRandomDate(new Date(2015, 0, 1), new Date()),
    },
    {
      id: 18,
      usercode: 'FB001',
      firstname: 'Fred',
      surname: 'Borris',
      rolename: 'Admin',
      email: 'fred.borris@medicaldirector.com',
      active: true,
      info: {
        icon: 'icon-information-outline',
        tooltip: {
          config: {
            placement: 'right',
            context: Context.None,
          },
          content: 'Information',
        },
      },
      created: getRandomDate(new Date(2015, 0, 1), new Date()),
      modified: getRandomDate(new Date(2015, 0, 1), new Date()),
      flag: { label: 'S', cssClass: 'is-outlined' },
    },
    {
      id: 19,
      usercode: 'TS001',
      firstname: 'Tupac',
      surname: 'Shakur',
      rolename: 'Administrator',
      email: 'tupac.shakur@medicaldirector.com',
      active: true,
      info: {
        icon: 'icon-information-outline',
        tooltip: {
          config: {
            placement: 'right',
            context: Context.None,
          },
          content: 'Information',
        },
      },
      created: getRandomDate(new Date(2015, 0, 1), new Date()),
      modified: getRandomDate(new Date(2015, 0, 1), new Date()),
    },
    {
      id: 20,
      usercode: 'BS001',
      firstname: 'Biggie',
      surname: 'Smalls',
      rolename: 'GP',
      info: {
        icon: 'icon-information-outline',
        tooltip: {
          config: {
            placement: 'right',
            context: Context.None,
          },
          content: 'Information',
        },
      },
      email: 'biggie.smalls@medicaldirector.com',
      active: true,
      created: getRandomDate(new Date(2015, 0, 1), new Date()),
      modified: getRandomDate(new Date(2015, 0, 1), new Date()),
    },
  ];

  return users;

  function getRandomDate(start: Date, end: Date): Date {
    return new Date(
      start.getTime() + Math.random() * (end.getTime() - start.getTime())
    );
  }
}
