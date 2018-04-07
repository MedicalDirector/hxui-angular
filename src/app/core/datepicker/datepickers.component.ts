import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { PageScrollService } from 'ngx-page-scroll';
import { CoreBaseComponent } from '../core-base.component';
import { DOCUMENT } from '@angular/platform-browser';

import { DatepickerComponent } from '../../../modules/datepicker/datepicker.component';
import { DatepickerFormComponent } from '../../../modules/datepicker/datepicker-form.component';


@Component({
  selector: 'app-datepickers',
  templateUrl: './datepickers.component.html',
  styles: [':host { display:flex; flex: 1; min-width: 0; }']
})
export class DatepickersComponent extends CoreBaseComponent {

  dayte: string;

  constructor(protected pageScrollService: PageScrollService,
              @Inject(DOCUMENT) protected document: any) {
    super(pageScrollService, document);
  }


}
