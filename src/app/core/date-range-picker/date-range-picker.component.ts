import { Component, Inject } from '@angular/core';
import { PageScrollService } from 'ngx-page-scroll-core';
import { CoreBaseComponent } from '../core-base.component';
import { DOCUMENT } from '@angular/common';
import { DateRangePickersCode } from './date-range-picker.code';
import { BreakpointObserver } from '@angular/cdk/layout';
import { DateRange } from '../../../../projects/hx-ui/src/lib/date-range-picker/date-range-picker.component';

@Component({
  selector: 'app-date-range-picker',
  templateUrl: './date-range-picker.component.html',
  styles: [':host { display: flex; flex: 1; min-width: 0; }']
})
export class DateRangePickerComponent extends CoreBaseComponent {
  /**
   * toggle for version 8 documentation
   *
   * **NOTE:** this is an interim solution dated 11/03/2022
   */
  public isVersion8 = false;

  public code = new DateRangePickersCode();
  public selectedDateRange: DateRange = {
    fromDate: new Date(),
    toDate: new Date()
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

  getSelectedDateRange(dateRange: DateRange) {
    this.selectedDateRange = dateRange;
  }

  toggleVersions() {
    this.isVersion8 = !this.isVersion8;
  }
}
