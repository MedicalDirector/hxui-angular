import {TabularColumn} from '../../../modules/tabular/tabular-column.model';
import {TabularColumnTypes} from '../../../modules/tabular/tabular-column.interface';
import {ITabularRow} from '../../../modules/tabular/tabular-row.interface';
import {ISortByProperty, SortByDirection} from '../../../modules/tabular/tabular-sort-by.service';

export class TabularCode {
usage =
`
import {TabularModule} from "@hxui-angular/packages/tabular/tabular.module";

@NgModule({
  imports: [TabularModule.forRoot(),...]
})
export class AppModule(){}

`;

exampleTemplate =
`
<div class="hx-columns">
  <div class="hx-column">
    <span hxTooltip="Select 1 or more users" [disabled]="!isPrintDisabled()" placement="right">
        <button class="hx-button is-small" (click)="printSelected()" [disabled]="isPrintDisabled()" >Print</button>
    </span>
  </div>
</div>

<hx-tabular
  [rows]="rowData"
  [columns]="columnData"
  [config]="tabularConfig"
  [callback]="onActionClickHandler"
  (refresh)="refreshDataHandler($event)"
  (rowClick)="rowClickHandler($event)">
</hx-tabular>

`;

exampleComponent =
`
import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {TabularColumn} from '@hxui/angular';
import {TabularColumnTypes} from '@hxui/angular';
import {ITabularConfig} from '@hxui/angular';
import {TabularSize} from '@hxui/angular';
import {ActionConfigRouteType} from '@hxui/angular';
import {TabularService} from '@hxui/angular';
import {UserModel} from '@hxui/angular';

@Component({
  selector: 'app-tabular',
  templateUrl: './tabular.component.html'
})
export class TabularComponent implements OnInit {

  searchTerm: string;
  rowData: ITabularRow[] = [];
  columnData: TabularColumn[] = [
    new TabularColumn('checkboxes', 'Checkboxes', TabularColumnTypes.Checkbox, false),
    new TabularColumn('id', 'Id', TabularColumnTypes.String, true),
    new TabularColumn('usercode', 'User Code', TabularColumnTypes.String, true),
    new TabularColumn('firstname', 'First Name', TabularColumnTypes.String, true),
    new TabularColumn('surname', 'Surname', TabularColumnTypes.String, true),
    new TabularColumn('flag', 'Flag', TabularColumnTypes.Badge, false),
    new TabularColumn('created', 'Created', TabularColumnTypes.Date, true),
    new TabularColumn('modified', 'Modified', TabularColumnTypes.DateTime, true),
    new TabularColumn('active', 'Active', TabularColumnTypes.Status, false, 'is-text-center'),
    new TabularColumn('actions', 'Actions', TabularColumnTypes.Actions, false)
  ];

  tabularConfig: ITabularConfig = {
    size: TabularSize.Default,
    clickableRows: true,
    pagination: {
      itemsPerPage: 5,
      currentPage: 1
    },
  };

  /**
   * Refresh data handler for data grid.
   */
  refreshDataHandler($event) {
    this.getTabularData();
  }

   rowClickHandler($event) {
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
  **/
  private getTabularData() {
    this.rowData = [];
    this.service.getUsers()
      .then((users) => {
        for (let i = 0; i < users.length; i++) {
          const user = new UserModel(users[i]);
          this.rowData.push(user);
        }
      });
  }

  constructor(private service: TabularService) {
    this.getTabularData();
  }

  ngOnInit() {
  }
}

`;

exampleService =
`
import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import {UserModel} from './user.model';
import {Observable, of} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class TabularService {

  private usersUrl = 'api/users';

  constructor(private http: HttpClient) { }

  getUsers(): Observable<UserModel[]> {
    return this.http.get<UserModel[]>(this.usersUrl)
      .pipe(
        catchError(this.handleError('getUsers', []))
      );
  }

  getUser(id: number): Observable<UserModel> {
   
    return this.http.get<UserModel>(url)
      .pipe(
        catchError(this.handleError<UserModel>('getUsers id=id'))
      );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(\`operation failed: error.message\`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
`;

exampleMockData =
`
import { InMemoryDbService } from 'angular-in-memory-web-api';
import {Context} from '../../../modules/enums';
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const users = [
      {
        id: 1,
        usercode: 'BR001',
        firstname: 'Brenda',
        surname: 'Reed',
        rolename: 'GP',
        email: 'brenda.reed@medicaldirector.com',
        active: false,
        created: new Date(),
        modified: new Date()
      },
      {
        id: 2,
        usercode: 'MR001',
        firstname: 'Mercedes',
        surname: 'Mendez',
        rolename: 'GP',
        email: 'mercedes.mendez@medicaldirector.com',
        active: false,
        created: new Date(),
        modified: new Date(),
        checked: true,
        flag: {label: 'S', cssClass: ''}
      },
      {
        id: 3,
        usercode: 'II006',
        firstname: 'John',
        surname: 'Smith',
        rolename: 'Specialist',
        email: 'john.smith@medicaldirector.com',
        active: true,
        created: new Date(),
        modified: new Date(),
        flag: {label: 'S', cssClass: 'is-outlined'},
        selected: true
      },
      {
        id: 4,
        usercode: 'JS001',
        firstname: 'Julia',
        surname: 'Sampson',
        rolename: 'Specialist',
        email: 'julia.sampson@medicaldirector.com',
        active: true,
        created: new Date(),
        modified: new Date(),
        flag: {label: 'S', cssClass: 'is-danger'},
        stripeContext: Context.Danger
      },
      {
        id: 5,
        usercode: 'GP001',
        firstname: 'John',
        surname: 'Pipps',
        rolename: 'Specialist',
        email: 'john.gipps@medicaldirector.com',
        active: true,
        created: new Date(),
        modified: new Date(),
        flag: {label: 'S', cssClass: 'is-warning'},
        context: Context.Warning,
        stripeContext: Context.Warning
      },
      {
        id: 6,
        usercode: 'NR001',
        firstname: 'Natalie',
        surname: 'Roberts',
        rolename: 'Receptionist',
        email: 'natalie.roberts@medicaldirector.com',
        active: false,
        created: new Date(),
        modified: new Date(),
        flag: {label: 'S', cssClass: ''}
      },
      {
        id: 7,
        usercode: 'HS001',
        firstname: 'Harry',
        surname: 'Sechi',
        rolename: 'GP',
        email: 'harry.sechi@medicaldirector.com',
        active: true,
        created: new Date(),
        modified: new Date(),
        flag: {label: 'S', cssClass: 'is-error'}
      },
      {
        id: 8,
        usercode: 'XL001',
        firstname: 'Xavier',
        surname: 'Lorenzo',
        rolename: 'Practice Manager',
        email: 'xavier.lorenzo@medicaldirector.com',
        active: true,
        created: new Date(),
        modified: new Date(),
        flag: {label: 'S', cssClass: 'is-outlined'}
      },
      {
        id: 9,
        usercode: 'CY001',
        firstname: 'Chris',
        surname: 'Yap',
        rolename: 'GP',
        email: 'chris.yap@medicaldirector.com',
        active: true,
        created: new Date(),
        modified: new Date(),
        flag: {label: 'S', cssClass: ''},
        context: Context.Danger
      },
      {
        id: 10,
        usercode: 'MA001',
        firstname: 'Mohammad',
        surname: 'Ahmed',
        rolename: 'Specialist',
        email: 'mohammad.ahmed@medicaldirector.com',
        active: true,
        created: new Date(),
        modified: new Date(),
        flag: {label: 'Short', cssClass: ''}
      },
      {
        id: 11,
        usercode: 'EG001',
        firstname: 'Elizabth',
        surname: 'Gino',
        rolename: 'Nurse',
        email: 'eli.gino@medicaldirector.com',
        active: true,
        created: new Date(),
        modified: new Date(),
        flag: {label: 'S', cssClass: 'is-outlined'}
      },
      {
        id: 12,
        usercode: 'BP001',
        firstname: 'Brian',
        surname: 'Pulliese',
        rolename: 'Specialist',
        email: 'brian.pulliese@medicaldirector.com',
        active: true,
        created: new Date(),
        modified: new Date(),
        flag: {label: 'S', cssClass: 'is-primary'}
      },
      {
        id: 13,
        usercode: 'AW001',
        firstname: 'Annabell',
        surname: 'Wilson',
        rolename: 'Receptionist',
        email: 'annabell.wilson@medicaldirector.com',
        active: true,
        created: new Date(),
        modified: new Date(),
        flag: {label: 'S', cssClass: 'is-primary'}
      },
      {
        id: 13,
        usercode: 'BW001',
        firstname: 'Annabell',
        surname: 'Bolsen',
        rolename: 'Receptionist',
        email: 'annabell.wilson@medicaldirector.com',
        active: true,
        created: new Date(),
        modified: new Date(),
        flag: {label: 'S', cssClass: 'is-primary'}
      },
      {
        id: 14,
        usercode: 'SH001',
        firstname: 'Susan',
        surname: 'Homes',
        rolename: 'Receptionist',
        email: 'susan.homes@medicaldirector.com',
        active: false,
        created: new Date(),
        modified: new Date(),
        flag: {label: 'S', cssClass: ' is-outlined'}
      },
      {
        id: 15,
        usercode: 'KL001',
        firstname: 'Kevin',
        surname: 'Liang',
        rolename: 'GP',
        email: 'kevin.liang@medicaldirector.com',
        active: false,
        created: new Date(),
        modified: new Date(),
        context: Context.Warning
      },
      {
        id: 16,
        usercode: 'JK001',
        firstname: 'Jack',
        surname: 'Kelvin',
        rolename: 'Nurse',
        email: 'jack.kelvin@medicaldirector.com',
        active: true,
        created: new Date(),
        modified: new Date()
      },
      {
        id: 17,
        usercode: 'DP001',
        firstname: 'Dave',
        surname: 'Poon',
        rolename: 'Practice Manager',
        email: 'dave.poon@medicaldirector.com',
        active: true,
        created: new Date(),
        modified: new Date()
      },
      {
        id: 18,
        usercode: 'FB001',
        firstname: 'Fred',
        surname: 'Borris',
        rolename: 'Admin',
        email: 'fred.borris@medicaldirector.com',
        active: true,
        created: new Date(),
        modified: new Date(),
        flag: {label: 'S', cssClass: 'is-outlined'}
      },
      {
        id: 19,
        usercode: 'TS001',
        firstname: 'Tupac',
        surname: 'Shakur',
        rolename: 'Administrator',
        email: 'tupac.shakur@medicaldirector.com',
        active: true,
        created: new Date(),
        modified: new Date()
      },
      {
        id: 20,
        usercode: 'BS001',
        firstname: 'Biggie',
        surname: 'Smalls',
        rolename: 'GP',
        email: 'biggie.smalls@medicaldirector.com',
        active: true,
        created: new Date(),
        modified: new Date()
      }
    ];
    return {users};
  }
}


`;

exampleUserModel =
`
import {ActionConfigRouteType, IActionsConfig} from '@hxui/angular';
import {ITabularRow} from '@hxui/angular';

export class UserModel implements ITabularRow {
  public id: number;
  public usercode: string;
  public firstname: string;
  public surname: string;
  public rolename: string;
  public email: string;
  public flag: {label: string, cssClass: string};
  public active: boolean;
  public created: Date;
  public modified: Date;
  public selected: boolean;
  public checked: boolean;


  constructor(data?: any) {
    if (data) {
      Object.assign(this, data);
    }
  }

  get icon(): string {
    return (this.active) ? 'icon-check-empty is-primary' : 'icon-close-empty is-danger';
  }

  get actions(): IActionsConfig[] {
    return  [
      {
        id: 'row_person_view',
        label: 'View',
        route: ['/tabular'],
        routeType: ActionConfigRouteType.Default,
        disabledConfig: {disabled: (Math.floor(Math.random() * 2) === 1), tooltip: 'Not enough permission'}
      },
      {
        id: 'row_person_edit',
        label: 'Edit',
        routeType: ActionConfigRouteType.Callback,
        callback: [this.onActionClickHandler, 'edit', 1]
      },
      {
        id: 'row_person_delete',
        label: 'Archive',
        routeType: ActionConfigRouteType.Callback,
        callback: [this.onActionClickHandler, 'delete', 1]
      },
      {
        id: 'row_person_delete_forever',
        label: 'Delete',
        routeType: ActionConfigRouteType.Callback,
        callback: [this.onActionClickHandler, 'perm-delete', 1]
      },
      {
        id: 'row_default',
        label: '<span class="hx-icon icon-medications"></span>',
        isDefault: true,
        routeType: ActionConfigRouteType.Callback,
        callback: [this.onActionClickHandler, 'default', 1]
      }
    ];
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

tabularConfig =
`
{
  size: TabularSize.Default,
  clickableRows: true,
  pagination: {
      itemsPerPage: 5,
      currentPage: 1
  },
  clickableRows: true;
  sortBy: [{
    property: 'firstname',
    direction: SortByDirection.Descending,
    type: TabularColumnTypes.String
  }];
};

`;


columnTypes =
`
TabularColumnTypes.String
TabularColumnTypes.Number
TabularColumnTypes.Icon
TabularColumnTypes.Date
TabularColumnTypes.Actions
TabularColumnTypes.Status
TabularColumnTypes.DateTime
TabularColumnTypes.Badge

`;

badgeColumnType =
`
{
  label:string, 
  cssClass:string
}

`;

}
