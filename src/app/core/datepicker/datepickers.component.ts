import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { PageScrollService } from 'ngx-page-scroll';
import { CoreBaseComponent } from '../core-base.component';
import { DOCUMENT } from '@angular/common';
import { DatepickersCode } from './datepickers.code';
import {BreakpointObserver} from '@angular/cdk/layout';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-datepickers',
  templateUrl: './datepickers.component.html',
  styles: [':host { display: flex; flex: 1; min-width: 0; }']
})
export class DatepickersComponent extends CoreBaseComponent { 

  public code = new DatepickersCode();

  basicForm = this.fb.group({
    dayte_basic: [null]
  });

  intervalForm = this.fb.group({
    dayte: [null],
  });

  constructor(
    protected pageScrollService: PageScrollService,
    protected breakpointObserver: BreakpointObserver,
    private fb: FormBuilder,
    @Inject(DOCUMENT) protected document: any,
  ) {
    super(pageScrollService, breakpointObserver, document);
  }

  onDateChangedBasic($event) {
    console.log(this.basicForm.get('dayte_basic').value, $event);
  }

  onDateChanged($event) {
    console.log(this.intervalForm.get('dayte').value, $event);
  }

  reset(){
    this.basicForm.reset();
    this.intervalForm.reset();
  }
}
