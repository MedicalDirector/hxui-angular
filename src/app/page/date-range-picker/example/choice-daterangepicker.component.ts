import { Component } from '@angular/core';
import { DateRange } from '@hxui/angular';

@Component({
  selector: 'eg-choice-daterangepicker',
  template: `
    <hxa-date-range-picker
      [intervalOptions]="intervalOptions"
      [displayMode]="1"
      [dateFormat]="dateFormat"
      (onDateRangeSelected)="getSelectedDateRange($event)"
    ></hxa-date-range-picker>
    <div>
      <br />
      <span>Emitted Date Range object:</span>
      <ul>
        <li>From Date: {{ selectedDateRange.fromDate }}</li>
        <li>To Date: {{ selectedDateRange.toDate }}</li>
      </ul>
    </div>
  `,
  styles: [
    `
      :host {
        display: contents;
      }
    `,
  ],
})
export class ExampleChoiceDaterangepickerComponent {
  selectedDateRange: DateRange = {
    fromDate: new Date(),
    toDate: new Date(),
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
    'Next Fortnight',
  ];

  dateFormat = 'dd/MM/yyyy';

  getSelectedDateRange(dateRange: DateRange) {
    this.selectedDateRange = dateRange;
  }
}
