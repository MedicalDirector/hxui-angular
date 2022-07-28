export class TabularCode {
  usage = `
  import {TabularModule} from "@hxui-angular/packages/tabular/tabular.module";

  @NgModule({
    imports: [TabularModule.forRoot(),...]
  })
  export class AppModule(){}
  `;

  exampleTemplate = `<div class="hx-toolbar is-small is-perforated">
  <span
    hxTooltip="Select 1 or more users"
    [disabled]="!isPrintDisabled()"
    placement="right"
  >
    <button
      class="hx-button mr-1"
      (click)="printSelected($event)"
      [disabled]="isPrintDisabled()"
    >
      <div class="hx-icon-control">
        <i class="hx-icon icon-printer-outline"></i>
      </div>
      <div>Print</div>
    </button>
  </span>
  <button class="hx-button mr-1" (click)="setCheckAllState(true)">
    Check All
  </button>
  <button class="hx-button" (click)="setCheckAllState(false)">
    Uncheck All
  </button>
  <div class="hx-divider"></div>
  <div>
    <span class="is-info is-text-weight-bolder"
      >{{ totalSelected }}</span
    >
    of
    <span class="is-info is-text-weight-bolder"
      >{{ rowData.length }}</span
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
  [config]="tabularConfig"
  [callback]="onActionClickHandler"
  (refresh)="refreshDataHandler($event)"
  (rowClick)="rowClickHandler($event)"
  (onSort)="onSortHandler($event)"
  (onCheck)="singleCheckHandler($event)"
  (onCheckAll)="groupCheckHandler($event)"
></hxa-tabular>
`;

  exampleComponent = `
  import { Component, Inject, OnInit, ViewChild } from '@angular/core';
  import { Observable, Subscription } from 'rxjs';
  import { 
    IFiltersConfig, 
    FilterType,
    FiltersComponent,
    FiltersModel,
    TabularColumnTypes,
    TabularColumn,
    ITabularConfig,
    ITabularRow,
    TabularSize,
    SortByDirection,
    TabularTheme
  } from '@hxui/angular';
  import { UserModel } from './user.model';

  @Component({
    selector: 'app-tabular',
    templateUrl: './tabular.component.html',
    styles: [':host { display:flex; flex: 1; min-width: 0; }'],
  })
  export class TabularComponent implements OnInit {

    @ViewChild('filterComp', { static: true }) filtersComponent: FiltersComponent;

    onFilterChangeEvent$ = new Subscription();
    users$: Observable<UserModel[]>;
    code = new TabularCode();
    searchTerm: string;
    rowData: ITabularRow[] = [];
  
    labelHTML =
      '<span class="hx-icon-control" title="Role"><i class="hx-icon icon-person"></i></span>';
  
    columnData: TabularColumn[] = [
      new TabularColumn('checkboxes', 'Checkboxes', TabularColumnTypes.Checkbox, false),
      new TabularColumn('id', 'Id', TabularColumnTypes.Number, true),
      new TabularColumn('usercode', 'User Code', TabularColumnTypes.String, true),
      new TabularColumn('name', 'Name', TabularColumnTypes.Html, true),
      new TabularColumn(
        'rolename', 'Role', TabularColumnTypes.String, true, '', false,
        {
          header: this.labelHTML,
        }
      ),
      new TabularColumn('flag', 'Flag', TabularColumnTypes.Badge, false),
      new TabularColumn('created', 'Created', TabularColumnTypes.Date, true),
      new TabularColumn('modified', 'Modified', TabularColumnTypes.DateTime, true),
      new TabularColumn('info', 'info', TabularColumnTypes.Icon, false, '', true),
      new TabularColumn('active', 'Active', TabularColumnTypes.Status, false, 'is-text-center'),
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
  
    /**
     * Refresh data handler for data grid.
     */
    refreshDataHandler = $event => {
      this.getAllUsers();
    };
  
    rowClickHandler($event) {
      console.log($event);
    }
  
    onSortHandler($event) {
      console.log($event);
    }
  
    printSelected = $event => {
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
    };
  
    isPrintDisabled = () => {
      for (let i = 0; i < this.rowData.length; i++) {
        if (this.rowData[i].checked) {
          return false;
        }
      }
      return true;
    };
  
    /** Static data for example */
    private getAllUsers() {
      this.service.getUsers().subscribe(users => this.setRowData(users));
    }
  
    setCheckAllState(state = false) {
      this.rowData.forEach(row => {
        row.checked = state;
      });
    }
  
    constructor(
      protected pageScrollService: PageScrollService,
      protected breakpointObserver: BreakpointObserver,
      @Inject(DOCUMENT) protected document: any,
      private service: TabularService
    ) {
      super(pageScrollService, breakpointObserver, document);
    }
  
    ngOnInit() {
      this.onFilterChangeEvent$ =
        this.filtersComponent.onFilterOptionChanged$.subscribe(
          (filter: FiltersModel) => {
            console.log(filter);
            if (filter.type === FilterType.SingleSelect) {
              if (filter.selected[0].value === 'All') {
                this.getAllUsers();
              } else {
                this.service
                  .getUserByRole(filter.selected[0].value)
                  .subscribe(users => this.setRowData(users));
              }
            } else if (filter.type === FilterType.Search) {
              this.service
                .filterUserByName(filter.value)
                .subscribe(users => this.setRowData(users));
            }
          }
        );
  
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
      console.log('action performed');
    };
  
    singleCheckHandler($event): void {
      console.log('single check event: ' + $event);
    }
  
    groupCheckHandler($event): void {
      console.log('group check ' + $event);
    }
  }
  `;

  exampleService = `
  import { Injectable } from '@angular/core';
  import { Observable, of } from 'rxjs';
  import { catchError, delay, map } from 'rxjs/operators';
  import { Context } from '@hxui/angular';
  import { UserModel } from './user.model';

  export class TabularService {
    getUsers(): Observable<UserModel[]> {
      const items = getMockPeople() as UserModel[];
      return of(items).pipe(
        delay(500),
        catchError(this.handleError('getUsers', []))
      );
    }
  
    getUser(id: number): Observable<UserModel> {
      const items = getMockPeople() as UserModel[];
  
      return of(items).pipe(
        delay(500),
        map(users => {
          const result = users.find(data => data.id === id);
          return result;
        }),
        catchError(this.handleError<UserModel>('UserModel'))
      );
    }
  
    getUserByRole(role: string): Observable<UserModel[]> {
      const items = getMockPeople() as UserModel[];
  
      return of(items)
        .pipe(
          delay(500),
          map(users => {
            users = users.filter(data => data.rolename === role);
            return users;
          })
        )
        .pipe(catchError(this.handleError<UserModel[]>('getUsers', [])));
    }
  
    filterUserByName(name: string): Observable<UserModel[]> {
      const items = getMockPeople() as UserModel[];
  
      return of(items)
        .pipe(
          delay(500),
          map(users => {
            const regexp = new RegExp(name, 'i');
            users = users.filter(
              data => regexp.test(data.firstname) || regexp.test(data.surname)
            );
            return users;
          })
        )
        .pipe(catchError(this.handleError<UserModel[]>('getUsers', [])));
    }
  
    private handleError<T>(operation = 'operation', result?: T) {
      return (error: any): Observable<T> => {
        console.error(error); // log to console instead
        console.log(\`\${operation} failed: \${error.message}\`);
  
        // Let the app keep running by returning an empty result.
        return of(result as T);
      };
    }
  }

  function getMockPeople() {
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
            content: \`
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
            </div>\`,
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
    
    function getRandomDate(start: Date, end: Date) {
      return new Date(
        start.getTime() + Math.random() * (end.getTime() - start.getTime())
      );
    }
  }
  `;

  exampleUserModel = `
  import {ActionConfigRouteType, IActionsConfig} from '../../../modules/tabular/actions-config.interface';
  import {ITabularRow} from '../../../modules/tabular/tabular-row.interface';
  import {ITabularColumnIconType, ITabularColumnBadgeType} from '../../../modules/tabular';
  import {IWithTooltip} from './tabular-tooltip.interface';

  export class UserModel implements ITabularRow {
    public id: number;
    public usercode: string;
    public firstname: string;
    public surname: string;
    public rolename: string;
    public email: string;
    public flag: ITabularColumnBadgeType;
    public active: boolean;
    public created: Date|IWithTooltip;
    public modified: Date;
    public selected: boolean;
    public checked: boolean;
    public title: string;
    public info: ITabularColumnIconType;
    public icon: string;
    public actions: IActionsConfig[] = [];
    public name: string;


    constructor(data?: any) {
      if (data) {
        Object.assign(this, data);
      }
      this.setIcon();
      this.setActions();
      this.setTitle();
      this.setName();
    }

    setIcon() {
    this.icon = (this.active) ? 'icon-check-empty is-primary' : 'icon-close-empty is-danger';
    }

    setActions() {
      this.actions = [
        {
          id: 'row_person_prescription',
          label: 'Prescribe',
          icon: 'icon-prescription',
          route: ['/prescription'],
          routeType: ActionConfigRouteType.Route,
          disabledConfig: {disabled: true, tooltip: 'Not enough permission'}
        },
        {
          id: 'row_person_edit',
          label: 'Edit',
          icon: 'icon-edit',
          routeType: ActionConfigRouteType.Callback,
          callback: [this.onActionClickHandler, 'edit', 1]
        },
        {
          id: 'row_person_delete',
          label: 'Delete',
          icon: 'icon-bin',
          routeType: ActionConfigRouteType.Callback,
          callback: [this.onActionClickHandler, 'delete', 1]
        },
        {
          id: 'row_person_more',
          label: 'More',
          icon: 'icon-more',
          routeType: ActionConfigRouteType.None,
          children: [
            {
              id: 'row_person_prescription',
              label: 'Prescribe',
              route: ['/prescription'],
              routeType: ActionConfigRouteType.Route,
              disabledConfig: {disabled: true, tooltip: 'Not enough permission'}
            },
            {
              id: 'row_person_edit',
              label: 'Edit',
              routeType: ActionConfigRouteType.Callback,
              callback: [this.onActionClickHandler, 'edit', 1]
            },
            {
              id: 'row_person_delete',
              label: 'Delete',
              routeType: ActionConfigRouteType.Callback,
              callback: [this.onActionClickHandler, 'delete', 1]
            }]
        }
      ];
    }

    setTitle() {
      this.title = 'This is a custom title tag for: ' + this.usercode + ':' + this.firstname + ':' + this.surname;
    }

  setName() {
      this.name = '<div class="is-text-weight-bolder">' + this.surname + ',</div><div>' + this.firstname + '</div>';
    }

    /**
     * Function used in the callback actions
     * @param type
     * @param data
     */
    onActionClickHandler = (type, data) => {
      alert('You clicked the ' + type + ' button. Arguments:' + type + ' and ' + data);
    }
  }
  `;

  tabularConfig = `
  {
    size: TabularSize.Default,
    clickableRows: true,
    pagination: {
        itemsPerPage: 5,
        currentPage: 1
    },
    clickableRows: true,
    stickyHeader: true,
    cssClass: '',
    sortBy: [{
      property: 'firstname',
      direction: SortByDirection.Descending,
      type: TabularColumnTypes.String
    }];
  };
  `;

  columnTypes = `
  TabularColumnTypes.String
  TabularColumnTypes.Number
  TabularColumnTypes.Icon
  TabularColumnTypes.Date
  TabularColumnTypes.Actions
  TabularColumnTypes.Status
  TabularColumnTypes.DateTime
  TabularColumnTypes.Badge
  TabularColumnTypes.Html
  `;

  badgeColumnType = `
  {
    label:string,
    cssClass:string
  }
  `;
}
