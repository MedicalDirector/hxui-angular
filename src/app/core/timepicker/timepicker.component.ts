import { BreakpointObserver } from '@angular/cdk/layout';
import { DOCUMENT } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { PageScrollService } from 'ngx-page-scroll-core';
import { HxaTime } from '../../../../projects/hx-ui/src/lib/time-picker/hxa-time';
import { CoreBaseComponent } from '../core-base.component';
import { TimepickerCode } from './timepicker.code';

@Component({
  selector: 'app-timepicker',
  templateUrl: './timepicker.component.html',
  styles: [
    `
      :host {
        display: flex;
        flex: 1;
        min-width: 0;
      }
      aside {
        order: 2;
      }

      kbd {
        display: inline-block;
        background-color: #f5f5f5;
        padding: 0 2px;
        border: 1px solid #ccc;
        border-radius: 3px;
        line-height: 16px;
        white-space: nowrap;
      }
    `,
  ],
})
export class TimepickerComponent extends CoreBaseComponent {
  public code = new TimepickerCode();

  public form = this.fb.group({
    time: [new HxaTime(16, 0, 0), Validators.required],
  });

  constructor(
    protected pageScrollService: PageScrollService,
    protected breakpointObserver: BreakpointObserver,
    private fb: FormBuilder,
    @Inject(DOCUMENT) protected document: any
  ) {
    super(pageScrollService, breakpointObserver, document);
  }
}
