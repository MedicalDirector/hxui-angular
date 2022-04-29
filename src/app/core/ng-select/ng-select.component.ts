import { Component, Inject, OnInit } from '@angular/core';
import { CoreBaseComponent } from '../core-base.component';
import { PageScrollService } from 'ngx-page-scroll-core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { DOCUMENT } from '@angular/common';
import { NgSelectCode } from './ng-select.code';
import { Observable, Subject } from 'rxjs';
import { DataService } from './data.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';

@Component({
  selector: 'app-ng-select',
  templateUrl: './ng-select.component.html',
  styleUrls: ['./ng-select.component.scss']
})
export class NgSelectComponent extends CoreBaseComponent implements OnInit {
  public code = new NgSelectCode();
  people$: Observable<any[]>;
  peopleInput$ = new Subject<string>();

  form: FormGroup;

  constructor(
    protected pageScrollService: PageScrollService,
    protected breakpointObserver: BreakpointObserver,
    @Inject(DOCUMENT) protected document: any,
    private dataService: DataService,
    private fb: FormBuilder
  ) {
    super(pageScrollService, breakpointObserver, document);
  }

  ngOnInit() {
    this.form = this.fb.group({
      selectedPeople: new FormControl(
        [{ name: 'Karyn Wright' }],
        Validators.required
      ),
      selectedPersonId: new FormControl(
        '5a15b13c36e7a7f00cf0d7cb',
        Validators.required
      )
    });

    this.people$ = this.dataService.getPeople();
  }

  clearModel() {
    this.form.get('selectedPeople').patchValue([]);
  }

  changeModel() {
    this.form.get('selectedPeople').patchValue([{ name: 'New person' }]);
  }

  onKeyup(val) {
    console.log(val);
  }
}
