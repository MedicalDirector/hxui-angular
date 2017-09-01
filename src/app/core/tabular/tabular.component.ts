import {ChangeDetectionStrategy, Component, Inject, OnInit} from '@angular/core';
import {TabularColumn} from '../../../modules/tabular/tabular-column.model';
import {TabularColumnTypes} from '../../../modules/tabular/tabular-column.interface';
import {ITabularConfig} from '../../../modules/tabular/tabular-config.interface';
import {TabularSize} from '../../../modules/tabular/tabular-size.enum';
import {ActionConfigRouteType} from '../../../modules/tabular/actions-config.interface';
import {TabularService} from './tabular.service';
import {UserModel} from './user.model';
import {CoreBaseComponent} from '../core-base.component';
import {PageScrollService} from 'ng2-page-scroll';
import {DOCUMENT} from '@angular/platform-browser';

@Component({
  selector: 'app-tabular',
  templateUrl: './tabular.component.html',
  styles: [':host { display:flex; flex: 1; min-width: 0; }'],
})
export class TabularComponent extends CoreBaseComponent implements OnInit {

  searchTerm: string;
  rowData: any[] = [];
  columnData: TabularColumn[] = [
    new TabularColumn('checkboxes', 'Checkboxes', TabularColumnTypes.Checkbox, false),
    new TabularColumn('id', 'Id', TabularColumnTypes.String, true),
    new TabularColumn('usercode', 'User Code', TabularColumnTypes.String, true),
    new TabularColumn('firstname', 'First Name', TabularColumnTypes.String, true),
    new TabularColumn('surname', 'Surname', TabularColumnTypes.String, true),
    new TabularColumn('rolename', 'Role', TabularColumnTypes.String, true),
    new TabularColumn('email', 'Email', TabularColumnTypes.String, true),
    new TabularColumn('active', 'Active', TabularColumnTypes.Status, false, 'is-text-center'),
    new TabularColumn('actions', 'Actions', TabularColumnTypes.Actions, false)
  ];

  tabularConfig: ITabularConfig = {
    size: TabularSize.Default,
    pagination: {
      itemsPerPage: 5,
      currentPage: 1
    },
  };



  /**
   * Refresh data handler for data grid.
   */
  refreshDataHandler = ($event) => {
    this.getTabularData();
  }


  printSelected = ($event) => {
    let count = 0;
    for (let i = 0; i < this.rowData.length; i++) {
      if (this.rowData[i].selected) {
        count++;
        console.log(this.rowData[i]);
      }
    }
    alert('Printing ' + count + ' users... Check console to see who was selected.');
  }


  isPrintDisabled = () => {
    for (let i = 0; i < this.rowData.length; i++) {
      if (this.rowData[i].selected) {
        return false;
      }
    }
    return true;
  }

  /**
   * Static data for example
   */
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

  constructor(protected pageScrollService: PageScrollService,
              @Inject(DOCUMENT) protected document: any,
              private service: TabularService) {
    super(pageScrollService, document);

  }

  ngOnInit() {
    this.getTabularData();
  }

}
