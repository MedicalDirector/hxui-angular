import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FiltersComponent,
  FiltersModel,
  FilterType,
  IFiltersConfig,
  ITabularConfig,
  ITabularRow,
  SortByDirection,
  TabularColumn,
  TabularColumnTypes,
  TabularSize,
  TabularTheme,
} from '@hxui/angular';
import { Observable, Subscription } from 'rxjs';
import { Contents } from '../../shared/page-base/page-base.model';
import { PageTableCode } from './page-table.code';
import { PageTableService } from './page-table.service';
import { UserModel } from './user.model';

@Component({
  selector: 'app-page-table',
  templateUrl: './page-table.component.html',
  styles: [':host { display: contents; }'],
})
export class PageTableComponent implements OnInit {
  code = new PageTableCode();
  contents: Contents[] = [
    { text: 'Usage', link: 'usage' },
    { text: 'Kitchen-sink example', link: 'example-kitchen' },
    { text: 'API reference', link: 'api' },
  ];

  @ViewChild('filterComp', { static: true })
  private _filtersComponent: FiltersComponent;

  onFilterChangeEvent$ = new Subscription();
  users$: Observable<UserModel[]>;
  searchTerm: string;
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
    new TabularColumn('id', 'Id', TabularColumnTypes.Number, true),
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
    new TabularColumn('flag', 'Flag', TabularColumnTypes.Badge, false),
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

  tabularConfig: ITabularConfig = {
    id: 'UniqueId',
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
  };

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
    {
      id: 'searchFilter',
      type: FilterType.Search,
      label: 'Filter by name',
    },
  ];

  get totalSelected() {
    let count = 0;
    this.rowData.forEach(row => {
      if (row.checked) {
        count++;
      }
    });
    return count;
  }

  constructor(private _service: PageTableService) {}

  ngOnInit() {
    this.onFilterChangeEvent$ =
      this._filtersComponent.onFilterOptionChanged$.subscribe(
        (filter: FiltersModel) => {
          console.log(filter);
          if (filter.type === FilterType.SingleSelect) {
            if (filter.selected[0].value === 'All') {
              this._getAllUsers();
            } else {
              this._service
                .getUserByRole(filter.selected[0].value)
                .subscribe(users => this._setRowData(users));
            }
          } else if (filter.type === FilterType.Search) {
            this._service
              .filterUserByName(filter.value)
              .subscribe(users => this._setRowData(users));
          }
        }
      );

    this._getAllUsers();
  }

  /** Refresh data handler for data grid. */
  refreshDataHandler() {
    this._getAllUsers();
  }

  rowClickHandler($event: Event) {
    console.log($event);
  }

  onSortHandler($event: Event) {
    console.log($event);
  }

  printSelected() {
    let count = 0;
    for (let i = 0; i < this.rowData.length; i++) {
      if (this.rowData[i].checked) {
        count++;
        console.log(this.rowData[i]);
      }
    }
    alert(
      'Printing ' + count + ' users... Check console to see who was selected.'
    );
  }

  isPrintDisabled() {
    for (let i = 0; i < this.rowData.length; i++) {
      if (this.rowData[i].checked) {
        return false;
      }
    }
    return true;
  }

  setCheckAllState(state = false) {
    this.rowData.forEach(row => {
      row.checked = state;
    });
  }

  onActionClickHandler() {
    console.log('action performed');
  }

  singleCheckHandler($event): void {
    console.log('single check event: ' + $event);
  }

  groupCheckHandler($event): void {
    console.log('group check ' + $event);
  }

  /** Static data for example */
  private _getAllUsers() {
    this._service.getUsers().subscribe(users => this._setRowData(users));
  }

  private _setRowData(users: UserModel[]) {
    const data: UserModel[] = [];
    if (users) {
      for (let i = 0; i < users.length; i++) {
        const user = new UserModel(users[i]);
        data.push(user);
      }
      this.rowData = data;
    }
  }
}
