import { Code } from 'src/app/shared/page-base/page-base.model';

export class PageDateRangePickersCode {
  usage: Code = {
    lang: ['ts'],
    text: `import { DateRangePickerModule } from "@hxui/angular";

@NgModule({
  imports: [
    DateRangePickerModule.forRoot(),
    ...
  ]
})
export class AppModule {}
`,
  };

  usageLazy: Code = {
    lang: ['ts'],
    text: `import { NgxMaskModule } from "ngx-mask";
import {
  DatepickerModule,
  DropdownModule,
} from '@hxui/angular';

@NgModule({
  imports: [
    DatepickerModule.forRoot(),
    DropdownModule.forRoot(),
    NgxMaskModule.forRoot(),
    ...
  ],
  providers: [DatePipe],
})
export class LazyFeatureModule {}
`,
  };

  egCalendarHTML: Code = {
    lang: ['xml'],
    text: `<hxa-date-range-picker 
    [displayMode]=2 
    (onDateRangeSelected)="getSelectedDateRange($event)"
  ></hxa-date-range-picker>
  `,
  };

  egCalendarTS: Code = {
    lang: ['ts'],
    text: `import { Component } from '@angular/core';

@Component({
  selector: 'app-myfeature',
  templateUrl: './myfeature.component.html'
})
export class MyFeatureComponent {

  selectedDateRange: DateRange = {
    fromDate: new Date(),
    toDate: new Date(),
  };

  getSelectedDateRange(dateRange: DateRange){
    this.selectedDateRange = dateRange;
  }
}
`,
  };

  egIntervalHTML: Code = {
    lang: ['xml'],
    text: `<hxa-date-range-picker 
  [displayMode]=3 
  [intervalOptions]="intervalOptions" 
  (onDateRangeSelected)="getSelectedDateRange($event)"
></hxa-date-range-picker>
`,
  };

  egIntervalTS: Code = {
    lang: ['ts'],
    text: `import { Component } from '@angular/core';

@Component({
  selector: 'app-myfeature',
  templateUrl: './myfeature.component.html'
})
export class MyFeatureComponent extends CoreBaseComponent {

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
    'Next Fortnight'
  ];

  getSelectedDateRange(dateRange: DateRange){
    this.selectedDateRange = dateRange;
  }
}
`,
  };

  egChoiceHTML: Code = {
    lang: ['xml'],
    text: `<hxa-date-range-picker 
  [intervalOptions]="intervalOptions" 
  [displayMode]=1 
  [dateFormat]="dateFormat" 
  (onDateRangeSelected)="getSelectedDateRange($event)"
></hxa-date-range-picker>
`,
  };

  egChoiceTS: Code = {
    lang: ['ts'],
    text: `import { Component } from '@angular/core';

@Component({
  selector: 'app-myfeature',
  templateUrl: './myfeature.component.html'
})
export class MyFeatureComponent {

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
    'Next Fortnight'
  ];

  dateFormat = "dd/MM/yyyy";

  getSelectedDateRange(dateRange: DateRange){
    this.selectedDateRange = dateRange;
  }
}
`,
  };
}
