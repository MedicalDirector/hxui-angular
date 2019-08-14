import {ChangeDetectionStrategy, Component, Inject, OnInit, ViewChild} from '@angular/core';
import {TabularColumn} from '../../../../projects/hx-ui/src/lib/tabular/tabular-column.model';
import {TabularColumnTypes} from '../../../../projects/hx-ui/src/lib/tabular/tabular-column.interface';
import {ITabularConfig} from '../../../../projects/hx-ui/src/lib/tabular/tabular-config.interface';
import {TabularSize} from '../../../../projects/hx-ui/src/lib/tabular/tabular-size.enum';
import {TabularService} from './tabular.service';
import {UserModel} from './user.model';
import {CoreBaseComponent} from '../core-base.component';
import {PageScrollService} from 'ngx-page-scroll';
import {DOCUMENT} from '@angular/common';
import {ITabularRow} from '../../../../projects/hx-ui/src/lib/tabular/tabular-row.interface';
import {TabularCode} from './tabular.code';
import {Observable, Subscription} from 'rxjs';
import {BreakpointObserver} from '@angular/cdk/layout';
import {SortByDirection} from '../../../../projects/hx-ui/src/lib/tabular/tabular-sort-by.service';
import {IFiltersConfig} from '../../../../projects/hx-ui/src/lib/filters/filters-config.interface';
import {FilterType} from '../../../../projects/hx-ui/src/lib/filters/filters-type.enum';
import {FiltersComponent} from '../../../../projects/hx-ui/src/lib/filters/filters.component';
import {FiltersModel} from '../../../../projects/hx-ui/src/lib/filters/filters.model';

@Component({
  selector: 'app-tabular',
  templateUrl: './tabular.component.html',
  styles: [':host { display:flex; flex: 1; min-width: 0; }'],
})
export class TabularComponent extends CoreBaseComponent implements OnInit {

  @ViewChild('filterComp') filtersComponent: FiltersComponent;
  onFilterChangeEvent$ = new Subscription();
  users$: Observable<UserModel[]>;
  code = new TabularCode();
  searchTerm: string;
  rowData: ITabularRow[] = [];
  columnData: TabularColumn[] = [
    new TabularColumn('checkboxes', 'Checkboxes', TabularColumnTypes.Checkbox, false ,'' , true),
    new TabularColumn('id', 'Id', TabularColumnTypes.Number, true ,'' , true),
    new TabularColumn('usercode', 'User Code', TabularColumnTypes.String, true , '' , true),
    new TabularColumn('name', 'Name', TabularColumnTypes.Html, true ,  '' , true),
    new TabularColumn('rolename', 'Role', TabularColumnTypes.String, true, '' , true),
    new TabularColumn('flag', 'Flag', TabularColumnTypes.Badge, false,'' , true),
    new TabularColumn('created', 'Created', TabularColumnTypes.Date, true,'' , true),
    new TabularColumn('modified', 'Modified', TabularColumnTypes.DateTime, true,'' , true),
    new TabularColumn('info', 'info', TabularColumnTypes.Icon, false,'' , true),
    new TabularColumn('active', 'Active', TabularColumnTypes.Status, false, 'is-text-center', true),
    new TabularColumn('actions', 'Actions', TabularColumnTypes.Actions, false,'' , true)
  ];

  tabularConfig: ITabularConfig = {
    id: 'UniqueId',
    size: TabularSize.Default,
    clickableRows: true,
    pagination: {
      itemsPerPage: 5,
      currentPage: 1
    },
    sortBy: [
      {
        property: 'modified',
        type: TabularColumnTypes.DateTime,
        direction: SortByDirection.Descending
      }
    ]
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
          selected: true
        },
        {
          label: 'Administrator',
          value: 'Administrator',
          selected: false
        },
        {
          label: 'GP',
          value: 'GP',
          selected: false
        },
        {
          label: 'Specialist',
          value: 'Specialist',
          selected: false
        },
        {
          label: 'Practice Manager',
          value: 'Practice Manager',
          selected: false
        },
        {
          label: 'Nurse',
          value: 'Nurse',
          selected: false
        },
        {
          label: 'Receptionist',
          value: 'Receptionist',
          selected: false
        }
      ],
      defaultIndex: 1
    },
    {
      id: 'searchFilter',
      type: FilterType.Search,
      label: 'Filter by name'
    }
  ];

  get totalSelected() {
    let count = 0;
    this.rowData.forEach((row) => {
      if (row.checked) {
        count++;
      }
    });
    return count;
  }


  /**
   * Refresh data handler for data grid.
   */
  refreshDataHandler = ($event) => {
    this.getAllUsers();
  }


  rowClickHandler($event) {
    console.log($event);
  }

  onSortHandler($event) {
    console.log($event);
  }


  printSelected = ($event) => {
    let count = 0;
    for (let i = 0; i < this.rowData.length; i++) {
      if (this.rowData[i].checked) {
        count++;
        console.log(this.rowData[i]);
      }
    }
    alert('Printing ' + count + ' users... Check console to see who was selected.');
  }


  isPrintDisabled = () => {
    for (let i = 0; i < this.rowData.length; i++) {
      if (this.rowData[i].checked) {
        return false;
      }
    }
    return true;
  }

  /**
   * Static data for example
   */
  private getAllUsers() {
    const data: ITabularRow[] = [];
    this.service.getUsers().subscribe((users) => this.setRowData(users));
  }


  setCheckAllState(state: boolean = false) {
    this.rowData.forEach((row) => {
      row.checked = state;
    });
  }

  constructor(protected pageScrollService: PageScrollService,
              protected breakpointObserver: BreakpointObserver,
              @Inject(DOCUMENT) protected document: any,
              private service: TabularService) {
    super(pageScrollService, breakpointObserver, document);

  }

  ngOnInit() {
    this.onFilterChangeEvent$ = this.filtersComponent.onFilterOptionChanged$
      .subscribe((filter: FiltersModel) => {
        console.log(filter);
        if (filter.type === FilterType.SingleSelect) {
          if (filter.selected.value === 'All') {
            this.getAllUsers();
          } else {
            this.service.getUserByRole(filter.selected.value).subscribe((users) => this.setRowData(users));
          }
        } else if (filter.type === FilterType.Search) {
          this.service.filterUserByName(filter.value).subscribe((users) => this.setRowData(users));
        }
      });

    this.getAllUsers();
  }

  private setRowData(users: UserModel[]) {
    const data: UserModel[] = [];
    if (users) {
      for (let i = 0; i < users.length; i++) {
        const user = new UserModel(users[i]);
        data.push(user);
      }
      this.rowData = data;
    }
  }

  onActionClickHandler = () => {

  }

  singleCheckHandler($event): void {
    alert('single check event: ' + $event);
    console.log($event);
  }

  groupCheckHandler($event): void {
    alert('group check ' + $event)
  }

}
