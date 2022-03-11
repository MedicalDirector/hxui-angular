import { Component, Inject } from '@angular/core';
import { PageScrollService } from 'ngx-page-scroll-core';
import { CoreBaseComponent } from '../core-base.component';
import { DOCUMENT } from '@angular/common';
import { DateRangePickersCode } from './date-range-picker.code';
import { BreakpointObserver } from '@angular/cdk/layout';
import { DateRangeInterface } from '../../../../projects/hx-ui/src/lib/date-range-picker/date-range.interface';
import { DisplayModeEnum } from '../../../../projects/hx-ui/src/lib/date-range-picker/display-mode.enum';

@Component({
  selector: 'app-date-range-picker',
  templateUrl: './date-range-picker.component.html',
  styles: [':host { display: flex; flex: 1; min-width: 0; }']
})
export class DateRangePickerComponent extends CoreBaseComponent {
  public code = new DateRangePickersCode();
  public selectedDateRange: DateRangeInterface = {
    fromDate: new Date(),
    toDate: new Date()
  };
  DisplayModeEnum = DisplayModeEnum;

  defaultDateRange = {
    fromDate: new Date('01/06/2018'),
    toDate: new Date('02/06/2018')
  };

  intervalOptions: string[] = [
    'Today',
    'Yesterday',
    'Tomorrow',
    'Last Year',
    'Next Year',
    'Last Month',
    'Next Month',
    'Last Week',
    'Next Week',
    'Last Fortnight',
    'Next Fortnight'
  ];

  dateFormat = 'dd/MM/yyyy';

  constructor(
    protected pageScrollService: PageScrollService,
    protected breakpointObserver: BreakpointObserver,
    @Inject(DOCUMENT) protected document: any
  ) {
    super(pageScrollService, breakpointObserver, document);
  }

  getSelectedDateRange(dateRange: DateRangeInterface) {
    this.selectedDateRange = dateRange;
  }
}
