import { Component } from '@angular/core';
import { DateRange } from '@hxui/angular';

@Component({
  selector: 'eg-interval-daterangepicker',
  template: `
    <hxa-date-range-picker
      [displayMode]="3"
      [intervalOptions]="intervalOptions"
      (onDateRangeSelected)="getSelectedDateRange($event)"
    ></hxa-date-range-picker>
    <div>
      <br />
      <span>Emitted Date Range object:</span>
      <ul>
        <li>fromDate: {{ selectedDateRange.fromDate }}</li>
        <li>toDate: {{ selectedDateRange.toDate }}</li>
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
export class ExampleIntervalDaterangepickerComponent {
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
