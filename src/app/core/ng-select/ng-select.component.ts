import {Component, Inject, OnInit} from '@angular/core';
import {CoreBaseComponent} from '../core-base.component';
import {PageScrollService} from 'ngx-page-scroll-core';
import {BreakpointObserver} from '@angular/cdk/layout';
import {DOCUMENT} from '@angular/common';
import {NgSelectCode} from './ng-select.code';
import {Observable, Subject} from 'rxjs/index';
import {DataService} from './data.service';

@Component({
  selector: 'app-ng-select',
  templateUrl: './ng-select.component.html',
  styleUrls: ['./ng-select.component.scss']
})
export class NgSelectComponent extends CoreBaseComponent implements OnInit {

  public code = new NgSelectCode();
  people$: Observable<any[]>;
  selectedPeople = [{ name: 'Karyn Wright' }];
  selectedPersonId = '5a15b13c36e7a7f00cf0d7cb';
  peopleInput$ = new Subject<string>();


  constructor(
    protected pageScrollService: PageScrollService,
    protected breakpointObserver: BreakpointObserver,
    @Inject(DOCUMENT) protected document: any,
    private dataService: DataService
  ) {
    super(pageScrollService, breakpointObserver, document);
  }

  ngOnInit() {
    this.people$ = this.dataService.getPeople();
  }

  clearModel() {
    this.selectedPeople = [];
  }

  changeModel() {
    this.selectedPeople = [{ name: 'New person' }];
  }

  onKeyup(val) {
    console.log(val);
  }

}
