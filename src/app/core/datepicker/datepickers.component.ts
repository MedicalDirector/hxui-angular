import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { PageScrollService } from 'ngx-page-scroll';
import { CoreBaseComponent } from '../core-base.component';
import { DOCUMENT } from '@angular/common';
import { DatepickersCode } from './datepickers.code';

@Component({
  selector: 'app-datepickers',
  templateUrl: './datepickers.component.html',
  styles: [':host { display: flex; flex: 1; min-width: 0; }']
})
export class DatepickersComponent extends CoreBaseComponent {

  public code = new DatepickersCode();
  public dayte: string;

  constructor(
    protected pageScrollService: PageScrollService,
    @Inject(DOCUMENT) protected document: any
  ) {
    super(pageScrollService, document);
  }
}
