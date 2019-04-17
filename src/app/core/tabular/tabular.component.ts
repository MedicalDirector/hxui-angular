import {ChangeDetectionStrategy, Component, Inject, OnInit} from '@angular/core';
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
import {Observable} from 'rxjs';
import {BreakpointObserver} from '@angular/cdk/layout';

@Component({
  selector: 'app-tabular',
  templateUrl: './tabular.component.html',
  styles: [':host { display:flex; flex: 1; min-width: 0; }'],
})
export class TabularComponent extends CoreBaseComponent implements OnInit {

  users$: Observable<UserModel[]>;
  code = new TabularCode();
  searchTerm: string;
  rowData: ITabularRow[] = [];
  columnData: TabularColumn[] = [
    new TabularColumn('checkboxes', 'Checkboxes', TabularColumnTypes.Checkbox, false),
    new TabularColumn('id', 'Id', TabularColumnTypes.Number, true),
    new TabularColumn('usercode', 'User Code', TabularColumnTypes.String, true),
    new TabularColumn('name', 'Name', TabularColumnTypes.Html, true),
    new TabularColumn('flag', 'Flag', TabularColumnTypes.Badge, false),
    new TabularColumn('created', 'Created', TabularColumnTypes.Date, true),
    new TabularColumn('modified', 'Modified', TabularColumnTypes.DateTime, true),
    new TabularColumn('info', 'info', TabularColumnTypes.Icon, false),
    new TabularColumn('active', 'Active', TabularColumnTypes.Status, false, 'is-text-center'),
    new TabularColumn('actions', 'Actions', TabularColumnTypes.Actions, false)
  ];

  tabularConfig: ITabularConfig = {
    id: 'UniqueId',
    size: TabularSize.Default,
    clickableRows: true,
    pagination: {
      itemsPerPage: 5,
      currentPage: 1
    }
  };



  /**
   * Refresh data handler for data grid.
   */
  refreshDataHandler = ($event) => {
    this.getTabularData();
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
  private getTabularData() {
    const data: ITabularRow[] = [];
    this.service.getUsers()
      .subscribe((users) => {
        if (users) {
          for (let i = 0; i < users.length; i++) {
            const user = new UserModel(users[i]);
            data.push(user);
          }
        }
      });
    this.rowData = data;
  }

  constructor(protected pageScrollService: PageScrollService,
              protected breakpointObserver: BreakpointObserver,
              @Inject(DOCUMENT) protected document: any,
              private service: TabularService) {
    super(pageScrollService, breakpointObserver, document);

  }

  ngOnInit() {
    this.getTabularData();
  }

  onActionClickHandler = () => {

  }

}
